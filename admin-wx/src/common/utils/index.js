/**
 * utils for app
 */

export function getLocQueryByLabel(label) {
  var searchstr = window.location.search.slice(1);
  var qsArr = searchstr.split('&');
  var qsJson = {};

  var len = qsArr.length,
    i = 0,
    item = [];

  for (i; i < len; i++) {
    item = qsArr[i].split('=');
    qsJson[item[0]] = item[1];
  }

  return qsJson[label];
}

/**
 * Toast
 */
export function MyToast(info, timeout = 1000) {
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


/**
 * 数据字段转换
 * @param [object Array]
 *     tableId  =>  value
 *     theName  =>  label
 * @return [object Array]
 */
export function convertObjectLabel(source, valueProp = 'tableId', labelProp = 'theName') {
  var dest = [];

  if (!source || source.length === 0) {
    return dest;
  }

  var len = source.length,
    i;
  for (i = 0; i < len; i++) {
    let newItem = {
      value: source[i][valueProp] + '',
      label: source[i][labelProp] + ''
    };

    dest.push(newItem);
  }

  return dest;
}

/**
 * @props value
 * @props options 
 * @return label
 */
export function getLabelFromOptions(value, options) {
  var label = '';

  for (var i = 0, len = options.length; i < len; i++) {
    if (options[i].value === value) {
      label = options[i].label;
      break;
    }
  }

  return label;
}

/**
 * 数组切割
 * @props arr      [{id: '001'}, {id: '002'}]
 * @props rowKey   id
 * @props key      001
 * @return newArr  [{id: '002'}]
 */
export function getSlicedObjectArray(arr, rowKey, key) {
  var newArr = [];

  arr.map(item => {
    if (item[rowKey] !== key) {
      newArr.push(item)
    }
  });

  return newArr;
}


/**
   * 通过key 设置文件路径和名称
   * 路径规则：filetype/2017/11/11/timestamp.ext
   */
export function getFileKey(fileType, fileName) {
  var type = fileType.split('/')[0];
  var ext = fileName.split('.')[1] || '';
  var date = new Date();
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    timestamp = date.getTime();

  m = m < 10 ? ('0' + m) : m;
  d = d < 10 ? ('0' + d) : d;

  var path = `${type}/${y}/${m}/${d}/${timestamp}.${ext}`;

  return path;
}