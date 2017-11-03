/**
 * 企业遵守法律法规情况
 */
/**
 * 固体废物基本情况详情
 */
import React from 'react';

import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {
    MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    getEIADetail,
    getEIAUpdate,
    getEIAAdd,
} from '../../common/api/api.customer.plus.js';

import QiniuUploadFile from '../../components/upload.file';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';
class WasteWaterDischargeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            uploadedFileList: [],
        }
    }

    componentDidMount() {
        var tableId = this.props.editId;
        if (!tableId) {
            localStorage.setItem("wastewaterDischargeIsShow", "none");
            return;
        }
        localStorage.setItem("wastewaterDischargeIsShow", "block");
        getEIADetail({ tableId: tableId }).then(res => {
            var self = this;
            console.log('getWastewaterDischargeDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            self.setState({ data: res.data.customerEIA })
            var data = res.data.customerEIA;
            if (data.SelfAcceptanceURL) {
                self.setState({
                    uploadedFileList: [{
                        uid: '1',
                        name: '自主验收文件',
                        url: data.SelfAcceptanceURL,
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
            //自主验收文件
            var fileOne = this.state.uploadedFileList[0];
            // 默认
            var uploadedFilePath = fileOne.url;

            // 上传
            if (!uploadedFilePath) {
                uploadedFilePath = fileOne.length != 0 ? fileOne.response.filePath : '';
            }

            if (!uploadedFilePath) return MyToast('请上传附件');

            if (uploadedFilePath.indexOf(downloadUrl) === -1) {
                uploadedFilePath = downloadUrl + uploadedFilePath;
            }
            values.SelfAcceptanceURL = uploadedFilePath
            // var fileOne = self.state.prodFileList[0];
            // // 默认
            // console.log('777777777777777777', fileOne)
            // var uploadedFilePath = fileOne.url;

            // // 上传
            // if (!uploadedFilePath) {
            //     uploadedFilePath = fileOne.response.filePath;
            // }

            // if (!uploadedFilePath) return MyToast('请上传自主验收文件');

            // if (uploadedFilePath.indexOf(downloadUrl) === -1) {
            //     uploadedFilePath = downloadUrl + uploadedFilePath;
            // }
            // data.SelfAcceptanceURL = uploadedFilePath;

            var tableId = self.props.editId;
            if (tableId) {
                getEIAUpdate({
                    ...values,
                    tableId: tableId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("保存成功")
                    localStorage.setItem("wastewaterDischargeIsShow", "block");
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            } else {
                // 新增
                getEIAAdd({
                    ...values,
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("新增成功")
                    localStorage.setItem("wastewaterDischargeIsShow", "block");
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
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="环评建设项目名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评等级">
                                    {getFieldDecorator('theLevel', {
                                        initialValue: this.state.data.theLevel,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="环评等级" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="编制日期">
                                    {getFieldDecorator('editDatetime', {
                                        initialValue: this.state.data.editDatetime,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="编制日期" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="试生产批复-环保部门审批文号">
                                    {getFieldDecorator('DocumentNumberTPA', {
                                        initialValue: this.state.data.DocumentNumberTPA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="试生产批复-环保部门审批文号" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="试生产批复-审批时间">
                                    {getFieldDecorator('approvalTimeTPA', {
                                        initialValue: this.state.data.approvalTimeTPA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="试生产批复-审批时间" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评批复-环保部门审批文号">
                                    {getFieldDecorator('DocumentNumberEIA', {
                                        initialValue: this.state.data.DocumentNumberEIA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="环评批复-环保部门审批文号" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="环评批复-审批时间">
                                    {getFieldDecorator('approvalTimeEIA', {
                                        initialValue: this.state.data.approvalTimeEIA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="环评批复-审批时间" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="竣工验收批复-环保部门审批文号">
                                    {getFieldDecorator('DocumentNumberFAA', {
                                        initialValue: this.state.data.DocumentNumberFAA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="竣工验收批复-环保部门审批文号" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="竣工验收批复-审批时间">
                                    {getFieldDecorator('approvalTimeFAA', {
                                        initialValue: this.state.data.approvalTimeFAA,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="竣工验收批复-审批时间" />
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
