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

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '单据编号',
    name: 'serialNumber',
  }, {
    type: 'input',
    label: '厂商名称',
    name: 'manufacturerName',
  }]
}

import {
  getPurchaseOrderList,
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

function changeIframeToEdit(id) {
  console.log('chanageiframe', parent.window.iframeHook)
  parent.window.iframeHook.changePage({
    url: '/purchaseordersEdit.html?tableId=' + id + '#' + Math.random(),
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
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData({});
    columns[8].render = (text, record) => {
      return (
        <div>
          <a title="编辑" style={{ marginRight: '10px' }} onClick={() => changeIframeToEdit(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
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
    this.getData({
      serialNumber: values.serialNumber,
      manufacturerName: values.manufacturerName,
    });
  }
  // 采购单删除
  deletePurchaseorder(id) {
    getPurchaseOrderDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除采购单失败');
        return;
      }
      setTimeout(this.getData({}), 500);
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
