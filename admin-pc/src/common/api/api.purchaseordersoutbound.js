// 出库单
import axios, {
  getToken,
  getCustomerId,
  apiVer,
  getMenuId,
} from './index';


//出库单主表列表
export function getOutboundList({
  countPerPage = 1000,
  keyword,
  isPass,
  theState,
  warehouseId,
  storageOutMemberId,
}) {
  var params = {};
  // 审核情况        
  if (isPass === '1') {
    params.isPass = true;
  } else if (isPass === '2') {
    params.isPass = false;
  }
  //出库单状态
  if (theState && theState !== '0') {
    params.theState = theState - 1;
  }
  //仓库选择
  if (warehouseId && warehouseId !== '全部') {
    params.warehouseId = warehouseId;
  }
  //出库人选择
  if (storageOutMemberId && storageOutMemberId !== '全部') {
    params.storageOutMemberId = storageOutMemberId;
  }

  return axios.get('/uStorageOutRecordMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
      ...params,
    }
  })
}
// 出库单主表详情
export function getOutboundDetail({
  tableId,
}) {
  return axios.get('/uStorageOutRecordMstDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 出库单主表新增
export function getOutboundAdd({
  warehouseId,
  storageOutMemberId,
  storageOutDatetime,
  theRemarks,
}) {
  return axios.get('/uStorageOutRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      warehouseId,
      storageOutMemberId,
      storageOutDatetime,
      theRemarks,
      menuId: getMenuId(),
    }
  })
}

// 出库单主表编辑
export function getOutboundEdit({
  tableId,
  warehouseId,
  storageOutMemberId,
  storageOutDatetime,
  theRemarks,
}) {
  return axios.get('/uStorageOutRecordMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      warehouseId,
      storageOutMemberId,
      storageOutDatetime,
      theRemarks,
      menuId: getMenuId(),
    }
  })
}

// 出库单主表删除
export function getOutboundDelete({
  tableId,
}) {
  return axios.get('/uStorageOutRecordMstDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**-----------------------出库单状态更改---------------------------- */
// 出库单作废
export function getOutboundCancel({
  tableId,
}) {
  return axios.get('/uStorageOutRecordMstCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 出库单送审/审核
export function getOutboundPass({
  tableId,
  theContent,
}) {
  return axios.get('/uStorageOutRecordMstPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
// 出库单退回
export function getOutboundReject({
  tableId,
  theContent,
}) {
  return axios.get('/uStorageOutRecordMstReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
/**-----------------------出库单明细---------------------------- */
//出库单明细列表
export function getOutboundRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  storageOutRecordMstId,
}) {
  return axios.get('/uStorageOutRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      storageOutRecordMstId
    }
  })
}

// 出库单明细新增
export function getOutboundRecordnAdd({
  storageOutRecordMstId,
  data,
}) {
  return axios.get('/uStorageOutRecordDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      storageOutRecordMstId,
      data: JSON.stringify(data)
    }
  })
}

//出库单明细新增-------获取库存列表
export function getStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  warehouseId,
}) {
  return axios.get('/uStorageItemList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      warehouseId,
    }
  })
}
// 出库单明细编辑
export function getOutboundRecordnEdit({
  tableId,
  theQuantity,
}) {
  return axios.get('/uStorageOutRecordDtlUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theQuantity,
    }
  })
}

// 出库单明细删除
export function getOutboundRecordnDelete({
  tableId,
}) {
  return axios.get('/uStorageOutRecordDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
