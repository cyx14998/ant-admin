/**
 * 企业信息动态列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { 
  Table,
  Button, 
  Pagination 
} from 'antd';

import {
  getCustomerDynamicList
} from '../../common/api/api.customer.dynamic';

function changeParentState(id) {
  parent.window.iframeHook.changePage('/customerDynamicEdit.html?id=' + id)
}

const columns = [
  {
    title: '统一社会信用代码',
    dataIndex: 'uniformSocialCreditCode',
    key: 'uniformSocialCreditCode',
    width: '10%'
  }, {
    title: '企业名称',
    dataIndex: 'customerName',
    key: 'customerName',
    width: '10%'
  }, {
    title: '单位地址',
    dataIndex: 'unitAddress',
    key: 'unitAddress',
    width: '20%'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson',
    key: 'contactPerson',
    width: '10%'
  }, {
    title: '电话',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: '10%'
  }, {
    title: '传真',
    dataIndex: 'fax',
    key: 'fax',
    width: '10%'
  }, {
    title: '邮政编码',
    dataIndex: 'postalCode',
    key: 'postalCode',
    width: '10%'
  }, {
    title: '编辑',
    key: 'action',
    width: '10%',
    render: (text, record) => (<div>
      <Button type="primary" onClick={() => changeParentState(record.tableId)}>编辑</Button>
    </div>)
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
  }

  componentDidMount() {
    this.getData({})
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

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary">导出excel</Button>
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