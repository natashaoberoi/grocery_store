export function getBaseLocation() {
    console.log('location pathname :' + location.pathname);
    // for war
    const basePath: string = location.pathname.split('/')[1] || '';
    console.log('basePath = ' +  basePath);
    return '/' +  basePath;
}

export function getPRCLink(value): any {
    if (value.indexOf('Stanford') !== -1) {     
        return '<a target="blank" href="https://www.marchofdimes.org/research/stanford-university-overview.aspx" >' +
        value + '</a>';
      } else if (value.indexOf('Washington') !== -1) {
        return '<a target="blank" href="https://prematurityresearch.wustl.edu/" >' +
        value + '</a>';
      } else if (value.indexOf('Ohio') !== -1) {
        return '<a target="blank" href="https://www.marchofdimes.org/research/ohio-collaborative-overview.aspx" >' +
        value + '</a>';
      } else if (value.indexOf('Imperial') !== -1) {
        return '<a target="blank" href="https://www.marchofdimes.org/research/prematurity-research-center-imperial-college.aspx" >' +
        value + '</a>';
      } else if (value.indexOf('Chicago') !== -1) {
        return '<a target="blank" href="https://www.marchofdimes.org/research/uchicago-northwestern-duke-overview.aspx" >' +
        value + '</a>';
      } else if (value.indexOf('Pennsylvania') !== -1) {
        return '<a target="blank" href="https://www.marchofdimes.org/research/penn-overview.aspx" >' +
        value + '</a>';
      } else if (value.indexOf('Penn') !== -1) {
        return '<a target="blank" href="https://www.marchofdimes.org/research/penn-overview.aspx" >' +
        value + '</a>';
      } else {
        return value;
      }
}