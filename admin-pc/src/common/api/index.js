/************************
 * 接口
 ************************/
import axios from 'axios';

import {
  getLocQueryByLabel
} from '../utils';

axios.defaults.baseURL = BaseConfig.apiPath; 
// axios.defaults.baseURL = 'http://106.14.199.230:8080/ythb';
axios.defaults.timeout = 1000 * 5;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const apiVer = '20171018'; // '20171018';

export function getToken() {
  var token = localStorage.getItem('token');

  if (!token) {
    // alert('登陆过期，请登陆后再来查看');

    if (window.innerFrame) {
      window.location.replace('/login.html');
      return;
    }

    // iframe 内调用时
    parent.window.iframeHook.backToLogin();
  }

  return token;
}

export function getCustomerId() {
  var cusId = getLocQueryByLabel('id');

  if (cusId) return cusId;

  cusId = localStorage.getItem('yt-customerId');

  return cusId;
}



export default axios;