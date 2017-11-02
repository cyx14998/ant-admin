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
  getDepartmentStaffList
} from '../../common/api/api.department';

import {
  MyToast,
} from '../../common/utils';

const columns = [{
  title: '姓名',
  dataIndex: 'realName',
}, {
  title: '手机号码',
  dataIndex: 'phoneNumber',
}, {
  title: '操作',
  width: 120
}];


/**
 * @props departmentId
 */
class EditDepartmentMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: []
    }

    this.addMember = this.addMember.bind(this);
    this._getDepartmentStaffList = this._getDepartmentStaffList.bind(this);

    columns[3].render = (text, record) => {
      return (
        <div>
          <a href="#" onClick={() => this.addMember(record.name)}>添加</a>
        </div>
      )
    }
  }

  componentDidMount() {
    this._getDepartmentStaffList();
  }

  addMember(id) {
    alert(id)
  }

  _getDepartmentStaffList() {
    getDepartmentStaffList({}).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '未加入部门员工列表获取失败');
        return;
      }

      let memberList = res.data.memberList;
      this.setState({
        loading: false,
        dataSource: memberList
      });
    }).catch(err => MyToast(err));
  }

  render() {
    return (
      <div>
        <Table 
          columns={columns} 
          dataSource={dataSource} />
      </div>
    )
  }
}

export default EditDepartmentMember;