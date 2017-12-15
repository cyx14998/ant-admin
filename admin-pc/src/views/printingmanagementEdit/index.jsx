import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Icon,
    Pagination,
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Select,
    Popconfirm
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import moment from 'moment';

import DraggableModal from '../../components/modal.draggable';
import RcSearchForm from '../../components/rcsearchform';
import QiniuUpload from '../../components/qiniu.upload.js';
const downloadUrl = BaseConfig.qiniuPath;

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}


//审核记录列表头部
const checkRecordColumns = [
    {
        title: '审核日期',
        dataIndex: 'createDatetime',
    }, {
        title: '审核人',
        dataIndex: 'member.realName',
    }, {
        title: '审核意见',
        dataIndex: 'theContent',
    }, {
        title: '审核结果',
        dataIndex: 'theFlowResult',
        render: (record) => <span>
            {record ? '审核通过' : '审核不通过'}
        </span>
    }
];
import {
    getPrintingDetail,
    getPrintingAdd,
    getPrintingEdit,
    getPrintingCancel,
    getPrintingPass,
    getPrintingReject,
} from '../../common/api/api.printingmanagement.js';

import {
    getCheckRecordList
} from '../../common/api/api.purchaseorderswarehousing.js';

import {
    getDepartmentListForSelect
} from '../../common/api/api.department';

/**
 * @props columns
 *     配置数据校验
 * @props dataSource
 *     在接口与组件之间要进行数据转换，只维护columns相关数据
 * @desc
 *     只关心增删改查的接口调用与数据转换
 */
import EditableTableSection from '../../components/editableTable/index';

import { MyToast, getLocQueryByLabel, } from '../../common/utils';


//编辑页面
class PrintingEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: getLocQueryByLabel('tableId') || '', //控制底面表格显隐
            flowOrderStateId: '',
            loading: true,
            departmentList: [], //部门列表
            officialSeal: {}, //列表信息详情
            checkRecordlList: [], //检查记录列表

            suggestModalVisible: false, //审核意见弹窗显隐
            suggestContent: '', //审核意见
            checkType: '', //点击的审核按钮类型

            filesList: [], //附件上传
        }
        this._getPrintingDetail = this._getPrintingDetail.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
        this._getDepartmentListForSelect = this._getDepartmentListForSelect.bind(this);
    }

    componentDidMount() {
        this._getPrintingDetail({ tableId: this.state.tableId });
        this._getDepartmentListForSelect();
    }

    //获取部门列表
    _getDepartmentListForSelect() {
        getDepartmentListForSelect({}).then(res => {
            console.log('getDepartmentListForSelect res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取部门列表失败');
                return;
            }

            var departmentList = res.data.departmentList.map(item => {
                let department = {
                    value: item.tableId,
                    label: item.theName
                };

                return department;
            });

            this.setState({
                departmentList: departmentList
            });
        }).catch(err => {
            MyToast('获取部门列表失败')
        });
    }
    //获取用印列表详情
    _getPrintingDetail(params) {
        this.setState({
            loading: false
        });
        var self = this;
        if (!params.tableId) return;

        getPrintingDetail(params).then(res => {
            console.log('getPrintingDetail ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.officialSeal;
            var state = '';
            if (data.isPass) {
                state = '已审核';
            } else {
                if (data.theState == 0) {
                    state = '审核中';
                } else if (data.theState == 1) {
                    state = '已作废';
                }
            }
            data.theState = state;
            var flowOrderStateId = data.flowOrderState ? data.flowOrderState.tableId : '';

            this.setState({
                loading: false,
                officialSeal: data,
                flowOrderStateId: flowOrderStateId,
            });
            self._getCheckRecordList({ flowOrderStateId: flowOrderStateId });
            //文件初始化
            if (res.data.filesList.length) {
                var tempFileList = [];
                res.data.filesList.map((item, index) => {
                    tempFileList.push({
                        uid: index,
                        name: item.theName,
                        size: item.theSize,
                        url: item.filePath,
                    });
                })
                self.setState({
                    filesList: tempFileList
                });
            } else {
                self.setState({
                    filesList: [],
                });
            }
        }).catch(err => {
            MyToast(err || '接口失败');
            console.log(err)
            this.setState({
                loading: false
            });
        })
    }

    /** -------------------------------------检查记录---------------------------------- */
    //检查记录列表
    _getCheckRecordList(params) {
        console.log('params', params)
        if (!params.flowOrderStateId) return;

        getCheckRecordList(params).then(res => {
            console.log('getCheckRecordList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            this.setState({
                checkRecordlList: res.data.flowHistoryList
            });
        }).catch(err => {
            MyToast(err || '接口失败');
        })
    }
    //头部审核按钮-点击
    oncheckbtn(type) {
        this.setState({
            checkType: type,
            suggestModalVisible: true,
        });
    }
    //审核意见弹窗-文本
    suggestTextChange(e) {
        this.setState({
            suggestContent: e.target.value,
        });
    }
    //审核意见弹窗-取消    
    onCancelSuggestModal() {
        this.setState({
            suggestModalVisible: false,
        });
    }
    //审核意见弹窗-确定    
    onSuggestModalOk() {
        var checkType = this.state.checkType;
        if (checkType == 'checkReject') {
            this.onCheckReject();
        } else if (checkType == 'checkPass') {
            this.onCheckPass();
        }
    }
    //用印作废
    onCheckCancel() {
        getPrintingCancel({ tableId: this.state.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }

            MyToast('用印已作废');
            this._getPrintingDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err => MyToast('接口失败'));
    }
    //用印退回
    onCheckReject() {
        getPrintingReject({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '退回失败');
                return;
            }

            MyToast('用印已退回');
            this.setState({
                suggestModalVisible: false,
            });
            this._getPrintingDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //用印送审
    onCheckPass() {
        getPrintingPass({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '送审失败');
                return;
            }

            MyToast('用印已送审');
            this.setState({
                suggestModalVisible: false,
            });
            this._getPrintingDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //上传附件
    handleProdFileList({ fileList }) {
        console.log('附件上传----------------', fileList)
        this.setState({
            filesList: fileList,
        });
    }
    //基本信息保存
    saveDetail(e) {
        var self = this;
        e.preventDefault();
        const {
          form
        } = self.props;

        form.validateFields((err, values) => {
            if (err) return;

            var data = { ...values };

            //时间处理---------------------
            data.applyDatetime = data.applyDatetime ? data.applyDatetime.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');

            // 附件处理--------------------
            data.data = [];
            self.state.filesList.length && self.state.filesList.map((item, index) => {
                //默认
                var filePath = item.url;
                var theName = item.name;
                var theSize = item.size;
                // 上传
                if (!filePath) {
                    filePath = item.response.filePath;
                    theName = item.name;
                    theSize = item.size;
                }
                if (filePath.indexOf(downloadUrl) === -1) {
                    filePath = downloadUrl + filePath;
                }
                data.data[index] = { filePath: filePath, theName: theName, theSize: theSize };
            })

            console.log('when save purOrder用印保存前 ----------', data);

            var tableId = self.state.tableId;
            if (tableId === '') {
                //新增
                getPrintingAdd(data).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info);
                        return
                    }
                    MyToast('新增成功');
                    self.setState({
                        tableId: res.data.tableId,
                        flowOrderStateId: res.data.flowOrderStateId
                    });

                    self._getPrintingDetail({
                        tableId: res.data.tableId,
                    });
                }).catch(err => MyToast(err))
            } else {
                getPrintingEdit({ ...data, tableId: tableId }).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info);
                        return
                    }
                    MyToast('编辑成功');
                }).catch(err => MyToast(err))
            }
        })
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var officialSeal = this.state.officialSeal;
        return (
            <div className="yzy-list-wrap">
                <div className="yzy-tab-content-item-wrap">
                    <Form onSubmit={this.saveDetail.bind(this)}>
                        <div>
                            <Button type="primary" style={{ padding: '0 20px', }} htmlType="submit">保存</Button>
                            <Button type="primary" style={{ padding: '0 20px', marginLeft: 8 }} onClick={this.oncheckbtn.bind(this, 'checkPass')} >审核</Button>
                            <Popconfirm title="确定要作废么？" onConfirm={this.onCheckCancel.bind(this)}>
                                <Button type="primary" className="btn-cancel" style={{ padding: '0 20px', marginLeft: 8 }} >作废</Button>
                            </Popconfirm>
                            <Button type="primary" className="btn-reject" style={{ padding: '0 20px', marginLeft: 8 }} onClick={this.oncheckbtn.bind(this, 'checkReject')}>退回</Button>
                        </div>
                        <div className="baseinfo-section">
                            <h2 className="yzy-tab-content-title">用印基本信息</h2>
                            <Row>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="编号">
                                        {getFieldDecorator('theState', {
                                            initialValue: officialSeal.serialNumber ? officialSeal.serialNumber : '',
                                            //rules: [{ required: true, message: '必填!' },
                                            // pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                            //],
                                        })(
                                            <Input placeholder="编号" disabled={true} />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="单据状态">
                                        {getFieldDecorator('theState', {
                                            initialValue: officialSeal.theState,
                                        })(
                                            <Input placeholder="单据状态" disabled={true} />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="创建日期">
                                        {getFieldDecorator('createDatetime', {
                                            initialValue: moment(officialSeal.createDatetime || new Date(), 'YYYY-MM-DD'),
                                            //rules: [{ required: true, message: '必填!' },
                                            //{ pattern: /^[0-9]*$/ } 
                                            //],
                                        })(
                                            <DatePicker disabled />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="申请部门">
                                        {getFieldDecorator('applyDepartId', {
                                            initialValue: officialSeal.applyDepart ? officialSeal.applyDepart.tableId + '' : '',
                                        })(
                                            <Select placeholder="部门">
                                                {
                                                    this.state.departmentList.map(item => {
                                                        return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="使用部门">
                                        {getFieldDecorator('useDepartId', {
                                            initialValue: officialSeal.useDepart ? officialSeal.useDepart.tableId + '' : '',
                                        })(
                                            <Select placeholder="部门">
                                                {
                                                    this.state.departmentList.map(item => {
                                                        return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="申请日期">
                                        {getFieldDecorator('applyDatetime', {
                                            initialValue: moment(officialSeal.applyDatetime || new Date(), 'YYYY-MM-DD'),
                                            //rules: [{ required: true, message: '必填!' },
                                            //{ pattern: /^[0-9]*$/ } 
                                            //],
                                        })(
                                            <DatePicker />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="baseinfo-section">
                                    <h2 className="yzy-tab-content-title">用印附件上传</h2>
                                    <QiniuUpload
                                        uploadTitle="图片"
                                        uploadedFileList={this.state.filesList}
                                        handleUploadedFileList={this.handleProdFileList.bind(this)}
                                        maxLength="5"
                                    />
                                </Col>
                            </Row>
                        </div>
                        {this.state.tableId ?
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">审核记录</h2>
                                <Table
                                    columns={checkRecordColumns}
                                    dataSource={this.state.checkRecordlList}
                                    loading={this.state.loading}
                                    pagination={false}
                                    rowKey="tableId"
                                    rowClassName={(record, index) => {
                                        if (index % 2 !== 0) {
                                            return 'active'
                                        }
                                    }} />
                            </div>
                            : null}
                    </Form>
                    {/* 审核意见 */}
                    <DraggableModal
                        title="审核意见"
                        width='70%'
                        visible={this.state.suggestModalVisible}
                        onCancel={this.onCancelSuggestModal.bind(this)}
                        className='modal'
                    >
                        <TextArea onChange={this.suggestTextChange.bind(this)} />
                        <div className="yzy-block-center" style={{ marginTop: 10 }}>
                            <Button type="primary" onClick={this.onSuggestModalOk.bind(this)} style={{ padding: '0 20', }}>确定</Button>
                        </div>
                    </DraggableModal>
                </div>
            </div >
        )
    }
}
var PrintingEditForm = Form.create()(PrintingEdit);
ReactDOM.render(<PrintingEditForm />, document.getElementById('root'));
