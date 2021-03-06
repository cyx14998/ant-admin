/**
 * 部门管理 - 编辑 or 新增
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Button,
  Icon,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Switch
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import DraggableModal from '../../components/modal.draggable';

import EditDepartmentMember from './edit.department.member';

import {
  getStaffListByDeparentId,
  setDepartmentStaffLeader,
  getDepartmentStaffDelete
} from '../../common/api/api.department';

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

/**
 * 部门员工
 */
const columns = [
  {
    title: '姓名',
    dataIndex: 'realName'
  }, {
    title: '手机号码',
    dataIndex: 'phoneNumber'
  }, {
    title: '是否领导',
    dataIndex: 'isLeader'
  }, {
    title: '操作'
  }
];

/**
 * @props record  待编辑部门
 * @props departmentListOptions
 * @props addRecord
 * @props editRecord
 * @props newAddDepartmentId
 */
class DepartmentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newAddDepartmentId: '', // 新增部门时保存 departmentId
      modalVisible: false,
      departmentMemberRelationList: []  // 部门员工
    }

    this._getStaffListByDeparentId = this._getStaffListByDeparentId.bind(this);
    this.deleteStaffFromDepartment = this.deleteStaffFromDepartment.bind(this);
    this.setLeader = this.setLeader.bind(this);
  }

  componentDidMount() {
    let {
      record
    } = this.props;

    // 编辑时，获取部门员工列表
    if (record.tableId !== undefined) {
      this._getStaffListByDeparentId(record.tableId);
    }

    columns[2].render = (text, record) => {
      return (
        <Switch defaultChecked={text} onChange={(checked) => this.setLeader(checked, record.tableId)} />
      )
    };

    columns[3].render = (text, record) => {
      return (
        <div>
          <Popconfirm title="确定要删除吗？" onConfirm={() => this.deleteStaffFromDepartment(record.tableId)}>
            <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>          
        </div>
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps-----', nextProps.newAddDepartmentId)
    if (nextProps.newAddDepartmentId) {
      this.setState({
        newAddDepartmentId: nextProps.newAddDepartmentId
      })
    }
  }

  // 是否设置为领导
  setLeader(checked, tableId) {
    // console.log('setLeader--------', checked, tableId);
    var departmentId = this.props.record.tableId;
    if (!departmentId) {
      departmentId = this.state.newAddDepartmentId
    }

    setDepartmentStaffLeader({
      tableId,
      isLeader: checked
    }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '设置失败');

        this._getStaffListByDeparentId(departmentId);
        return;
      }

      MyToast('设置成功');
    }).catch(err => MyToast(err));
  }

  _getStaffListByDeparentId(departmentId) {
    getStaffListByDeparentId({departmentId}).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取部门选项失败')
      }

      let departmentMemberRelationList = res.data.departmentMemberRelationList;

      var data = departmentMemberRelationList.map(item => {
        return {
          tableId: item.tableId,
          realName: item.member.realName,
          phoneNumber: item.member.phoneNumber,
          isLeader: item.isLeader
        }
      })

      this.setState({
        departmentMemberRelationList: data
      });
    }).catch(err => MyToast(err));
  }

  deleteStaffFromDepartment(tableId) {
    
    var departmentId = this.props.record.tableId;
    if (!departmentId) {
      departmentId = this.state.newAddDepartmentId
    }

    getDepartmentStaffDelete({
      tableId
    }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除部门成员失败')
      }

      MyToast('删除部门成员成功');

      this._getStaffListByDeparentId(departmentId);      
    }).catch(err => MyToast(err));
  }

  addStaffToDepartment() {
    this.setState({
      modalVisible: true
    })
  }

  saveDetail(e) {
    e.preventDefault();

    const {
      form,
      addRecord,
      editRecord,
      record
    } = this.props;

    form.validateFields((err, values) => {
      if (err) return;

      console.log('values-------', values);
      if (record.tableId === undefined && this.state.newAddDepartmentId === '') {
        var fatherId = values.fatherId;
        if (fatherId) {
          fatherId = parseInt(fatherId)
        }
        // addrecord
        addRecord({
          fatherId: fatherId,
          theName: values.theName
        });
      } else {
        editRecord({
          fatherId: fatherId,
          tableId: record.tableId || this.state.newAddDepartmentId,
          theName: values.theName
        })
      }
    });
  }

  handleModalCancel() {
    // 关闭Modal时，清除数据
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    let {
      departmentListOptions,
      record,
      form,
    } = this.props;

    var departmentId = record.tableId;
    if (!departmentId) {
      departmentId = this.state.newAddDepartmentId
    }

    let { getFieldDecorator } = form;

    return (
      <div>
        <div className="yzy-tab-content-item-wrap">
          <h2 className="yzy-tab-content-title">部门基本信息</h2>
          <form onSubmit={this.saveDetail.bind(this)}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="部门名称">
                  {getFieldDecorator('theName', {
                    initialValue: record.theName ? record.theName + '' : '',
                    rules: [{ required: true, message: '请输入部门名称' },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="部门名称" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="上级部门">
                  {getFieldDecorator('fatherId', {
                    initialValue: record.fatherId ? record.fatherId + '' : '',
                   
                  })(
                    <Select placeholder="上级部门">
                      {
                        departmentListOptions.map(option => {
                          return (
                            <Option key={option.value} value={option.value + ''}>{option.label}</Option>
                          )
                        })
                      }
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <div className="yzy-block-center">
              <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
            </div>
          </form>
        </div>
        
        {
          (record.tableId || this.state.newAddDepartmentId) &&
          <div className="yzy-tab-content-item-wrap">
            <h2 className="yzy-tab-content-title">部门员工</h2>
            <div style={{textAlign: 'right'}}>
                <Button type="primary"
                  style={{marginBottom: '10px'}}
                  onClick={this.addStaffToDepartment.bind(this)}>
                  新增员工
                </Button>
              <Table
                columns={columns} 
                dataSource={this.state.departmentMemberRelationList}
                rowKey="tableId"
                loading={false}
                rowClassName={(record, index) => {
                  if (index % 2 !== 0) {
                    return 'active'
                  }
                }} />
            </div>
          </div>
        }

        <DraggableModal
          width="90%"
          visible={this.state.modalVisible}
          title="选择部门员工"
          onCancel={this.handleModalCancel.bind(this)}
          footer={null}>
          {
            this.state.modalVisible &&
            <EditDepartmentMember 
              departmentId={departmentId}
              getStaffListByDeparentId={this._getStaffListByDeparentId}
              handleModalCancel={this.handleModalCancel.bind(this)}  />
          }
        </DraggableModal>
      </div>
    )
  }
}

export default Form.create()(DepartmentEdit);