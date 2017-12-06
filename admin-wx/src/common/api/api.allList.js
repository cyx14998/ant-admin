import axios, {
    getToken,
    apiVer,
} from './index';

/**
 * 五．	员工列表tuMemberList.tuhtm
 * **/
export function tuMemberList({
    pageNumber = 1,
    countPerPage = 20,
    keyword = '',
    departmentId = '',
}) {
    return axios.get('/tuMemberList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword,
            departmentId,
        }
    })
}


/**
 * 九．企业基本信息列表
 * **/
export function tuCustomerList({
    pageNumber = 1,
    countPerPage = 20,
    keyword = '',
    customerName = '',
    uniformSocialCreditCode = '',
    unitCategory = '',
    industryCategory = '',
}) {
    return axios.get('/tuCustomerList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword,
            customerName,
            uniformSocialCreditCode,
            unitCategory,
            industryCategory,
        }
    })
}

/**
 * 十．	我的检查任务列表
 * **/
export function tuInspectionPlanDtlForMeList({
    pageNumber = 1,
    countPerPage = 20,
    keyword = '',
    theState = '',
}) {
    return axios.get('/tuInspectionPlanDtlForMeList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword,
            theState
        }
    })
}

/**
 * 十一．	待办事项筛选列表tuFlowMstList.tuhtm
 * **/
export function tuFlowMstList() {
    return axios.get('/tuFlowMstList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
        }
    })
}

/**
 * 十四．	待办事项（待审核单据）列表
 * **/
export function tuMemberWaitTodoList({
    flowMstId = '',
}) {
    return axios.get('/tuMemberWaitTodoList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            flowMstId,
        }
    })
}

/**
 * 十五．	待办事项（已审批单据）列表
 * **/
export function tuMemberOrderFlowHistoryList({
    pageNumber = 1,
    countPerPage = 20,
    flowMstId = '',
}) {
    return axios.get('/tuMemberOrderFlowHistoryList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            flowMstId,
        }
    })
}