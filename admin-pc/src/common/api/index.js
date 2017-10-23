/************************
 * 接口
 ************************/
import axios from 'axios';

axios.defaults.baseURL = 'http://ythb.zhiqifu.com';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const apiVer = '20171018';

export function getToken () {
  var token = localStorage.getItem('token');

  if (!token) {
    alert('登陆过期，请登陆后再来查看');

    window.location.replace('/login.html');
  }

  return token;
}



export default axios;










