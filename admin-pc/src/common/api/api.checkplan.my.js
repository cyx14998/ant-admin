 // 我的检查计划管理
 import axios, {
     getToken,
     getCustomerId,
     apiVer
 } from './index';

 // 我的检查计划主表列表
 export function MyPlanlist({
     pageNumber = 1,
     countPerPage = 1000,
     keyword,
     isComplete
 }) {
     var params = {};
     // 完成情况        
     if (isComplete === '1') {
         params.isComplete = true;
     } else if (isComplete === '2') {
         params.isComplete = false;
     }
     return axios.get('/uInspectionPlanDtlForMeList.uhtm?InterfaceVersion=' + apiVer, {
         params: {
             token: getToken(),
             pageNumber,
             countPerPage,
             keyword,
             ...params
         }
     })
 }
 // 我的检查计划任务完成
 export function getCheckplanSubComplete({
     tableId,
 }) {
     return axios.get('/uInspectionPlanDtlComplete.uhtm?InterfaceVersion=' + apiVer, {
         params: {
             token: getToken(),
             tableId,
         }
     })
 }
 // 我的检查计划编辑保存
 export function MyPlanModalEdit({
     tableId,
     feedbackSheetURL,
     regulatoryRecordURL,
     rectificationReportURL,
 }) {
     return axios.get('/uInspectionPlanDtlUpdate.uhtm?InterfaceVersion=' + apiVer, {
         params: {
             token: getToken(),
             tableId,
             feedbackSheetURL,
             regulatoryRecordURL,
             rectificationReportURL,
         }
     })
 }