/**
 * 客户检查计划管理
 */
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';


/**
 * 企业检查计划主表列表
 */
export function getCheckplanMainlist({
  pageNumber = 1,
  countPerPage = 1000,
}) {
  return axios.get('/uInspectionPlanMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}
/**
 * 企业检查计划主表增加
 */
export function getCheckplanMainAdd({
  serialNumber,
  lotNumber,
  planDateStart,
  planDateEnd,
  theRemarks,
}) {
  return axios.get('/uInspectionPlanMstAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      serialNumber,
      lotNumber,
      planDateStart,
      planDateEnd,
      theRemarks,
    }
  })
}
/**
 * 企业检查计划主表编辑
 */
export function getCheckplanMainEdit({
  tableId,
  serialNumber,
  lotNumber,
  planDateStart,
  planDateEnd,
  theRemarks,
}) {
  return axios.get('/uInspectionPlanMstUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      serialNumber,
      lotNumber,
      planDateStart,
      planDateEnd,
      theRemarks,
    }
  })
}
/**
 * 企业检查计划主表删除
 */
export function getCheckplanMainDelete({
  tableId,
}) {
  return axios.get('/uInspectionPlanMstDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**************************** 检查计划子表 ***********************/
/**
 * 企业检查计划子表列表
 */
export function getCheckplanSublist({
  pageNumber = 1,
  countPerPage = 1000,
  inspectionPlanMstId,
}) {
  return axios.get('/uInspectionPlanDtlList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      inspectionPlanMstId,
    }
  })
}
/**
 * 企业检查计划子表增加
 */
export function getCheckplanSubAdd({
  inspectionPlanMstId,
  customerId,
  feedbackSheetURL,
  regulatoryRecordURL,
  theRemarks,
}) {
  return axios.get('/uInspectionPlanDtlAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      inspectionPlanMstId,
      customerId,
      feedbackSheetURL,
      regulatoryRecordURL,
      theRemarks,
    }
  })
}
/**
 * 企业检查计划详情
 */
export function getCheckplanDetail({
  pageNumber = 1,
  countPerPage = 1000,
  tableId,
}) {
  return axios.get('/uInspectionPlanDtlDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      tableId,
    }
  })
}
/**
 * 企业检查计划子表编辑
 */
export function getCheckplanSubEdit({
  tableId,
  feedbackSheetURL,
  regulatoryRecordURL,
  theRemarks,
}) {
  return axios.get('/uInspectionPlanDtlUpload.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      feedbackSheetURL,
      regulatoryRecordURL,
      theRemarks,
    }
  })
}
/**
 * 企业检查计划子表删除
 */
export function getCheckplanSubDelete({
  tableId,
}) {
  return axios.get('/uInspectionPlanDtlDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}
/**
 * 企业检查计划子表分配执行者
 */
export function getCheckplanSubPerformer({
  tableId,
  performerId
}) {
  return axios.get('/uInspectionPlanDtlAllotPerformer.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      performerId
    }
  })
}
/**
 * 企业检查计划子表获取员工列表
 */
export function getMemberList({
  pageNumber = 1,
  countPerPage = 1000,
}) {
  return axios.get('/uMemberList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
    }
  })
}