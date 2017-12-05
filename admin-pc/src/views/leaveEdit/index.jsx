/**
 * 请假管理编辑页面
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    TimePicker,
    Popconfirm,
    Select,
    Table,
    Button,
    Affix
} from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

import DraggableModal from '../../components/modal.draggable';

import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const formItemLayout2 = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
}

const formItemLayout3 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
}

import {
    uLeaveApplicationDetail,
    uLeaveApplicationAdd,
    uLeaveApplicationCancel,
    uLeaveApplicationUpdate,
    uLeaveApplicationPass,
    uLeaveApplicationReject,
} from '../../common/api/api.LeaveManagement';
import {
    getCheckRecordList
} from '../../common/api/api.purchaseorderswarehousing';

/**
 * table head
 */
const columns = [
    {
        title: '审核日期',
        dataIndex: 'createDatetime',
    }, {
        title: '审核人',
        dataIndex: 'realName',
    }, {
        title: '审核意见',
        dataIndex: 'theContent',
    }, {
        title: '审核结果',
        dataIndex: 'theFlowResult',
    }
];


class LeaveManagementSubDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            tableId: getLocQueryByLabel('tableId'),
            suggestContent: '',    //审核意见
            type: '',              // 类型 pass 审核  reject 退回
            suggestModalVisible: false, // 弹窗
            flowHistoryList: [], // 审核记录
            flowOrderStateId: '', // 审核单据ID

            leaveEditData: {},
        });

        this.getData = this.getData.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
    }
    componentDidMount() {
        if (this.state.tableId) {
            var tableId = this.state.tableId;
            this.getData({
                tableId
            });
        }
    }

    getData(params) {
        var self = this;
        uLeaveApplicationDetail(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败');
                return;
            }
            var leaveEditData = res.data.leaveApplication;
            leaveEditData.realName = leaveEditData.member.realName;
            leaveEditData.phoneNumber = leaveEditData.member.phoneNumber;
            var theState = '';
            if (leaveEditData.isPass) {
                theState = '已审核';
            } else {
                if (leaveEditData.theState == 0) {
                    theState = '审核中';
                } else if (leaveEditData.theState == 1) {
                    theState = '已作废';
                }
            }
            switch (leaveEditData.theType) {
                case 0:
                    leaveEditData.theType = '事假';
                    break;
                case 1:
                    leaveEditData.theType = '病假';
                    break;
                case 2:
                    leaveEditData.theType = '年假';
                    break;
                case 3:
                    leaveEditData.theType = '调休';
                    break;
                case 4:
                    leaveEditData.theType = '其他';
                    break;
                default:
                    break;
            }
            leaveEditData.theState = theState;
            leaveEditData.sex = leaveEditData.member.sex === 1 ? '男' : '女';
            this.setState({
                leaveEditData
            });
            var flowOrderStateId = res.data.leaveApplication.flowOrderState ? res.data.leaveApplication.flowOrderState.tableId : '';
            if (flowOrderStateId) {
                self.setState({
                    flowOrderStateId
                })
                self._getCheckRecordList({
                    flowOrderStateId
                })
            }
        }).catch(err => MyToast('接口失败'));
    }

    // 获取审核记录信息
    _getCheckRecordList(flowOrderStateId) {
        getCheckRecordList(flowOrderStateId).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败');
                return;
            }
            var flowHistoryList = res.data.flowHistoryList;

            flowHistoryList.length ?
                flowHistoryList.map(item => {
                    item.realName = item.member.realName;
                    item.theFlowResult = item.theFlowResult ? '审核通过' : '审核不通过'
                }) : '';
            this.setState({
                flowHistoryList
            });
        }).catch(err => MyToast('接口失败'));
    }
    // 确定
    saveDetail() {
        var self = this;
        var form = this.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            var tableId = self.state.tableId;
            var theReason = values.theReason;
            if (values.theType) {
                switch (values.theType) {
                    case '事假':
                        values.theType = 0;
                        break;
                    case '病假':
                        values.theType = 1;
                        break;
                    case '年假':
                        values.theType = 2;
                        break;
                    case '调休':
                        values.theType = 3;
                        break;
                    case '其他':
                        values.theType = 4;
                        break;
                }
            }
            var theType = values.theType;

            var beginDate = values.beginDate ? values.beginDate.format().split('T')[0] : (new Date()).toLocaleDateString();
            var endDate = values.endDate ? values.endDate.format().split('T')[0] : (new Date()).toLocaleDateString();

            var beginDatetime = beginDate;
            var endDatetime = endDate;
            var theHoure = values.theHoure;
            if (tableId) {
                uLeaveApplicationUpdate({
                    tableId,
                    theType,
                    theReason,
                    beginDatetime,
                    endDatetime,
                    theHoure,
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '更新失败');
                        return;
                    }
                    MyToast('成功');
                }).catch(err => MyToast('更新失败'))
            } else {
                uLeaveApplicationAdd({
                    theType,
                    theReason,
                    beginDatetime,
                    endDatetime,
                    theHoure,
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '新增失败');
                        return;
                    }
                    self.setState({
                        tableId: res.data.tableId,
                        flowOrderStateId: res.data.flowOrderStateId
                    });
                    MyToast('成功');
                }).catch(err => MyToast('新增失败'))
            }
        });
    }

    // 作废
    leaveCancel() {
        //调作废接口 成功后关闭弹窗
        var tableId = this.state.tableId;
        var self = this;
        uLeaveApplicationCancel({
            tableId,
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }
            MyToast('成功');
        }).catch(err => MyToast('作废失败'));
    }

    // 退回
    leaveReject() {
        //调退回接口 成功后关闭弹窗
        var tableId = this.state.tableId;
        var theContent = this.state.suggestContent;
        var self = this;
        uLeaveApplicationReject({
            tableId,
            theContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '退回失败');
                return;
            }
            MyToast('成功');
            this.suggestModalCancel();
        }).catch(err => MyToast('退回失败'));
    }

    // 审核
    leavePass() {
        //调审核接口 成功后关闭弹窗
        var tableId = this.state.tableId;
        var theContent = this.state.suggestContent;
        var self = this;
        uLeaveApplicationPass({
            tableId,
            theContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '审核失败');
                return;
            }
            MyToast('成功');
            this.suggestModalCancel();
            this._getCheckRecordList({
                flowOrderStateId: self.state.flowOrderStateId
            });
        }).catch(err => MyToast('审核失败'));
    }

    // onchange审核意见
    setSuggestContent(e) {
        this.setState({
            suggestContent: e.target.value
        });
    }

    // 审核意见弹窗关闭
    suggestModalCancel() {
        this.setState({
            suggestModalVisible: false,
        })
    }

    // 审核意见弹窗打开
    suggestModalShow(type) {
        this.setState({
            type,
            suggestModalVisible: true,
        });
    }

    // 审核弹窗确定操作
    suggestConfirm() {
        var type = this.state.type;
        if (type == 'reject') {
            this.leaveReject();
        } else if (type == 'pass') {
            this.leavePass();
        }
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var leaveEditData = this.state.leaveEditData;
        var self = this;
        var beginDate = leaveEditData.beginDatetime ? leaveEditData.beginDatetime.split(' ')[0] : new Date();
        var endDate = leaveEditData.endDatetime ? leaveEditData.endDatetime.split(' ')[0] : new Date();
        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap yzy-tab-content-item-wrap">
                    <Affix className="actions-btns">
                        <Button type="primary" onClick={this.saveDetail.bind(this)}>保存</Button>
                        <Button type="primary" onClick={this.suggestModalShow.bind(this, 'pass')}>审核</Button>
                        <Popconfirm title='是否作废' onConfirm={this.leaveCancel.bind(this)} okText="确定" cancelText="取消">
                            <Button type="primary" className="btn-cancel">作废</Button>
                        </Popconfirm>
                        <Button type="primary" className="btn-reject" onClick={this.suggestModalShow.bind(this, 'reject')}>退回</Button>
                    </Affix>
                    <DraggableModal
                        visible={this.state.suggestModalVisible}
                        title={this.state.type == 'pass' ? '审核意见' : '退回意见'}
                        width='70%'
                        okText=''
                        footer={null}
                        onCancel={this.suggestModalCancel.bind(this)}
                        className='modal editModal'
                    >
                        <div className="suggestModal">
                            <TextArea rows={6} onChange={this.setSuggestContent.bind(this)} placeholder='请输入意见' />
                            <Button type="primary" onClick={self.suggestConfirm.bind(self)}>确定</Button>
                        </div>
                    </DraggableModal>
                    <Form>
                        <h2 className="yzy-tab-content-title">基本信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="编号：">
                                    <Input placeholder="编号" value={leaveEditData.serialNumber ? leaveEditData.serialNumber : ''} disabled />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="姓名：">
                                    <Input placeholder="姓名" value={leaveEditData.realName} disabled />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="性别：">
                                    <Input placeholder="性别" value={leaveEditData.sex} disabled />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="请假时长(h)：">
                                    {getFieldDecorator('theHoure', {
                                        initialValue: leaveEditData.theHoure,
                                        rules: [
                                            {
                                                required: true,
                                            },
                                            {
                                                pattern: /^[0-9]*$/,
                                                message: '请输入数字',
                                            },
                                        ],
                                    })(
                                        <Input placeholder="请假时长(h)" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="请假单类型：">
                                    {getFieldDecorator('theType', {
                                        initialValue: leaveEditData.theType,
                                        rules: [{ required: true },
                                        ],
                                    })(
                                        <Select>
                                            <Option value="0">事假</Option>
                                            <Option value="1">病假</Option>
                                            <Option value="2">年假</Option>
                                            <Option value="3">调休</Option>
                                            <Option value="4">其他</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="请假事由：">
                                    {getFieldDecorator('theReason', {
                                        initialValue: leaveEditData.theReason,
                                        rules: [
                                            { required: true }
                                        ],
                                    })(
                                        <Input placeholder="请假事由" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="开始时间：">
                                    {getFieldDecorator('beginDate', {
                                        initialValue: beginDate ? moment(beginDate, dateFormat) : moment(),
                                    })(
                                        <DatePicker style={{ width: '100%' }} format={dateFormat} placeholder="日期" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="结束时间：">
                                    {getFieldDecorator('endDate', {
                                        initialValue: endDate ? moment(endDate, dateFormat) : moment(),
                                    })(
                                        <DatePicker style={{ width: '100%' }} format={dateFormat} placeholder="日期" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="审核状态：">
                                    <Input placeholder="审核状态" value={leaveEditData.theState} disabled />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <h2 className="yzy-tab-content-title">审核记录</h2>
                    <Table
                        columns={columns}
                        dataSource={this.state.flowHistoryList}
                        rowKey="tableId"
                        loading={this.state.loading}
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }} />

                </div>
            </div>
        )
    }
}

const LeaveEdit = Form.create()(LeaveManagementSubDetail);

ReactDOM.render(<LeaveEdit />, document.getElementById('root'));