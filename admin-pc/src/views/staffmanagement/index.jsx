/**
 * 员工管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Table,
  Icon
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '关键字',
    name: 'keyword',
  }]
};

import './index.less';

import {
  getStaffList
} from '../../common/api/api.staffmanagement';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '真实姓名',
  dataIndex: 'realName',
}, {
  title: '手机号码',
  dataIndex: 'phoneNumber',
}, {
  title: '邮箱',
  dataIndex: 'email',
}, {
  title: '性别',
  dataIndex: 'sex',
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '住址',
  dataIndex: 'address'
}, {
  title: '身份证号码',
  dataIndex: 'idCard'
}, {
  title: '注册时间',
  dataIndex: 'signUpDatetime'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '100px'
}];


function changeParentState(staffId) {
  parent.window.iframeHook.changePage({
    url: '/staffmanagementEdit.html?staffId='+ staffId,
    breadIncrement: '员工信息编辑'
  })
}


class StaffManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      staffList: [],
    }

    this.getData = this.getData.bind(this);

    columns[8].render = (text, record) => {
      return (
        <div>
          <a title="编辑" onClick={() => changeParentState(record.tableId)}><Icon type="edit" className="yzy-icon" /></a>
        </div>
      )
    } 
  }

  componentDidMount() {
    this.getData({});

  }

  handleFormSearch(values) {
    console.log('handleSearch ---------', values);
    if (!values.keyword) return;

    this.getData({
      keyword: values.keyword
    });
  }

  getData(params) {
    //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
    getStaffList(params).then(res => {
      console.log('getStaffList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }

      var data = res.data.memberList;

      data = data.map(item => {
        return {
          ...item,
          sex: item.sex === 1 ? '男' : '女'
        }
      });

      this.setState({
        loading: false,
        staffList: data
      });
    }).catch(err => {
      MyToast(err || '接口失败')
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
            <Button type="primary" style={{marginLeft: 8}}
              onClick={() => changeParentState('')}>新增</Button>
          </div>
          <Table
            columns={columns} 
            dataSource={this.state.staffList}
            rowKey="tableId"
            loading={this.state.loading} />
          {/* <Pagination></Pagination> */}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<StaffManagement />, document.getElementById('root'));