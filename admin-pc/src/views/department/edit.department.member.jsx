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
  getDepartmentStaffList,
  getDepartmentStaffAddBatch
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
  title: '当前所属部门',
  dataIndex: 'address'
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};



/**
 * @props departmentId
 */
class EditDepartmentMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: [],
      selectedRowKeys: [],
    }

    this._getDepartmentStaffList = this._getDepartmentStaffList.bind(this);
  }

  componentDidMount() {
    this._getDepartmentStaffList();
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

  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  addMemberToDepartment() {
    let {
      departmentId
    } = this.props;
   
    if (!departmentId) {
      MyToast('请确认当前所在部门')
      // return;
      departmentId = 2;
    }
    getDepartmentStaffAddBatch({
      departmentId: departmentId,
      staffArr: this.state.selectedRowKeys.join(',')
    }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '添加员工失败');
        return;
      }

      MyToast('添加员工成功');
    }).catch(err => MyToast(err));
  }

  render() {
    let selectedMembers = this.state.selectedRowKeys.length;

    return (
      <div>
        <div className="yzy-list-btns-wrap" style={{paddingBottom: 10}}>
          <Button type="primary"
            onClick={this.addMemberToDepartment.bind(this)}>添加员工</Button>
          {
            (selectedMembers !== 0) && <span style={{marginLeft: 10}}>{`已选择${selectedMembers}个员工`}</span>
          }
        </div>
        <Table 
          rowSelection={{onChange: this.onSelectChange.bind(this)}}
          columns={columns} 
          dataSource={this.state.dataSource}
          rowKey="tableId" />
      </div>
    )
  }
}

export default EditDepartmentMember;