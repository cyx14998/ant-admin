/**
 * 公告管理
 */
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';

/**
 * 三百一十六．	公告列表
 */
export function uProclamationList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
}) {
  return axios.get('/uProclamationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
    }
  })
}

/**
 * 三百一十五．	公告详情
 */
export function uProclamationDetail({
  tableId
}) {
  return axios.get('/uProclamationDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: tableId
    }
  })
}


/**
 * 三百零九．	公告新增
 */
export function uProclamationAdd({
  menuId,     // 菜单ID
  fileName,   // 文件名称
  theName,    // 公告名称
  theTitle,   // 主题
  theContent, // 内容
  publishCompany,   // 公司
  publishDepart,    // 部门
  publishDatetime,  // 发布时间
  theDatetime       // 公告日期
}) {
  return axios.get('/uProclamationAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      menuId,
      fileName,
      theName,
      theTitle,
      theContent,
      publishCompany,
      publishDepart,
      publishDatetime,
      theDatetime
    }
  })
}


/**
 * 三百一十．	公告编辑
 */
export function uProclamationUpdate({
  tableId,    // 公告ID
  fileName,   // 文件名称
  theName,    // 公告名称
  theTitle,   // 主题
  theContent, // 内容
  publishCompany,   // 公司
  publishDepart,    // 部门
  publishDatetime,  // 发布时间
  theDatetime       // 公告日期
}) {
  return axios.get('/uProclamationUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      fileName,
      theName,
      theTitle,
      theContent,
      publishCompany,
      publishDepart,
      publishDatetime,
      theDatetime
    }
  })
}

/**
 * 三百一十一．	公告删除
 */
export function uProclamationDelete({
  tableId  // 公告ID
}) {
  return axios.get('/uProclamationDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}

/**
* 三百一十二．	公告作废
*/
export function uProclamationCancel({
  tableId  // 公告ID
}) {
  return axios.get('/uProclamationCancel.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}


/**
* 三百一十三．	公告送审/审核
*/
export function uProclamationPass({
  tableId,    // 公告ID
  menuId,     // 菜单ID
  theContent  // 审核意见
}) {
  return axios.get('/uProclamationPass.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      menuId,
      theContent
    }
  })
}

/**
* 三百一十四．	公告退回
*/
export function uProclamationReject({
  tableId,    // 公告ID
  menuId,     // 菜单ID
  theContent  // 审核意见
}) {
  return axios.get('/uProclamationReject.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      menuId,
      theContent
    }
  })
}