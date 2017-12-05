import axios, {
    getToken,
    apiVer,
} from './index';

/**------------------------------------审核记录------------------------------**/
//获取审核记录
export function flowHistoryListApi({
    flowOrderStateId,
}) {
    return axios.get('/tuFlowHistoryList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            flowOrderStateId,
        }
    })
}

/**------------------------------------采购单详情———审批------------------------------**/

//采购单---详情
export function getPurOrdersInfoApi({
    tableId,
}) {
    return axios.get('/tuPurchaseRecordMstDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//采购单审批---通过
export function purOrdersPassApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuPurchaseRecordMstPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//采购单审批---驳回
export function purOrdersRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuPurchaseRecordMstReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------入库单详情———审批------------------------------**/

//入库单---详情
export function getPurHousingInfoApi({
    tableId,
}) {
    return axios.get('/tuStorageInRecordMstDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//入库单审批---通过
export function purHousingPassApi({
    tableId,
    theContent,
}) {
    return axios.get('tuStorageInRecordMstPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//入库单审批---驳回
export function purHousingRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('tuStorageInRecordMstReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------出库单详情———审批------------------------------**/

//出库单---详情
export function getPurBoundInfoApi({
    tableId,
}) {
    return axios.get('/tuStorageOutRecordMstDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//出库单审批---通过
export function purBoundPassApi({
    tableId,
    theContent,
}) {
    return axios.get('/uStorageOutRecordMstPass.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//出库单审批---驳回
export function purBoundRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/uStorageOutRecordMstReject.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------付款单详情———审批------------------------------**/

//付款单---详情
export function getPurPaymentInfoApi({
    tableId,
}) {
    return axios.get('/tuPaymentRecordMstDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//付款单审批---通过
export function purPaymentPassApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuPaymentRecordMstPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//付款单审批---驳回
export function purPaymentRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuPaymentRecordMstReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------公告详情———审批------------------------------**/

//公告---详情
export function getNoticeInfoApi({
    tableId,
}) {
    return axios.get('/tuProclamationDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//公告审批---通过
export function noticePassApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuProclamationPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//公告审批---驳回
export function noticeRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuProclamationReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------合同详情———审批------------------------------**/

//合同---详情
export function getContractInfoApi({
    tableId,
}) {
    return axios.get('/tuContractDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//合同审批---通过
export function contractPassApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuContractPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//合同审批---驳回
export function contractRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuContractReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------用印详情———审批------------------------------**/

//用印---详情
export function getPrintingInfoApi({
    tableId,
}) {
    return axios.get('/tuOfficialSealDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//用印审批---通过
export function printingPassApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuOfficialSealPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//用印审批---驳回
export function printingRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuOfficialSealReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}

/**------------------------------------请假单详情———审批------------------------------**/

//请假单---详情
export function getLeaveInfoApi({
    tableId,
}) {
    return axios.get('/tuLeaveApplicationDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

//请假单审批---通过
export function leavePassApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuLeaveApplicationPass.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}
//请假单审批---驳回
export function leaveRejectApi({
    tableId,
    theContent,
}) {
    return axios.get('/tuLeaveApplicationReject.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            theContent,
        }
    })
}