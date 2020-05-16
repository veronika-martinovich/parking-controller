export function dynamicSort(property, param) {
  let sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  
  return function (a,b) {
    let result = 0;
    if (param) {
      result = (a[property][param] < b[property][param]) ? -1 : (a[property][param] > b[property][param]) ? 1 : 0;
    } else {
      result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
    return result * sortOrder;
  }
}
