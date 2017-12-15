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
  getPrintingList,
  getPrintingDelete,
  getPrintingCancel,
} from '../../common/api/api.printingmanagement.js';

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';
//用印列表头部
const columns = [
  {
    title: '单据编号',
    dataIndex: 'serialNumber',
  }, {
    title: '申请日期',
    dataIndex: 'applyDatetime',
  }, {
    title: '创建时间',
    dataIndex: 'createDatetime',
  }, {
    title: '单据状态',
    dataIndex: 'theState',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 120,
  }
];
// // 头部搜索
// const rcsearchformData = {
//   colspan: 2,
//   fields: [
//     {
//       type: 'select',
//       label: '出库人',
//       name: 'storageOutMemberId',
//       defaultValue: '全部',
//       options: this.state.memberList
//     }, {
//       type: 'select',
//       label: '用印状态',
//       name: 'theState',
//       defaultValue: '0',
//       options: [{
//         value: '0',
//         label: '全部'
//       }, {
//         value: '1',
//         label: '正常'
//       }, {
//         value: '2',
//         label: '作废'
//       }]
//     },
//   ]
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
    url: 'printingmanagementEdit.html?tableId=' + id + '#' + Math.random(),
    breadIncrement: '用印编辑'
  })
}
//列表页面
class PurchaseordersoutboundList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      officialSealList: [],
      houseList: [],//仓库列表
      memberList: [], //出库人列表
      // warehouseId: '', //搜索字段
      // storageOutMemberId: '',//搜索字段
      // theState: '',//搜索字段

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
    columns[4].render = (text, record) => {
      return (
        <div>
          <a title="编辑"
            onClick={() => changeIframeToEdit(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
          <Popconfirm title="确定要作废吗？" onConfirm={() => this.cancelPrinting(record.tableId)}>
            <a title="作废"><Icon type="close" className="yzy-icon" /></a>
          </Popconfirm>
          <Popconfirm title="确定要删除吗？" onConfirm={() => this.deletePrinting(record.tableId)}>
            <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>
        </div>
      )
    };
  }
  //获取用印列表
  getData(params) {
    this.setState({
      loading: true
    });
    getPrintingList(params).then(res => {
      console.log('getPrintingList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }
      var data = res.data.officialSealList;
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
        officialSealList: data,
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
    // this.getData({
    //   warehouseId: values.warehouseId,
    //   storageOutMemberId: values.storageOutMemberId,
    //   isPass: values.isPass,
    //   theState: values.theState,
    // });

    // this.setState({
    //   warehouseId: values.warehouseId,
    //   storageOutMemberId: values.storageOutMemberId,
    //   isPass: values.isPass,
    //   theState: values.theState,
    // });
  }

  //用印作废
  cancelPrinting(id) {
    getPrintingCancel({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '作废失败');
        return;
      }

      MyToast('用印已作废');
      setTimeout(this.getData({
        keyword: this.state.keyword,
        editerKeyword: this.state.editerKeyword,
        theState: this.state.theState,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      }), 500);
    }).catch(err => MyToast('接口失败'));
  }

  // 用印删除
  deletePrinting(id) {
    getPrintingDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除用印失败');
        return;
      }

      MyToast('删除用印成功');

      setTimeout(this.getData({
        keyword: this.state.keyword,
        editerKeyword: this.state.editerKeyword,
        theState: this.state.theState,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      }), 500);
    }).catch(err => console.log(err));
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
            <Button type="primary" style={{ marginRight: 8 }}>导出excel</Button>
            <Button type="primary"
              onClick={() => {
                return changeIframeToEdit('');
              }}>新增</Button>
          </div> */}
          <Table
            columns={columns}
            dataSource={this.state.officialSealList}
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

ReactDOM.render(<PurchaseordersoutboundList />, document.getElementById('root'));
