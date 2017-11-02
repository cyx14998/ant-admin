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
    getWasteSolidDetail,
    getWastesolidUpdate,
    getWastesolidAdd,
} from '../../common/api/api.customer.plus.js';

import QiniuUploadFile from '../../components/upload.file';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

class WasteWaterDischargeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            prodFileList: [],
            positionFileList: [],
            reportFileList: [],
        }
        // this.picReset = this.picReset.bind(this);
    }

    componentDidMount() {
        var tableId = this.props.editId;
        if (!tableId) {
            localStorage.setItem("wastewaterDischargeIsShow", "none");
            return;
        }
        localStorage.setItem("wastewaterDischargeIsShow", "block");
        getWasteSolidDetail({ tableId: tableId }).then(res => {
            console.log('getWastewaterDischargeDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            this.setState({ data: res.data.wasteSolid })
        }).catch(err => {
            MyToast('接口调用失败')
        })
        // this.picReset();
    }
    // //图片、文件重置
    // picReset() {
    //     var self = this;
    //     var recordEdit = self.props.recordEdit
    //     //图片
    //     if (recordEdit.standingBookURL) {
    //         self.setState({
    //             prodFileList: [{
    //                 uid: '1',
    //                 name: '台账',
    //                 url: recordEdit.standingBookURL
    //             }],
    //         });
    //     } else {
    //         self.setState({
    //             prodFileList: [],
    //         });
    //     }
    //     if (recordEdit.filingInfoURL) {
    //         self.setState({
    //             positionFileList: [{
    //                 uid: '1',
    //                 name: '备案',
    //                 url: recordEdit.filingInfoURL
    //             }],
    //         });
    //     } else {
    //         self.setState({
    //             positionFileList: [],
    //         });
    //     }
    //     if (recordEdit.transferManifestURL) {
    //         self.setState({
    //             reportFileList: [{
    //                 uid: '1',
    //                 name: '转移单',
    //                 url: recordEdit.transferManifestURL
    //             }],
    //         });
    //     } else {
    //         self.setState({
    //             reportFileList: [],
    //         });
    //     }
    // }
    //台账
    handleProdFileList({ fileList }) {
        this.setState({
            prodFileList: fileList,
        });
    }
    //备案
    handlePositionFileList({ fileList }) {
        this.setState({
            positionFileList: fileList,
        });
    }
    //转移单
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
            form
        } = self.props;

        form.validateFields((err, values) => {
            var data = { ...values };

            if (err) return;
            var tableId = self.props.editId;
            //台账
            var prodFileUrl = self.state.prodFileList[0];
            if (!prodFileUrl) {
                prodFileUrl = "";
            } else {
                prodFileUrl = prodFileUrl.url
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
            //备案
            var positionFileUrl = self.state.positionFileList[0];
            if (!positionFileUrl) {
                positionFileUrl = "";
            } else {
                positionFileUrl = positionFileUrl.url
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
            //转移单
            var reportFileUrl = self.state.reportFileList[0];
            if (!reportFileUrl) {
                reportFileUrl = "";
            } else {
                reportFileUrl = reportFileUrl.url
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

            data.standingBookURL = prodFileUrl;
            data.filingInfoURL = positionFileUrl;
            data.transferManifestURL = reportFileUrl;
            if (tableId) {
                getWastesolidUpdate({
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
                getWastesolidAdd({
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
                        <h2 className="yzy-tab-content-title">固体废物基本信息详情</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="编号">
                                    {getFieldDecorator('serialNumber', {
                                        initialValue: this.state.data.serialNumber,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="编号" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="是否危废">
                                    {getFieldDecorator('isHazardousWaste', {
                                        initialValue: this.state.data.isHazardousWaste === true ? '是' : '否',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="1">是</Option>
                                            <Option value="0">否</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="危险废物名称">
                                    {getFieldDecorator('hazardousWasteName', {
                                        initialValue: this.state.data.hazardousWasteName,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="危险废物名称" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="处置方式">
                                    {getFieldDecorator('disposalMethod', {
                                        initialValue: this.state.data.disposalMethod,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="处置方式" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废物名称">
                                    {getFieldDecorator('theName', {
                                        initialValue: this.state.data.theName,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="废物名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废物产生工艺">
                                    {getFieldDecorator('processing', {
                                        initialValue: this.state.data.processing,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="废物产生工艺" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="危险代码">
                                    {getFieldDecorator('dangerCode', {
                                        initialValue: this.state.data.dangerCode,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="危险代码" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="危险废物产生环节">
                                    {getFieldDecorator('generatingLinks', {
                                        initialValue: this.state.data.generatingLinks,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="危险废物产生环节" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="危险废物年产生量">
                                    {getFieldDecorator('annualProduction', {
                                        initialValue: this.state.data.annualProduction ? this.state.data.annualProduction + '' : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="危险废物年产生量" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="贮存场所位置">
                                    {getFieldDecorator('storagePlaceAddress', {
                                        initialValue: this.state.data.storagePlaceAddress,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="贮存场所位置" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="贮存场所照片">
                                    {getFieldDecorator('storagePlaceImageURL', {
                                        initialValue: this.state.data.storagePlaceImageURL,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="贮存场所照片" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="台账记录">
                                    {getFieldDecorator('standingBookURL', {
                                        initialValue: this.state.data.standingBookURL,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="台账记录" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="处置单位名称">
                                    {getFieldDecorator('disposeUnitName', {
                                        initialValue: this.state.data.disposeUnitName,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="处置单位名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="备案信息">
                                    {getFieldDecorator('filingInfoURL', {
                                        initialValue: this.state.data.filingInfoURL,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="备案信息" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="转移联单">
                                    {getFieldDecorator('transferManifestURL', {
                                        initialValue: this.state.data.transferManifestURL,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="转移联单" />
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
            </div>
        )
    }
}

export default Form.create()(WasteWaterDischargeDetail);