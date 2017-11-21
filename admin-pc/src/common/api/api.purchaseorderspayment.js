// 付款单
import axios, {
  getToken,
  apiVer
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
  menuId,
}) {
  return axios.get('/uPaymentRecordMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      theRemarks,
      menuId,
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
  return axios.get('/uPaymentRecordDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
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
  tableIdArr,
}) {
  return axios.get('/uPaymentRecordDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      paymentRecordMstId,
      tableIdArr,
    }
  })
}

//付款单明细新增-------获取可付款采购单列表
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
//付款单明细新增-------获取可付款采购单--明细列表
export function getPurchaseRecordDtlListUnStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  paymentRecordMstId,
}) {
  var params = {};
  //可付款采购单选择
  if (paymentRecordMstId && paymentRecordMstId !== '全部') {
    params.paymentRecordMstId = paymentRecordMstId;
  }
  return axios.get('/uPaymentRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      ...params,
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
  paymentRecordMstId,
}) {
  return axios.get('/uPurchaseRecordDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      paymentRecordMstId
    }
  })
}