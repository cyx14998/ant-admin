// 库存
import axios, {
  getToken,
  apiVer
} from './index';

//库存列表
export function getstockList({
  countPerPage = 1000,
  keyword,
}) {
  return axios.get('/uWarehouseList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      countPerPage,
      keyword,
    }
  })
}