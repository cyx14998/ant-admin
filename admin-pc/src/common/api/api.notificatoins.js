import axios, {
    getToken,
    getCustomerId,
    apiVer
} from './index';

/**
 * 三百二十二．	公告（首页已审核完毕）列表
 */
export function uProclamationListForDashboard({
    pageNumber = 1,
    countPerPage = 1000,
    keyword = ''
    }) {
    return axios.get('/uProclamationListForDashboard.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword
        }
    })
}


/**
* 三百二十一．	待办事项（待审核单据）列表
*/
export function uMemberWaitTodoList({
    pageNumber = 1,
    countPerPage = 1000,
    keyword = ''
    }) {
    return axios.get('/uMemberWaitTodoList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword
        }
    })
}

/**
* 三百二十四．	参与记录（已审批单据）列表
*/
export function uMemberOrderFlowHistoryList({
    pageNumber = 1,
    countPerPage = 1000,
    flowMstId = ''
    }) {
    return axios.get('/uMemberOrderFlowHistoryList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            flowMstId
        }
    })
}