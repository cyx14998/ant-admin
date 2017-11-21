/**
 * 公告管理编辑页面
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
    Select,
    Table,
    Button
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

import '../../ueditor/ueditor.config';
import '../../ueditor/ueditor.all.min';
import '../../ueditor/lang/zh-cn/zh-cn';

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
    uLeaveApplicationAdd,
    uLeaveApplicationCancel,
    uLeaveApplicationUpdate
} from '../../common/api/api.noticemanagement';

/**
 * table head
 */
const columns = [{
    title: '审核日期',
    dataIndex: 'date',
}, {
    title: '审核人',
    dataIndex: 'name',
}, {
    title: '审核意见',
    dataIndex: 'remark',
}];


class NoticeManagementSubDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {},

            recordEdit: this.props.recordEdit || {},//新增子表返回的子表id用来显示底面的员工列表
        });
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            self.setState({
                recordEdit: nextProps.recordEdit,
            })
            // console.log('will-------------', nextProps.recordEdit);
        }
        this.ueditorInit();
    }
    componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        UE.delEditor(this.props.id);
    }
    componentDidMount() {
        var self = this;
        // console.log('did-------------------', self.props.recordEdit);
        self.setState({
            recordEdit: self.props.recordEdit,
        });
        this.ueditorInit();

    }

    ueditorInit() {
        var editor = UE.getEditor(this.props.id, {
            //工具栏
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'simpleupload',
                'horizontal', 'date', 'time',
            ]]
            , lang: "zh-cn"
            //字体
            , 'fontfamily': [
                { label: '', name: 'songti', val: '宋体,SimSun' },
                { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' },
                { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' },
                { label: '', name: 'heiti', val: '黑体, SimHei' },
                { label: '', name: 'lishu', val: '隶书, SimLi' },
                { label: '', name: 'andaleMono', val: 'andale mono' },
                { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' },
                { label: '', name: 'arialBlack', val: 'arial black,avant garde' },
                { label: '', name: 'comicSansMs', val: 'comic sans ms' },
                { label: '', name: 'impact', val: 'impact,chicago' },
                { label: '', name: 'timesNewRoman', val: 'times new roman' }
            ]
            //字号
            , 'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36]
            , enableAutoSave: false
            , autoHeightEnabled: false
            , initialFrameHeight: this.props.height
            , initialFrameWidth: '100%'
            , readonly: this.props.disabled
        });
        var me = this;
        editor.ready(function (ueditor) {
            var value = me.props.recordEdit && me.props.recordEdit.realName ? me.props.recordEdit.realName : me.props.value;
            editor.setContent(value);
        });
    }
    // 确定
    saveDetail() {
        var self = this;
        var form = this.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            var tableId = self.props.recordEdit.tableId;
            var modalType = self.props.recordEdit.modalType;
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
            var beginTime = values.beginTime ? values.beginTime.format().split('T')[1].split('+')[0] : '00:00:00';
            var endDate = values.endDate ? values.endDate.format().split('T')[0] : (new Date()).toLocaleDateString();
            var endTime = values.endTime ? values.endTime.format().split('T')[1].split('+')[0] : '00:00:00';

            var beginDatetime = beginDate + ' ' + beginTime;
            var endDatetime = endDate + ' ' + endTime;
            var theHoure = values.theHoure;
            if (modalType && modalType == 'add') {
                uLeaveApplicationAdd({
                    theType,
                    theReason,
                    beginDatetime,
                    endDatetime,
                    theHoure,
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '更新失败');
                    }
                    setTimeout(() => {
                        self.props.getData({});
                        self.props.modalCancel();
                    }, 500);
                }).catch(err => MyToast('新增失败'))
            } else {
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
                    }
                    setTimeout(() => {
                        self.props.getData({});
                        self.props.modalCancel();
                    }, 500);
                }).catch(err => MyToast('更新失败'))
            }
        });
    }

    // 作废
    submitApproval() {
        //调送审接口 成功后关闭弹窗
        var tableId = this.props.recordEdit.tableId;
        var self = this;
        uLeaveApplicationCancel({
            tableId
        }).then(res => {
            if (res.result !== 'success') {
                MyToast(res.data.info || '作废失败');
            }
            setTimeout(() => {
                self.props.getData({});
                self.props.modalCancel();
            }, 500);
        }).catch(err => MyToast('作废失败'));
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var recordEdit = this.state.recordEdit;
        switch (recordEdit.theType) {
            case 0:
                recordEdit.theType = '事假';
                break;
            case 1:
                recordEdit.theType = '病假';
                break;
            case 2:
                recordEdit.theType = '年假';
                break;
            case 3:
                recordEdit.theType = '调休';
                break;
            case 4:
                recordEdit.theType = '其他';
                break;
            default:
                break;
        }
        if (recordEdit.theState == 0) {
            recordEdit.theState = '正常';
        } else if (recordEdit.theState == 1) {
            recordEdit.theState = '作废';
        }
        var beginDate = recordEdit.beginDatetime ? recordEdit.beginDatetime.split(' ')[0] : new Date();
        var beginTime = recordEdit.beginDatetime ? recordEdit.beginDatetime.split(' ')[1] : '00:00:00';
        var endDate = recordEdit.endDatetime ? recordEdit.endDatetime.split(' ')[0] : new Date();
        var endTime = recordEdit.endDatetime ? recordEdit.endDatetime.split(' ')[1] : '00:00:00';
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <Form>
                        {/* <h2 className="yzy-tab-content-title">基本信息</h2> */}
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="编号：">
                                    {recordEdit.serialNumber ? recordEdit.serialNumber : '空'}
                                </FormItem>
                            </Col>
                            {/* <Col span={8}>
                                <FormItem {...formItemLayout} label="姓名：">
                                    {recordEdit.member ? recordEdit.member.realName : ''}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="电话：">
                                    {recordEdit.member ? recordEdit.member.realName : ''}
                                </FormItem>
                            </Col> */}
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="请假时长(h)：">
                                    {getFieldDecorator('theHoure', {
                                        initialValue: recordEdit.theHoure,
                                        rules: [
                                            { required: true },
                                            { pattern: /^[0-9]*$/ }
                                        ],
                                    })(
                                        <Input placeholder="请假时长(h)" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="请假单类型：">
                                    {getFieldDecorator('theType', {
                                        initialValue: recordEdit.theType,
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
                                        initialValue: recordEdit.theReason,
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
                                <Row>
                                    <Col span={16}>
                                        <FormItem {...formItemLayout2} label="开始时间：">
                                            {getFieldDecorator('beginDate', {
                                                initialValue: beginDate ? moment(beginDate, dateFormat) : moment(),
                                            })(
                                                <DatePicker style={{ width: '100%' }} format={dateFormat} placeholder="日期" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout3}>
                                            {getFieldDecorator('beginTime', {
                                                initialValue: beginTime ? moment(beginTime, 'HH:mm:ss') : moment(),
                                            })(
                                                <TimePicker style={{ width: '100%' }} placeholder="时间" />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={16}>
                                        <FormItem {...formItemLayout2} label="结束时间：">
                                            {getFieldDecorator('endDate', {
                                                initialValue: endDate ? moment(endDate, dateFormat) : moment(),
                                            })(
                                                <DatePicker style={{ width: '100%' }} format={dateFormat} placeholder="日期" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout3}>
                                            {getFieldDecorator('endTime', {
                                                initialValue: endTime ? moment(endTime, 'HH:mm:ss') : moment(),
                                            })(
                                                <TimePicker style={{ width: '100%' }} placeholder="时间" />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="审核状态：">
                                    {recordEdit.theState}
                                </FormItem>
                            </Col>
                        </Row>
                        <script id={this.props.id} name="content" type="text/plain"></script>
                    </Form>
                    {/* <h2 className="yzy-tab-content-title">审核记录</h2>
                    <Table
                        columns={columns}
                        dataSource={this.state.staffList}
                        rowKey="tableId"
                        loading={this.state.loading}
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }} /> */}
                    <div className="actions-btns">
                        {
                            recordEdit.modalType && recordEdit.modalType == 'edit' && <Button type="primary" className="btn-cancel" onClick={this.submitApproval.bind(this)}>退回</Button>
                        }
                        <Button type="primary" className="btn-cancel">审核</Button>
                        <Button type="primary" onClick={this.saveDetail.bind(this)}>确定</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(NoticeManagementSubDetail);
