/**
 * 员工管理
 */
import axios, {
  getToken,
  getCustomerId,
  apiVer
} from './index';

/**
 * 员工列表
 */
export function getStaffList ({
  pageNumber=1,
  countPerPage=1000,
  realName='',
  phoneNumber=''
}) {
  return axios.get('/uMemberList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      realName,
      phoneNumber
    }
  })
}

/**
 * 获取员工详情
 * QA: 接口错误，传入参数 staffId
 */
export function getStaffDetails({
  staffId
}) {
  return axios.get('/uMemberDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: staffId
    }
  })
}


/**
 * 员工新增
 */
export function getStaffListAdd({
  phoneNumber,
  password,
  email,
  sex,
  age,
  realName,
  headImagePath,
  address,
  idCard,
  isActivationLogin,
  departmentId
}) {
  return axios.get('/uMemberAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      phoneNumber,
      password,
      email,
      sex,
      age,
      realName,
      headImagePath,
      address,
      idCard,
      isActivationLogin,
      departmentId
    }
  })
}


/**
 * 员工修改
 */
export function getStaffListUpdate({
  tableId,
  phoneNumber,
  password,
  email,
  sex,
  age,
  realName,
  headImagePath,
  address,
  idCard,
  isActivationLogin,
  departmentId
}) {
  return axios.get('/uMemberUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      phoneNumber,
      password,
      email,
      sex,
      age,
      realName,
      headImagePath,
      address,
      idCard,
      isActivationLogin,
      departmentId
    }
  })
}


/**
 * 员工证照列表
 */
export function getStarffCertList({
  staffId,
  pageNumber=1,
  countPerPage=1000
}) {
  return axios.get('/uMemberCertificationList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      staffId,
      pageNumber,
      countPerPage
    }
  })
}

/**
 * 员工证照详情
 */
export function getStaffCertDetails({
  tableId
}) {
  return axios.get('/uMemberCertificationDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}

/**
 * 员工证照新增
 */
export function getStarffCertListAdd({
  staffId,
  theName,
  filePath,
  expiryDatetime,
  certificationUnit,
  serialNumber,
  professionalCategory,
  repetitionCycle,
  theRemarks
}) {
  return axios.get('/uMemberCertificationAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      staffId,
      theName,
      filePath,
      expiryDatetime,
      certificationUnit,
      serialNumber,
      professionalCategory,
      repetitionCycle,
      theRemarks
    }
  })
}

/**
 * 员工证照修改
 */
export function getStarffCertListUpdate({
  tableId,
  theName,
  filePath,
  expiryDatetime,
  certificationUnit,
  serialNumber,
  professionalCategory,
  repetitionCycle,
  theRemarks
}) {
  return axios.get('/uMemberCertificationUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      filePath,
      expiryDatetime,
      certificationUnit,
      serialNumber,
      professionalCategory,
      repetitionCycle,
      theRemarks
    }
  })
}

/**
 * 员工证照删除
 */
export function getStarffCertListDelete({
  tableId
}) {
  return axios.get('/uMemberCertificationDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId
    }
  })
}
