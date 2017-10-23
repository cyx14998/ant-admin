/**
 * 企业管理列表
 */
import axios, { getToken, apiVer } from './index';


// post 接口有问题，全部使用get
export function postTest() {
  return axios.post('http://ythb.zhiqifu.com/MemberLogin.htm', {
      phoneNumber:"13800000000",
      password:"E10ADC3949BA59ABBE56E057F20F883E",
      InterfaceVersion: '20171016',
  })
}

// 获取企业列表
export function getCustomerList({pageNumber=1, countPerPage=1000}) {
  return axios.post('/uCustomerList.uhtm', {
    params: {
      InterfaceVersion: '20171016',
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}

export function getCustomerInfoById(id) {
  return axios.get('/uCustomerDetail.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId: id
    }
  });
}


//编辑页---首页-产品基本信息获取
export function getProductBaseInfoList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword = '',
  id
}) {
  return axios.get('uMainProductBaseInfoList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      customerId: id
    }
  });
}