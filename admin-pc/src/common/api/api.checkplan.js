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
  pageNumber=1,
  countPerPage=1000,
}) {
  return axios.get('/uInspectionPlanMstList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}