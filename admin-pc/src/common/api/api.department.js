/**
 * 部门列表
 */
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';

/**
 * 获取部门列表
 */
export function getDepartmentList ({
  pageNumber=1,
  countPerPage=10,
  fatherId=''
}) {
  return axios.get('/uDepartmentListAll.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      fatherId
    }
  })
}

/**
 * 新增部门
 */
export function getDepartmentListAdd({
  fatherId,
  theName
}) {
  return axios.get('/uDepartmentAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      fatherId,
      theName
    }
  })
}

/**
 * 部门修改
 */
export function getDepartmentListUpdate({
  fatherId,
  tableId,
  theName
}) {
  return axios.get('/uDepartmentUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      fatherId,
      tableId,
      theName
    }
  })
}

/**
 * 部门删除
 */
export function getDepartmentListDelete({
  tableId
}) {
  return axios.get('/uDepartmentDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}

/**
 * 获取部门选项列表
 */
export function getDepartmentListForSelect() {
  return axios.get('/uDepartmentListForSelect.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken()
    }
  });
}

/**
 * 部门成员列表
 */
export function getStaffListByDeparentId({
  pageNumber=1,
  countPerPage=1000,
  departmentId=''
}) {
  return axios.get('/uDepartmentMemberRelationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      departmentId
    }
  })
}

/**
 * 设置部门成员为领导
 */
export function setDepartmentStaffLeader({
  tableId,
  isLeader
}) {
  return axios.get('/uDepartmentMemberRelationSetLeader.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      isLeader
    }
  })
}

/**
 * 未加入部门员工列表
 */
export function getDepartmentStaffList({
  pageNumber=1,
  countPerPage=1000
}) {
  return axios.get('/uMemberListForJoinDepartment.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}

/**
 * 添加部门成员
 */
export function getDepartmentStaffAdd({

}) {

}

/**
 * 删除部门成员
 */
export function getDepartmentStaffDelete({
  tableId
}) {
  return axios.get('/uDepartmentMemberRelationDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}