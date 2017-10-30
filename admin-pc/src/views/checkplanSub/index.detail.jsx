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

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
);

import {
    getMemberList,
    getCheckplanSubAdd,
    getCheckplanSubEdit,
    getCheckplanSubPerformer,
    getCheckplanSubDetail
} from '../../common/api/api.checkplan';

import {
    getQiNiuToken,
    getCustomerList
} from '../../common/api/api.customer';

class CheckplanDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {},
            memberList: [],
            prodPreviewImage: [], //反馈工艺
            positionPreviewImage: [], //检查单         
            prodPreviewVisible: false,
            positionPreviewVisible: false,
            prodImgUrl: '',
            positionImgUrl: '',
            prodFileList: [], //反馈工艺流程图
            positionFileList: [], //检查单图
            checkplanSubEditInfo: {},
            customerList: [], //企业列表

            recordEdit: this.props.recordEdit || '',//新增子表返回的子表id用来显示底面的员工列表
        });
        this.beforeUpload = this.beforeUpload.bind(this);

        this._getCheckplanSubDetail = this._getCheckplanSubDetail.bind(this);

        this.qiniuyunData = {
            // key: Date.now(),
            // token: 'xozWSPMxkMjIVoHg2JyXq4-7-oJaEADLOKHVR0vU:1AreAaaS0j5_bjgQsHSshM0zTZI=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoianNzZGsiLCJkZWFkbGluZSI6MTUwOTAxNTA3Mn0=',
            // token: "W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:AuMz5nKqsSrEQ6Y6mb-gBpJunIQ=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDEzMTkxfQ=="
            // token:"W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:wxacrkBBNB8Pjby5ZJaQQd4NGLs=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDE1OTM2fQ==",
        };
    }

    componentWillReceiveProps(nextProps) {
        var self=this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            console.log('编辑')
            //编辑页面
            // self._getCheckplanSubDetail(nextProps.checkSubId).then(res => {
            // });
self.setState({
    recordEdit: nextProps.recordEdit
})
//图片
                if (nextProps.recordEdit.feedbackSheetURL) {
                    self.setState({
                        prodFileList: [{
                            uid: '1',
                            name: '123',
                            url: nextProps.recordEdit.feedbackSheetURL
                        }],
                        prodImgUrl: nextProps.recordEdit.feedbackSheetURL
                    });
                } else {
                    self.setState({
                        prodFileList: null,
                        positionImgUrl: ''
                    });
                }
                if (nextProps.recordEdit.regulatoryRecordURL) {
                    self.setState({
                        positionFileList: [{
                            uid: '1',
                            name: '123',
                            url: nextProps.recordEdit.regulatoryRecordURL
                        }],
                        positionImgUrl: nextProps.recordEdit.regulatoryRecordURL
                    });
                } else {
                    self.setState({
                        positionFileList: null,
                        positionImgUrl: ''
                    });
                }
        }

    }
    componentDidMount() {
        this.setState({
            checkplanSubEditInfo: {},
            prodFileList: [],
            positionFileList: [], //检查单图            
        })
        console.log(this.props.checkSubId)
        var self = this;
        // var checkSubId = getLocQueryByLabel('checkSubId');
        // var customerId = getLocQueryByLabel('customerId');
        // console.log(checkSubId, 'sss', customerId);

        // if (self.state.checkSubId) {
        //     //编辑页面
        //     self._getCheckplanSubDetail(self.state.checkSubId).then(res => {
        //     });
        // }
        this.setState({
            recordEdit: this.props.recordEdit
        });
        //获取企业列表
        getCustomerList({}).then(res => {
            console.log('getCustomerList res ---', res);

            if (res.data.result !== 'success') {
                resolve({
                    code: -1,
                    info: res.data.info,
                })
                return;
            }
            self.setState({
                customerList: res.data.customerList,
            });
        }).catch(err => {
            console.log(err)
        })

        self.beforeUpload();
    }
    //获取子表详情
    _getCheckplanSubDetail(checkSubId) {
        var self = this;
        return new Promise((resolve, rejcet) => {
            getCheckplanSubDetail({ tableId: checkSubId }).then(res => {
                console.log('getCheckplanSubDetail res ---', res);

                if (res.data.result !== 'success') {
                    resolve({
                        code: -1,
                        info: res.data.info,
                    })
                    return;
                }
                var checkplanSubEdit = res.data.inspectionPlanDtl;
                self.setState({
                    recordEdit: checkplanSubEdit,
                });
                //图片
                if (checkplanSubEdit.feedbackSheetURL) {
                    self.setState({
                        prodFileList: [{
                            uid: '1',
                            name: '123',
                            url: checkplanSubEdit.feedbackSheetURL
                        }],
                        prodImgUrl: checkplanSubEdit.feedbackSheetURL
                    });
                } else {
                    self.setState({
                        prodFileList: null,
                        positionImgUrl: ''
                    });
                }
                if (checkplanSubEdit.regulatoryRecordURL) {
                    self.setState({
                        positionFileList: [{
                            uid: '1',
                            name: '123',
                            url: checkplanSubEdit.regulatoryRecordURL
                        }],
                        positionImgUrl: checkplanSubEdit.regulatoryRecordURL
                    });
                } else {
                    self.setState({
                        positionFileList: null,
                        positionImgUrl: ''
                    });
                }

                resolve({
                    code: 0
                });
            }).catch(err => {
                console.log(err)
            })
        })
    }

    //获取uptoken
    beforeUpload(file) {
        console.log(file)
        //获取uptoken
        // if (this.state.uptoken == '') {
        getQiNiuToken({}).then(res => {
            console.log('uptoken res------------------------', res);

            if (!res.data || !res.data.uptoken) {
                console.error('getqiniuyun uptoken error');
                return;
            }

            // this.setState({
            //     uptoken: res.data.uptoken
            // })

            this.qiniuyunData.token = res.data.uptoken;

        }).catch(err => console.log(err));
        // }
    }
    //反馈图片上传
    handleProdPicChange({ fileList }) {
        console.log('handlePropicchange -----------------', fileList);
        this.setState({
            prodFileList: fileList,
        });

        var index = fileList.length;
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                console.log(fileList[index - 1]);
                console.log(fileList[index - 1].response);
                // console.log(fileList[index - 1].response.result)
                this.setState({
                    prodImgUrl: downloadUrl + fileList[index - 1].response.filePath,
                });
            } else {
                console.log(1)
            }
        }
        console.log(this.state.prodImgUrl);
    }
    //反馈图片取消预览
    prodPicModalCancel() {
        this.setState({
            prodPreviewImage: [],
            prodPreviewVisible: false,
        })
    }
    //反馈图片预览
    handleProdPicPreview(file) {
        this.setState({
            prodPreviewImage: file.url || file.thumbUrl,
            prodPreviewVisible: true,
        })
    }
    //检查单图片上传
    handlePositionPicChange({ fileList }) {
        console.log('handlePositionpicchange -----------------', fileList);
        this.setState({
            positionFileList: fileList,
        });

        var index = fileList.length;
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                console.log(fileList[index - 1].response);
                // console.log(fileList[index - 1].response.result)
                this.setState({
                    positionImgUrl: downloadUrl + fileList[index - 1].response.filePath,
                });
            }
        }
        console.log(this.state.positionImgUrl);
    }
    //检查单图片预览
    handlePositionPicPreview(file) {
        this.setState({
            positionPreviewImage: file.url || file.thumbUrl,
            positionPreviewVisible: true,
        })
    }
    //检查单图片取消预览
    positionPicModalCancel() {
        this.setState({
            positionPreviewImage: [],
            positionPreviewVisible: false,
        })
    }
    //检查单图片取消预览
    positionPicModalCancel() {
        this.setState({
            positionPreviewImage: [],
            positionPreviewVisible: false,
        })
    }
    // 基本信息保存
    saveDetail(e) {
        var self = this;
        e.preventDefault();
        const {
            form
        } = this.props;

        form.validateFields((err, values) => {
            var data = { ...values };
            data.feedbackSheetURL = self.state.prodImgUrl;
            data.regulatoryRecordURL = self.state.positionImgUrl;
            if (err) return;
            console.log(data)

            var checkSubId = this.state.checkSubId;
            console.log(checkSubId)
            if (checkSubId && checkSubId != undefined) {
                console.log('编辑')
                getCheckplanSubEdit({
                    ...data,
                    tableId: checkSubId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("编辑成功")
                }).catch(err => {
                    console.log(err)
                });
            } else {
                console.log('新增')
                var checkplanId = getLocQueryByLabel('checkplanId');
                if (data.customerId == '' || !data.customerId) {
                    MyToast('请选择公司');
                    return;
                }
                // 新增
                getCheckplanSubAdd({
                    ...data,
                    inspectionPlanMstId: checkplanId,//主表Id
                }).then(res => {
                    console.log(res)

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    self.setState({
                        checkSubId: res.data.tableId,
                    });
                    MyToast("添加成功")
                }).catch(err => {
                    console.log(err)
                });
            }
        })
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var recordEdit = this.state.recordEdit;
        //企业options
        var customerOptions = this.state.customerList.map((item, index) => {
            return <Option key={item.tableId}>{item.customerName}</Option>
        });
        return (
            <div className="yzy-page">
                <div className="yzy-tab-content-item-wrap">
                    <Form onSubmit={this.saveDetail.bind(this)}>
                        <div className="baseinfo-section">
                            <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
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
                                    <FormItem {...formItemLayout} label="备注">
                                        {getFieldDecorator('theRemarks', {
                                            initialValue: recordEdit.theRemarks,
                                            //rules: [{ required: true },
                                            //{ pattern: /^[0-9]*$/ } 
                                            //],
                                        })(
                                            <Input placeholder="危险废物名称" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="baseinfo-section">
                                        <h2 className="yzy-tab-content-title">反馈单上传</h2>
                                        <Upload
                                            action='http://up.qiniup.com'
                                            container="container"
                                            listType="picture-card"
                                            fileList={this.state.prodFileList}
                                            onPreview={this.handleProdPicPreview.bind(this)}
                                            onChange={this.handleProdPicChange.bind(this)}

                                            data={{
                                                ...this.qiniuyunData,
                                                key: Date.now()
                                            }}
                                        >
                                            {(this.state.prodFileList && this.state.prodFileList.length) >= 1 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={this.state.prodPreviewVisible} footer={null} onCancel={this.prodPicModalCancel.bind(this)}>
                                            <img alt="example" style={{ width: '100%' }} src={this.state.prodPreviewImage} />
                                        </Modal>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="baseinfo-section">
                                        <h2 className="yzy-tab-content-title">检查记录单</h2>
                                        <Upload
                                            action='http://up.qiniup.com'
                                            container="container"
                                            listType="picture-card"
                                            fileList={this.state.positionFileList}
                                            onPreview={this.handlePositionPicPreview.bind(this)}
                                            onChange={this.handlePositionPicChange.bind(this)}

                                            data={{
                                                ...this.qiniuyunData,
                                                key: Date.now()
                                            }}
                                        >
                                            {(this.state.positionFileList && this.state.positionFileList.length) >= 1 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={this.state.positionPreviewVisible} footer={null} onCancel={this.positionPicModalCancel.bind(this)}>
                                            <img alt="example" style={{ width: '100%' }} src={this.state.positionPreviewImage} />
                                        </Modal>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="yzy-block-center">
                            <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
                        </div>
                    </Form>
                </div >
            </div>
        )
    }
}
var CheckplanDetailForm = Form.create()(CheckplanDetail);

export default Form.create()(CheckplanDetailForm);
