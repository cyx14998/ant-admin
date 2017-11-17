/**
 * 步骤角色管理
 */
import axios, {
    getToken,
    getCustomerId,
    apiVer
} from './index';

/**
 * 步骤角色列表
 */
export function uFlowRoleList({
    pageNumber = 1,
    countPerPage = 1000,
    keyword = '',
    flowDtlId = '',
    }) {
    return axios.get('/uFlowRoleList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword,
            flowDtlId
        }
    })
}

/**
 * 步骤角色新增
 */
export function uFlowRoleAdd({
    flowDtlId = '', // 流程子表
    roleId = '', // 角色ID
}) {
    return axios.get('/uFlowRoleAdd.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            flowDtlId,
            roleId
        }
    })
}

/**
 * 步骤角色删除
 */
export function uFlowRoleDelete({
      tableId
    }) {
    return axios.get('/uFlowRoleDelete.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId
        }
    })
}



/**
 * 角色列表
 */
export function uRoleList({
    pageNumber = 1,
    countPerPage = 1000,
    keyword = '',
    }) {
    return axios.get('/uRoleList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword,
        }
    })
}