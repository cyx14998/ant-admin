// /**
//  * 监管记录
//  */
/**
 * 监管记录基本情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废气排放基本信息详情
import SiteInspectionDetail from './customerEdit.siteinspection.detail';

import { 
  getSiteInspectionList,
  getSiteInspectionDelete,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '文件名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '文件类型',
  dataIndex: 'theType',
  width: '10%'
}, {
  title: '文件大小',
  dataIndex: 'theSize',
  width: '10%'
}, {
  title: '文件路径',
  dataIndex: 'filePath',
  width: '10%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '10%'
}];

/**
 * 可选项
 */
const options = [{
  value: 'sy',
  label: '事业单位'
}, {
  value: 'qy',
  label: '企业单位'
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  theName: '',
  theType: {
    value: '0',
    options : [{
      value: "0",
      label: '整改报告'
    }, {
      value: "1",
      label: '园区约谈情况'
    }, {
      value: "2",
      label: '监察支队处理情况'
    }, {
      value: "3",
      label: '行政处罚情况'
    }, {
      value: "4",
      label: '信访记录'
    }]
  },
  theSize: '',
  filePath: '',
};
const InnerComponent = ({
  editId,
  itemVisible,
}) => (
  <div>
    <SiteInspectionDetail editId={editId} />
  </div>
);

const SiteInspection = connectUneditableSectionApi({
  secTitle: '监管记录基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getSiteInspectionList({}).then(res => {
        console.log('getAttachmentRecordList res ---', res);
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerSuperviseList;
         data = data.map((item,index) => {
          return {
            ...item,
            attachmentTypeId: item.attachmentType.tableId,
          }
        })
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  apiDel: function (tableId) {
    //删除
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getSiteInspectionDelete(tableId).then(res => {
        if (res.data.result !== 'success') {
          resolve({
            code: 1,
            info: res.data.info,
          });
          return;
        }

        resolve({
          code: 0 // success
        });
      }).catch(err => {
        reject(err)
      });
    });
  },
  // 弹窗组件
  modalTitle: '监管记录基本情况',
  modalComponent: InnerComponent
})

export default SiteInspection;
// import React from 'react';
// import connectEditableSectionApi from '../../components/hoc.editable.section';

// import { 
//   getSiteInspectionList,
//   getSiteInspectionAdd,
//   getSiteInspectionDelete,
//   getSiteInspectionUpdate,
// } from '../../common/api/api.customer.plus.js';

// import {
//   MyToast
// } from '../../common/utils';

// /**
//  * table head
//  */
// const columns = [{
//   title: '污染物名称',
//   dataIndex: 'pollutantName',
//   width: '10%'
// }, {
//   title: '输入执行标准文件号',
//   dataIndex: 'executeStandardNumber',
//   width: '10%'
// }, {
//   title: '标准值',
//   dataIndex: 'standardValue',
//   width: '10%'
// }, {
//   title: '污染源自动监控设施有/无',
//   dataIndex: 'isAutoMOPS',
//   width: '10%'
// }, {
//   title: '操作',
//   dataIndex: 'operation',
//   width: '10%'
// }];

// /**
//  * 可选项
//  */
// const options = [{
//   value: 'sy',
//   label: '事业单位'
// }, {
//   value: 'qy',
//   label: '企业单位'
// }];

// /**
//  * 新数据默认值
//  */
// const itemDataModel = {
//   pollutantName: '',
//   executeStandardNumber: '',
//   standardValue: '',
//   isAutoMOPS: {
//     value: '1',
//     options : [{
//       value: "1",
//       label: '是'
//     }, {
//       value: "0",
//       label: '否'
//     }]
//   },
// };

// function getEditIdHook (id) {
//   return id;
// }

// /**
//  * @params apiListItemId
//  */
// const SiteInspection = connectEditableSectionApi({
//   secTitle: '监管记录基本情况',
//   columns: columns,
//   apiLoader: function ({apiListItemId}) {
//     var editId = apiListItemId;
//     if(editId === undefined){
//       editId = localStorage.getItem('wastewater-discharge-editId');
//     }

//     // console.log('apiLoader eidtId -----------', editId)
//     return new Promise((resolve,reject) => {
//       //获取数据
//       getSiteInspectionList({wasteWaterDischargePortId:editId}).then(res => {
//         // console.log('getSiteInspectionList res ---', res);

//         if (res.data.result !== 'success') {
//           resolve({
//             code: -1,
//             info: res.data.info,
//           })
//           return;
//         }

//         var data = res.data.wasteWaterDischargeFactorList;
//         data = data.map((item,index) => {
//           return {
//             ...item,
//             isAutoMOPS: {
//               value: item.isAutoMOPS === true ? "1" : "0" ,
//               options : [{
//                 value: "1",
//                 label: "是"
//               }, {
//                 value: "0",
//                 label: "否"
//               }] 
//             }
//           }
//         })
//         resolve({
//           code: 0,
//           data,
//         })
//       }).catch(err => {
//         MyToast('接口调用失败')
//       })
//     })
//   },
//   apiSave: function (record) {
//     // 新增
//     // console.log('apiSave apiListItemId ----', record);
//     record.isAutoMOPS = record.isAutoMOPS.value;
//     var self = this;
//     if(record.apiListItemId === undefined){
//       record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
//     }
//     record.wasteWaterDischargePortId = record.apiListItemId;
//     if (record.tableId === '') {
//       return new Promise((resolve, reject) => {
//         // 新增
//         getSiteInspectionAdd({
//           ...record,
//         }).then(res => {
//           if (res.data.result !== 'success') {
//             resolve({
//               code: 1,
//               info: res.data.info,
//             });
//             return;
//           }

//           resolve({
//             code: 0 // success
//           })
//         }).catch(err => {
//           reject(err)
//         });
//       });
//     } else {
//       // 编辑
//       return new Promise((resolve, reject) => {
//         getSiteInspectionUpdate({
//           ...record,
//         }).then(res => {
//           if (res.data.result !== 'success') {
//             resolve({
//               code: 1,
//               info: res.data.info,
//             });
//             return;
//           }

//           resolve({
//             code: 0 // success
//           })
//         }).catch(err => {
//           reject(err)
//         });
//       });
//     }
//   },
//   apiDel: function (tableId) {
//     //删除
//     console.log(`apiDel ${tableId}`);

//     return new Promise((resolve, reject) => {
//       getSiteInspectionDelete(tableId).then(res => {
//         if (res.data.result !== 'success') {
//           resolve({
//             code: 1,
//             info: res.data.info,
//           });
//           return;
//         }

//         resolve({
//           code: 0 // success
//         });
//       }).catch(err => {
//         reject(err)
//       });
//     });
//   },
//   itemDataModel: itemDataModel
// });

// export default SiteInspection;