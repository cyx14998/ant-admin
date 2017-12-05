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
  getContractList,
  getContractDelete,
} from '../../common/api/api.contractmanagement.js';

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';

//合同列表头部
const columns = [
  {
    title: '合同名称',
    dataIndex: 'theName',
  },
  {
    title: '创建人',
    dataIndex: 'editor.realName',
  }, {
    title: '甲方名称',
    dataIndex: 'firstParty',
  }, {
    title: '乙方名称',
    dataIndex: 'secondParty',
  }, {
    title: '签订日期',
    dataIndex: 'signDatetime',
  }, {
    title: '总金额',
    dataIndex: 'totalAmount',
  }, {
    title: '付款方式',
    dataIndex: 'payWay',
  }, {
    title: '单据状态',
    dataIndex: 'theState',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 120,
  }
];

function changeIframeToEdit(id) {
  console.log('chanageiframe', parent.window.iframeHook)
  parent.window.iframeHook.changePage({
    url: '/contractmanagementEdit.html?tableId=' + id + '#' + Math.random(),
    breadIncrement: '合同编辑'
  })
}
//列表页面
class ContractmanagementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      contractList: [],
      houseList: [],//仓库列表
      memberList: [], //出库人列表
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData({});
    columns[8].render = (text, record) => {
      return (
        <div>
          <a title="编辑" style={{ marginRight: '10px' }}
            onClick={() => changeIframeToEdit(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
          <Popconfirm title="确定要删除吗？" onConfirm={() => deleteContract(record.tableId)}>
            <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>
        </div>
      )
    };
  }
  //获取合同列表
  getData(params) {
    this.setState({
      loading: true
    });
    getContractList(params).then(res => {
      console.log('getContractList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }
      var data = res.data.contractList;
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
        contractList: data,
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
      warehouseId: values.warehouseId,
      storageOutMemberId: values.storageOutMemberId,
      isPass: values.isPass,
      theState: values.theState,
    });
  }

  // 合同删除
  deleteContract(id) {
    getContractDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除合同失败');
        return;
      }

      MyToast('删除合同成功');

      setTimeout(this.getData({}), 500);
    }).catch(err => console.log(err));
  }
  render() {
    // 头部搜索
    const rcsearchformData = {
      colspan: 2,
      fields: [
        {
          type: 'select',
          label: '仓库',
          name: 'warehouseId',
          defaultValue: '全部',
          options: this.state.houseList
        }, {
          type: 'select',
          label: '合同状态',
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
            <Button type="primary" style={{ marginRight: 8 }}>导出excel</Button>
            <Button type="primary"
              onClick={() => {
                return changeIframeToEdit('');
              }}>新增</Button>
          </div> */}
          <Table
            columns={columns}
            dataSource={this.state.contractList}
            loading={this.state.loading}
            rowKey="tableId"
            rowClassName={(record, index) => {
              if (index % 2 !== 0) {
                return 'active'
              }
            }}
            pagination={true} />
        </div>
      </div >
    )
  }
}

ReactDOM.render(<ContractmanagementList />, document.getElementById('root'));
