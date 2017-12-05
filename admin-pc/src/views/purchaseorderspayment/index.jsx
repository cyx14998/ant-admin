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
    title: '创建人',
    dataIndex: 'editor.realName',
  }, {
    title: '单据状态',
    dataIndex: 'theState',
  }, {
    title: '付款单金额',
    dataIndex: 'theTotalAmount',
  }, {
    title: '备注',
    dataIndex: 'theRemarks',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 120,
  }
];

function changeIframeToEdit(id) {
  console.log('chanageiframe', parent.window.iframeHook)
  parent.window.iframeHook.changePage({
    url: '/purchaseorderspaymentEdit.html?tableId=' + id + '#' + Math.random(),
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
    }

    this.getData = this.getData.bind(this);
    this._getMemberList = this._getMemberList.bind(this);
  }

  componentDidMount() {
    this.getData({});
    this._getMemberList();
    columns[5].render = (text, record) => {
      return (
        <div>
          <a title="编辑" style={{ marginRight: '10px' }} onClick={() => changeIframeToEdit(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
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
    this.getData({
      storageInMemberId: values.storageInMemberId,
      isPass: values.isPass,
      theState: values.theState,
    });
  }

  // 付款单删除
  deletePayment(id) {
    getPaymentDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除付款单失败');
        return;
      }

      MyToast('删除付款单成功');

      setTimeout(this.getData({}), 500);
    }).catch(err => MyToast(err));
  }

  render() {
    // 头部搜索
    const rcsearchformData = {
      colspan: 2,
      fields: [{
        type: 'select',
        label: '创建人',
        name: 'storageInMemberId',
        options: this.state.memberList
      },
      {
        type: 'select',
        label: '审核情况',
        name: 'isPass',
        defaultValue: '0',
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '审核完成'
        }, {
          value: '2',
          label: '未审核'
        }]
      }, {
        type: 'select',
        label: '采购单状态',
        name: 'theState',
        defaultValue: '0',
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '作废'
        }]
      },
      ]
    }
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
