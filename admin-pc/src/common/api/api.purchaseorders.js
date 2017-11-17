// 采购单
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';


//采购单主表列表
export function getPurchaseOrderList({
  countPerPage = 1000,
  keyword,
}) {
  return axios.get('/uPurchaseRecordMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
    }
  })
}
// 采购单主表详情
export function getPurchaseOrderDetail({
  tableId,
}) {
  return axios.get('/uPurchaseRecordMstDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

// 采购单主表新增
export function getPurchaseOrderAdd({
  departmentId,
  menuId,
  theType,
  orderTime,
  manufacturerName,
  theRemarks,
}) {
  return axios.get('/uPurchaseRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      departmentId,
      menuId,
      theType,
      orderTime,
      manufacturerName,
      theRemarks,
    }
  })
}

// 采购单主表编辑
export function getPurchaseOrderEdit({
  tableId,
  departmentId,
  menuId,
  theType,
  orderTime,
  manufacturerName,
  theRemarks,
}) {
  return axios.get('/uPurchaseRecordMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      departmentId,
      menuId,
      theType,
      orderTime,
      manufacturerName,
      theRemarks,
    }
  })
}

// 采购单主表删除
export function getPurchaseOrderDelete({
  tableId,
}) {
  return axios.get('/uPurchaseRecordMstDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**-----------------------采购单明细---------------------------- */
//采购单明细列表
export function getPurchaseOrderRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  purchaseRecordMstId,
}) {
  return axios.get('/uPurchaseRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      purchaseRecordMstId
    }
  })
}
// 采购单明细新增
export function getPurchaseOrderRecordnAdd({
  purchaseRecordMstId,
  theName,
  theSpecifications,
  theQuantity,
  thePrice,
  theRemarks,
}) {
  return axios.get('/uPurchaseRecordDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      purchaseRecordMstId,
      theName,
      theSpecifications,
      theQuantity,
      thePrice,
      theRemarks,
    }
  })
}

// 采购单明细编辑
export function getPurchaseOrderRecordnEdit({
  tableId,
  theName,
  theSpecifications,
  theQuantity,
  thePrice,
  theRemarks,

}) {
  return axios.get('/uPurchaseRecordDtlUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      theSpecifications,
      theQuantity,
      thePrice,
      theRemarks,
    }
  })
}

// 采购单明细删除
export function getPurchaseOrderRecordnDelete({
  tableId,
}) {
  return axios.get('/uPurchaseRecordDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**-----------------------采购单审核记录---------------------------- */
//采购单审核记录列表
export function getCheckRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  purchaseRecordMstId,
}) {
  return axios.get('/uPurchaseRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      purchaseRecordMstId
    }
  })
}