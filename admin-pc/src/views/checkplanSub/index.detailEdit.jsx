/**
 * 员工列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import RcSearchForm from '../../components/rcsearchform';

import { getLocQueryByLabel } from '../../common/utils';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '姓名',
    name: 'realName',
    rules: [{ required: true, message: '请输入员工姓名' }],
  }, ]
};
import connectEditableSectionApi from '../../components/hoc.editable.section';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';
import CheckplanDetail from './index.Detail';

import '../checkplan/index.less';

import {
    getCheckplanSubPerformer,
    getMemberList,
} from '../../common/api/api.checkplan';

import {MyToast} from '../../common/utils';
/**
 * table head
 */
const columns = [{
  title: '姓名',
  dataIndex: 'realName',
  width: '10%'
}, {
  title: '性别',
  dataIndex: 'sex',
  width: '10%'
}, {
  title: '年龄',
  dataIndex: 'age',
  width: '10%'
}, {
  title: '手机号',
  dataIndex: 'phoneNumber',
  width: '10%'
}, 
{
  title: '操作',
  dataIndex: 'operation',
  width: '20%'
}
];

/**
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  realName: '',
  sex: '',
  age: '',
  phoneNumber: ''
};


/**
 * 不可编辑模块
 */
const CheckplanDetailPerformer = connectUneditableSectionApi({
  secTitle: '',
  columns: columns,
  apiLoader: function () {
    var checkplanId = getLocQueryByLabel('checkplanId');
    
    return new Promise((resolve, reject) => {
      getMemberList({}).then(res => {
        console.log('getMemberlist res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.memberList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        reject(err)
      })
    })
    // return Promise.resolve({
    //   data: dataSource
    // })    
  },
//   apiSave: function (record) {
//     console.log('apiSave record ----', record);
//     var self = this;

//     // 新增
//     if (record.tableId === '') {
//       return new Promise((resolve, reject) => {
//         getCheckplanSubAdd({
//           ...record, inspectionPlanMstId: checkplanId
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
//         getCheckplanSubEdit({
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
//     console.log(`apiDel ${tableId}`);

//     return new Promise((resolve, reject) => {
//       getCheckplanSubDelete(tableId).then(res => {
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
//   // 弹窗组件
//   modalTitle: '检查计划子表',
//   modalComponent: InnerComponent
});

class CustomerCheckPlanSub extends Component {
  constructor(props) {
    super(props);
  }
  handleFormSearch(values) {
    console.log('handleFormSearch--------', values)
  }
  render() {
    return (
      <div className="yzy-page">
         <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData}
            handleSearch={this.handleFormSearch.bind(this)} />
        </div> 
        <div className="yzy-list-wrap">
          <CheckplanDetailPerformer />
        </div>
      </div>
    )
  }
}
export default CustomerCheckPlanSub;
