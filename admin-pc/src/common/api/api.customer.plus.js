/**
 * 企业管理辅助模块
 */
import axios, { getToken, apiVer, getCustomerId } from './index';

/********************** 编辑-首页-废水排放口基本情况 **********************/

/* 
* 获取废水排放口基本信息列表    OK
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
* 获取废水排放口基本信息详情    OK
*/
export function getWastewaterDischargeDetail({
  tableId,
}){
  return axios.get('/uWasteWaterDischargePortDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/* 
* 新增废水排放口   OK
*/
export function getWastewaterDischargeAdd({
  nameOfWaterBody,
  dischargeLaw,
  emissionDestination,
  functionalAreaCategory,
  latitude,
  longitude,
  outletLocation,
  serialNumber,
  theName
}){
  return axios.get('/uWasteWaterDischargePortAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      nameOfWaterBody,
      dischargeLaw,
      emissionDestination,
      functionalAreaCategory,
      latitude,
      longitude,
      outletLocation,
      serialNumber,
      theName
    }
  })
}

/* 
* 编辑废水排放口   OK
*/
export function getWastewaterDischargeUpdate({
  tableId,
  serialNumber,
  theName,
  outletLocation,
  longitude,
  latitude,
  functionalAreaCategory,
  emissionDestination,
  dischargeLaw,
  nameOfWaterBody
}){
  return axios.get('/uWasteWaterDischargePortUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      theName,
      outletLocation,
      longitude,
      latitude,
      functionalAreaCategory,
      emissionDestination,
      dischargeLaw,
      nameOfWaterBody
    }
  })
}

/* 
* 删除废水排放口     OK
*/
export function getWastewaterDischargeDelete(id){
  return axios.get('/uWasteWaterDischargePortDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}



/********************** 编辑-首页-废水治理基本情况 **********************/

/* 
* 获取废水治理基本信息
*/
export function getWastewaterTreatmentList({
  pageNumber=1, 
  countPerPage=1000,
  sourceId,
  sourceType
}){
  return axios.get('/uControlFacilitiesList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      sourceId,
      sourceType
    }
  })
}

/* 
* 新增治理设施
*/
export function getWastewaterTreatmentAdd({
  sourceId,
  sourceType,
  theName,
  governanceType,
  approach,
  designProcessingPower,
  putInUseDate,
  standingBookURL,
}){
  return axios.get('/uControlFacilitiesAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      theName,
      governanceType,
      approachId: approach,
      designProcessingPower,
      putInUseDate,
      standingBookURL,
      sourceId,
      sourceType
    }
  })
}

/* 
* 编辑治理设施
*/
export function getWastewaterTreatmentUpdate({
  tableId,
  sourceId,
  sourceType,
  theName,
  governanceType,
  approach,
  designProcessingPower,
  putInUseDate,
  standingBookURL,
}){
  return axios.get('/uControlFacilitiesUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      sourceId,
      sourceType,
      theName,
      governanceType,
      approachId: approach,
      designProcessingPower,
      putInUseDate,
      standingBookURL,
    }
  })
}

/* 
* 删除治理设施
*/
export function getWastewaterTreatmentDelete(id){
  return axios.get('/uControlFacilitiesDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}



/********************** 编辑-首页-废水排放因子基本情况 **********************/

/* 
* 获取废水排放因子基本信息    OK
*/
export function getWastewaterDischargeFactorList({
  pageNumber=1, 
  countPerPage=1000,
  wasteWaterDischargePortId,
}){
  return axios.get('/uWasteWaterDischargeFactorList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      wasteWaterDischargePortId,
    }
  })
}

/* 
* 新增废水排放因子    OK
*/
export function getWastewaterDischargeFactorAdd({
  wasteWaterDischargePortId,
  pollutantName,
  executeStandardNumber,
  standardValue,
  isAutoMOPS,
}){
  return axios.get('/uWasteWaterDischargeFactorAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      wasteWaterDischargePortId,
      pollutantName,
      executeStandardNumber,
      standardValue,
      isAutoMOPS,
    }
  })
}

/* 
* 编辑废水排放因子    OK
*/
export function getWastewaterDischargeFactorUpdate({
  tableId,
  pollutantName,
  executeStandardNumber,
  standardValue,
  isAutoMOPS,
}){
  return axios.get('/uWasteWaterDischargeFactorUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      pollutantName,
      executeStandardNumber,
      standardValue,
      isAutoMOPS,
    }
  })
}

/* 
* 删除废水排放因子    OK
*/
export function getWastewaterDischargeFactorDelete(id){
  return axios.get('/uWasteWaterDischargeFactorDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}




/********************** 编辑-首页-废水排放检测记录 **********************/

/* 
* 获取废水排放检测记录    OK
*/
export function getWastewaterMonitoringRecordList({
  pageNumber=1, 
  countPerPage=1000,
  wasteWaterDischargePortId,
}){
  return axios.get('/uWasteWaterMonitoringRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      wasteWaterDischargePortId,
    }
  })
}

/* 
* 新增废水排放检测记录    OK
*/
export function getWastewaterMonitoringRecordAdd({
  wasteWaterDischargePortId,
  serialNumber,
  monitoringDatetime,
  monitoringDepart,
  monitoringResult,
  monitoringReportURL,
}){
  return axios.get('/uWasteWaterMonitoringRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      wasteWaterDischargePortId,
      serialNumber,
      monitoringDatetime,
      monitoringDepart,
      monitoringResult,
      monitoringReportURL,
    }
  })
}

/* 
* 编辑废水排放检测记录    OK
*/
export function getWastewaterMonitoringRecordUpdate({
  tableId,
  serialNumber,
  monitoringDatetime,
  monitoringDepart,
  monitoringResult,
  monitoringReportURL,
}){
  return axios.get('/uWasteWaterMonitoringRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      monitoringDatetime,
      monitoringDepart,
      monitoringResult,
      monitoringReportURL,
    }
  })
}

/* 
* 删除废水排放检测记录    OK
*/
export function getWastewaterMonitoringRecordDelete(id){
  return axios.get('/uWasteWaterMonitoringRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}









/********************** 编辑-首页-废气基本情况 **********************/

/* 
* 获取废气排放基本信息列表
*/
export function getWasteGasDischargeList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uWasteGasDischargePortList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 获取废气排放基本信息详情
*/
export function getWasteGasDischargeDetail({
  tableId,
}){
  return axios.get('/uWasteGasDischargePortDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/* 
* 新增废气排放口
*/
export function getWasteGasDischargeAdd({
  serialNumber,
  theName,
  outletLocation,
  longitude,
  latitude,
  dischargeMode,
  dischargePortType,
  dischargeLaw,
  functionalAreaCategory,
}){
  return axios.get('/uWasteGasDischargePortAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      serialNumber,
      theName,
      outletLocation,
      longitude,
      latitude,
      dischargeMode,
      dischargePortType,
      dischargeLaw,
      functionalAreaCategory,
    }
  })
}

/* 
* 编辑废气排放口
*/
export function getWasteGasDischargeUpdate({
  tableId,
  serialNumber,
  theName,
  outletLocation,
  longitude,
  latitude,
  dischargeMode,
  dischargePortType,
  dischargeLaw,
  functionalAreaCategory,
}){
  return axios.get('/uWasteGasDischargePortUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      theName,
      outletLocation,
      longitude,
      latitude,
      dischargeMode,
      dischargePortType,
      dischargeLaw,
      functionalAreaCategory,
    }
  })
}

/* 
* 删除废气排放口
*/
export function getWasteGasDischargeDelete(id){
  return axios.get('/uWasteGasDischargePortDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}

/********************** 编辑-首页-废气排放因子基本情况 **********************/

/* 
* 获取废气排放因子基本信息
*/
export function getWasteGasDischargeFactorList({
  pageNumber=1, 
  countPerPage=1000,
  WasteGasDischargePortId,
}){
  return axios.get('/uWasteGasDischargeFactorList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      WasteGasDischargePortId,
    }
  })
}

/* 
* 新增废气排放因子
*/
export function getWasteGasDischargeFactorAdd({
  DischargePortId,
  pollutantName,
  executeStandardNumber,
  standardValue,
  isAutoMOPS,
}){
  return axios.get('/uWasteGasDischargeFactorAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      wasteGasDischargePortId: DischargePortId,
      pollutantName,
      executeStandardNumber,
      standardValue,
      isAutoMOPS,
    }
  })
}

/* 
* 编辑废气排放因子
*/
export function getWasteGasDischargeFactorUpdate({
  tableId,
  pollutantName,
  executeStandardNumber,
  standardValue,
  isAutoMOPS,
}){
  return axios.get('/uWasteGasDischargeFactorUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      pollutantName,
      executeStandardNumber,
      standardValue,
      isAutoMOPS,
    }
  })
}

/* 
* 删除废气排放因子
*/
export function getWasteGasDischargeFactorDelete(id){
  return axios.get('/uWasteGasDischargeFactorDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}




/********************** 编辑-首页-废气排放检测记录 **********************/

/* 
* 获取废气排放检测记录
*/
export function getWasteGasMonitoringRecordList({
  pageNumber=1, 
  countPerPage=1000,
  id,
}){
  return axios.get('/uWasteGasMonitoringRecordList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      WasteGasDischargePortId: id,
    }
  })
}

/* 
* 新增废气排放检测记录
*/
export function getWasteGasMonitoringRecordAdd({
  DischargePortId,
  serialNumber,
  monitoringDatetime,
  monitoringDepart,
  monitoringResult,
  monitoringReportURL,
}){
  return axios.get('/uWasteGasMonitoringRecordAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      wasteGasDischargePortId:DischargePortId,
      serialNumber,
      monitoringDatetime,
      monitoringDepart,
      monitoringResult,
      monitoringReportURL,
    }
  })
}

/* 
* 编辑废气排放检测记录
*/
export function getWasteGasMonitoringRecordUpdate({
  tableId,
  pollutantName,
  executeStandardNumber,
  standardValue,
  isAutoMOPS,
}){
  return axios.get('/uWasteGasMonitoringRecordUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      pollutantName,
      executeStandardNumber,
      standardValue,
      isAutoMOPS,
    }
  })
}

/* 
* 删除废气排放检测记录
*/
export function getWasteGasMonitoringRecordDelete(id){
  return axios.get('/uWasteGasMonitoringRecordDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}




/********************** 编辑-首页-固体废物基本情况 **********************/
/**
 * OK
 */

/* 
* 获取固体废物基本信息列表
*/
export function getWasteSolidList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uWasteSolidList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 获取固体废物基本信息详情
*/
export function getWasteSolidDetail({
  tableId,
}){
  return axios.get('/uWasteSolidDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/* 
* 新增固体废物
*/
export function getWastesolidAdd({
  serialNumber,
  isHazardousWaste,
  hazardousWasteName,
  disposalMethod,
  theName,
  processing,
  dangerCode,
  generatingLinks,
  annualProduction,
  storagePlaceAddress,
  storagePlaceImageURL,
  standingBookURL,
  disposeUnitName,
  filingInfoURL,
  transferManifestURL,
}){
  return axios.get('/uWasteSolidAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      serialNumber,
      isHazardousWaste,
      hazardousWasteName,
      disposalMethod,
      theName,
      processing,
      dangerCode,
      generatingLinks,
      annualProduction,
      storagePlaceAddress,
      storagePlaceImageURL,
      standingBookURL,
      disposeUnitName,
      filingInfoURL,
      transferManifestURL,
    }
  })
}

/* 
* 编辑固体废物
*/
export function getWastesolidUpdate({
  tableId,
  serialNumber,
  isHazardousWaste,
  hazardousWasteName,
  disposalMethod,
  theName,
  processing,
  dangerCode,
  generatingLinks,
  annualProduction,
  storagePlaceAddress,
  storagePlaceImageURL,
  standingBookURL,
  disposeUnitName,
  filingInfoURL,
  transferManifestURL,
}){
  return axios.get('/uWasteSolidUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      isHazardousWaste,
      hazardousWasteName,
      disposalMethod,
      theName,
      processing,
      dangerCode,
      generatingLinks,
      annualProduction,
      storagePlaceAddress,
      storagePlaceImageURL,
      standingBookURL,
      disposeUnitName,
      filingInfoURL,
      transferManifestURL,
    }
  })
}

/* 
* 删除固体废物基本信息
*/
export function getWastesolidDelete(id){
  return axios.get('/uWasteSolidDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}





/********************** 编辑-首页-边界噪声基本情况 **********************/
/*
 * OK
 */


/* 
* 获取边界噪声基本信息列表
*/
export function getBoundaryNoiseList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uBoundaryNoiseList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 获取边界噪声功能区类型列表
*/
export function getFunctionalAreaTypeList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uFunctionalAreaTypeList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 获取噪声源性质列表
*/
export function getNoiseSourcePropertyList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uNoiseSourcePropertyList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增边界噪声
*/
export function getBoundaryNoiseAdd({
  serialNumber,
  measuringPointName,
  measuringPointPosition,
  noiseSourceName,
  noiseSourcePropertyId,
  functionalAreaTypeId,
}){
  return axios.get('/uBoundaryNoiseAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      serialNumber,
      measuringPointName,
      measuringPointPosition,
      noiseSourceName,
      noiseSourcePropertyId,
      functionalAreaTypeId,
    }
  })
}

/* 
* 编辑边界噪声
*/
export function getBoundaryNoiseUpdate({
  tableId,
  serialNumber,
  measuringPointName,
  measuringPointPosition,
  noiseSourceName,
  noiseSourcePropertyId=2,
  functionalAreaTypeId=2,
}){
  return axios.get('/uBoundaryNoiseUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      measuringPointName,
      measuringPointPosition,
      noiseSourceName,
      noiseSourcePropertyId,
      functionalAreaTypeId,
    }
  })
}

/* 
* 删除边界噪声
*/
export function getBoundaryNoiseDelete(id){
  return axios.get('/uBoundaryNoiseDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}





/********************** 编辑-首页-企业遵守法律法规情况 **********************/
/**
 * OK
 */

/* 
* 获取环评基本信息列表
*/
export function getEIAList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uCustomerEIAList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 获取环评基本信息详情
*/
export function getEIADetail({
  tableId, 
}){
  return axios.get('/uCustomerEIADetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/* 
* 新增环评基本信息
* @QA
*   400(Bad Request)
*/
export function getEIAAdd({
  theName,
  theLevel,
  editDatetime,
  DocumentNumberTPA,
  approvalTimeTPA,
  DocumentNumberEIA,
  approvalTimeEIA,
  DocumentNumberFAA,
  approvalTimeFAA,
  SelfAcceptanceURL,
}){
  return axios.get('/uCustomerEIAAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      theName,
      theLevel,
      editDatetime,
      DocumentNumberTPA,
      approvalTimeTPA,
      DocumentNumberEIA,
      approvalTimeEIA,
      DocumentNumberFAA,
      approvalTimeFAA,
      SelfAcceptanceURL,
    }
  })
}

/* 
* 编辑环评基本信息
*/
export function getEIAUpdate({
  tableId,
  theName,
  theLevel,
  editDatetime,
  DocumentNumberTPA,
  approvalTimeTPA,
  DocumentNumberEIA,
  approvalTimeEIA,
  DocumentNumberFAA,
  approvalTimeFAA,
  SelfAcceptanceURL,
}){
  return axios.get('/uCustomerEIAUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      theLevel,
      editDatetime,
      DocumentNumberTPA,
      approvalTimeTPA,
      DocumentNumberEIA,
      approvalTimeEIA,
      DocumentNumberFAA,
      approvalTimeFAA,
      SelfAcceptanceURL,
    }
  })
}

/* 
* 删除环评基本信息
*/
export function getEIADelete(id){
  return axios.get('/uCustomerEIADelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}




/********************** 编辑-首页-企业证件照基本情况 **********************/
/**
 * OK
 */


/* 
* 获取企业证照材料
*/
export function getCertificationList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uCustomerCertificationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增企业证照材料
*/
export function getCertificationAdd({
  theName,
  releaseDatetime,
  expiryDatetime,
  filePath,
  approvalUnit,
  theRemarks,
}){
  return axios.get('/uCustomerCertificationAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      theName,
      releaseDatetime,
      expiryDatetime,
      filePath,
      approvalUnit,
      theRemarks,
    }
  })
}

/* 
* 编辑企业证照材料
*/
export function getCertificationUpdate({
  tableId,
  theName,
  releaseDatetime,
  expiryDatetime,
  filePath,
  approvalUnit,
  theRemarks,
}){
  return axios.get('/uCustomerCertificationUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      releaseDatetime,
      expiryDatetime,
      filePath,
      approvalUnit,
      theRemarks,
    }
  })
}

/* 
* 删除企业证照材料
*/
export function getCertificationDelete(id){
  return axios.get('/uCustomerCertificationDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}









/********************** 编辑-首页-企业内部环保管理制度 **********************/

/* 
* 获取企业内部环保管理制度
*/
export function getIEPSList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uCustomerIEPSList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增企业内部环保管理制度
*/
export function getIEPSAdd({
  theName,
  implementation,
  filePath,
}){
  return axios.get('/uCustomerIEPSAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      theName,
      implementation,
      filePath,
    }
  })
}

/* 
* 编辑企业内部环保管理制度
*/
export function getIEPSUpdate({
  tableId,
  theName,
  implementation,
  filePath,
}){
  return axios.get('/uCustomerIEPSUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      implementation,
      filePath,
    }
  })
}

/* 
* 删除企业内部环保管理制度
*/
export function getIEPSDelete(id){
  return axios.get('/uCustomerIEPSDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}






/********************** 编辑-首页-现场检查、监管信息 **********************/
/**
 * OK
 */


/* 
* 获取现场检查、监管信息
*/
export function getSiteInspectionList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uInspectionPlanDtlForCustomerList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/* 
* 新增现场检查、监管信息
*/
export function getSiteInspectionAdd({
  serialNumber,
  InspectionDate,
  recordURL,
  feedBackRecordURL,
  correctionReportURL,
  interviewRecordURL,
  supervisionProcessing,
  administrativePenaltiesURL,
  petitionRecordURL,
}){
  return axios.get('/uCustomerSiteInspectionAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      serialNumber,
      InspectionDate,
      recordURL,
      feedBackRecordURL,
      correctionReportURL,
      interviewRecordURL,
      supervisionProcessing,
      administrativePenaltiesURL,
      petitionRecordURL,
    }
  })
}

/* 
* 编辑现场检查、监管信息
*/
export function getSiteInspectionUpdate({
  tableId,
  serialNumber,
  InspectionDate,
  recordURL,
  feedBackRecordURL,
  correctionReportURL,
  interviewRecordURL,
  supervisionProcessing,
  administrativePenaltiesURL,
  petitionRecordURL,
}){
  return axios.get('/uCustomerSiteInspectionUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      InspectionDate,
      recordURL,
      feedBackRecordURL,
      correctionReportURL,
      interviewRecordURL,
      supervisionProcessing,
      administrativePenaltiesURL,
      petitionRecordURL,
    }
  })
}

/* 
* 删除现场检查、监管信息
*/
export function getSiteInspectionDelete(id){
  return axios.get('/uCustomerSiteInspectionDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}