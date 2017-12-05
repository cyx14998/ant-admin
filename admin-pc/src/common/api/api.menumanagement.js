/**
 * 菜单管理
 */
import axios, {
    getToken,
    getCustomerId,
    apiVer
} from './index';

/**
 * 一百九十五．	菜单列表
 */
export function uMenuList({
    pageNumber = 1,
    countPerPage = 1000,
    keyword = '',
    fatherMenuId = '', // 父菜单Id
}) {
    return axios.get('/uMenuList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            pageNumber,
            countPerPage,
            keyword,
            fatherMenuId,
        }
    })
}

/**
* 一百九十四．	菜单详情
*/
export function uMenuDetail({
    tableId = '',  // 菜单ID
}) {
    return axios.get('/uMenuDetail.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

/**
* 一百九十一．	菜单新增
*/
export function uMenuAdd({
    theName = '',  // 菜单名称
    theLink = '',  // 菜单路径
    fatherMenuId = '',//父菜单ID（没有则不传）
    theSort = '',  // 排序
    flowMstId = '', // 流程主表ID
    tableName = '', // 数据库表名
    icon          // 菜单要显示的icon
}) {
    return axios.get('/uMenuAdd.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            theName,
            theLink,
            fatherMenuId,
            theSort,
            flowMstId,
            tableName,
            icon
        }
    })
}

/**
* 一百九十二．	菜单编辑
*/
export function uMenuUpdate({
    tableId = '', // 菜单ID
    theName = '',  // 角色名称
    theLink = '',  // 菜单路径
    theSort = '',  // 排序
    flowMstId = '', // 流程主表ID
    tableName = '', // 数据库表名
    icon          // 菜单要显示的icon
}) {
    return axios.get('/uMenuUpdate.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theName,
            theLink,
            theSort,
            flowMstId,
            tableName,
            icon
        }
    })
}

/**
* 一百九十三．	菜单删除
*/
export function uMenuDelete({
    tableId = '', // 菜单ID
}) {
    return axios.get('/uMenuDelete.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}


/**
* 一百九十六．	菜单列表（树形结构）
*/
export function uMenuListForTree({
}) {
    return axios.get('/uMenuListForTree.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
        }
    })
}