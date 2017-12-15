// 用印
import axios, {
    getToken,
    getCustomerId,
    apiVer,
    getMenuId,
} from './index';


//用印主表列表
export function getPrintingList({
    countPerPage = 1000,
    // keyword,
    ...params
}) {

    return axios.get('/uOfficialSealList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            countPerPage,
            ...params
        }
    })
}
// 用印主表详情
export function getPrintingDetail({
    tableId,
}) {
    return axios.get('/uOfficialSealDetail.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}
// 用印主表新增
export function getPrintingAdd({
    applyDepartId,
    useDepartId,
    applyDatetime,
    data,
}) {
    return axios.get('/uOfficialSealAdd.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            menuId: getMenuId(),
            applyDepartId,
            useDepartId,
            applyDatetime,
            data: JSON.stringify(data),
        }
    })
}

// 用印主表编辑
export function getPrintingEdit({
    tableId,
    applyDepartId,
    useDepartId,
    applyDatetime,
    data,
}) {
    return axios.get('/uOfficialSealUpdate.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            applyDepartId,
            useDepartId,
            applyDatetime,
            data: JSON.stringify(data),
        }
    })
}

// 用印主表删除
export function getPrintingDelete({
    tableId,
}) {
    return axios.get('/uOfficialSealDelete.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

/**-----------------------用印状态更改---------------------------- */
// 用印作废
export function getPrintingCancel({
    tableId,
}) {
    return axios.get('/uOfficialSealCancel.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}
// 用印送审/审核
export function getPrintingPass({
    tableId,
    theContent,
}) {
    return axios.get('/uOfficialSealPass.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            menuId: getMenuId(),
            tableId,
            theContent,
        }
    })
}
// 用印退回
export function getPrintingReject({
    tableId,
    theContent,
}) {
    return axios.get('/uOfficialSealReject.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            menuId: getMenuId(),
            tableId,
            theContent,
        }
    })
}