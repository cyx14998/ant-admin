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
  getPurchaseOrderList,
  getPurchaseOrderCancel,
  getPurchaseOrderDelete
} from '../../common/api/api.purchaseorders.js';

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';
// 基本信息---采购类型（固定资产    工程材料   办公用品   劳防用品  其他）
const purOrderTypeOptions = [
  {
    value: '1',
    label: '固定资产',
  }, {
    value: '2',
    label: '工程材料'
  }, {
    value: '3',
    label: '办公用品'
  }, {
    value: '4',
    label: '劳防用品'
  }, {
    value: '5',
    label: '其他'
  },
]
//采购单列表头部
const columns = [
  {
    title: '单据编号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
  }, {
    title: '采购单类型',
    dataIndex: 'theType',
    key: 'theType',
  }, {
    title: '订货时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
  }, {
    title: '厂商名称',
    dataIndex: 'manufacturerName',
    key: 'manufacturerName',
  }, {
    title: '总金额',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  }, {
    title: '已付款金额',
    dataIndex: 'hasPaymentAmount',
    key: 'hasPaymentAmount',
  }, {
    title: '单据状态',
    dataIndex: 'theState',
    key: 'theState',
  }, {
    title: '备注',
    dataIndex: 'theRemarks',
    key: 'theRemarks',
  }, {
    title: '操作',
    key: 'action',
    width: 120,
  }
];

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
    url: 'purchaseordersEdit.html?tableId=' + id + '#' + Math.random(),
    breadIncrement: '采购单编辑'
  })
}

//列表页面
class PurchaseordersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      purchaseRecordMstList: [],
      keyword: '',       // 搜索字段 单据编号
      editerKeyword: '', // 搜索字段 申请人
      theState: null,    // 搜索字段 单据状态
      startDate: '',     // 搜索字段 开始时间
      endDate: '',       // 搜索字段 结束时间
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData({});
    columns[8].render = (text, record) => {
      return (
        <div>
          <a title="编辑" onClick={() => changeIframeToEdit(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
          <Popconfirm title="确定要作废吗？" onConfirm={() => this.cancelPurchaseorder(record.tableId)}>
            <a title="作废"><Icon type="close" className="yzy-icon" /></a>
          </Popconfirm>
          <Popconfirm title="确定要删除吗？" onConfirm={() => this.deletePurchaseorder(record.tableId)}>
            <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>
        </div>
      )
    };
  }
  //获取采购单列表
  getData(params) {
    this.setState({
      loading: true
    });
    getPurchaseOrderList(params).then(res => {
      console.log('getPurchaseOrderList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }
      var data = res.data.purchaseRecordMstList;
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

        let index = item.theType - 1;
        if (index < 0) {
          index = 0;
        }

        return {
          ...item,
          theType: purOrderTypeOptions[index].label,
          theState: state,
        }
      });
      this.setState({
        loading: false,
        purchaseRecordMstList: data,
      })
    }).catch(err => {
      MyToast('接口失败');
      this.setState({
        loading: false
      });
    })
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
  }

  // 采购单作废
  cancelPurchaseorder(id) {
    getPurchaseOrderCancel({ tableId: id }).then(res => {
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
  // 采购单删除
  deletePurchaseorder(id) {
    getPurchaseOrderDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除采购单失败');
        return;
      }
      MyToast('删除成功');
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
          <div className="yzy-list-btns-wrap">
            {/* <Button type="primary"  style={{marginRight: 8}}>导出excel</Button> */}
            {/* <Button type="primary"
              onClick={() => {
                return changeIframeToEdit('');
              }}>新增</Button> */}
          </div>
          <Table
            columns={columns}
            dataSource={this.state.purchaseRecordMstList}
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

ReactDOM.render(<PurchaseordersList />, document.getElementById('root'));
