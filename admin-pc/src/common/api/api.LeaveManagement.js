/**
 * 请假单管理
 */
import axios, {
  getToken,
  getMenuId,
  getCustomerId,
  apiVer
} from './index';

/**
 * 请假单列表
 */
export function uLeaveApplicationList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  departmentId = '',
  }) {
  return axios.get('/uLeaveApplicationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      departmentId
    }
  })
}

/**
 * 获取请假单详情
 * QA: 接口错误，传入参数 staffId
 */
export function uLeaveApplicationDetail({
    tableId
  }) {
  return axios.get('/uLeaveApplicationDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: tableId
    }
  })
}


/**
 * 请假单新增 保存
 */
export function uLeaveApplicationAdd({
    theType,  // 请假单类型 0：事假 1：病假  2：年假  3：调休  4：其他
  theReason, // 请假事由
  beginDatetime, // 开始时间
  endDatetime, // 结束时间
  theHoure, // 请假时长
}) {
  return axios.get('/uLeaveApplicationAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      theType,
      theReason,
      beginDatetime,
      endDatetime,
      theHoure,
    }
  })
}


/**
 * 请假单修改
 */
export function uLeaveApplicationUpdate({
  tableId,
  theType,
  theReason,
  beginDatetime,
  endDatetime,
  theHoure,
  }) {
  return axios.get('/uLeaveApplicationUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theType,
      theReason,
      beginDatetime,
      endDatetime,
      theHoure,
    }
  })
}

/**
 * 请假单删除
 */
export function uLeaveApplicationDelete({
    tableId
  }) {
  return axios.get('/uLeaveApplicationDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}

/**
* 请假单作废
*/
export function uLeaveApplicationCancel({
    tableId
  }) {
  return axios.get('/uLeaveApplicationCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}

/**
* 二百八十三．	请假单送审/审核
*/
export function uLeaveApplicationPass({
  tableId,     // Id
  theContent,  // 审核意见
}) {
  return axios.get('/uLeaveApplicationPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}

/**
* 二百八十四．	请假单退回
*/
export function uLeaveApplicationReject({
  tableId,     // Id
  theContent,  // 审核意见
}) {
  return axios.get('/uLeaveApplicationReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId: getMenuId(),
      tableId,
      theContent,
    }
  })
}