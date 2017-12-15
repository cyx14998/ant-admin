/************************
 * 接口
 ************************/
import axios from 'axios';

import {
  getLocQueryByLabel
} from '../utils';

axios.defaults.baseURL = BaseConfig.apiPath;
// axios.defaults.baseURL = 'http://106.14.199.230:8080/ythb';
// axios.defaults.timeout = 1000 * 5;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var token = getLocQueryByLabel('token');
if(token){
  localStorage.setItem('token', token);
}

export const apiVer = '20171018'; // '20171018';

export function getToken() {
  var token = localStorage.getItem('token');

  if (!token) {
    // alert('登陆过期，请登陆后再来查看');

    window.location.replace('login.html');
  }

  return token;
}


// Date.format
Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1,                 //月份 
      "d+": this.getDate(),                    //日 
      "h+": this.getHours(),                   //小时 
      "m+": this.getMinutes(),                 //分 
      "s+": this.getSeconds(),                 //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
  }
  return fmt;
}

export default axios;