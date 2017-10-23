/**
 * yzy-ui
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Icon,
  Row, 
  Col, 
  Input,
  Form,
  Table,
  Alert,
} from 'antd';
const FormItem = Form.Item;

import {
  getCustomerList
} from '../../common/api/api.customer';

import './index.less';

const dataBlob = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '企业名称',
    name: 'companyName',
  }, {
    type: 'input',
    label: '社会信用代码',
    name: 'socialCode',
  }, {
    type: 'select',
    label: '单位类别',
    name: 'companyType',
    options: [{
      label: '国企',
      value: 'gq'
    }, {
      label: '私企',
      value: 'sq'
    }]
  }, {
    type: 'select',
    label: '行业类别',
    name: 'socialType',
    options: [{
      label: '服务业',
      value: 'fwy'
    }, {
      label: '诈骗业',
      value: 'zpy'
    }]
  }]
}

import RcSearchForm from '../../components/rcsearchform';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Edit',
  dataIndex: 'edit',
  render: (text, record) => (
    <div>
      <Button type="primary" onClick={() => alert(record.name)}>编辑</Button>
    </div>)
}];
// const data = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   age: 42,
//   address: 'London No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'Joe Black',
//   age: 32,
//   address: 'Sidney No. 1 Lake Park',
// }, {
//   key: '4',
//   name: 'Disabled User',
//   age: 99,
//   address: 'Sidney No. 1 Lake Park',
// }];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};



class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      customerList: []
    }
  }

  handleSearch(values) {
    console.log('handleSearch ---------', values)
  }

  tAlert() {
    
  }


  render() {
    return (
      <div className="yzy-page" id="yzy-page">
        <Button type="primary" onClick={this.tAlert.bind(this)}>Alert</Button>
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...dataBlob} 
            handleSearch={this.handleSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary">导出excel</Button>
            <Button type="primary" style={{marginLeft: 8}}>新增</Button>
          </div>
          <Table
            columns={columns} 
            dataSource={data}
            rowSelection={rowSelection} />
        </div>
      </div>
    )
  }
}

const RcDemo = Form.create()(Demo);

ReactDOM.render(<RcDemo />, document.getElementById('root'));