/**
 * 客户检查计划管理 -- 子表
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
    label: '企业名称',
    name: 'companyName',
    rules: [{ required: true, message: '请输入企业名称' }],
  }, {
    type: 'input',
    label: '统一社会信用代码',
    name: 'uniformSocialCreditCode',
  }, {
    type: 'select',
    label: '单位类别',
    name: 'unitCategory',
    options: [
      {
        value: "我是value1",
        label: "我是label1"
      },
    ]
  }, {
    type: 'select',
    label: '行业类别',
    name: 'industryCategory',
    options: [
      {
        value: "我是value2",
        label: "我是label2"
      },
    ]
  }]
};


import connectEditableSectionApi from '../../components/hoc.editable.section';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';
import CheckplanDetail from './index.Detail';
import CheckplanDetailPerformer from './index.DetailEdit';


import '../checkplan/index.less';

import {
  getCheckplanSublist,
  getCheckplanSubAdd,
  getCheckplanSubEdit,
  getCheckplanSubDelete,
} from '../../common/api/api.checkplan';

import { MyToast } from '../../common/utils';

// const InnerComponent = ({
//   editId
// }) => (
//     <div>
//       <WasteWaterDemoSection />
//     </div>
//   );
/**
 * table head
 */
const columns = [{
  title: '企业',
  dataIndex: 'customer.customerName',
  width: '10%'
}, {
  title: '执行者',
  dataIndex: 'performer',
  width: '10%',
}, {
  title: '状态',
  dataIndex: 'theState',
  width: '10%'
}, {
  title: '反馈单下载地址',
  dataIndex: 'feedbackSheetURL',
  width: '10%'
}, {
  title: '检查记录下载地址',
  dataIndex: 'regulatoryRecordURL',
  width: '10%'
}, {
  title: '备注',
  dataIndex: 'theRemarks',
  width: '10%'
}, {
  title: '创建时间',
  dataIndex: 'createDatetime',
  width: '10%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '20%'
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  feedbackSheetURL: '',
  regulatoryRecordURL: '',
  theRemarks: '',
  customerName: '',
  performer: '',
  theState: '',
  createDatetime: '',
};


/**
 * 不可编辑模块
 */
const EditableDemoSection = connectUneditableSectionApi({
  secTitle: '',
  columns: columns,
  apiLoader: function () {
    var checkplanId = getLocQueryByLabel('checkplanId');

    return new Promise((resolve, reject) => {
      getCheckplanSublist({ inspectionPlanMstId: checkplanId }).then(res => {
        console.log('getCheckplanSublist res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.inspectionPlanDtlList;
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
  // apiSave: function (record) {
  //   console.log('apiSave record ----', record);
  //   var self = this;

  //   // 新增
  //   if (record.tableId === '') {
  //     return new Promise((resolve, reject) => {
  //       getCheckplanSubAdd({
  //         ...record, inspectionPlanMstId: checkplanId
  //       }).then(res => {
  //         if (res.data.result !== 'success') {
  //           resolve({
  //             code: 1,
  //             info: res.data.info,
  //           });
  //           return;
  //         }

  //         resolve({
  //           code: 0 // success
  //         })
  //       }).catch(err => {
  //         reject(err)
  //       });
  //     });
  //   } else {
  //     // 编辑
  //     return new Promise((resolve, reject) => {
  //       getCheckplanSubEdit({
  //         ...record,
  //       }).then(res => {
  //         if (res.data.result !== 'success') {
  //           resolve({
  //             code: 1,
  //             info: res.data.info,
  //           });
  //           return;
  //         }

  //         resolve({
  //           code: 0 // success
  //         })
  //       }).catch(err => {
  //         reject(err)
  //       });
  //     });
  //   }
  // },
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getCheckplanSubDelete(tableId).then(res => {
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
  modalTitle: '检查计划子表',
  modalComponent: CheckplanDetail,

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
        {/* <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData}
            handleSearch={this.handleFormSearch.bind(this)} />
        </div> */}
        <div className="yzy-list-wrap">
          <EditableDemoSection />
        </div>
      </div>
    )
  }
}


ReactDOM.render(<CustomerCheckPlanSub />, document.getElementById('root'));