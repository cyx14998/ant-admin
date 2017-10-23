/**
 * 企业管理列表
 */
import axios, {
  getToken,
  apiVer
} from './index';

import {
  getLocQueryByLabel
} from '../utils';

var cusId = getLocQueryByLabel('id');

// post 接口有问题，全部使用get
export function postTest() {
  return axios.post('http://ythb.zhiqifu.com/MemberLogin.htm', {
    phoneNumber: "13800000000",
    password: "E10ADC3949BA59ABBE56E057F20F883E",
    InterfaceVersion: '20171016',
  })
}

// 获取企业列表
export function getCustomerList({
  pageNumber = 1,
  countPerPage = 1000,
  companyName = '',
  industryCategory = '',
  uniformSocialCreditCode = '',
  unitCategory = ''
}) {
  return axios.get('/uCustomerList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      companyName,
      industryCategory,
      uniformSocialCreditCode,
      unitCategory,
    }
  })
}

// 编辑页**********产品

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
  theName,
  unitOfMeasurement,
  designAnnualOutput
}) {
  return axios.get('uMainProductBaseInfoAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: cusId,
      theName,
      unitOfMeasurement,
      designAnnualOutput,
    }
  });
}
//编辑页---首页-产品基本信息编辑
export function getProductBaseInfoEdit({
  tableId,
  theName,
  unitOfMeasurement,
  designAnnualOutput
}) {
  return axios.get('uMainProductBaseInfoUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      unitOfMeasurement,
      designAnnualOutput,
    }
  });
}
//编辑页---首页-产品基本信息删除
export function getProductBaseInfoDelete(id) {
  return axios.get('uMainProductBaseInfoDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

//编辑页 *********原辅材料

//编辑页---首页-原辅材料获取
export function getMaterialBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  id
}) {
  return axios.get('uAuxiliaryMaterialsBaseInfoList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      customerId: id
    }
  });
}
//编辑页---首页-原辅材料新增
export function getMaterialBaseInfoAdd({
  theName,
  unitOfMeasurement,
  designAnnualOutput
}) {
  return axios.get(' uAuxiliaryMaterialsBaseInfoAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: cusId,
      theName,
      unitOfMeasurement,
      designAnnualOutput,
    }
  });
}
//编辑页---首页-原辅材料编辑
export function getMaterialBaseInfoEdit({
  tableId,
  theName,
  unitOfMeasurement,
  designAnnualOutput
}) {
  return axios.get('uAuxiliaryMaterialsBaseInfoUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: cusId,      
      tableId,
      theName,
      unitOfMeasurement,
      designAnnualOutput,
    }
  });
}
//编辑页---首页-原辅材料删除
export function getMaterialBaseInfoDelete(id) {
  return axios.get('uAuxiliaryMaterialsBaseInfoDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}
