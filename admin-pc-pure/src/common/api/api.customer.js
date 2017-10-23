/**
 * 企业管理列表
 */
import axios, { getToken, apiVer } from './index';

// 获取企业列表
export function getCustomerList({pageNumber=1, countPerPage=1000}) {
  return axios.get('/uCustomerList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}

export function getCustomerInfoById(id) {
  return axios.get('/uCustomerDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id
    }
  });
}