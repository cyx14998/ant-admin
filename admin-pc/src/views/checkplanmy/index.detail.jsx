/**
 * 检查子表编辑页面
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
    Table,
    Upload,
    Icon,
    Modal,
    Checkbox,
    Radio,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';
import QiniuUploadFile from '../../components/upload.file';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    MyPlanModalEdit
} from '../../common/api/api.checkplan.my';

import {
    getQiNiuToken,
} from '../../common/api/api.customer';

class CheckplanDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {},
            prodFileList: [],
            positionFileList: [], //检查单图
            reportFileList: [],

            getData: this.props.getData,
            TestCancel: this.props.TestCancel,
            recordEdit: this.props.recordEdit || '',//新增子表返回的子表id用来显示底面的员工列表
            uptoken: '',
        });
        this.beforeUpload = this.beforeUpload.bind(this);
        this.picReset = this.picReset.bind(this);
        this.qiniuyunData = {
            // key: Date.now(),
            // token: 'xozWSPMxkMjIVoHg2JyXq4-7-oJaEADLOKHVR0vU:1AreAaaS0j5_bjgQsHSshM0zTZI=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoianNzZGsiLCJkZWFkbGluZSI6MTUwOTAxNTA3Mn0=',
            // token:"W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:wxacrkBBNB8Pjby5ZJaQQd4NGLs=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDE1OTM2fQ==",
        };
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        self.beforeUpload();
        self.setState({
            prodFileList: [],
            positionFileList: [], //检查单图
            reportFileList: [],
        });
        if (self.state.recordEdit !== nextProps.recordEdit) {
            self.setState({
                recordEdit: nextProps.recordEdit
            })
            self.picReset();
        }
    }
    componentDidMount() {
        this.beforeUpload();
        this.setState({
            prodFileList: [],
            positionFileList: [], //检查单图
            reportFileList: [],
        })
        this.setState({
            recordEdit: this.props.recordEdit
        });
        this.picReset();
    }

    //获取uptoken
    beforeUpload(file) {
        getQiNiuToken({}).then(res => {

            if (!res.data || !res.data.uptoken) {
                console.error('getqiniuyun uptoken error');
                return;
            }
            this.setState({
                token: res.data.uptoken
            })

            console.log(res.data.uptoken);

        }).catch(err => console.log(err));
    }
    //图片、文件重置
    picReset() {
        var self = this;
        var recordEdit = self.props.recordEdit
        //图片
        if (recordEdit.feedbackSheetURL) {
            self.setState({
                prodFileList: [{
                    uid: '1',
                    name: '反馈单',
                    url: recordEdit.feedbackSheetURL
                }],
            });
        } else {
            self.setState({
                prodFileList: [],
            });
        }
        if (recordEdit.regulatoryRecordURL) {
            self.setState({
                positionFileList: [{
                    uid: '1',
                    name: '检查记录单',
                    url: recordEdit.regulatoryRecordURL
                }],
            });
        } else {
            self.setState({
                positionFileList: [],
            });
        }
        if (recordEdit.rectificationReportURL) {
            self.setState({
                reportFileList: [{
                    uid: '1',
                    name: '整改报告',
                    url: recordEdit.rectificationReportURL
                }],
            });
        } else {
            self.setState({
                reportFileList: [],
            });
        }
    }

    //反馈单
    handleProdFileList({ fileList }) {
        this.setState({
            prodFileList: fileList,
        });
    }
    //检查表
    handlePositionFileList({ fileList }) {
        this.setState({
            positionFileList: fileList,
        });
    }
    //整改报告
    handleReportFileList({ fileList }) {
        this.setState({
            reportFileList: fileList,
        });
    }

    // 基本信息保存
    saveDetail(e) {
        var self = this;
        e.preventDefault();
        const {
            form,
        } = self.props;
        form.validateFields((err, values) => {
            var data = { ...values };
            var data = {};
            //反馈单
            var prodFileUrl = self.state.prodFileList[0];
            if (!prodFileUrl) {
                prodFileUrl = "";
            } else {
                prodFileUrl = prodFileUrl.url
                console.log('prodFileUrl', prodFileUrl)
                // 上传
                if (!prodFileUrl) {
                    prodFileUrl = self.state.prodFileList[0].response.filePath;
                }
                if (!prodFileUrl) {
                    prodFileUrl = ""
                } else if (prodFileUrl.indexOf(downloadUrl) === -1) {
                    prodFileUrl = downloadUrl + prodFileUrl;
                }
            }
            //检查单
            var positionFileUrl = self.state.positionFileList[0];
            if (!positionFileUrl) {
                positionFileUrl = "";
            } else {
                positionFileUrl = positionFileUrl.url
                console.log('positionFileUrl', positionFileUrl)
                // 上传
                if (!positionFileUrl) {
                    positionFileUrl = self.state.positionFileList[0].response.filePath;
                }
                if (!positionFileUrl) {
                    positionFileUrl = ""
                } else if (positionFileUrl.indexOf(downloadUrl) === -1) {
                    positionFileUrl = downloadUrl + positionFileUrl;
                }
            }
            //整改报告
            var reportFileUrl = self.state.reportFileList[0];
            if (!reportFileUrl) {
                reportFileUrl = "";
            } else {
                reportFileUrl = reportFileUrl.url
                console.log('reportFileUrl', reportFileUrl)
                // 上传
                if (!reportFileUrl) {
                    reportFileUrl = self.state.reportFileList[0].response.filePath;
                }
                if (!reportFileUrl) {
                    reportFileUrl = ""
                } else if (reportFileUrl.indexOf(downloadUrl) === -1) {
                    reportFileUrl = downloadUrl + reportFileUrl;
                }
            }
            console.log(reportFileUrl);

            data.feedbackSheetURL = prodFileUrl;
            data.regulatoryRecordURL = positionFileUrl;
            data.rectificationReportURL = reportFileUrl;
            console.log(data)
            if (err) return;
            var myPlanSubTableId = self.state.recordEdit.tableId;
            if (myPlanSubTableId && myPlanSubTableId != undefined) {
                MyPlanModalEdit({
                    ...data,
                    tableId: myPlanSubTableId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("保存成功");
                    self.state.getData({});
                    self.state.TestCancel();
                }).catch(err => {
                    console.log(err)
                });
            }
        })
    }

    render() {
        var self = this;
        let { getFieldDecorator } = self.props.form;
        var recordEdit = self.state.recordEdit;

        return (
            <div className="yzy-tab-content-item-wrap">
                <Form onSubmit={this.saveDetail.bind(this)}>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">我的检查计划基本信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业名称">
                                    {getFieldDecorator('customerId', {
                                        //initialValue: recordEdit.customer ? recordEdit.customer.customerName : '',
                                        //rules: [{ required: true },
                                        //],
                                    })(this.state.recordEdit && this.state.recordEdit != undefined ?
                                        <div>{recordEdit.customer ? recordEdit.customer.customerName : ''}</div> :
                                        <Select>
                                            {customerOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="信用代码">
                                    {getFieldDecorator('uniformSocialCreditCode', {
                                        //initialValue: recordEdit.uniformSocialCreditCode,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.customer.uniformSocialCreditCode ? recordEdit.customer.uniformSocialCreditCode : '无'}</div>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="批号">
                                    {getFieldDecorator('lotNumber', {
                                        //initialValue: recordEdit.lotNumber,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.inspectionPlanMst.lotNumber ? recordEdit.inspectionPlanMst.lotNumber : '无'}</div>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="任务开始">
                                    {getFieldDecorator('planDateStart', {
                                        //initialValue: recordEdit.planDateStart,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.inspectionPlanMst.planDateStart ? recordEdit.inspectionPlanMst.planDateStart : '无'}</div>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="任务结束">
                                    {getFieldDecorator('planDateEnd', {
                                        //initialValue: recordEdit.planDateEnd,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.inspectionPlanMst.planDateEnd ? recordEdit.inspectionPlanMst.planDateEnd : '无'}</div>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="创建时间">
                                    {getFieldDecorator('createDatetime', {
                                        //initialValue: recordEdit.createDatetime,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.createDatetime ? recordEdit.createDatetime : '无'}</div>
                                        )}
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="状态">
                                    {getFieldDecorator('theState', {
                                        //initialValue: recordEdit.theState,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.theState ? '已完成' : '执行中'}</div>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="备注">
                                    {getFieldDecorator('theRemarks', {
                                        //initialValue: recordEdit.theRemarks,
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <div>{recordEdit.theRemarks ? recordEdit.theRemarks : '无'}</div>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">反馈单上传</h2>
                                    <QiniuUploadFile
                                        uploadTitle="反馈单上传"
                                        uploadedFileList={this.state.prodFileList}
                                        handleUploadedFileList={this.handleProdFileList.bind(this)}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">检查记录单</h2>
                                    <QiniuUploadFile
                                        uploadTitle="检查记录单"
                                        uploadedFileList={this.state.positionFileList}
                                        handleUploadedFileList={this.handlePositionFileList.bind(this)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">整改报告上传</h2>
                                    <QiniuUploadFile
                                        uploadTitle="整改报告上传"
                                        uploadedFileList={this.state.reportFileList}
                                        handleUploadedFileList={this.handleReportFileList.bind(this)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="yzy-block-center">
                        <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
                    </div>
                </Form>
            </div >
        )
    }
}
var CheckplanDetailForm = Form.create()(CheckplanDetail);

export default Form.create()(CheckplanDetailForm);
