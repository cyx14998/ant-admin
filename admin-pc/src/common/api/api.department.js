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
 * QA: 异常
 */
export function getDepartmentList ({
  pageNumber=1,
  countPerPage=10
}) {
  return axios.get('/uDepartmentList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage
    }
  })
}