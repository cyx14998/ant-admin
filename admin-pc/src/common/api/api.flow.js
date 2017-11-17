/**
 * 流程系统
 */
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';

/**
 * 流程主表列表
 */
export function uFlowMstList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = ''
  }) {
  return axios.get('/uFlowMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword
    }
  })
}

/**
* 流程主表新增
*/
export function uFlowMstAdd({
  theName = '',  // 流程模块名称
  sourceLink = '', // 关联页面
  tableName = '' // 关联表
}) {
  return axios.get('/uFlowMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      theName,
      sourceLink,
      tableName
    }
  })
}

/**
* 流程主表编辑
*/
export function uFlowMstUpdate({
  tableId = '', // 流程模块ID
  theName = '',  // 流程模块名称
  sourceLink = '', // 关联页面
  tableName = '' // 关联表
}) {
  return axios.get('/uFlowMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      sourceLink,
      tableName
    }
  })
}

/**
* 流程主表删除
*/
export function uFlowMstDelete({
  tableId = '', // 流程模块ID
}) {
  return axios.get('/uFlowMstDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/**
* 流程子表列表
*/
export function uFlowDtlList({
  flowMstId = '', // 流程主表ID
  pageNumber = 1,
  countPerPage = 1000,
  keyword = ''
}) {
  return axios.get('/uFlowDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      flowMstId,
      pageNumber,
      countPerPage,
      keyword
    }
  })
}

/**
* 流程子表详情
*/
export function uFlowDtlDetail({
  tableId = '', // 流程子表ID
}) {
  return axios.get('/uFlowDtlDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/**
* 流程子表删除
*/
export function uFlowDtlDelete({
  tableId = '', // 流程子表ID
}) {
  return axios.get('/uFlowDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/**
* 流程子表新增保存
*/
export function uFlowDtlAdd({
  flowMstId = '', // 主表ID
  // tableId, // 上一个流程ID
  theName = '', // 流程步骤名称
  isNeedJointlySign = '', // 是否需要会签
  isNeedAllPass = '', // 会签时，是否需要全部通过
  theRemark = '', // 备注
  theCondition = '', // 条件
}) {
  return axios.get('/uFlowDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      flowMstId,
      // tableId,
      theName,
      isNeedJointlySign,
      isNeedAllPass,
      theRemark,
      theCondition
    }
  })
}

/**
* 流程子表编辑保存
*/
export function uFlowDtlUpdate({
  tableId = '', // 流程子表ID
  theName = '', // 流程步骤名称
  isNeedJointlySign = '', // 是否需要会签
  isNeedAllPass = '', // 会签时，是否需要全部通过
  theRemark = '', // 备注
  theCondition = '', // 条件
}) {
  return axios.get('/uFlowDtlUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      isNeedJointlySign,
      isNeedAllPass,
      theRemark,
      theCondition
    }
  })
}

/**
* 流程子表插入保存
*/
export function uFlowDtlInsert({
  flowMstId = '', // 流程主表ID
  lastFlowDtlId = '', // 上一步骤ID
  theName = '', // 流程步骤名称
  isNeedJointlySign = '', // 是否需要会签
  isNeedAllPass = '', // 会签时，是否需要全部通过
  theRemark = '', // 备注
  theCondition = '', // 条件
}) {
  return axios.get('/uFlowDtlInsert.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      flowMstId,
      lastFlowDtlId,
      theName,
      isNeedJointlySign,
      isNeedAllPass,
      theRemark,
      theCondition
    }
  })
}
