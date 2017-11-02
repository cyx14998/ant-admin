/**
 * 部门员工添加
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Row,
  Col,
  Popconfirm,
  Table,
} from 'antd';

import {
  MyToast,
} from '../../common/utils';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: '操作',
  width: 100
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}


/**
 * @props departmentId
 */
class EditDepartmentMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.addMember = this.addMember.bind(this);

    columns[3].render = (text, record) => {
      return (
        <div>
          <a href="#" onClick={() => this.addMember(record.name)}>添加</a>
        </div>
      )
    }
  }

  addMember(id) {
    alert(id)
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" style={{float: 'right'}}>添加</Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={data} />
      </div>
    )
  }
}

export default EditDepartmentMember;