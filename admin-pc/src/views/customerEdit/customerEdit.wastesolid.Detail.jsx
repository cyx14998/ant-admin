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

/**
 * editId
 * closeModal
 */
class WasteWaterDischargeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            prodFileList: [],
            positionFileList: [],
            reportFileList: [],
            imgFileList: [],
            tableId: '', //新增的ID
        }
    }

    componentDidMount() {
        var self = this;
        var tableId = self.props.editId;
        if (!tableId) {
            localStorage.setItem("wastewaterDischargeIsShow", "none");
            return;
        }
        localStorage.setItem("wastewaterDischargeIsShow", "block");
        getWasteSolidDetail({ tableId: tableId }).then(res => {
            console.log('详情getWastewaterDischargeDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            self.setState({ data: res.data.wasteSolid });

            var data = res.data.wasteSolid;
            if (data.standingBookURL) {
                self.setState({
                    prodFileList: [{
                        uid: '1',
                        name: '台账',
                        url: data.standingBookURL
                    }],
                });
            } else {
                self.setState({
                    prodFileList: [],
                });
            }
            if (data.filingInfoURL) {
                self.setState({
                    positionFileList: [{
                        uid: '1',
                        name: '备案',
                        url: data.filingInfoURL
                    }],
                });
            } else {
                self.setState({
                    positionFileList: [],
                });
            }
            if (data.transferManifestURL) {
                self.setState({
                    reportFileList: [{
                        uid: '1',
                        name: '转移单',
                        url: data.transferManifestURL
                    }],
                });
            } else {
                self.setState({
                    reportFileList: [],
                });
            }
            if (data.storagePlaceImageURL) {
                self.setState({
                    imgFileList: [{
                        uid: '1',
                        name: '贮存场所照片',
                        url: data.storagePlaceImageURL
                    }],
                });
            } else {
                self.setState({
                    imgFileList: [],
                });
            }

        }).catch(err => {
            MyToast('接口调用失败');
            console.log(err)
        })
    }
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
    //贮存场所照片
    handleImgFileList({ fileList }) {
        this.setState({
            imgFileList: fileList,
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
            //台账
            var prodFileUrl = self.state.prodFileList[0];
            console.log('----------------',prodFileUrl)
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
            //转移单imgFileList
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
            //贮存场所照片
            var imgFileUrl = self.state.imgFileList[0];
            if (!imgFileUrl) {
                imgFileUrl = "";
            } else {
                imgFileUrl = imgFileUrl.url
                // 上传
                if (!imgFileUrl) {
                    imgFileUrl = self.state.imgFileList[0].response.filePath;
                }
                if (!imgFileUrl) {
                    imgFileUrl = ""
                } else if (imgFileUrl.indexOf(downloadUrl) === -1) {
                    imgFileUrl = downloadUrl + imgFileUrl;
                }
            }
            data.standingBookURL = prodFileUrl;
            data.filingInfoURL = positionFileUrl;
            data.transferManifestURL = reportFileUrl;
            data.storagePlaceImageURL = imgFileUrl;

            console.log('固体编辑保存前---------', data)

            var tableId = self.props.editId;
            if (!tableId) {
                tableId = self.state.tableId;
            }
            if (tableId) {
                getWastesolidUpdate({
                    ...data,
                    tableId: tableId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("保存成功")
                    localStorage.setItem("wastewaterDischargeIsShow", "block");

                    setTimeout(() => {
                        this.props.closeModal()
                    }, 500);
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
                    self.setState({ tableId: res.data.tableId });
                    MyToast("新增成功")
                    localStorage.setItem("wastewaterDischargeIsShow", "block");

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
                        <h2 className="yzy-tab-content-title">固体废物基本信息详情</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="编号">
                                    {getFieldDecorator('serialNumber', {
                                        initialValue: this.state.data.serialNumber,
                                        rules: [{ required: true, message: '请输入编号' },
                                        //{ pattern: /^[0-9]*$/, message: '请输入数值' }
                                        ],
                                    })(
                                        <Input placeholder="编号" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废物名称">
                                    {getFieldDecorator('theName', {
                                        initialValue: this.state.data.theName,
                                        rules: [{ required: true, message: '请输入废物名称' },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="废物名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="是否危废">
                                    {getFieldDecorator('isHazardousWaste', {
                                        initialValue: this.state.data.isHazardousWaste === true ? '是' : '否',
                                        rules: [{ required: true, message: '请选择' },
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
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="危险废物名称">
                                    {getFieldDecorator('hazardousWasteName', {
                                        initialValue: this.state.data.hazardousWasteName,
                                        rules: [{ message: '请输入危险废物名称' },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="危险废物名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="处置方式">
                                    {getFieldDecorator('disposalMethod', {
                                        initialValue: this.state.data.disposalMethod,
                                        rules: [{ message: '请输入处置方式' },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="处置方式" />
                                        )}
                                </FormItem>
                            </Col>

                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废物产生工艺">
                                    {getFieldDecorator('processing', {
                                        initialValue: this.state.data.processing,
                                        rules: [{ message: '请输入废物产生工艺' },
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
                                        rules: [{ message: '请输入危险代码' },
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
                                        rules: [{ message: '请输入危险废物产生环节' },
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
                                        rules: [{ message: '请输入危险废物年产生量' },
                                        { pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
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
                                        rules: [{ message: '请输入贮存场所位置' },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="贮存场所位置" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="处置单位名称">
                                    {getFieldDecorator('disposeUnitName', {
                                        initialValue: this.state.data.disposeUnitName,
                                        rules: [{},
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="处置单位名称" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">台账上传</h2>
                                    <QiniuUploadFile
                                        uploadTitle="台账上传"
                                        uploadedFileList={this.state.prodFileList}
                                        handleUploadedFileList={this.handleProdFileList.bind(this)}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">备案信息上传</h2>
                                    <QiniuUploadFile
                                        uploadTitle="备案信息上传"
                                        uploadedFileList={this.state.positionFileList}
                                        handleUploadedFileList={this.handlePositionFileList.bind(this)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">转移单上传</h2>
                                    <QiniuUploadFile
                                        uploadTitle="转移单上传"
                                        uploadedFileList={this.state.reportFileList}
                                        handleUploadedFileList={this.handleReportFileList.bind(this)}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">贮存场所照片</h2>
                                    <QiniuUploadFile
                                        uploadTitle="贮存场所照片"
                                        uploadedFileList={this.state.imgFileList}
                                        handleUploadedFileList={this.handleImgFileList.bind(this)}
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