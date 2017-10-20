/**
 * 企业管理列表
 */
import axios from './index';

var getToken = function () {
  return localStorage.getItem('token');
}

export function getCustomerList() {
  return axios.get('/', {
    params: {
      token: getToken()
    }
  })
}