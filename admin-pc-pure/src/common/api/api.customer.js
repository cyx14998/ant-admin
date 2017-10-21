/**
 * 企业管理列表
 */
import axios, { getToken } from './index';

// 获取企业列表
export function getCustomerList({pageNumber=1, countPerPage=1000}) {
  return axios.get('/uCustomerList.uhtm?InterfaceVersion=20171018', {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}

export function getCustomerInfoById(id) {
  return axios.get('/uCustomerDetail.uhtm?InterfaceVersion=20171018', {
    params: {
      token: getToken(),
      tableId: id
    }
  });
}