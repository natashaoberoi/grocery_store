

export interface Options {
    filename: string;
    fieldSeparator: string;
    quoteStrings: string;
    decimalseparator: string;
    showLabels: boolean;
    showTitle: boolean;
    title: string;
    useBom: boolean;
    headers: string[];
    fields: string[];
    noDownload: boolean;
    hasPivotData: boolean;
    customFields: boolean;
}

export class CsvConfigConsts {

    public static EOL = '\r\n';
    public static BOM = '\ufeff';

    public static DEFAULT_FIELD_SEPARATOR = '\t';
    public static DEFAULT_DECIMAL_SEPARATOR = '.';
    public static DEFAULT_QUOTE = '"';
    public static DEFAULT_SHOW_TITLE = false;
    public static DEFAULT_TITLE = '';
    public static DEFAULT_FILENAME = 'mycsv.txt';
    public static DEFAULT_SHOW_LABELS = false;
    public static DEFAULT_USE_BOM = true;
    public static DEFAULT_HEADER: any[] = [];
    public static DEFAULT_FIELDS: any[] = [];
    public static DEFAULT_NO_DOWNLOAD = false;
    public static DEFAULT_NO_PIVOT_DATA = false;
    public static DEFAULT_CUSTOM_FIELDS = false;

}

export const ConfigDefaults: Options = {
    filename: CsvConfigConsts.DEFAULT_FILENAME,
    fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
    quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
    decimalseparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
    showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
    showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
    title: CsvConfigConsts.DEFAULT_TITLE,
    useBom: CsvConfigConsts.DEFAULT_USE_BOM,
    headers: CsvConfigConsts.DEFAULT_HEADER,
    fields: CsvConfigConsts.DEFAULT_FIELDS,
    noDownload: CsvConfigConsts.DEFAULT_NO_DOWNLOAD,
    hasPivotData: CsvConfigConsts.DEFAULT_NO_PIVOT_DATA,
    customFields: CsvConfigConsts.DEFAULT_CUSTOM_FIELDS
};

export class ExportData {

  

    public fileName: string;
    public labels: Array<String>;
    public data: any[];

    private _options: Options;
    private csv = '';

    /**
    * Check if is Float
    * @param {any} input
    */
    static isFloat(input: any) {
        return +input === input && (!isFinite(input) || Boolean(input % 1));
    }

    static isHTML(str) {
        const a = document.createElement('div');
        a.innerHTML = str;
        for (let c = a.childNodes, i = c.length; i--; ) {
          if (c[i].nodeType === 1) {
            return true;
          }
        }
        return false;
    }

    constructor(DataJSON: any, filename: string, options?: any) {
        const config = options || {};

        this.data = typeof DataJSON !== 'object' ? JSON.parse(DataJSON) : DataJSON;

        this._options = objectAssign({}, ConfigDefaults, config);

        if (this._options.filename) {
            this._options.filename = filename;
        }

        this.generateCsv();

      
    }

    /**
     * Generate and Download Csv
     */
    private generateCsv() {
        if (this._options.useBom) {
            this.csv += CsvConfigConsts.BOM;
        }

        if (this._options.showTitle) {
            this.csv += this._options.title + '\r\n\n';
        }

        this.getHeaders();
        this.getBody();

        if (this.csv === '') {
            console.log('Invalid data');
            return;
        }

        if (this._options.noDownload) {
            return this.csv;
        }

        const blob = new Blob([this.csv], {'type': 'text/csv;charset=utf8;'});

       
            const uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(this.csv);
            const link = document.createElement('a');

            link.href = URL.createObjectURL(blob);

            link.setAttribute('visibility', 'hidden');
            link.download = this._options.filename.replace(/ /g, '_') + '.tsv';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        
    }

    /**
     * Create Headers
     */
    getHeaders(): void {
      if (this._options.headers.length > 0) {
          const { headers } = this._options;
          this.writeHeaders(headers);
      } else {
          // get headers from the first json object in the array
          const headers = Object.keys(this.data[0]);
          this.writeHeaders(headers);
      }
    }

    writeHeaders(headers: string[]): void {
        let row = headers.reduce((headerRow, header) => {
            return headerRow + header + this._options.fieldSeparator;
        }, '');
        row = row.slice(0, -1);
        this.csv += row + CsvConfigConsts.EOL;
    }

    /**
     * Create Body
     */
    getBody() {
        for (let i = 0; i < this.data.length; i++) {

            let row = '';
            // Preserve headers order if they are supplied.
            if (this._options.headers.length > 0 && !this._options.hasPivotData && !this._options.customFields) {
                for (let j = 0; j < this._options.headers.length; j++) {

                    const exportField = this._options.headers[j];
                    const exportFieldValue = this.data[i][exportField] !== undefined ? this.data[i][exportField] : '';
                    row += this.formartData(exportFieldValue) + this._options.fieldSeparator;
                }
            } else if (this._options.headers.length > 0 && this._options.customFields) {

                for (let j = 0; j < this._options.fields.length; j++) {

                    const exportField = this._options.fields[j];
                    const exportFieldValue = this.data[i][exportField] !== undefined && this.data[i][exportField] !== null ? this.data[i][exportField] : '';
                    row += this.formartData(exportFieldValue) + this._options.fieldSeparator;
                }
            } else {
                // tslint:disable-next-line:forin
                for (const index in this.data[i]) {
                    row += this.formartData(this.data[i][index]) + this._options.fieldSeparator;
                }
            }

            row = row.slice(0, -1);
            this.csv += row + CsvConfigConsts.EOL;
        }
    }

    /**
     * Format Data
     * @param {any} data
     */
    formartData(data: any) {
        
        if (this._options.decimalseparator === 'locale' && ExportData.isFloat(data)) {
            return data.toLocaleString();
        }

        if (this._options.decimalseparator !== '.' && ExportData.isFloat(data)) {
            return data.toString().replace('.', this._options.decimalseparator);
        }

        if (typeof data === 'string') {
                console.log('string data --' + data);
                data = data.replace(/"/g, '""');
                if (this._options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
                    data = this._options.quoteStrings + data + this._options.quoteStrings;
                    console.log('inside if string data --' + data);
                }

                if (ExportData.isHTML(data)) {
                    data = data.replace(/<(?:.|\n)*?>/gm, '');
                }
                return data;
        } 
        else if (data !== null && (data instanceof Array) ){
            let str = JSON.stringify(data).replace('[', '').replace(']', '');
            console.log('array str1 - ' + str);
            str = str.replace(/"/g, '');
            data = this._options.quoteStrings + str + this._options.quoteStrings;
            console.log('array str2 - ' + data);
        } 
        else if (typeof data === 'object') {
            console.log('In***');
            if (JSON.stringify(data).indexOf('accession') > -1){
                let str = 'accession: ' + data.accession + '; ';
                str = str + 'link: ' + data.link + '; ';
                let measuretypes = JSON.stringify(data.measurement_types).replace('[', '').replace(']', '');
                console.log('array str1 - ' + measuretypes);
                measuretypes = measuretypes.replace(/"/g, '');
                str = str + 'measurement_types:' + measuretypes;
                data = this._options.quoteStrings + str + this._options.quoteStrings;
            } else if (JSON.stringify(data).indexOf('name') > -1) {
                let str = 'name: ' + data.name + '; ';
                str = str + 'link: ' + data.link + '; ';              
                data = this._options.quoteStrings + str + this._options.quoteStrings;
            }else
            return JSON.stringify(data).replace('[', '').replace(']', '');
        }

        if (typeof data === 'boolean') {
            return data ? 'TRUE' : 'FALSE';
        }
        
        

        return data;
    }

}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Convet to Object
 * @param {any} val
 */
function toObject(val: any) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}

/**
 * Assign data  to new Object
 * @param {any}   target
 * @param {any[]} ...source
 */
function objectAssign(target: any, ...source: any[]) {
    let from: any;
    const to = toObject(target);
    let symbols: any;

    for (let s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);

        for (const key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }

        if ((<any>Object).getOwnPropertySymbols) {
            symbols = (<any>Object).getOwnPropertySymbols(from);
            for (let i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
}
