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
    Popconfirm,
    Affix,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import moment from 'moment';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import DraggableModal from '../../components/modal.draggable';

import {
    getPurchaseOrderDetail,
    getPurchaseOrderAdd,
    getPurchaseOrderEdit,
    getPurchaseOrderRecordList,
    getPurchaseOrderCancel,
    getPurchaseOrderPass,
    getPurchaseOrderReject,
    getPurchaseOrderRecordnAdd,
    getPurchaseOrderRecordnEdit,
    getPurchaseOrderRecordnDelete,
} from '../../common/api/api.purchaseorders.js';

import { getCheckRecordList } from '../../common/api/api.purchaseorderswarehousing.js';

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

//采购单明细头部
const columns = [
    {
        title: '序号',
        dataIndex: 'index',
    }, {
        title: '品名',
        dataIndex: 'theName',
    }, {
        title: '规格型号',
        dataIndex: 'theSpecifications',
    }, {
        title: '数量',
        dataIndex: 'theQuantity',
        validateType: 'number',
    }, {
        title: '单价',
        dataIndex: 'thePrice',
        validateType: 'number',
    }, {
        title: '总金额',
        dataIndex: 'totalAmount',
    },
    //  {
    //     title: '已入库数量',
    //     dataIndex: 'inStorageQuantity',
    // }, {
    //     title: '可入库数量',
    //     dataIndex: 'couldStorageQuantity',
    // },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 120,
    }
];
//采购单明细新增
const getPurchaseOrderRecord = {
    tableId: '',
    editable: true,
    index: {
        value: '',
        disabled: true,
    },
    theName: {
        value: ''
    },
    theSpecifications: {
        value: ''
    },
    theQuantity: {
        value: ''
    },
    thePrice: {
        value: '',
    },
    totalAmount: {
        value: '',
        disabled: true,
    },
    // inStorageQuantity: {
    //     value: '0',
    //     disabled: true,
    // },
    // couldStorageQuantity: {
    //     value: '0',
    //     disabled: true,
    // }
};
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

// 基本信息---采购类型（固定资产    工程材料   办公用品   劳防用品  其他）
const purOrderType = [
    {
        label: '固定资产',
        value: '1'
    }, {
        value: '2',
        label: '工程材料'
    }, {
        value: '3',
        label: '办公用品'
    }, {
        value: '4',
        label: '劳防用品'
    }, {
        value: '5',
        label: '其他'
    },
]
//编辑页面
class PurchaseordersEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: getLocQueryByLabel('tableId') || '', //控制底面表格显隐
            flowOrderStateId: '',
            loading: true,
            departmentList: [], //部门列表
            purchaseRecordMst: {}, //列表信息详情

            suggestModalVisible: false, //审核意见弹窗显隐
            suggestContent: '', //审核意见
            checkType: '', //点击的审核按钮类型

            purchaseRecordDtlList: [], //明细列表
            checkRecordlList: [], //检查记录列表
        }
        this._getDepartmentListForSelect = this._getDepartmentListForSelect.bind(this);
        this._getPurchaseOrderDetail = this._getPurchaseOrderDetail.bind(this);
        this._getPurchaseOrderRecordList = this._getPurchaseOrderRecordList.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
    }

    componentDidMount() {
        this._getDepartmentListForSelect();
        this._getPurchaseOrderDetail({ tableId: this.state.tableId });
        this._getPurchaseOrderRecordList({ purchaseRecordMstId: this.state.tableId });
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
    //获取采购单列表详情
    _getPurchaseOrderDetail(params) {
        this.setState({
            loading: false
        });
        if (!params.tableId) return;

        getPurchaseOrderDetail(params).then(res => {
            console.log('getPurchaseOrderDetail ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.purchaseRecordMst;
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
                purchaseRecordMst: data,
                flowOrderStateId: flowOrderStateId,
            })
            this._getCheckRecordList({ flowOrderStateId: flowOrderStateId });
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
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
    //采购单作废
    onCheckCancel() {
        getPurchaseOrderCancel({ tableId: this.state.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }

            MyToast('采购单已作废');
            this._getPurchaseOrderDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //采购单退回
    onCheckReject() {
        getPurchaseOrderReject({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '退回失败');
                return;
            }

            MyToast('采购单已退回');
            this.setState({
                suggestModalVisible: false,
            });
            this._getPurchaseOrderDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //采购单送审
    onCheckPass() {
        getPurchaseOrderPass({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '送审失败');
                return;
            }

            MyToast('采购单已送审');
            this.setState({
                suggestModalVisible: false,
            });
            this._getPurchaseOrderDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
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
            data.orderTime = data.orderTime ? data.orderTime.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');

            console.log('when save purOrder采购单保存前 ----------', data);

            var tableId = self.state.tableId;
            if (tableId === '') {
                //新增
                getPurchaseOrderAdd(data).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '新增失败');
                        return
                    }
                    MyToast('新增成功');
                    self.setState({
                        tableId: res.data.tableId,
                        flowOrderStateId: res.data.flowOrderStateId,
                    });
                    self._getPurchaseOrderDetail({
                        tableId: res.data.tableId
                    });
                }).catch(err =>
                    MyToast(err || '新增失败')
                    )
            } else {
                getPurchaseOrderEdit({ ...data, tableId: tableId }).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '编辑保存失败');
                        return
                    }
                    MyToast('编辑成功');
                }).catch(err =>
                    MyToast(err || '编辑保存失败')
                    )
            }
        })
    }
    /** ----------------------------------------采购单明细------------------------------------- */
    //数据列表格式化
    formatDatasource(dataSource) {
        var data = dataSource.map((data, i) => {
            // theSpecifications
            return {
                tableId: data.tableId,
                index: {
                    value: i + 1,
                    disabled: true,
                },
                theName: {
                    value: data.theName || '',
                },
                theSpecifications: {
                    value: data.theSpecifications,
                },
                theQuantity: {
                    value: data.theQuantity,
                },
                thePrice: {
                    value: data.thePrice
                },
                totalAmount: {
                    value: data.totalAmount,
                    disabled: true,
                },
                // inStorageQuantity: {
                //     value: data.inStorageQuantity,
                // },
                // couldStorageQuantity: {
                //     value: data.couldStorageQuantity
                // }
            }
        });

        return data;
    }
    //数据提交格式化
    serializeRecord(record) {
        //file
        return {
            tableId: record.tableId,
            theName: record.theName.value,
            theSpecifications: record.theSpecifications.value,
            theQuantity: record.theQuantity.value,
            thePrice: record.thePrice.value,
        }

    }
    //获取采购单明细列表    
    _getPurchaseOrderRecordList(params) {
        console.log('params', params)
        if (!params.purchaseRecordMstId) return;

        getPurchaseOrderRecordList(params).then(res => {
            console.log('getPurchaseOrderRecordList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.purchaseRecordDtlList;

            // dataSource = this.formatDatasource(dataSource);

            this.setState({
                loading: false,
                purchaseRecordDtlList: this.formatDatasource(dataSource)
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    //采购单明细新增
    addBtnPurchaseorder(record) {
        console.log('新增-----------------------', record);
        var _record = this.serializeRecord(record);
        var self = this;

        return new Promise((resolve, reject) => {
            getPurchaseOrderRecordnAdd({
                ..._record,
                purchaseRecordMstId: self.state.tableId
            }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info || '接口失败'
                    });
                    return;
                }

                resolve({
                    code: 0,
                    tableId: res.data.tableId,
                    msg: '新增成功'
                });
                self._getPurchaseOrderRecordList({
                    purchaseRecordMstId: self.state.tableId
                });
                
                self._getPurchaseOrderDetail({
                    tableId: self.state.tableId
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        });
    }
    //采购单明细更新    
    updatePurchaseorder(record) {
        console.log('编辑-----------------------', record);
        var _record = this.serializeRecord(record);
        var self = this;

        return new Promise((resolve, reject) => {
            getPurchaseOrderRecordnEdit({ ..._record }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info || '接口失败'
                    });
                    return;
                }

                resolve({
                    code: 0,
                    tableId: res.data.tableId,
                    msg: '编辑成功'
                });
                self._getPurchaseOrderRecordList({
                    purchaseRecordMstId: this.state.tableId
                });
                self._getPurchaseOrderDetail({
                    tableId: self.state.tableId
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    // 采购单明细删除
    deletePurchaseorder(id) {
        var self = this;
        return new Promise((resolve, reject) => {
            getPurchaseOrderRecordnDelete({ tableId: id }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    msg: '删除成功'
                });
                self._getPurchaseOrderDetail({
                    tableId: self.state.tableId
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    /** ----------------------------------------检查记录------------------------------------- */
    //检查记录列表
    _getCheckRecordList(params) {
        console.log('-------------params', params)
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
    render() {
        let { getFieldDecorator } = this.props.form;
        var purchaseRecordMst = this.state.purchaseRecordMst;
        return (
            <div className="yzy-page">
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
                                <h2 className="yzy-tab-content-title">采购单基本信息</h2>
                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="单据编号">
                                            {getFieldDecorator('serialNumber', {
                                                initialValue: purchaseRecordMst.serialNumber ? purchaseRecordMst.serialNumber : '',
                                            })(
                                                <Input placeholder="单据编号" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="单据状态">
                                            {getFieldDecorator('theState', {
                                                initialValue: purchaseRecordMst.theState,
                                            })(
                                                <Input placeholder="单据状态" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="总金额">
                                            {getFieldDecorator('totalAmount', {
                                                initialValue: purchaseRecordMst.totalAmount ? purchaseRecordMst.totalAmount : '',
                                            })(
                                                <Input placeholder="总金额" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="已付款金额">
                                            {getFieldDecorator('hasPaymentAmount', {
                                                initialValue: purchaseRecordMst.hasPaymentAmount ? purchaseRecordMst.hasPaymentAmount : 0,
                                            })(
                                                <Input placeholder="已付款金额" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="厂商名称">
                                            {getFieldDecorator('manufacturerName', {
                                                initialValue: purchaseRecordMst.manufacturerName ? purchaseRecordMst.manufacturerName : '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请正确填写厂商名称',
                                                        whitespace: true
                                                    },
                                                ],
                                            })(
                                                <Input placeholder="厂商名称" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="采购单类型">
                                            {getFieldDecorator('theType', {
                                                initialValue: purchaseRecordMst.theType ? purchaseRecordMst.theType + '' : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                // pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                                //],
                                            })(
                                                <Select placeholder="采购类型">
                                                    {
                                                        purOrderType.map(item => {
                                                            return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                        })
                                                    }
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="部门">
                                            {getFieldDecorator('departmentId', {
                                                initialValue: purchaseRecordMst.department ? purchaseRecordMst.department.tableId + '' : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/ } 
                                                //],
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
                                        <FormItem {...formItemLayout} label="订货时间">
                                            {getFieldDecorator('orderTime', {
                                                initialValue: moment(purchaseRecordMst.orderTime || new Date(), 'YYYY-MM-DD'),
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/ } 
                                                //],
                                            })(
                                                <DatePicker />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="备注">
                                            {getFieldDecorator('theRemarks', {
                                                initialValue: purchaseRecordMst.theRemarks ? purchaseRecordMst.theRemarks : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                // pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                                //],
                                            })(
                                                <Input placeholder="备注" />
                                                )}
                                        </FormItem>
                                    </Col>

                                </Row>
                            </div>
                            {this.state.tableId ?
                                <div>
                                    <EditableTableSection
                                        title="采购单明细列表"
                                        columns={columns}
                                        dataSource={this.state.purchaseRecordDtlList}
                                        onDelete={this.deletePurchaseorder.bind(this)}
                                        onSaveAdd={this.addBtnPurchaseorder.bind(this)}
                                        onSaveUpdate={this.updatePurchaseorder.bind(this)}
                                        itemDataModel={getPurchaseOrderRecord}
                                        loading={this.state.loading}
                                    />
                                    <div className="baseinfo-section">
                                        <h2 className="yzy-tab-content-title">审核记录</h2>
                                        <Table
                                            columns={checkRecordColumns}
                                            dataSource={this.state.checkRecordlList}
                                            loading={this.state.loading}
                                            rowKey="tableId"
                                            rowClassName={(record, index) => {
                                                if (index % 2 !== 0) {
                                                    return 'active'
                                                }
                                            }} />
                                    </div>
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
                </div>
            </div>
        )
    }
}
var PurchaseordersEditForm = Form.create()(PurchaseordersEdit);
ReactDOM.render(<PurchaseordersEditForm />, document.getElementById('root'));
