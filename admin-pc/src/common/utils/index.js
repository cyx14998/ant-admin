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

/**
 * Toast
 */
export function MyToast (info, timeout=1000) {
  var toast = document.createElement('div');
  toast.setAttribute('class', 'yzy-toast');

  var p = document.createElement('p');
  p.setAttribute('class', 'yzy-toast-info');

  var text = document.createTextNode(info);

  p.appendChild(text);
  toast.appendChild(p);

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, timeout)

}



