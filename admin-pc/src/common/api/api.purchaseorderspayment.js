// 付款单
import axios, {
  getToken,
  apiVer
} from './index';


//付款单主表列表
export function getWarehousingList({
  countPerPage = 1000,
  keyword,
  isPass,
  theState,
  storageInMemberId,
}) {
  var params = {};
  // 审核情况        
  if (isPass === '1') {
    params.isPass = true;
  } else if (isPass === '2') {
    params.isPass = false;
  }
  //付款单状态
  if (theState && theState !== '0') {
    params.theState = theState - 1;
  }
  //入库人选择
  if (storageInMemberId && storageInMemberId !== '全部') {
    params.storageInMemberId = storageInMemberId;
  }

  return axios.get('/uStorageInRecordMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
      ...params,
    }
  })
}
// 付款单主表详情
export function getWarehousingDetail({
  tableId,
}) {
  return axios.get('/uStorageInRecordMstDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 付款单主表新增
export function getWarehousingAdd({
  warehouseId,
  storageInMemberId,
  storageInDatetime,
  theRemarks,
  menuId,
}) {
  return axios.get('/uStorageInRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      warehouseId,
      storageInMemberId,
      storageInDatetime,
      theRemarks,
      menuId,
    }
  })
}

// 付款单主表编辑
export function getWarehousingEdit({
  tableId,
  warehouseId,
  storageInMemberId,
  storageInDatetime,
  theRemarks,
}) {
  return axios.get('/uStorageInRecordMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      warehouseId,
      storageInMemberId,
      storageInDatetime,
      theRemarks,
    }
  })
}

// 付款单主表删除
export function getWarehousingDelete({
  tableId,
}) {
  return axios.get('/uStorageInRecordMstDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**-----------------------付款单明细---------------------------- */
//付款单明细列表
export function getWarehousingRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  storageInRecordMstId,
}) {
  return axios.get('/uStorageInRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      storageInRecordMstId
    }
  })
}

// 付款单明细新增
export function getWarehousingRecordnAdd({
  storageInRecordMstId,
  tableIdArr,
}) {
  return axios.get('/uStorageInRecordDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      storageInRecordMstId,
      tableIdArr,
    }
  })
}

//付款单明细新增-------获取未入库采购单列表
export function getPurchaseRecordMstListUnStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
}) {
  return axios.get('/uPurchaseRecordMstListUnStock.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
    }
  })
}
//付款单明细新增-------获取未入库采购单--明细列表
export function getPurchaseRecordDtlListUnStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  purchaseRecordMstId,
  // serialNumber,
  // theName,
}) {
  return axios.get('/uPurchaseRecordDtlListUnStock.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      purchaseRecordMstId,
      // serialNumber,
      // theName,
    }
  })
}
// 付款单明细编辑
export function getWarehousingRecordnEdit({
  tableId,
  theQuantity,
}) {
  return axios.get('/uStorageInRecordDtlUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theQuantity,
    }
  })
}

// 付款单明细删除
export function getWarehousingRecordnDelete({
  tableId,
}) {
  return axios.get('/uStorageInRecordDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**-----------------------付款单审核记录---------------------------- */
//付款单审核记录列表
export function getCheckRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  storageInRecordMstId,
}) {
  return axios.get('/uPurchaseRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      storageInRecordMstId
    }
  })
}