/**
 * 企业信息动态列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { 
  Table,
  Button, 
  Popconfirm
} from 'antd';

import {
  getCustomerDynamicList
} from '../../common/api/api.customer.dynamic';

import {
  getLocQueryByLabel
} from '../../common/utils';

function changeParentState(id) {
  var cusId = getLocQueryByLabel('id');
  parent.window.iframeHook.changePage({
    url: '/customerDynamicEdit.html?id='+ cusId +'&dynamicId=' + id,
    breadIncrement: '客户动态信息编辑'
  })
}

const columns = [
  {
    title: '年',
    dataIndex: 'theYear',
    key: 'uniformSocialCreditCode',
    width: '25%'
  }, {
    title: '季度',
    dataIndex: 'theQuarter',
    key: 'customerName',
    width: '25%'
  }, {
    title: '月',
    dataIndex: 'theMonth',
    width: '25%'
  }, {
    title: '编辑',
    width: '25%'
  }
];

class CustomerDynamicList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      customerList: [],
    }

    this.getData = this.getData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    columns[3].render = (text, record) => {
      return (
        <div>
          <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteItem(record.tableId)}>
            <a href="#">删除</a>
          </Popconfirm>
          <a style={{marginLeft: '10px'}} onClick={() => changeParentState(record.tableId)}>查看</a>
        </div>
      )
    } 
  }

  componentDidMount() {
    this.getData({});

  }

  getData(params) {
    //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
    getCustomerDynamicList(params).then(res => {
      console.log('getCustomerDynamicList ---', res)
      if (res.data.result !== 'success') {
        alert(res.data.info || '接口失败')
        return;
      }

      this.setState({
        loading: false,
        customerList: res.data.customerMonthDclarationList.map((item, i) => {

          item.key = i;
          return item;
        })
      })
    }).catch(err => {
      alert(res.data.info || '接口失败')
    })
  }

  deleteItem(tableId) {
    alert(tableId)
  }



  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary" style={{marginLeft: 8}}
              onClick={() => changeParentState('')}>新增</Button>
          </div>
          <Table
            columns={columns} 
            dataSource={this.state.customerList}
            loading={this.state.loading}
            pagination={false}/>
          {/* <Pagination></Pagination> */}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CustomerDynamicList />, document.getElementById('root'));