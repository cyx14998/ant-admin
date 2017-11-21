// 库存
import axios, {
  getToken,
  apiVer
} from './index';

//获取库存列表
export function getStockList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  warehouseId,
}) {
  return axios.get('/uStorageItemList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      warehouseId,
    }
  })
}