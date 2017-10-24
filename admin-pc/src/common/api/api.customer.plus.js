/**
 * 企业管理列表
 */
import axios, { getToken, apiVer, getCustomerId } from './index';

/********************** 编辑-首页-污水污染物基本情况 **********************/

/* 
* 获取废水排放基本信息
*/
export function getWastewaterDischargeList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uWasteWaterDischargePortList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}
/* 
* 新增废水排放口
*/

export function getWastewaterBaseInfoAdd(data){
  return axios.get('/uWasteWaterDischargePortAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      ...data,
    }
  })
}

/* 
* 获取废水污染物基本信息
*/
// 删除废水排放口
export function deleteWastewaterPort({tableId}){
  return axios.get('/uWasteWaterDischargePortDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

//新增废水排放口
export function addWastewaterPort(data){
  return axios.get('/uWasteWaterDischargePortAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      ...data,
    }
  })
}
