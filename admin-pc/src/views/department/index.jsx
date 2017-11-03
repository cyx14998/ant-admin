/**
 * 部门管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Icon,
  Table,
  Modal,
  Popconfirm
} from 'antd';

import DraggableModal from '../../components/modal.draggable';

import './index.less';

import DepartmentEdit from './edit.department';

import {
  getDepartmentList,
  getDepartmentListForSelect,
  getDepartmentListAdd,
  getDepartmentListUpdate,
  getDepartmentListDelete
} from '../../common/api/api.department';

import {
  MyToast,
  convertObjectLabel
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
    width: '20%'
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
      // 总数据
      departmentList: [],

      editModalVisible: false,
      editModalTitle: '',
      editDepartmentRecord: {},

      newAddDepartmentId: '',

      departmentListOptions: []
    }

    this._getDepartmentList = this._getDepartmentList.bind(this);
    this.renderSubDepartment = this.renderSubDepartment.bind(this);
    this.deleteDepartment = this.deleteDepartment.bind(this);
    this.editDepartment = this.editDepartment.bind(this);
    this.addNewDepartment = this.addNewDepartment.bind(this);
    this._getDepartmentListForSelect = this._getDepartmentListForSelect.bind(this);
  }

  componentDidMount() {
    // all list
    this._getDepartmentList();

    this._getDepartmentListForSelect();

    columns[2].render = (text, record) => {
      return (
        <div>
          <a href="#" title="新增" style={{marginRight: '10px'}} onClick={() => this.addNewDepartment(record.tableId)}><Icon type="pushpin-o" className="yzy-icon" /></a>
          <a href="#" title="编辑" style={{marginRight: '10px'}} onClick={() => this.editDepartment(record)}><Icon type="edit" className="yzy-icon" /></a>
          <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteDepartment(record.tableId)}>
            <a href="#" title="删除"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>          
        </div>
      )
    };
  }

  _getDepartmentList(params={}) {
    getDepartmentList(params).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取部门列表失败')
      }

      var departmentList = res.data.departmentList;

      this.setState({
        loading: false,
        departmentList
      });
    }).catch(err => MyToast(err));
  }

  _getDepartmentListForSelect() {
    getDepartmentListForSelect().then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取部门选项失败')
      }

      let departmentList = res.data.departmentList;


      let departmentListOptions = convertObjectLabel(departmentList, 'tableId', 'theName');

      this.setState({
        departmentListOptions
      });
    }).catch(err => MyToast(err));
  }

  renderSubDepartment(record) {
    if (record.departmentList === undefined) return null;
    
    return (
      <Table 
        showHeader={false}
        columns={columns} 
        dataSource={record.departmentList}
        onExpand={this.onRowExpand}
        expandedRowRender={this.renderSubDepartment}
        rowKey="tableId"
        pagination={false} />
    )
  }

  deleteDepartment(id) {
    getDepartmentListDelete({tableId: id}).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除部门失败')
      }

      MyToast('删除部门成功');

      setTimeout(this._getDepartmentList, 500);

      setTimeout(this._getDepartmentListForSelect, 600);
    }).catch(err => MyToast(err));
  }

  editDepartment(record) {
    if (this.state.departmentListOptions.length === 0) {
      MyToast('部门列表请求中，请稍后再试');
      return;
    }

    this.setState({
      editModalVisible: true,
      editDepartmentRecord: record,
      editModalTitle: '部门编辑'
    })
  } 

  editDepartmentRecord({fatherId, tableId, theName}) {
    getDepartmentListUpdate({fatherId, tableId, theName}).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '编辑部门失败')
      }

      MyToast('编辑部门成功');

      setTimeout(this._getDepartmentList, 500);
    }).catch(err => MyToast(err));
  }

  addNewDepartment(fatherId) {
    if (this.state.departmentListOptions.length === 0) {
      MyToast('部门列表请求中，请稍后再试');
      return;
    }
    
    this.setState({
      editModalVisible: true,
      editDepartmentRecord: {fatherId},
      editModalTitle: '部门新增'
    });
  }

  addNewDepartmentRecord({fatherId, theName}) {
    getDepartmentListAdd({fatherId, theName}).then(res => {

      var departmentId = res.data.tableId;

      this.setState({
        newAddDepartmentId: departmentId
      });

      MyToast('新增部门成功');

      setTimeout(this._getDepartmentList, 500);

      setTimeout(this._getDepartmentListForSelect, 600);
      
    }).catch(err => MyToast(err));
  }  

  handleEditModalCancel() {
    // 关闭Modal时，清除数据
    this.setState({
      editModalVisible: false,
      newAddDepartmentId: '',
      editModalTitle: '',
      editDepartmentRecord: {}
    })
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary" style={{marginLeft: 8}}
              onClick={() => this.addNewDepartment('')}>新增</Button>
          </div>

          <Table
            columns={columns} 
            dataSource={this.state.departmentList}
            expandedRowRender={this.renderSubDepartment}
            rowKey="tableId"
            loading={this.state.loading} />
        </div>

        <Modal
          width="90%"
          visible={this.state.editModalVisible}
          title={this.state.editModalTitle}
          onCancel={this.handleEditModalCancel.bind(this)}
          footer={null}>
          {
            this.state.editModalVisible &&
            <DepartmentEdit 
              newAddDepartmentId={this.state.newAddDepartmentId}
              record={this.state.editDepartmentRecord}
              departmentListOptions={this.state.departmentListOptions}
              addRecord={this.addNewDepartmentRecord.bind(this)}
              editRecord={this.editDepartmentRecord.bind(this)} />
          }
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Department />, document.getElementById('root'));