// 入库单
import axios, {
  getToken,
  getCustomerId,
  apiVer,
  getMenuId,
} from './index';


//入库单主表列表
export function getWarehousingList({
  countPerPage = 1000,
  // keyword,
  // isPass,
  // theState,
  // warehouseId,
  // storageInMemberId,
  ...params
}) {
  // var params = {};
  // // 审核情况        
  // if (isPass === '1') {
  //   params.isPass = true;
  // } else if (isPass === '2') {
  //   params.isPass = false;
  // }
  // //入库单状态
  // if (theState && theState !== '0') {
  //   params.theState = theState - 1;
  // }
  // //仓库选择
  // if (warehouseId && warehouseId !== '全部') {
  //   params.warehouseId = warehouseId;
  // }
  // //入库人选择
  // if (storageInMemberId && storageInMemberId !== '全部') {
  //   params.storageInMemberId = storageInMemberId;
  // }

  return axios.get('/uStorageInRecordMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      ...params,
    }
  })
}
//入库单主表详情
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
//仓库列表
export function getHousingList({
  countPerPage = 1000,
  keyword,
}) {
  return axios.get('/uWarehouseList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
    }
  })
}
//员工列表
export function getMemberList({
  countPerPage = 1000,
  keyword,
}) {
  return axios.get('/uMemberList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
    }
  })
}
// 入库单主表新增
export function getWarehousingAdd({
  warehouseId,
  storageInMemberId,
  storageInDatetime,
  theRemarks,
}) {
  return axios.get('/uStorageInRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      warehouseId,
      storageInMemberId,
      storageInDatetime,
      theRemarks,
      menuId: getMenuId(),
    }
  })
}

// 入库单主表编辑
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

// 入库单主表删除
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
/**-----------------------入库单状态更改---------------------------- */
// 入库单作废
export function getWarehousingCancel({
  tableId,
}) {
  return axios.get('/uStorageInRecordMstCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 入库单送审/审核
export function getWarehousingPass({
  tableId,
  theContent,
}) {
  return axios.get('/uStorageInRecordMstPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
// 入库单退回
export function getWarehousingReject({
  tableId,
  theContent,
}) {
  return axios.get('/uStorageInRecordMstReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
/**-----------------------入库单明细---------------------------- */
//入库单明细列表
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

// 入库单明细新增
export function getWarehousingRecordnAdd({
  storageInRecordMstId,
  data,
}) {
  return axios.get('/uStorageInRecordDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      storageInRecordMstId,
      data: JSON.stringify(data)
    }
  })
}

//入库单明细新增-------获取未入库采购单列表
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
//入库单明细新增-------获取未入库采购单--明细列表
export function getPurchaseRecordDtlListUnStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  purchaseRecordMstId,
  // serialNumber,
  // theName,
}) {
  var params = {};
  //采购单主表选择
  if (purchaseRecordMstId && purchaseRecordMstId !== '全部') {
    params.purchaseRecordMstId = purchaseRecordMstId;
  }
  // //编号
  // if (serialNumber) {
  //   params.serialNumber = serialNumber;
  // }
  // //品名
  // if (theName) {
  //   params.theName = theName;
  // }
  return axios.get('/uPurchaseRecordDtlListUnStock.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      ...params,
    }
  })
}
// 入库单明细编辑
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

// 入库单明细删除
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
/**-----------------------审核记录---------------------------- */
//审核记录列表
export function getCheckRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  flowOrderStateId,
}) {
  return axios.get('/uFlowHistoryList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      flowOrderStateId
    }
  })
}