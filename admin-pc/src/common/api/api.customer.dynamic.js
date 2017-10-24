/*********************************
 * 企业管理 -- 动态信息主模块
 */

import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';


/**
 * 获取动态列表
 */
export function getCustomerDynamicList ({
  pageNumber=1, 
  countPerPage=1000, 
}) {
  return axios.get('/uCustomerMonthDclarationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
    }
  })
} 