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
    Modal
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
const columns = [{
    title: '姓名',
    dataIndex: 'realName',
    width: '10%'
}, {
    title: '性别',
    dataIndex: 'sex',
    width: '10%'
}, {
    title: '年龄',
    dataIndex: 'age',
    width: '10%'
}, {
    title: '手机号',
    dataIndex: 'phoneNumber',
    width: '10%'
},
{
    title: '操作',
    dataIndex: 'operation',
    width: '20%'
}
];
import {
    getMemberList,
    getCheckplanSubAdd,
    getCheckplanSubEdit,
    getCheckplanSubDetail
} from '../../common/api/api.checkplan';

import { getQiNiuToken } from '../../common/api/api.customer';

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
        });
        this.beforeUpload = this.beforeUpload.bind(this);

        this.qiniuyunData = {
            // key: Date.now(),
            // token: 'xozWSPMxkMjIVoHg2JyXq4-7-oJaEADLOKHVR0vU:1AreAaaS0j5_bjgQsHSshM0zTZI=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoianNzZGsiLCJkZWFkbGluZSI6MTUwOTAxNTA3Mn0=',
            // token: "W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:AuMz5nKqsSrEQ6Y6mb-gBpJunIQ=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDEzMTkxfQ=="
            // token:"W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:wxacrkBBNB8Pjby5ZJaQQd4NGLs=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDE1OTM2fQ==",
        };
    }

    componentDidMount() {
        var checkSubId = getLocQueryByLabel('checkSubId');
        console.log(checkSubId)
        //  if(checkSubId==''){
        //      return
        //  }
        // localStorage.setItem("wastewaterDischargeIsShow", "block");
        // getCheckplanSubDetail({ tableId: checkSubId }).then(res => {
        //     console.log('getCheckplanDetail res ---', res);
        //     if (res.data.result !== 'success') {
        //         MyToast(res.data.info)
        //         return;
        //     }
        //     this.setState({ data: res.data.inspectionPlanDtl })
        // }).catch(err => {
        //     MyToast('接口调用失败')
        // })
        // var checkplanId = getLocQueryByLabel('checkplanId');
        //获取人员列表
        // getMemberList({}).then(res => {
        //     console.log('getMemberlist res ---', res);

        //     if (res.data.result !== 'success') {
        //         resolve({
        //             code: -1,
        //             info: res.data.info,
        //         })
        //         return;
        //     }
        //     this.setState({
        //         memberList: res.data.memberList,
        //     });
        // }).catch(err => {
        //     reject(err)
        // })
        this.beforeUpload();
    }
    //选择执行人员
    selectPerformer(checkedValues) {
        console.log('checked = ', checkedValues);
    }
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
                    positionImgUrl: downloadUrl + fileList[index - 1].response.result,
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
        e.preventDefault();
        const {
            form
        } = this.props;

        form.validateFields((err, values) => {
            var data = { ...values };
            data.feedbackSheetURL = this.state.prodImgUrl;
            data.regulatoryRecordURL = this.state.positionImgUrl;
            if (err) return;
            console.log(data)

            var checkSubId = getLocQueryByLabel('checkSubId');
            if (checkSubId) {
                getCheckplanSubEdit({
                    ...data,
                    tableId: checkSubId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("保存成功")
                    // localStorage.setItem("wastewaterDischargeIsShow", "block");
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            } else {
                const checkplanId = getLocQueryByLabel('checkplanId');
                // 新增
                getCheckplanSubAdd({
                    ...data,
                    inspectionPlanMstId: checkplanId,//主表Id
                    customerId: checkplanId,//企业Id

                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("新增成功")
                    // localStorage.setItem("wastewaterDischargeIsShow", "block");
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            }
        })
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="yzy-page">
                <div className="yzy-tab-content-item-wrap">
                    <Form onSubmit={this.saveDetail.bind(this)}>
                        <div className="baseinfo-section">
                            <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                            <Row>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="备注">
                                        {getFieldDecorator('theRemarks', {
                                            //initialValue: this.state.data.theRemarks,
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
                                            {this.state.prodFileList.length >= 1 ? null : uploadButton}
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
                                            {this.state.positionFileList.length >= 1 ? null : uploadButton}
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
                        <div className="baseinfo-section">
                            <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                            <Table
                                columns={columns}
                                dataSource={this.state.memberList}
                                rowKey="tableId"
                                loading={this.state.loading} />
                        </div>
                    </Form>
                </div >
            </div>
        )
    }
}
var CheckplanDetailForm = Form.create()(CheckplanDetail);

ReactDOM.render(<CheckplanDetailForm />, document.getElementById('root'));
