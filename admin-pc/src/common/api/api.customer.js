/**
 * 企业管理列表
 */
import axios, {
  getToken,
  apiVer
} from './index';

// 获取企业列表
export function getCustomerList({
  pageNumber = 1,
  countPerPage = 1000
}) {
  return axios.get('/uCustomerList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}
//编辑页---首页-基本信息获取
export function getCustomerInfoById(id) {
  return axios.get('/uCustomerDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id
    }
  });
}
//编辑页---首页-基本信息保存
export function saveCustomerInfoById(data) {
  return axios.get('uCustomerUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      ...data
    }
  });
}
//编辑页---首页-产品基本信息获取
export function getProductBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  id
}) {
  return axios.get('uMainProductBaseInfoList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      customerId: id
    }
  });
}
//编辑页---首页-产品基本信息新增
export function getProductBaseInfoAdd({
  customerId,
  theName,
  unitOfMeasurement,
  designAnnualOutput
}) {
  return axios.get('uMainProductBaseInfoAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId,
      theName,
      unitOfMeasurement,
      designAnnualOutput,
    }
  });
}
//编辑页---首页-产品基本信息删除
export function getProductBaseInfoDelete(id) {
  return axios.get('uMainProductBaseInfoUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}