
import { HttpParams, HttpParameterCodec} from '@angular/common/http';


/** Options used to construct an `HttpParams` instance. */
export interface HttpParamsOptions {
  /**
   * String representation of the HTTP params in URL-query-string format. Mutually exclusive with
   * `fromObject`.
   */
  fromString?: string;

  /** Object map of the HTTP params. Mutually exclusive with `fromString`. */
  fromObject?: {
     [param: string]: string | string[];
  };

  /** Encoding codec used to parse and serialize the params. */
  encoder?: HttpParameterCodec;
}

export class InterceptorHttpParams extends HttpParams {
  constructor(
    public interceptorConfig: {     
      hideLoader: boolean
      cacheRequest: boolean
    },
    params?: { [param: string]: string | string[] }
  ) {
    super({ fromObject: params } as HttpParamsOptions);
  }
}
