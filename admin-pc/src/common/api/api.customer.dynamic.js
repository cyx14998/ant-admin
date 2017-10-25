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
export function getCustomerDynamicList({
  pageNumber = 1,
  countPerPage = 1000,
}) {
  return axios.get('/uCustomerMonthDclarationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
    }
  })
}
/**************************** 编辑页---首页-产品动态信息模块 ***********************/

/**
 * 编辑页---首页-产品动态信息获取
 * @QA：
 */
export function getProductDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  theYear = '2017',
  theMonth = '01',
}) {
  return axios.get('uMainProductOutputList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
      theYear,
      theMonth,
    }
  });
}
/**
 * 编辑页---首页-产品动态信息新增
 * @QA:
 *    {result: "fail", info: "请输入产量"}
 *   
 */
export function getProductDynamicInfoAdd({
  theName,
  unitOfMeasurement,
  yieId,
  customerMonthDclarationId = 1
}) {
  return axios.get('uMainProductOutputAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      theName,
      unitOfMeasurement,
      yieId,
      customerMonthDclarationId,
    }
  });
}

//编辑页---首页-产品动态信息编辑
export function getProductDynamicInfoEdit({
  tableId,
  theName,
  unitOfMeasurement,
  yieId
}) {
  return axios.get('uMainProductOutputUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      tableId,
      theName,
      unitOfMeasurement,
      yieId,
    }
  });
}


//编辑页---首页-产品动态信息删除
export function getProductDynamicInfoDelete(id) {
  return axios.get('uMainProductOutputDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

/*************************** 编辑页---首页-原辅材料获取模块 ***********************/

//编辑页---首页-原辅材料获取
export function getMaterialDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  customerMonthDclarationId = '1',
}) {
  return axios.get('uAuxiliaryMaterialsConsumptionList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
      customerMonthDclarationId,
    }
  });
}
/**
 * 编辑页---首页-原辅材料新增
 * @QA:
 *   (接口调用失败)
 *   
 */
export function getMaterialDynamicInfoAdd({
  customerMonthDclarationId = '1',
  theYear = '2017',
  theMonth = '04',
  theName,
  unitOfMeasurement,
  consumption,
}) {
  return axios.get('uAuxiliaryMaterialsConsumptionAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      customerMonthDclarationId,
      theYear,
      theMonth,
      theName,
      unitOfMeasurement,
      consumption,
    }
  });
}
//编辑页---首页-原辅材料编辑
export function getMaterialDynamicInfoEdit({
  tableId,
  theName,
  unitOfMeasurement,
  consumption
}) {
  return axios.get('uAuxiliaryMaterialsConsumptionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      tableId,
      theName,
      unitOfMeasurement,
      consumption

    }
  });
}
//编辑页---首页-原辅材料删除
export function getMaterialDynamicInfoDelete(id) {
  return axios.get('uAuxiliaryMaterialsConsumptionDelete.uhtm?InterfaceVersion=' + apiVer, {
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
 *   
 */
export function getWaterBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  theYear = '2017',
  theMonth = '01',
  customerMonthDclarationId = 1
}) {
  return axios.get('uElectricityAndWaterConsumptionList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
      theYear,
      theMonth,
      customerMonthDclarationId,
    }
  });
}
/**
 * 编辑页---首页-用水新增
 * @QA:
 */
export function getWaterBaseInfoAdd({
  customerMonthDclarationId = 1,
  useWaterType,
  repeatedWaterConsumption,
  totalWaterConsumption,
  waterSource,
  electricityConsumption,
}) {
  return axios.get(' uElectricityAndWaterConsumptionAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      customerMonthDclarationId,
      useWaterType,
      repeatedWaterConsumption,
      totalWaterConsumption,
      waterSource,
      electricityConsumption,
    }
  });
}
//编辑页---首页-用水编辑
export function getWaterBaseInfoEdit({
  theMonth='01',
  tableId,
  useWaterType,
  repeatedWaterConsumption,
  totalWaterConsumption,
  waterSource,
  electricityConsumption,
}) {
  return axios.get('uElectricityAndWaterConsumptionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      theMonth,
      tableId,
      useWaterType,
      repeatedWaterConsumption,
      totalWaterConsumption,
      waterSource,
      electricityConsumption,
    }
  });
}
//编辑页---首页-用水删除
export function getWaterBaseInfoDelete(id) {
  return axios.get('uElectricityAndWaterConsumptionDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

/*************************** 编辑页---首页-燃料获取模块 ***********************/

/**
 * 编辑页---首页-燃料动态信息获取
 * @QA：
 */
export function getFuelDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  theYear = '2017',
  theMonth = '01',
  customerMonthDclarationId=1,
}) {
  return axios.get('uFuelConsumptionList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
      theYear,
      theMonth,
      customerMonthDclarationId,
    }
  });
}
/**
 * 编辑页---首页-燃料动态信息新增
 * @QA:
 *    {result: "fail", info: "请输入产量"}
 *   
 */
export function getFuelDynamicInfoAdd({
customerMonthDclarationId=1,
theName,
placeOfOrigin,
consumption,
theUnit,
sulfurContent,
ashContent,
calorificValue,
calorificValueUnit,
unitOfMeasurement,
}) {
  return axios.get('uFuelConsumptionAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      customerMonthDclarationId,
theName,
placeOfOrigin,
consumption,
theUnit,
sulfurContent,
ashContent,
calorificValue,
calorificValueUnit,
unitOfMeasurement,
    }
  });
}

//编辑页---首页-燃料动态信息编辑
export function getFuelDynamicInfoEdit({
  tableId,
theName,
placeOfOrigin,
consumption,
theUnit,
sulfurContent,
ashContent,
calorificValue,
calorificValueUnit,
unitOfMeasurement,
}) {
  return axios.get('uFuelConsumptionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      tableId,
theName,
placeOfOrigin,
consumption,
theUnit,
sulfurContent,
ashContent,
calorificValue,
calorificValueUnit,
unitOfMeasurement,
    }
  });
}


//编辑页---首页-燃料动态信息删除
export function getFuelDynamicInfoDelete(id) {
  return axios.get('uFuelConsumptionDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}