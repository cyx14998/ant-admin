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
  getWarehousingList,
  getWarehousingDelete,
  gethousingList, //获取仓库列表  
  getMemberList, //获取入库人列表 （员工列表）
} from '../../common/api/api.purchaseorderswarehousing.js';

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';

//入库单列表头部
const columns = [
  {
    title: '单据编号',
    dataIndex: 'serialNumber',
  }, {
    title: '创建人',
    dataIndex: 'editor.realName',
  }, {
    title: '入库人',
    dataIndex: 'storageInMember.realName',
  }, {
    title: '入库日期',
    dataIndex: 'storageInDatetime',
  }, {
    title: '是否审核完成',
    dataIndex: 'isPass',
  }, {
    title: '单据状态',
    dataIndex: 'theState',
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
    url: '/purchaseorderswarehousingEdit.html?warehousingId=' + id + '#' + Math.random(),
    breadIncrement: '入库单编辑'
  })
}
//列表页面
class PurchaseorderswarehousingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      storageInRecordMstList: [],
      houseList: [], //仓库列表
      memberList: [], //入库人列表
    }

    this.getData = this.getData.bind(this);
    this._gethousingList = this._gethousingList.bind(this);
    this._getMemberList = this._getMemberList.bind(this);
  }

  componentDidMount() {
    this.getData({});
    this._gethousingList({});
    this._getMemberList();
    columns[7].render = (text, record) => {
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
  //获取入库单列表
  getData(params) {
    this.setState({
      loading: true
    });
    getWarehousingList(params).then(res => {
      console.log('getWarehousingList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }
      var data = res.data.storageInRecordMstList;
      data = data.map(item => {


        return {
          ...item,
          isPass: item.isPass == 'true' ? '是' : '否',
          theState: item.theState == '0' ? '正常' : '作废',
        }
      });
      this.setState({
        loading: false,
        storageInRecordMstList: data,
      })
    }).catch(err => {
      MyToast('接口失败');
      this.setState({
        loading: false
      });
    })
  }
  //获取仓库列表
  _gethousingList() {
    gethousingList({}).then(res => {
      console.log('gethousingList res', res)

      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取仓库列表失败');
        return;
      }

      var houseList = res.data.warehouseList.map(item => {
        let house = {
          value: item.tableId + '',
          label: item.theName
        };

        return house;
      });
      houseList.unshift({
        value: '全部',
        label: '全部'
      })
      this.setState({
        houseList: houseList
      });
    }).catch(err => {
      MyToast('获取仓库列表失败')
    });
  }
  //获取入库人列表
  _getMemberList() {
    getMemberList({}).then(res => {
      console.log('getMemberList res', res)

      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取入库人列表失败');
        return;
      }
      console.log('-------------', res.data.memberList)
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
      MyToast('获取入库人列表失败')
    });
  }
  //头部搜索
  handleFormSearch(values) {
    this.getData({
      warehouseId: values.warehouseId,
      storageInMemberId: values.storageInMemberId,
      isPass: values.isPass,
      theState: values.theState,
    });
  }

  // 入库单删除
  deletePurchaseorder(id) {
    getWarehousingDelete({ tableId: id }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除入库单失败');
        return;
      }

      MyToast('删除入库单成功');

      setTimeout(this.getData({}), 500);
    }).catch(err => MyToast(err));
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
          label: '入库人',
          name: 'storageInMemberId',
          defaultValue: '全部',
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
          label: '入库单状态',
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
          <div className="yzy-list-btns-wrap">
            {/* <Button type="primary"  style={{marginRight: 8}}>导出excel</Button> */}
            <Button type="primary"
              onClick={() => {
                localStorage.removeItem('yt-customerId');

                return changeIframeToEdit('');
              }}>新增</Button>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.storageInRecordMstList}
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

ReactDOM.render(<PurchaseorderswarehousingList />, document.getElementById('root'));
