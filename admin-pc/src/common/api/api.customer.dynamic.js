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


// 编辑页---首页-产品动态信息获取

export function getProductDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  theYear = '2017',
  theMonth = '04',
  customerMonthDclarationId = 1,
}) {
  return axios.get('/uMainProductOutputList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
      theYear,
      theMonth,
      customerMonthDclarationId, //文档无
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
  theYear = '2017',
  theMonth = '04',
  customerMonthDclarationId = '1',
  theName,
  unitOfMeasurement,
  theYield,
}) {
  return axios.get('/uMainProductOutputAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      theName,
      unitOfMeasurement,
      theYield,
      customerMonthDclarationId,
      theYear,
      theMonth,
    }
  });
}

//编辑页---首页-产品动态信息编辑
export function getProductDynamicInfoEdit({
  theYear = '2017',
  theMonth = '01',
  customerMonthDclarationId = '1',
  tableId,
  theName,
  unitOfMeasurement,
  theYield
}) {
  return axios.get('/uMainProductOutputUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      tableId,
      theName,
      unitOfMeasurement,
      theYield,
      customerMonthDclarationId,
      theYear,
      theMonth,
    }
  });
}


//编辑页---首页-产品动态信息删除
export function getProductDynamicInfoDelete(id) {
  return axios.get('/uMainProductOutputDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

/*************************** 编辑页---首页-原辅材料获取模块 ***********************/

//编辑页---首页-原辅材料获取 (success)

export function getMaterialDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  customerMonthDclarationId = '1',
}) {
  return axios.get('/uAuxiliaryMaterialsConsumptionList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      pageNumber,
      countPerPage,
      keyword,
      customerMonthDclarationId,
    }
  });
}

// 编辑页---首页-原辅材料新增 (success)

export function getMaterialDynamicInfoAdd({
  customerMonthDclarationId = '1',
  theYear = '2017',
  theMonth = '04',
  theName,
  unitOfMeasurement,
  consumption,
}) {
  return axios.get('/uAuxiliaryMaterialsConsumptionAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      customerMonthDclarationId,
      theYear,
      theMonth,
      theName,
      UnitOfMeasurement: 1,
      consumption,
    }
  });
}


//编辑页---首页-原辅材料编辑
export function getMaterialDynamicInfoEdit({
  customerMonthDclarationId = '1',
  tableId,
  theName,
  unitOfMeasurement,
  consumption,
  theYear = '2017',
  theMonth = '01'
}) {
  return axios.get('/uAuxiliaryMaterialsConsumptionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      theYear, //文档无
      theMonth, //文档无
      tableId,
      theName,
      unitOfMeasurement,
      consumption,
      customerMonthDclarationId
    }
  });
}

//编辑页---首页-原辅材料删除 (success)

export function getMaterialDynamicInfoDelete(id) {
  return axios.get('/uAuxiliaryMaterialsConsumptionDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

/*************************** 编辑页---首页-用水获取模块 ***********************/


// 编辑页---首页-用水获取

export function getWaterDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  theYear = '2017',
  theMonth = '01',
  customerMonthDclarationId = 1
}) {
  return axios.get('/uElectricityAndWaterConsumptionList.uhtm?InterfaceVersion=' + apiVer, {
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

//  编辑页---首页-用水新增 （success）

export function getWaterDynamicInfoAdd({
  customerMonthDclarationId = 1,
  useWaterType,
  repeatedWaterConsumption,
  totalWaterConsumption,
  waterSource,
  electricityConsumption,
}) {
  return axios.get('/uElectricityAndWaterConsumptionAdd.uhtm?InterfaceVersion=' + apiVer, {
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


// 编辑页---首页-用水编辑
export function getWaterDynamicInfoEdit({
  customerMonthDclarationId = '1',
  theYear = '2017',
  theMonth = '01',
  tableId,
  useWaterType,
  repeatedWaterConsumption,
  totalWaterConsumption,
  waterSource,
  electricityConsumption,
}) {
  return axios.get('/uElectricityAndWaterConsumptionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      customerMonthDclarationId,
      theYear, //文档无
      theMonth,
      tableId,
      theMonth,
      useWaterType,
      repeatedWaterConsumption,
      totalWaterConsumption,
      waterSource,
      electricityConsumption,
    }
  });
}

//编辑页---首页-用水删除 (success)

export function getWaterDynamicInfoDelete(id) {
  return axios.get('/uElectricityAndWaterConsumptionDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}

/*************************** 编辑页---首页-燃料获取模块 ***********************/

//编辑页---首页-燃料动态信息获取
export function getFuelDynamicInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  theYear = '2017',
  theMonth = '01',
  customerMonthDclarationId = 1,
}) {
  return axios.get('/uFuelConsumptionList.uhtm?InterfaceVersion=' + apiVer, {
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

// 编辑页---首页-燃料动态信息新增 (success)

export function getFuelDynamicInfoAdd({
  customerMonthDclarationId = 1,
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
  return axios.get('/uFuelConsumptionAdd.uhtm?InterfaceVersion=' + apiVer, {
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


// 编辑页---首页-燃料动态信息编辑

export function getFuelDynamicInfoEdit({
  customerMonthDclarationId = 1,
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
  return axios.get('/uFuelConsumptionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      // customerId: getCustomerId(),
      customerMonthDclarationId,
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


//编辑页---首页-燃料动态信息删除 (success)
export function getFuelDynamicInfoDelete(id) {
  return axios.get('/uFuelConsumptionDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  });
}