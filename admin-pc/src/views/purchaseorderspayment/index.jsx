import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
  Table,
  Button,
  Icon,
  Popconfirm,
  Pagination
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';

import {
  getPaymentList,
  getPaymentCancel,
  getPaymentDelete,
} from '../../common/api/api.purchaseorderspayment.js';

import {
  getMemberList, //获取创建人列表 （员工列表）
} from '../../common/api/api.purchaseorderswarehousing.js'

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';

//付款单列表头部
const columns = [
  {
    title: '单据编号',
    dataIndex: 'serialNumber',
  }, {
    title: '申请人',
    dataIndex: 'editor.realName',
  }, {
    title: '付款单金额',
    dataIndex: 'theTotalAmount',
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
  }, {
    title: '备注',
    dataIndex: 'theRemarks',
  }, {
    title: '单据状态',
    dataIndex: 'theState',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 120,
  }
];


// 头部搜索
// const rcsearchformData = {
//   colspan: 2,
//   fields: [{
//     type: 'select',
//     label: '创建人',
//     name: 'storageInMemberId',
//     options: this.state.memberList
//   },
//   {
//     type: 'select',
//     label: '审核情况',
//     name: 'isPass',
//     defaultValue: '0',
//     options: [{
//       value: '0',
//       label: '全部'
//     }, {
//       value: '1',
//       label: '审核完成'
//     }, {
//       value: '2',
//       label: '未审核'
//     }]
//   }, {
//     type: 'select',
//     label: '采购单状态',
//     name: 'theState',
//     defaultValue: '0',
//     options: [{
//       value: '0',
//       label: '全部'
//     }, {
//       value: '1',
//       label: '正常'
//     }, {
//       value: '2',
//       label: '作废'
//     }]
//   },
//   ]
// }
// const rcsearchformData = {
//   colspan: 2,
//   fields: [{
//     type: 'input',
//     label: '关键词',
//     name: 'keyword',
//   }]
// }
// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [
    {
      type: 'input',
      label: '单据编号',
      name: 'keyword',
      placeholder: '请输入单据编号',
    },
    {
      type: 'input',
      label: '申请人',
      name: 'editerKeyword',
      placeholder: '请输入申请人',
    },
    {
      type: 'picker',
      label: '开始时间',
      name: 'startDate',
      placeholder: '请选择开始时间',
    },
    {
      type: 'picker',
      label: '结束时间',
      name: 'endDate',
      placeholder: '请选择结束时间',
    },
    {
      type: 'select',
      label: '单据状态',
      name: 'theState',
      placeholder: '请选中单据状态',
      defaultValue: '-1',
      options: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '已审核',
          value: '2'
        },
        {
          label: '审核中',
          value: '0'
        },
        {
          label: '已作废',
          value: '1'
        },
      ]
    },
  ]
}

function changeIframeToEdit(id) {
  console.log('chanageiframe', parent.window.iframeHook)
  parent.window.iframeHook.changePage({
    url: 'purchaseorderspaymentEdit.html?tableId=' + id + '#' + Math.random(),
    breadIncrement: '付款单编辑'
  })
}
//列表页面
class PurchaseorderspaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      paymentRecordMstList: [],
      memberList: [], //创建人列表

      keyword: '',       // 搜索字段 单据编号
      editerKeyword: '', // 搜索字段 申请人
      theState: null,    // 搜索字段 单据状态
      startDate: '',     // 搜索字段 开始时间
      endDate: '',       // 搜索字段 结束时间
    }

    this.getData = this.getData.bind(this);
    this._getMemberList = this._getMemberList.bind(this);
  }

  componentDidMount() {
    this.getData({});
    // this._getMemberList();
    columns[6].render = (text, record) => {
      return (
        <div>
          <a title="编辑" onClick={() => changeIframeToEdit(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
          <Popconfirm title="确定要作废吗？" onConfirm={() => this.cancelPayment(record.tableId)}>
            <a title="作废"><Icon type="close" className="yzy-icon" /></a>
          </Popconfirm>
          <Popconfirm title="确定要删除吗？" onConfirm={() => this.deletePayment(record.tableId)}>
            <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>
        </div>
      )
    };
  }
  //获取付款单列表
  getData(params) {
    this.setState({
      loading: true
    });
    getPaymentList(params).then(res => {
      console.log('getPaymentList --------------', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }
      var data = res.data.paymentRecordMstList;
      data = data.map(item => {

        var state = '';
        if (item.isPass) {
          state = '已审核';
        } else {
          if (item.theState == 0) {
            state = '审核中';
          } else if (item.theState == 1) {
            state = '已作废';
          }
        }

        return {
          ...item,
          theState: state,
        }
      });
      this.setState({
        loading: false,
        paymentRecordMstList: data,
      })
    }).catch(err => {
      MyToast('接口失败');
      this.setState({
        loading: false
      });
    })
  }
  //获取创建人列表
  _getMemberList() {
    getMemberList({}).then(res => {
      console.log('getMemberList res', res)

      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取创建人列表失败');
        return;
      }
      var memberList = res.data.memberList.map(item => {
        let member = {
          value: item.tableId + '',
          label: item.realName
        };

        return member;
      });
      memberList.unshift({
        value: '全部',
        label: '全部'
      })

      this.setState({
        memberList: memberList
      });
    }).catch(err => {
      MyToast('获取创建人列表失败')
    });
  }
  //头部搜索
  handleFormSearch(values) {

    // 单据状态
    var theState = values.theState;
    if (theState == '-1') {        // 全部
      theState = null;
    }
    var startDate = values.startDate ? values.startDate.format('YYYY-MM-DD') : null;
    var endDate = values.endDate ? values.endDate.format('YYYY-MM-DD') : null;
    // 搜索
    this.getData({
      keyword: values.keyword,
      editerKeyword: values.editerKeyword,
      theState,
      startDate,
      endDate,
    });

    // 设置状态
    this.setState({
      keyword: values.keyword,
      editerKeyword: values.editerKeyword,
      theState,
      startDate,
      endDate,
    });
    // this.getData({
    //   storageInMemberId: values.storageInMemberId,
    //   isPass: values.isPass,
    //   theState: values.theState,
    // });
  }

  // 付款单作废
  cancelPayment(id) {
    getPaymentCancel({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '作废失败');
        return;
      }

      MyToast('作废成功');
      setTimeout(this.getData({
        keyword: this.state.keyword,
        editerKeyword: this.state.editerKeyword,
        theState: this.state.theState,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      }), 500);
    }).catch(err => MyToast(err));
  }
  // 付款单删除
  deletePayment(id) {
    getPaymentDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除付款单失败');
        return;
      }

      MyToast('删除付款单成功');

      setTimeout(this.getData({
        keyword: this.state.keyword,
        editerKeyword: this.state.editerKeyword,
        theState: this.state.theState,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      }), 500);
    }).catch(err => MyToast(err));
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData}
            handleSearch={this.handleFormSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          {/* <div className="yzy-list-btns-wrap">
            <Button type="primary"
              onClick={() => {
                return changeIframeToEdit('');
              }}>新增</Button>
          </div> */}
          <Table
            columns={columns}
            dataSource={this.state.paymentRecordMstList}
            loading={this.state.loading}
            rowKey="tableId"
            rowClassName={(record, index) => {
              if (index % 2 !== 0) {
                return 'active'
              }
            }}
            pagination={true} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<PurchaseorderspaymentList />, document.getElementById('root'));
