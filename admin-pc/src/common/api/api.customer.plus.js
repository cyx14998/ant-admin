/**
 * 企业管理辅助模块
 */
import axios, { getToken, apiVer, getCustomerId } from './index';

/********************** 编辑-首页-废水排放基本情况 **********************/

/* 
* 获取废水排放基本信息列表
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
* 获取废水排放基本信息详情
* @QA
*   后端未返回经度纬度字段
*/
export function getWastewaterDischargeDetail({
  tableId=1,
}){
  console.log(tableId);
  return axios.get('/uWasteWaterDischargePortDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/* 
* 新增废水排放口
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
* 编辑废水排放口
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
* 删除废水排放口
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
/**
 * @QA
 *  所有接口都为对接
 */

/* 
* 获取废水治理基本信息
*/
export function getWastewaterTreatmentList({
  pageNumber=1, 
  countPerPage=1000,
  sourceId=1,
  sourceType=0
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
* @QA
*   400(Bad Request)
*   approachId字段有问题，获取时字段是approach,新增变成了approachID 
*/
export function getWastewaterTreatmentAdd({
  sourceId=1,
  sourceType=0,
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
* @QA
*   由于获取时没有数据，新增数据400错误，所以不能测试删除接口是否正确
*   approachId字段有问题，获取时字段是approach,新增变成了approachID 
*/
export function getWastewaterTreatmentUpdate({
  tableId,
  sourceId=1,
  sourceType=0,
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
* @QA
*   由于获取时没有数据，新增数据400错误，所以不能测试删除接口是否正确
*/
export function getWastewaterTreatmentDelete(id){
  return axios.get('/uControlFacilitiesDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId:id,
    }
  })
}

/********************** 编辑-首页-废气基本情况 **********************/

/* 
* 获取废气排放基本信息
*@QA
*   获取数据时，后端未返回全部字段
*   废水治理基本情况应该是基于废水排放口id获得的，所以操作界面是否应该是删除，保存，查看
*/
export function getWastegasDischargeList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uWasteGasDischargePortDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

/********************** 编辑-首页-固体废物基本情况 **********************/

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
* @QA
*   只返回tableID
*/
export function getWasteSolidDetail({
  tableId=1,
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
* @QA
*   是否true/false无法解析
*   hazardousWasteName处置方式字段未返回
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
* @QA
*   返回请选择企业，接口文档写不需要传customerId
*/
export function getWastesolidUpdate({
  tableId=1,
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
* 删除废水排放口
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
* 获取边界噪声基本信息列表
* @QA
* 噪声源性质与功能区类型数据要从接口获取，以下拉框的形式展示
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
* @QA
*   噪声源性质与功能区类型数据要从接口获取，这俩个数据暂时写死。
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

/* 
* 获取环评基本信息列表
*/
export function getEIAList({
  pageNumber=1, 
  countPerPage=1000,
}){
  return axios.get('/uCustomerEIADetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      customerId: getCustomerId(),
      pageNumber,
      countPerPage,
    }
  })
}

// /* 
// * 新增边界噪声
// */
// export function getBoundaryNoiseAdd({
//   serialNumber,
//   measuringPointName,
//   measuringPointPosition,
//   noiseSourceName,
//   noiseSourcePropertyId,
//   functionalAreaTypeId,
// }){
//   return axios.get('/uBoundaryNoiseAdd.uhtm?InterfaceVersion=' + apiVer, {
//     params: {
//       token: getToken(),
//       customerId: getCustomerId(),
//       serialNumber,
//       measuringPointName,
//       measuringPointPosition,
//       noiseSourceName,
//       noiseSourcePropertyId,
//       functionalAreaTypeId,
//     }
//   })
// }

// /* 
// * 编辑边界噪声
// * @QA
// *   噪声源性质与功能区类型数据要从接口获取，这俩个数据暂时写死。
// */
// export function getBoundaryNoiseUpdate({
//   tableId,
//   serialNumber,
//   measuringPointName,
//   measuringPointPosition,
//   noiseSourceName,
//   noiseSourcePropertyId=2,
//   functionalAreaTypeId=2,
// }){
//   return axios.get('/uBoundaryNoiseUpdate.uhtm?InterfaceVersion=' + apiVer, {
//     params: {
//       token: getToken(),
//       tableId,
//       serialNumber,
//       measuringPointName,
//       measuringPointPosition,
//       noiseSourceName,
//       noiseSourcePropertyId,
//       functionalAreaTypeId,
//     }
//   })
// }

// /* 
// * 删除边界噪声
// */
// export function getBoundaryNoiseDelete(id){
//   return axios.get('/uBoundaryNoiseDelete.uhtm?InterfaceVersion=' + apiVer, {
//     params: {
//       token: getToken(),
//       tableId:id,
//     }
//   })
// }