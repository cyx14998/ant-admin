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

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

let cutReq = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      return true;
    }
  }
}

//添加请求拦截器
axios.interceptors.request.use(config => {

  (setTimeout(function () {
    pending = []; //2s后清空所有存在的执行函数体
  }, 2000));
  let flag = cutReq(config);

  if (flag === true) return null; // 当上一次相同请求未完成时，无法进行第二次相同请求
  config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + '&' + config.method, f: c });
  });

  return config;
}, error => {
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(res => {
  removePending(res.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return res;
}, error => {
  return { data: {} };
});


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
    window.iframeHook.backToLogin();
  }

  return token;
}

export function getCustomerId() {
  var cusId = getLocQueryByLabel('id');

  if (cusId) return cusId;

  cusId = localStorage.getItem('yt-customerId');

  return cusId;
}

// 获取menuId
export function getMenuId() {
  return localStorage.getItem('uMenuId');
}

// 存入menuId
export function setMenuId(menuId) {
  return localStorage.setItem('uMenuId', menuId);
}

export function getMenuList() {
  var menuList = localStorage.getItem('menuList');

  if (!menuList) {
    window.location.replace('/login.html');
  }
  menuList = JSON.parse(menuList);
  return menuList;
}

export default axios;