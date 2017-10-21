/**
 * 企业列表
 */

import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import RcSearchForm from '../../components/rcsearchform';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '企业名称',
    name: 'companyName',
    rules: [{ required: true, message: '请输入企业名称' }],
  }, {
    type: 'input',
    label: '社会信用代码',
    name: 'socialCode',
  }, {
    type: 'input',
    label: '单位类别',
    name: 'companyType',
  }, {
    type: 'input',
    label: '行业类别',
    name: 'socialType',
  }]
}

import {
  getCustomerList
} from '../../common/api/api.customer';

const columns = [
  {
    title: '组织机构代码',
    dataIndex: 'postalCode',
    key: 'postalCode',
    width: '10%'
  }, {
    title: '企业名称',
    dataIndex: 'customerName',
    key: 'customerName',
    width: '50%'
  }, {
    title: '单位地址',
    dataIndex: 'unitAddress',
    key: 'unitAddress',
    width: '10%'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson',
    key: 'contactPerson',
    width: '10%'
  }, {
    title: '联系人手机',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
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
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};

function changeParentState(id) {
  parent.window.iframeHook.changePage('/customerEdit.html?id=' + id)
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
    getCustomerList(params).then(res => {
      console.log('getCustomerList ---', res)
      if (res.data.result !== 'success') {
        alert(res.data.info || '接口失败')
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
      alert(res.data.info || '接口失败')
    })
  }

  handleFormSearch(values) {
    console.log('handleSearch ---------', values);
    this.getData({})
  }

  render() {

    return (
      <div className="yzy-page" id="yzy-page">
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData} 
            handleSearch={this.handleFormSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary">导出excel</Button>
            <Button type="primary" style={{marginLeft: 8}}
              onClick={() => changeParentState('')}>新增</Button>
          </div>
          <Table
            columns={columns} 
            dataSource={this.state.customerList}
            rowSelection={rowSelection}
            loading={this.state.loading} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CustomerList />, document.getElementById('root'));