/**
 * 企业遵守法律法规情况
 */

import React from 'react';

import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
    DatePicker
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';

import {
    MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
}

// 环评等级（报告书、报告表、登记表、其它）
const theLevel = [
    {
        label: '报告书',
        value: '报告书'
    }, {
        value: '报告表',
        label: '报告表'
    }, {
        value: '登记表',
        label: '登记表'
    }, {
        value: '其他',
        label: '其他'
    },
]

import {
    getEIADetail,
    getEIAUpdate,
    getEIAAdd,
} from '../../common/api/api.customer.plus.js';

import QiniuUploadFile from '../../components/upload.file';

const downloadUrl = BaseConfig.qiniuPath;
const uploadUrl = 'http://up.qiniu.com/';
class WasteWaterDischargeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            uploadedFileList: [],

            tableId: '', // 新增的tableId
        }

        this.saveDetail = this.saveDetail.bind(this);
    }

    componentDidMount() {
        var tableId = this.props.editId;

        if (!tableId) return;

        getEIADetail({ tableId: tableId }).then(res => {
            var self = this;
            console.log('getWastewaterDischargeDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            self.setState({ data: res.data.customerEIA })
            var data = res.data.customerEIA;
            if (data.selfAcceptanceURL) {
                self.setState({
                    uploadedFileList: [{
                        uid: '1',
                        name: '自主验收文件',
                        url: data.selfAcceptanceURL,
                    }],
                });
            } else {
                self.setState({
                    uploadedFileList: [],
                });
            }
        }).catch(err => {
            MyToast('接口调用失败')
            console.log(err)
        })
    }
    //自主验收文件
    handleUploadedFileList({ fileList }) {
        this.setState({
            uploadedFileList: fileList,
        });
        console.log(fileList[0])
    }
    // 基本信息保存
    saveDetail(e) {
        e.preventDefault();

        const {
            form
        } = this.props;

        form.validateFields((err, values) => {
            if (err) return;
            var self = this;
            var data = { ...values }

            //自主验收文件
            var uploadedFilePath = self.state.uploadedFileList[0];
            if (!uploadedFilePath) {
                uploadedFilePath = "";
            } else {
                uploadedFilePath = uploadedFilePath.url
                // 上传
                if (!uploadedFilePath) {
                    uploadedFilePath = self.state.uploadedFileList[0].response.filePath;
                }
                if (!uploadedFilePath) {
                    uploadedFilePath = ""
                } else if (uploadedFilePath.indexOf(downloadUrl) === -1) {
                    uploadedFilePath = downloadUrl + uploadedFilePath;
                }
            }

            data.selfAcceptanceURL = uploadedFilePath;

            //时间            
            data.approvalTimeEIA = data.approvalTimeEIA ? data.approvalTimeEIA.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');
            data.approvalTimeFAA = data.approvalTimeFAA ? data.approvalTimeFAA.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');

            console.log('--------------',data)
            var tableId = self.props.editId;
            if (!tableId) {
                tableId = self.state.tableId
            }

            if (tableId) {
                getEIAUpdate({
                    ...data,
                    tableId: tableId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("保存成功");
                    localStorage.setItem("wastewaterDischargeIsShow", "block");

                    setTimeout(() => {
                        this.props.closeModal()
                    }, 500);
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            } else {
                // 新增
                getEIAAdd({
                    ...data,
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("新增成功")

                    this.setState({
                        tableId: res.data.tableId
                    });

                    setTimeout(() => {
                        this.props.closeModal()
                    }, 500);
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            }
        })
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="yzy-tab-content-item-wrap">
                <Form onSubmit={this.saveDetail.bind(this)}>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">企业遵守法律法规情况</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评建设项目名称">
                                    {getFieldDecorator('theName', {
                                        initialValue: this.state.data.theName,
                                        rules: [{ required: true, message: '请输入环评建设项目名称' },
                                        ],
                                    })(
                                        <Input placeholder="环评建设项目名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评等级">
                                    {getFieldDecorator('theLevel', {
                                        initialValue: this.state.data.theLevel ? this.state.data.theLevel + '' : '',
                                        rules: [{ required: true, message: '必填' },
                                        ],
                                    })(
                                        <Select placeholder="环评等级">
                                            {
                                                theLevel.map(item => {
                                                    return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评批文">
                                    {getFieldDecorator('documentNumberEIA', {
                                        initialValue: this.state.data.documentNumberEIA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="环评批文" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评批文-审批时间">
                                    {getFieldDecorator('approvalTimeEIA', {
                                        initialValue: moment(this.state.data.approvalTimeEIA || new Date(), 'YYYY-MM-DD'),
                                    })(
                                        <DatePicker />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="验收批文">
                                    {getFieldDecorator('documentNumberFAA', {
                                        initialValue: this.state.data.documentNumberFAA,
                                    })(
                                        <Input placeholder="验收批文" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="竣工验收批复-审批时间">
                                    {getFieldDecorator('approvalTimeFAA', {
                                        initialValue: moment(this.state.data.approvalTimeFAA || new Date(), 'YYYY-MM-DD'),
                                    })(
                                        <DatePicker />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <h2 className="yzy-tab-content-title">自主验收文件</h2>
                                <QiniuUploadFile
                                    uploadTitle="文件上传"
                                    uploadedFileList={this.state.uploadedFileList}
                                    handleUploadedFileList={this.handleUploadedFileList.bind(this)}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="yzy-block-center">
                        <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Form.create()(WasteWaterDischargeDetail);
