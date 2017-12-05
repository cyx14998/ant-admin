// 合同
import axios, {
  getToken,
  getCustomerId,
  apiVer,
  getMenuId,
} from './index';


//合同主表列表
export function getContractList({
  countPerPage = 1000,
  keyword,
}) {

  return axios.get('/uContractList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
    }
  })
}
// 合同主表详情
export function getContractDetail({
  tableId,
}) {
  return axios.get('/uContractDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 合同主表新增
export function getContractAdd({
  theName,
  firstParty,
  secondParty,
  signDatetime,
  totalAmount,
  payWay,
  data,
},) {
  return axios.get('/uContractAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      theName,
      firstParty,
      secondParty,
      signDatetime,
      totalAmount,
      payWay,
      data: JSON.stringify(data),      
    }
  })
}

// 合同主表编辑
export function getContractEdit({
  tableId,
  theName,
  firstParty,
  secondParty,
  signDatetime,
  totalAmount,
  payWay,
  data,
}) {
  return axios.get('/uContractUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      firstParty,
      secondParty,
      signDatetime,
      totalAmount,
      payWay,
      data: JSON.stringify(data),            
    }
  })
}

// 合同主表删除
export function getContractDelete({
  tableId,
}) {
  return axios.get('/uContractDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/**-----------------------合同状态更改---------------------------- */
// 合同作废
export function getContractCancel({
  tableId,
}) {
  return axios.get('/uContractCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
// 合同送审
export function getContractPass({
  tableId,
  theContent,
}) {
  return axios.get('/uContractPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}
// 合同退回
export function getContractReject({
  tableId,
  theContent,
}) {
  return axios.get('/uContractReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}