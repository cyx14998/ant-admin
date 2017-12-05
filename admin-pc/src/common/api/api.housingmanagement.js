// 仓库管理
import axios, {
  getToken,
  getCustomerId,
  apiVer,
  getMenuId,
} from './index';

/**-----------------------仓库---------------------------- */
//仓库列表
export function getHousingTableList({
  pageNumber = 1,
  countPerPage = 1000,
  keyword,
  isPass,
  theState,
  warehouseId,
  storageInMemberId,
}) {
  var params = {};
  // 审核情况        
  if (isPass === '1') {
    params.isPass = true;
  } else if (isPass === '2') {
    params.isPass = false;
  }
  //仓库状态
  if (theState && theState !== '0') {
    params.theState = theState - 1;
  }
  //仓库选择
  if (warehouseId && warehouseId !== '全部') {
    params.warehouseId = warehouseId;
  }
  //入库人选择
  if (storageInMemberId && storageInMemberId !== '全部') {
    params.storageInMemberId = storageInMemberId;
  }
  return axios.get('/uWarehouseList.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      pageNumber,
      countPerPage,
      keyword,
      ...params,
    }
  })
}
// 仓库新增
export function getHousingAdd({
  theName,
  address,
  theRemarks,
}) {
  return axios.get('/uWarehouseAdd.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      theName,
      address,
      theRemarks,
    }
  })
}

// 仓库编辑
export function getHousingEdit({
  tableId,
  theName,
  address,
  theRemarks,
}) {
  return axios.get('/uWarehouseUpdate.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
      theName,
      address,
      theRemarks,
    }
  })
}

// 仓库删除
export function getHousingDelete({
  tableId,
}) {
  return axios.get('/uWarehouseDelete.uhtm?InterfaceVersion=' + apiVer, {
    params: {
      token: getToken(),
      tableId,
    }
  })
}