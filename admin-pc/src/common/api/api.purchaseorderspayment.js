// 付款单
import axios, {
  getToken,
  apiVer,
  getMenuId,
} from './index';


//付款单主表列表
export function getPaymentList({
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

  return axios.get('/uPaymentRecordMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
      ...params,
    }
  })
}
// 付款单主表详情
export function getPaymentDetail({
  tableId,
}) {
  return axios.get('/uPaymentRecordMstDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 付款单主表新增
export function getPaymentAdd({
  theRemarks,
}) {
  return axios.get('/uPaymentRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      theRemarks,
      menuId: getMenuId(),
    }
  })
}

// 付款单主表编辑
export function getPaymentEdit({
  tableId,
  theRemarks,
}) {
  return axios.get('/uPaymentRecordMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theRemarks,
    }
  })
}

// 付款单主表删除
export function getPaymentDelete({
  tableId,
}) {
  return axios.get('/uPaymentRecordMstDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**-----------------------付款单状态更改---------------------------- */
// 付款单作废
export function getPaymentCancel({
  tableId,
}) {
  return axios.get('/uPaymentRecordMstCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 付款单送审/审核
export function getPaymentPass({
  tableId,
  theContent,
}) {
  return axios.get('/uPaymentRecordMstPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
// 付款单退回
export function getPaymentReject({
  tableId,
  theContent,
}) {
  return axios.get('/uPaymentRecordMstReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
/**-----------------------付款单明细---------------------------- */
//付款单明细列表
export function getPaymentRecordList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  paymentRecordMstId,
}) {
  return axios.get('/uPaymentRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      paymentRecordMstId
    }
  })
}

// 付款单明细新增
export function getPaymentRecordnAdd({
  paymentRecordMstId,
  data,
}) {
  return axios.get('/uPaymentRecordDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      paymentRecordMstId,
            data: JSON.stringify(data)
    }
  })
}

//付款单明细新增-------获取可付款采购单列表
export function getPurchaseRecordMstListUnStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  // serialNumber
}) {
  return axios.get('/uPurchaseRecordMstListUnPayment.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      // serialNumber
    }
  })
}

// 付款单明细编辑
export function getPaymentRecordnEdit({
  tableId,
  theRemarks,
  theAmount,
}) {
  return axios.get('/uPaymentRecordDtlUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theRemarks,
      theAmount,
    }
  })
}

// 付款单明细删除
export function getPaymentRecordnDelete({
  tableIdArr,
}) {
  return axios.get('/uPaymentRecordDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableIdArr,
    }
  })
}
