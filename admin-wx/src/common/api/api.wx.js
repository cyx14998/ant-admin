import axios, {
    getToken,
    apiVer,
} from './index';
import qiNiuUpload from '../utils/rc-upload';
const qiniuHost = 'http://up.qiniup.com';

/**------------------------------------QiNiu上传------------------------------**/

//获取七牛uptoken
export function getQiNiuTokenApi({}) {
    return axios.get('/uQiNiuTokenGet.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
        }
    });
}

//上传图片
export function qiNiuUploadApi({
    files,
    uptoken,
    key,
    callback
}) {
    return qiNiuUpload(
        qiniuHost,
        files,
        uptoken,
        key,
        callback
    );
}

/**------------------------------------手机号绑定页面------------------------------**/

//获取验证码
export function getPhoneCodeApi({
    account,
    businessType,
}) {
    return axios.get('/tIdentifyingCodeGet.thtm?InterfaceVersion=' + apiVer, {
        params: {
            account,
            businessType,
        }
    })
}
//手机号绑定
export function bindPhoneApi({
    phoneNumber,
    iCode,
    openId_WeiXin,
}) {
    return axios.get('/tMemberBindWxOpenId.thtm?InterfaceVersion=' + apiVer, {
        params: {
            phoneNumber,
            iCode,
            openId_WeiXin,
        }
    })
}

/**------------------------------------管理员用户信息页面------------------------------**/

//获取企业信息
export function getUserInfoApi({
    account,
    businessType,
}) {
    return axios.get('/tIdentifyingCodeGet.thtm?InterfaceVersion=' + apiVer, {
        params: {
            // token: getToken(),
            account,
            businessType,
        }
    })
}

/**------------------------------------企业信息详情页面------------------------------**/

//获取企业信息
export function getCustomerInfoApi({
    tableId,
}) {
    return axios.get('/uCustomerDetail.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}

/**------------------------------------任务详情页面------------------------------**/

//获取任务列表
export function getTaskInfoApi({
    tableId,
}) {
    return axios.get('/tuInspectionPlanDtlForMeList.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}
//获取任务详情
export function getTaskInfoDtApi({
    tableId,
}) {
    return axios.get('/tuInspectionPlanDtlDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}
//获取任务详情
export function saveTaskDtApi({
    tableId,
    fileArr,
}) {
    return axios.get('/tuInspectionPlanDtlDetail.tuhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
            fileArr,
        }
    })
}

/**------------------------------------员工详情页面------------------------------**/

//获取员工信息
export function getStaffInfoApi({
    tableId,
}) {
    return axios.get('/uMemberDetail.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            tableId,
        }
    })
}
//获取员工证照
export function getStaffCerApi({
    staffId,
}) {
    return axios.get('/uMemberCertificationList.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            staffId,
        }
    })
}