// 采购单
import axios, {
  getToken,
  getCustomerId,
  apiVer,
  getMenuId,
} from './index';


//采购单主表列表
export function getPurchaseOrderList({
  countPerPage = 1000,
  keyword,
  serialNumber,
  manufacturerName,
}) {
  return axios.get('/uPurchaseRecordMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
      serialNumber,
      manufacturerName,
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
  theType,
  orderTime,
  manufacturerName,
  theRemarks,
}) {
  return axios.get('/uPurchaseRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      departmentId,
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
  theType,
  orderTime,
  manufacturerName,
  theRemarks,
}) {
  return axios.get('/uPurchaseRecordMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      departmentId,
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
/**-----------------------采购单状态更改---------------------------- */
// 采购单作废
export function getPurchaseOrderCancel({
  tableId,
}) {
  return axios.get('/uPurchaseRecordMstCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 采购单送审/审核
export function getPurchaseOrderPass({
  tableId,
  theContent,
}) {
  return axios.get('/uPurchaseRecordMstPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
// 采购单退回
export function getPurchaseOrderReject({
  tableId,
  theContent,
}) {
  return axios.get('/uPurchaseRecordMstReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
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
