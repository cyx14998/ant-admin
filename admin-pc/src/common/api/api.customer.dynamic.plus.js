/*********************************
 * 企业管理 -- 动态信息辅助模块
 */

import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';

/********************** 编辑-首页-废水排放基本情况 **********************/
/**
 * OK
 */

/* 
* 获取废水排放基本信息列表
*/
export function getWastewaterDischargeRecordList({
  pageNumber=1, 
  countPerPage=1000,
  customerMonthDclarationId,
  theYear,
  theMonth,
}){
  return axios.get('/uWasteWaterDischargeRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      theYear,
      theMonth,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增废水基本情况
*/
export function getWastewaterDischargeRecordAdd({
  customerMonthDclarationId,
  wasteWaterDischargePortId,
  emissionAmount,
  emissionDestination,
}){
  return axios.get('/uWasteWaterDischargeRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      wasteWaterDischargePortId,
      emissionAmount,
      emissionDestination,
    }
  })
}

/* 
* 编辑废水排放口
*/
export function getWastewaterDischargeRecordUpdate({
  tableId,
  emissionAmount,
  emissionDestination,
}){
  return axios.get('/uWasteWaterDischargeRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      emissionAmount,
      emissionDestination,
    }
  })
}

/* 
* 删除废水排放口
*/
export function getWastewaterDischargeRecordDelete(id){
  return axios.get('/uWasteWaterDischargePortDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}

/********************** 编辑-首页-废水排放因子基本情况 **********************/
/**
 * @QA
 *  无法测试
 */

/* 
* 获取废水排放因子基本信息
* @QA
*   wasteWaterDischargeRecordId为排放口id，排放口信息不存在
*/
export function getWasteWaterDischargeFactorRecordList({
  pageNumber=1, 
  countPerPage=1000,
  wasteWaterDischargeRecordId,
}){
  return axios.get('/uWasteWaterDischargeFactorRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      wasteWaterDischargeRecordId,
    }
  })
}

/* 
* 新增废水排放因子
* @QA
*   (Bad Request)
*   wasteWaterDischargeRecordId不存在，无法测试
*/
export function getWasteWaterDischargeFactorRecordAdd({
  wasteWaterDischargeRecordId,
  pollutantName,
  standardValue,
  specialEmissionLimits,
  emissionConcentration,
  dataSources,
  emissionAmount,
  isOverproof,
}){
  return axios.get('/uWasteWaterDischargeFactorRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      wasteWaterDischargeRecordId,
      pollutantName,
      standardValue,
      specialEmissionLimits,
      emissionConcentration,
      dataSources,
      emissionAmount,
      isOverproof,
    }
  })
}

/* 
* 编辑废水排放因子
*/
export function getWasteWaterDischargeFactorRecordUpdate({
  tableId,
  pollutantName,
  standardValue,
  specialEmissionLimits,
  emissionConcentration,
  dataSources,
  emissionAmount,
  isOverproof,
}){
  return axios.get('/uWasteWaterDischargeFactorRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      pollutantName,
      standardValue,
      specialEmissionLimits,
      emissionConcentration,
      dataSources,
      emissionAmount,
      isOverproof,
    }
  })
}

/* 
* 删除废水排放因子
* @QA
*   无法测试
*/
export function getWasteWaterDischargeFactorRecordDelete(id){
  return axios.get('/uWasteWaterDischargeFactorRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}



/********************** 编辑-首页-废气排放基本情况 **********************/
/**
 * OK
 */

/* 
* 获取废气排放基本信息列表
*/
export function getWasteGasDischargeRecordList({
  pageNumber=1, 
  countPerPage=1000,
  customerMonthDclarationId,
  theYear,
  theMonth,
}){
  return axios.get('/uWasteGasDischargeRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      theYear,
      theMonth,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增废气基本情况
*/
export function getWasteGasDischargeRecordAdd({
  customerMonthDclarationId,
  wasteGasDischargePortId,
  measuredExhaustVolume,
  emissionTime,
  exhaustEmission,
  dataSources,
  fuel,
  ringermanBlackness,
  exhaustGasType,
}){
  return axios.get('/uWasteGasDischargeRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      wasteGasDischargePortId,
      measuredExhaustVolume,
      emissionTime,
      exhaustEmission,
      dataSources,
      fuel,
      ringermanBlackness,
      exhaustGasType,
    }
  })
}

/* 
* 编辑废气排放口
*/
export function getWasteGasDischargeRecordUpdate({
  tableId,
  measuredExhaustVolume,
  emissionTime,
  exhaustEmission,
  dataSources,
  fuel,
  ringermanBlackness,
  exhaustGasType,
}){
  return axios.get('/uWasteGasDischargeRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      measuredExhaustVolume,
      emissionTime,
      exhaustEmission,
      dataSources,
      fuel,
      ringermanBlackness,
      exhaustGasType,
    }
  })
}

/* 
* 删除废气排放口
*/
export function getWasteGasDischargeRecordDelete(id){
  return axios.get('/uWasteGasDischargeRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}

/********************** 编辑-首页-废气排放因子基本情况 **********************/
/**
 * @QA
 *  无法测试
 */

/* 
* 获取废气排放因子基本信息
*/
export function getWasteGasDischargeFactorRecordList({
  pageNumber=1, 
  countPerPage=1000,
  wasteGasDischargeRecordId,
}){
  return axios.get('/uWasteGasDischargeFactorRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      wasteGasDischargeRecordId,
    }
  })
}

/* 
* 新增废气排放因子
*/
export function getWasteGasDischargeFactorRecordAdd({
  wasteGasDischargeRecordId,
  pollutantName,
  standardValue,
  specialEmissionLimits,
  measuredConcentration,
  conversionConcentration,
  emissionRateStandardValue,
  emissionRateActual,
  dataSources,
  emissionAmount,
  isOverproof,
}){
  return axios.get('/uWasteGasDischargeFactorRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      wasteGasDischargeRecordId,
      pollutantName,
      standardValue,
      specialEmissionLimits,
      measuredConcentration,
      conversionConcentration,
      emissionRateStandardValue,
      emissionRateActual,
      dataSources,
      emissionAmount,
      isOverproof,
    }
  })
}

/* 
* 编辑废气排放因子
*/
export function getWasteGasDischargeFactorRecordUpdate({
  tableId,
  pollutantName,
  standardValue,
  specialEmissionLimits,
  measuredConcentration,
  conversionConcentration,
  emissionRateStandardValue,
  emissionRateActual,
  dataSources,
  emissionAmount,
  isOverproof,
}){
  return axios.get('/uWasteGasDischargeFactorRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      pollutantName,
      standardValue,
      specialEmissionLimits,
      measuredConcentration,
      conversionConcentration,
      emissionRateStandardValue,
      emissionRateActual,
      dataSources,
      emissionAmount,
      isOverproof,
    }
  })
}

/* 
* 删除废气排放因子
*/
export function getWasteGasDischargeFactorRecordDelete(id){
  return axios.get('/uWasteGasDischargeFactorRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}

























/********************** 编辑-首页-固体废物产生及处置基本情况 **********************/
/**
 * OK
 */


/* 
* 获取固体废物产生及处置基本情况列表
*/
export function getWasteSolidRecordList({
  pageNumber=1, 
  countPerPage=1000,
  customerMonthDclarationId,
}){
  return axios.get('/uWasteSolidRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增固体废物产生及处置基本情况
*/
export function getWasteSolidRecordAdd({
  customerMonthDclarationId,
  theName,
  wasteSolidId,
  mainPollutants,
  productionQuantity,
  comprehensiveUtilization,
  disposeWhereabouts,
  disposalCapacityLawful,
  StorageCapacityLawful,
  disposalCapacityUnLawful,
  storageCapacityUnLawful,
  emissionAmount,
}){
  return axios.get('/uWasteSolidRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      theName,
      wasteSolidId,
      mainPollutants,
      productionQuantity,
      comprehensiveUtilization,
      disposeWhereabouts,
      disposalCapacityLawful,
      StorageCapacityLawful,
      disposalCapacityUnLawful,
      storageCapacityUnLawful,
      emissionAmount,
    }
  })
}

/* 
* 编辑固体废物产生及处置基本情况
*/
export function getWasteSolidRecordUpdate({
  tableId,
  theName,
  wasteSolidId,
  mainPollutants,
  productionQuantity,
  comprehensiveUtilization,
  disposeWhereabouts,
  disposalCapacityLawful,
  StorageCapacityLawful,
  disposalCapacityUnLawful,
  storageCapacityUnLawful,
  emissionAmount,
}){
  return axios.get('/uWasteSolidRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      wasteSolidId,
      mainPollutants,
      productionQuantity,
      comprehensiveUtilization,
      disposeWhereabouts,
      disposalCapacityLawful,
      StorageCapacityLawful,
      disposalCapacityUnLawful,
      storageCapacityUnLawful,
      emissionAmount,
    }
  })
}

/* 
* 删除固体废物产生及处置基本情况
*/
export function getWasteSolidRecordDelete(id){
  return axios.get('/uWasteSolidRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}

/********************** 编辑-首页-边界噪声基本情况 **********************/
/*
 *Ok
 */

/* 
* 获取边界噪声基本信息列表
*/
export function getBoundaryNoiseRecordList({
  customerMonthDclarationId,
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uBoundaryNoiseRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增边界噪声
*/
export function getBoundaryNoiseRecordAdd({
  customerMonthDclarationId,
  boundaryNoiseId,
  implementationStandards,
  equivalentSoundLevel,
  peakSoundLevel,
  exceedingDecibels,
  exceedingStandardDays,
  noisePeriodStart,
  noisePeriodEnd,
  IsBoundaryExceeding100,
}){
  return axios.get('/uBoundaryNoiseRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      boundaryNoiseId,
      implementationStandards,
      equivalentSoundLevel,
      peakSoundLevel,
      exceedingDecibels,
      exceedingStandardDays,
      noisePeriodStart,
      noisePeriodEnd,
      IsBoundaryExceeding100,
    }
  })
}

/* 
* 编辑边界噪声
*/
export function getBoundaryNoiseRecordUpdate({
  tableId,
  boundaryNoiseId,
  implementationStandards,
  equivalentSoundLevel,
  peakSoundLevel,
  exceedingDecibels,
  exceedingStandardDays,
  noisePeriodStart,
  noisePeriodEnd,
  IsBoundaryExceeding100,
}){
  return axios.get('/uBoundaryNoiseRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      boundaryNoiseId,
      implementationStandards,
      equivalentSoundLevel,
      peakSoundLevel,
      exceedingDecibels,
      exceedingStandardDays,
      noisePeriodStart,
      noisePeriodEnd,
      IsBoundaryExceeding100,
    }
  })
}

/* 
* 删除边界噪声
*/
export function getBoundaryNoiseRecordDelete(id){
  return axios.get('/uBoundaryNoiseRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}