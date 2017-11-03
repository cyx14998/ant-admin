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
  pageNumber = 1,
  countPerPage = 1000,
  customerMonthDclarationId,
}) {
  return axios.get('/uWasteWaterDischargeRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
 * 获取废水排放基本信息详情
 */
export function getWastewaterDischargeRecordDetail({
  pageNumber = 1,
  countPerPage = 1000,
  tableId,
}) {
  return axios.get('/uWasteWaterDischargeRecordDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
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
}) {
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
  wasteWaterDischargePortId,
  emissionAmount,
  emissionDestination,
}) {
  return axios.get('/uWasteWaterDischargeRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      wasteWaterDischargePortId,
      emissionAmount,
      emissionDestination,
    }
  })
}

/* 
 * 删除废水排放口
 */
export function getWastewaterDischargeRecordDelete(id) {
  return axios.get('/uWasteWaterDischargeRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  })
}

/********************** 编辑-首页-废水排放因子基本情况 **********************/
/**
 */

/* 
 * 获取废水排放因子基本信息
 */
export function getWasteWaterDischargeFactorRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  wasteWaterDischargeRecordId,
}) {
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
}) {
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
 *
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
}) {
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
export function getWasteWaterDischargeFactorRecordDelete(id) {
  return axios.get('/uWasteWaterDischargeFactorRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
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
  pageNumber = 1,
  countPerPage = 1000,
  customerMonthDclarationId,
}) {
  return axios.get('/uWasteGasDischargeRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
 * 获取废气排放基本信息详情
 */
export function getWasteGasDischargeRecordDetail({
  pageNumber = 1,
  countPerPage = 1000,
  tableId,
}) {
  return axios.get('/uWasteGasDischargeRecordDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
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
}) {
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
}) {
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
export function getWasteGasDischargeRecordDelete(id) {
  console.log("ssssssssssssssssssssssssssssssssssssss", id);
  return axios.get('/uWasteGasDischargeRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
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
  pageNumber = 1,
  countPerPage = 1000,
  wasteGasDischargeRecordId,
}) {
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
}) {
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
}) {
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
export function getWasteGasDischargeFactorRecordDelete(id) {
  return axios.get('/uWasteGasDischargeFactorRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
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
  pageNumber = 1,
  countPerPage = 1000,
  customerMonthDclarationId,
}) {
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
}) {
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
}) {
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
export function getWasteSolidRecordDelete(id) {
  return axios.get('/uWasteSolidRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
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
  pageNumber = 1,
  countPerPage = 1000,
}) {
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
  boundaryNoiseId,
  customerMonthDclarationId,
  implementationStandards,
  equivalentSoundLevel,
  peakSoundLevel,
  exceedingDecibels,
  exceedingStandardDays,
  noisePeriodStart,
  noisePeriodEnd,
  IsBoundaryExceeding100,
}) {
  return axios.get('/uBoundaryNoiseRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      boundaryNoiseId,
      customerMonthDclarationId,
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
}) {
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
export function getBoundaryNoiseRecordDelete(id) {
  return axios.get('/uBoundaryNoiseRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  })
}


/********************** 编辑-首页-企业附件基本情况 **********************/
/*
 *Ok
 */

/* 
 * 获取边界噪声基本信息列表
 */
export function getAttachmentRecordList({
  customerMonthDclarationId,
  pageNumber = 1,
  countPerPage = 1000,
}) {
  return axios.get('/uAttachmentDynamicList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      pageNumber,
      countPerPage,
    }
  })
}

/* 
 * 获取企业附件基本信息详情
 */
export function getAttachmentRecordDetail({
  customerMonthDclarationId,
  pageNumber = 1,
  countPerPage = 1000,
  tableId,
}) {
  return axios.get('/uAttachmentDynamicDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      pageNumber,
      countPerPage,
      tableId,
    }
  })
}

/* 
 * 获取附件类型列表
 */
export function getAttachmentTypeList({
  pageNumber = 1,
  countPerPage = 1000,
}) {
  return axios.get('/uAttachmentTypeList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
 * 新增企业附件
 */
export function getAttachmentRecordAdd({
  customerMonthDclarationId,
  theName,
  attachmentTypeId,
  theSize,
  filePath,
}) {
  return axios.get('/uAttachmentDynamicAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerMonthDclarationId,
      theName,
      attachmentTypeId,
      theSize,
      filePath,
    }
  })
}

// /* 
// * 编辑边界噪声
// */
// export function getBoundaryNoiseRecordUpdate({
//   tableId,
//   boundaryNoiseId,
//   implementationStandards,
//   equivalentSoundLevel,
//   peakSoundLevel,
//   exceedingDecibels,
//   exceedingStandardDays,
//   noisePeriodStart,
//   noisePeriodEnd,
//   IsBoundaryExceeding100,
// }){
//   return axios.get('/uBoundaryNoiseRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
//     params: {
//       token: getToken(),
//       tableId,
//       boundaryNoiseId,
//       implementationStandards,
//       equivalentSoundLevel,
//       peakSoundLevel,
//       exceedingDecibels,
//       exceedingStandardDays,
//       noisePeriodStart,
//       noisePeriodEnd,
//       IsBoundaryExceeding100,
//     }
//   })
// }

/* 
 * 删除边界噪声
 */
export function getAttachmentRecordDelete(id) {
  return axios.get('/uAttachmentDynamicDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id,
    }
  })
}

/**
 * 边界噪声id列表 select.option 选项使用
 * uBoundaryNoiseList.uhtm
 */
export function getBoundaryNoiseList({
  pageNumber = 1,
  countPerPage = 100
}) {
  return axios.get('/uBoundaryNoiseList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage
    }
  })
}

/**
 * 固体废物列表  select.option 选项使用
 */
export function getWasteSolidList({
  pageNumber = 1,
  countPerPage = 100
}) {
  return axios.get('/uWasteSolidList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage
    }
  })
}