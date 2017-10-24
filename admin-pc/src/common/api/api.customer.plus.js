/**
 * 企业管理辅助模块
 */
import axios, { getToken, apiVer, getCustomerId } from './index';

// 获取废水污染物基本情况
export function getWastewaterList({
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
