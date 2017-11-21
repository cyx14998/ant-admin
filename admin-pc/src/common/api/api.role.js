/**
 * 流程系统
 */
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';

/**
 * 角色列表
 */
export function uRoleList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = ''
  }) {
  return axios.get('/uRoleList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword
    }
  })
}

/**
* 一百九十六．	角色新增
*/
export function uRoleAdd({
  theName = '',  // 角色名称
}) {
  return axios.get('/uRoleAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      theName,
    }
  })
}

/**
* 一百九十七．	角色编辑
*/
export function uRoleUpdate({
  tableId = '', // 角色ID
  theName = '',  // 角色名称
}) {
  return axios.get('/uRoleUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
    }
  })
}

/**
* 一百九十八．	角色删除
*/
export function uRoleDelete({
  tableId = '', // 角色ID
}) {
  return axios.get('/uRoleDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}

/**
* 二百零五．	角色菜单列表
*/
export function uRoleMenuRelationList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  roleId = '', // 角色ID
}) {
  return axios.get('/uRoleMenuRelationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      roleId
    }
  })
}

/**
* 二百零三．	角色菜单更新
*/
export function uRoleMenuRelationUpdate({
  roleId = '', // 角色ID
  menuIdArr = '', // 菜单ID数组
}) {
  return axios.get('/uRoleMenuRelationUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      roleId,
      menuIdArr
    }
  })
}