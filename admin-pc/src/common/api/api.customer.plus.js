/**
 * 企业管理列表
 */
import axios, { getToken, apiVer } from './index';

// 获取废水污染物基本情况
export function getWastewaterList({pageNumber=1, countPerPage=1000,customerId=''}){
  return axios.get('/uWasteWaterDischargePortList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      customerId,
    }
  })
}

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
