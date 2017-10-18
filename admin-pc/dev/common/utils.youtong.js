/**
 * 通用数据处理方法
 */
const utils = {};

utils.serialize = function (json) {
  var str = '';
  var keys = Object.keys(json),
      len = keys.length,
      i;

  for (i=0; i<len; i++) {
    str += `${keys[i]}=${json[keys[i]]}&`;
  }

  return str.slice(0, -1);
}



export default utils;