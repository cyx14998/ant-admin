import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { 
  Table,
  Button, 
  Pagination 
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '企业名称',
    name: 'customerName',
  }, {
    type: 'input',
    label: '统一社会信用代码',
    name: 'uniformSocialCreditCode',
  }]
}

import {
  getCustomerList
} from '../../common/api/api.customer';

import {
  MyToast
} from '../../common/utils';

const columns = [
  {
    title: '统一社会信用代码',
    dataIndex: 'uniformSocialCreditCode',
    key: 'uniformSocialCreditCode',
  }, {
    title: '企业名称',
    dataIndex: 'customerName',
    key: 'customerName',
  }, {
    title: '单位地址',
    dataIndex: 'unitAddress',
    key: 'unitAddress',
  }, {
    title: '联系人',
    dataIndex: 'contactPerson',
    key: 'contactPerson',
  }, {
    title: '电话',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  }, {
    title: '传真',
    dataIndex: 'fax',
    key: 'fax',
  }, {
    title: '邮政编码',
    dataIndex: 'postalCode',
    key: 'postalCode',
  }, {
    title: '操作',
    key: 'action',
    width: 120,
    render: (text, record) => (
      <div>
        <a type="primary" onClick={() => changeIframeToEdit(record.tableId)}>编辑</a>
        <a style={{marginLeft: '10px'}} type="primary" onClick={() => changeIframeToDynamic(record.tableId)}>查看动态</a>
      </div>
    )
  }
];

function changeIframeToEdit(id) {
  console.log('chanageiframe', parent.window.iframeHook)
  parent.window.iframeHook.changePage({
    url: '/customerEdit.html?id=' + id + '#' + Math.random(),
    breadIncrement: '客户信息编辑'
  })
}

function changeIframeToDynamic(id) {
  parent.window.iframeHook.changePage({
    url: '/customerDynamic.html?id=' + id,
    breadIncrement: '客户动态信息|/customerDynamic.html?id=' + id,
  })
}

//列表页面
class CustomerList extends React.Component {
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
    getCustomerList(params).then(res => {
      console.log('getCustomerList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }

      this.setState({
        loading: false,
        customerList: res.data.customerList.map((item, i) => {

          item.key = i;
          return item;
        })
      })
    }).catch(err => {
      MyToast('接口失败')
    })
  }

  handleFormSearch(values) {
    console.log('handleSearch ---------', values);
    this.getData({
      companyName: values.companyName,
      uniformSocialCreditCode: values.uniformSocialCreditCode,
    });
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
            <Button type="primary">导出excel</Button>
            <Button type="primary" style={{marginLeft: 8}}
              onClick={() => {
                console.log('-=========------- onClick');
                return changeIframeToEdit('');
              }}>新增</Button>
          </div>
          <Table
            columns={columns} 
            dataSource={this.state.customerList}
            loading={this.state.loading}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CustomerList />, document.getElementById('root'));
