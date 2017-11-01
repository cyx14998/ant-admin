/**
 * 部门管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Table
} from 'antd';

import './index.less';

import {
  getDepartmentList
} from '../../common/api/api.department';

import {
  MyToast
} from '../../common/utils';

const columns = [
  {
    title: '部门名称',
    dataIndex: 'theName'
  }, {
    title: '创建时间',
    dataIndex: 'createDatetime'
  }, {
    title: '操作',
    render: () => {
      return (<a>新增</a>)
    }
  }
];

/**
 * 总部门
 */
class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      departmentList: []
    }

    this._getDepartmentList = this._getDepartmentList.bind(this);
    this.renderSubDepartment = this.renderSubDepartment.bind(this);
  }

  componentDidMount() {
    this._getDepartmentList();
  }

  _getDepartmentList(params={}) {
    getDepartmentList(params).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取部门列表失败')
      }

      var departmentList = res.data.departmentList;

      departmentList = [{
          createDatetime: "2017-10-18 10:02:18",
          tableId: 1,
          theName: "上海友通环",
          departmentSub: [{
            createDatetime: "2017-10-18 10:02:18",
            tableId: 100,
            theName: "上海友通环保子部门"
          }]
        }, {
          createDatetime: "2017-10-18 10:02:18",
          tableId: 2,
          theName: "背景友通环"
        }]

      this.setState({
        loading: false,
        departmentList
      });
    }).catch(err => MyToast(err));
  }

  renderSubDepartment(record) {
    if (record.departmentSub === undefined) return null;
    
    return (
      <Table 
        showHeader={false}
        columns={columns} 
        dataSource={record.departmentSub}
        rowKey="tableId"
        pagination={false} />
    )
  }

  addNewDepartment(parentId) {

  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary" style={{marginLeft: 8}}
              onClick={this.addNewDepartment.bind(this)}>新增</Button>
          </div>

          <Table
            columns={columns} 
            dataSource={this.state.departmentList}
            expandedRowRender={this.renderSubDepartment}
            rowKey="tableId"
            loading={this.state.loading} />
        </div>
      </div>
    )
  }
}


const subDataBlob = [{
  createDatetime: "2017-10-18 10:02:18",
  tableId: 100,
  theName: "上海友通环保子部门"
}, {
  createDatetime: "2017-10-18 10:02:18",
  tableId: 101,
  theName: "beijing友通环保子部门"
}];

function DepartmentSub() {
  return (
    <Table 
      showHeader={false}
      columns={columns} 
      dataSource={subDataBlob}
      rowKey="tableId"
      pagination={false} />
  )
}


ReactDOM.render(<Department />, document.getElementById('root'));