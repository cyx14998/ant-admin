/**
 * 客户检查计划管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

import RcSearchForm from '../../components/rcsearchform';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '批号',
    name: 'keyword',
    placeholder: '请输入批号',
  },
  ]
};


import connectEditableSectionApi from '../../components/hoc.editable.section';



import './index.less';

import {
  getCheckplanMainlist,
  getCheckplanMainAdd,
  getCheckplanMainEdit,
  getCheckplanMainDelete,
} from '../../common/api/api.checkplan';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
}, {
  title: '批号',
  dataIndex: 'lotNumber',
}, {
  title: '检查开始日期',
  dataIndex: 'planDateStart',
}, {
  title: '检查结束日期',
  dataIndex: 'planDateEnd',
}, {
  title: '需检查企业总数',
  dataIndex: 'totalCount',
}, {
  title: '已完成检查数量',
  dataIndex: 'completeCount',
}, {
  title: '备注',
  dataIndex: 'theRemarks',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];


/**
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  serialNumber: {
    cellType: 'input',
    value: '',
    disabled: true
  },
  lotNumber: '',
  planDateStart: moment(new Date()).format(dateFormat),
  planDateEnd: moment(new Date()).format(dateFormat),
  totalCount: {
    cellType: 'input',
    value: '',
    disabled: true
  },
  completeCount: {
    cellType: 'input',
    value: '',
    disabled: true
  },
  theRemarks: '',
};
/**
 * 可编辑模块
 */
const EditableDemoSection = connectEditableSectionApi({
  secTitle: '',
  pagination: true,
  columns: columns,
  apiLoader: function ({ apiListItemId }) {
    console.log('apiListItemId---------', apiListItemId);

    return new Promise((resolve, reject) => {
      getCheckplanMainlist({ keyword: apiListItemId }).then(res => {
        console.log('getCheckplanMainlist res ------------', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.inspectionPlanMstList;
        data = data.map(item => {
          item.serialNumber = {
            cellType: 'input',
            value: item.serialNumber,
            disabled: true
          }
          item.totalCount = {
            cellType: 'input',
            value: item.totalCount,
            disabled: true
          }
          item.completeCount = {
            cellType: 'input',
            value: item.completeCount,
            disabled: true
          }
          return item;
        });

        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        reject(err)
      })
    })
  },

  apiSave: function (record) {
    console.log('apiSave record ---------------', record);

    var self = this;
    var _record_for_save = {
      ...record,
      serialNumber: record.value,
    }
    // 新增
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        getCheckplanMainAdd({
          ..._record_for_save,
        }).then(res => {
          if (res.data.result !== 'success') {
            resolve({
              code: 1,
              info: res.data.info,
            });
            return;
          }

          resolve({
            code: 0 // success
          })
        }).catch(err => {
          reject(err)
        });
      });
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getCheckplanMainEdit({
          ..._record_for_save,
        }).then(res => {
          if (res.data.result !== 'success') {
            resolve({
              code: 1,
              info: res.data.info,
            });
            return;
          }

          resolve({
            code: 0 // success
          })
        }).catch(err => {
          console.log(err)
          reject(err)
        });
      });
    }
  },

  apiDel: function (tableId) {
    console.log(`apiDel------------ ${tableId}`);

    return new Promise((resolve, reject) => {
      getCheckplanMainDelete({ tableId }).then(res => {
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

  // 跳转新页面
  checkInNewpage: function (tableId) {
    if (tableId === '') return;

    parent.window.iframeHook.changePage({
      url: '/checkplanSub.html?checkplanId=' + tableId + '#' + Math.random(),
      breadIncrement: '检查计划清单|/checkplanSub.html?checkplanId=' + tableId + '#' + Math.random(),
    })
  },

  itemDataModel: itemDataModel
});

class CustomerCheckPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.handleFormSearch.bind(this);
  }

  // 搜索
  handleFormSearch(values) {
    // if (!values.keyword) return;
    console.log('handleFormSearch--------', values)
    this.setState({
      keyword: values.keyword  ? values.keyword : '',
    });
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData}
            handleSearch={this.handleFormSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          <EditableDemoSection apiListItemId={this.state.keyword} />
        </div>
      </div>
    )
  }
}


ReactDOM.render(<CustomerCheckPlan />, document.getElementById('root'));
