/**
 * 企业管理主模块
 */
import axios, {
  getToken,
  getCustomerId,
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
//获取省份列表
export function getProvinceList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('uProvinceList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
    }
  });
}

//获取市列表
export function getCityList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  id
}) {
  return axios.get('uCityList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      provinceId: id,
    }
  });
}

/**
 * 获取区列表
 * @QA：
 *    数据错误同一数据
 */
export function getAreaList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  id,
}) {
  return axios.get('uAreaList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      cityId: id
    }
  });
}

/**
 * 获取镇列表
 * @QA：
 *    服务器内部错误
 */
export function getTownList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  id,
}) {
  return axios.get('uTownList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      areaId: id
    }
  });
}
// 编辑页**********

//编辑页---首页-基本信息获取
export function getCustomerInfoById() {
  return axios.get('/uCustomerDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: getCustomerId()
    }
  });
}

/**
 * 编辑页---首页-基本信息增加保存add
 * @QA：
 *   
 */

export function saveAddCustomerInfoById(data) {
  return axios.get('uCustomerAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      ...data
    }
  });
}
/**
 * 编辑页---首页-基本信息编辑保存edit
 * @QA：
 *   
 */

export function saveEditCustomerInfoById(data) {
  return axios.get('uCustomerUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: getCustomerId(),
      ...data
    }
  });
}

/**************************** 编辑页---首页-产品基本信息模块 ***********************/

/**
 * 编辑页---首页-产品基本信息获取
 * @QA：
 *   设计年产量字段缺失（未返回全部字段）
 */
export function getProductBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('uMainProductBaseInfoList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
<<<<<<< HEAD
      keyword
=======
      keyword,
>>>>>>> yxc004
    }
  });
}
/**
 * 编辑页---首页-产品基本信息新增
 * @QA:
 *   400 Bad Request
 *    数据新增两遍
 *   
 */
export function getProductBaseInfoAdd({
  theName,
  unitOfMeasurement,
  designAnnualOutput
}) {
  return axios.get('uMainProductBaseInfoAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
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
      customerId: getCustomerId(),
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


/*************************** 编辑页---首页-原辅材料获取模块 ***********************/

//编辑页---首页-原辅材料获取
export function getMaterialBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('uAuxiliaryMaterialsBaseInfoList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
    }
  });
}
/**
 * 编辑页---首页-原辅材料新增
 * @QA:
 *   设计用耗量DesignConsumption字段错误
 *   
 */
export function getMaterialBaseInfoAdd({
  theName,
  unitOfMeasurement,
  designConsumption
}) {
  return axios.get('uAuxiliaryMaterialsBaseInfoAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      theName,
      unitOfMeasurement,
      designConsumption,
    }
  });
}
//编辑页---首页-原辅材料编辑
export function getMaterialBaseInfoEdit({
  tableId,
  theName,
  unitOfMeasurement,
  designConsumption
}) {
  return axios.get('uAuxiliaryMaterialsBaseInfoUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      tableId,
      theName,
      unitOfMeasurement,
      designConsumption,
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

/*************************** 编辑页---首页-能源获取模块 ***********************/

//编辑页---首页-能源获取
export function getEnergyBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('uUseInfoEnergyList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
    }
  });
}
/**
 * 编辑页---首页-能源新增
 * @QA:
 *  年耗量annualConsumption字段错误
 *   
 */
export function getEnergyBaseInfoAdd({
  theContent,
  theType,
  annualConsumption
}) {
  return axios.get('uUseInfoEnergyAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      theContent,
      theType,
      annualConsumption,
    }
  });
}
//编辑页---首页-能源编辑
export function getEnergyBaseInfoEdit({
  tableId,
  theContent,
  theType,
  annualConsumption
}) {
  return axios.get('uUseInfoEnergyUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      tableId,
      theContent,
      theType,
      annualConsumption,
    }
  });
}
//编辑页---首页-能源删除
export function getEnergyBaseInfoDelete(id) {
  return axios.get('uUseInfoEnergyDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

/*************************** 编辑页---首页-用水获取模块 ***********************/

/**
 * 编辑页---首页-用水获取
 * @QA:
 *    列表只返回tableId,无其他数据
 *   
 */
export function getWaterBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('uUseInfoWaterList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
    }
  });
}
/**
 * 编辑页---首页-用水新增
 * @QA:
 *   保存接口成功后，接口列表没有数据
 */
export function getWaterBaseInfoAdd({
  consumption,
  theType,
  annualConsumption
}) {
  return axios.get('uUseInfoWaterAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      consumption,
      annualConsumption,
    }
  });
}
//编辑页---首页-用水编辑
export function getWaterBaseInfoEdit({
  tableId,
  consumption,
  theType,
  annualConsumption
}) {
  return axios.get('uUseInfoWaterUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      tableId,
      consumption,
      annualConsumption,
    }
  });
}
//编辑页---首页-用水删除
export function getWaterBaseInfoDelete(id) {
  return axios.get('uUseInfoWaterDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}
/*************************** 编辑页---首页-生产装置获取模块 ***********************/

/**
 * 编辑页---首页-生产装置获取
 * @QA:
 *    404错误
 *  http://ythb.zhiqifu.com/uMainProductionDeviceList.uhtm?InterfaceVersion=20171018&token=Z9ygxnbEKTLgIYG5LLs1yHEoxTJadZOrNRFYbtwaLJA%3D&customerId=1&pageNumber=1&countPerPage=1000&keyword=
 *   
 */
export function getDeviceBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('uMainProductionDeviceList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
    }
  });
}
/**
 * 编辑页---首页-生产装置新增
 * @QA:
 *   
 */
export function getDeviceBaseInfoAdd({
  consumption,
  theType,
  annualConsumption
}) {
  return axios.get('uMainProductionDeviceAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      serialNumber,
      theName,
      theModel,
      theQuantity,
      processing,
      useEnergy,
      pollutantName,
      facilitiesName,
    }
  });
}
//编辑页---首页-生产装置编辑
export function getDeviceBaseInfoEdit({
  tableId,
  consumption,
  theType,
  annualConsumption
}) {
  return axios.get('uMainProductionDeviceUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      tableId,
      serialNumber: '',
      theName: '',
      theModel: '',
      theQuantity: '',
      processing: '',
      useEnergy: '',
      pollutantName: '',
      facilitiesName: '',
    }
  });
}
//编辑页---首页-生产装置删除
export function getDeviceBaseInfoDelete(id) {
  return axios.get('uMainProductionDeviceDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}