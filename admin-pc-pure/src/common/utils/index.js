/**
 * utils for app
 */

export function getLocQueryByLabel (label) {
  var searchstr = window.location.search.slice(1);
  var qsArr = searchstr.split('&');
  var qsJson = {};

  var len = qsArr.length,
      i = 0,
      item = [];

  for (i; i<len; i++) {
    item = qsArr[i].split('=');
    qsJson[item[0]] = item[1]; 
  }

  return qsJson[label];
}



