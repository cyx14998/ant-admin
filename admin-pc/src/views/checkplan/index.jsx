/**
 * 客户检查计划管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import RcSearchForm from '../../components/rcsearchform';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '批号',
    name: 'lotNumber',
    rules: [{ required: true, message: '请输入批号' }],
  },
    // {
    //   type: 'input',
    //   label: '统一社会信用代码',
    //   name: 'uniformSocialCreditCode',
    // }, {
    //   type: 'select',
    //   label: '单位类别',
    //   name: 'unitCategory',
    //   options:[
    //     {
    //       value: "我是value1",
    //       label: "我是label1"
    //     },
    //   ]
    // }, {
    //   type: 'select',
    //   label: '行业类别',
    //   name: 'industryCategory',
    //   options:[
    //     {
    //       value: "我是value2",
    //       label: "我是label2"
    //     },
    //   ]
    // }
  ]
};


import connectEditableSectionApi from '../../components/hoc.editable.section';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

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
  width: '10%'
}, {
  title: '批号',
  dataIndex: 'lotNumber',
  width: '10%'
}, {
  title: '检查开始日期',
  dataIndex: 'planDateStart',
  width: '10%'
}, {
  title: '检查结束日期',
  dataIndex: 'planDateEnd',
  width: '10%'
}, {
  title: '需检查企业总数',
  dataIndex: 'totalCount',
  width: '10%'
}, {
  title: '已完成检查数量',
  dataIndex: 'completeCount',
  width: '10%'
}, {
  title: '备注',
  dataIndex: 'theRemarks',
  width: '10%'
}, 
// {
//   title: '创建时间',
//   dataIndex: 'createDatetime',
//   width: '10%'
// }, 
{
  title: '操作',
  dataIndex: 'operation',
  width: '20%'
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  serialNumber: '',
  lotNumber: '',
  planDateStart: '',
  planDateEnd: '',
  totalCount: '',
  completeCount: '',
  theRemarks: '',
  createDatetime: ''
};
//搜索功能未实现
function getData(params) {
  //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
  return new Promise((resolve, reject) => {
    getCheckplanMainlist(params).then(res => {
      console.log('getCheckplanMainlist res ---', res);

      if (res.data.result !== 'success') {
        resolve({
          code: -1,
          info: res.data.info,
        })
        return;
      }

      var data = res.data.inspectionPlanMstList;
      resolve({
        code: 0,
        data,
      })
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 可编辑模块
 */
const EditableDemoSection = connectEditableSectionApi({
  secTitle: '',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      getCheckplanMainlist({}).then(res => {
        console.log('getCheckplanMainlist res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.inspectionPlanMstList;
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
  apiSave: function (record) {
    console.log('apiSave record ----', record);
    var self = this;

    // 新增
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        getCheckplanMainAdd({
          ...record,
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
          ...record,
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
    }
  },
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

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

  // 添加新页面查看功能
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
  }
  // 搜索功能未实现
  handleFormSearch(values) {
    if (!values.lotNumber) return;

    console.log('handleFormSearch--------', values)
    getData({
      lotNumber: values.lotNumber
    })
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData}
            handleSearch={this.handleFormSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          <EditableDemoSection />
        </div>
      </div>
    )
  }
}


ReactDOM.render(<CustomerCheckPlan />, document.getElementById('root'));
