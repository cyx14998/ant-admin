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

import moment from 'moment';

import DraggableModal from '../../components/modal.draggable';
import RcSearchForm from '../../components/rcsearchform';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    getPaymentDetail,
    getPaymentAdd,
    getPaymentEdit,
    getPaymentRecordList,
    getPaymentRecordnAdd,
    getPaymentRecordnEdit,
    getPaymentRecordnDelete,
    getPurchaseRecordMstListUnStockList, //明细新增---采购单主表列表
    getPurchaseRecordDtlListUnStockList,//明细新增---采购单主表--明细列表
    getCheckRecordList,
} from '../../common/api/api.purchaseorderspayment.js';

import {
    getMemberList, //获取创建人列表 （员工列表）
} from '../../common/api/api.purchaseorderswarehousing.js'

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

//付款单明细头部
const columns = [
    {
        title: '单据编号',
        dataIndex: 'serialNumber',
    }, {
        title: '金额',
        dataIndex: 'theAmount',
        validateType: 'number',
    }, {
        title: '编辑时间',
        dataIndex: 'editDatetime',
    }, {
        title: '备注',
        dataIndex: 'theRemarks',
        validateType: 'number',
        title: '操作',
        dataIndex: 'operation',
        width: 120,
    }
];
//审核记录头部
const checkRecordColumns = [
    {
        title: '审核时间',
        dataIndex: 'checkTime',
    }, {
        title: '审核人',
        dataIndex: 'checkPerson',
    }, {
        title: '审核意见',
        dataIndex: 'checkOpinion',
    },
];
//采购单明细头部-----（用于新增入库明细）
const warehousingsColumns = [
    {
        title: '单据编号',
        dataIndex: 'serialNumber',
    }, {
        title: '品名',
        dataIndex: 'theName',
    }, {
        title: '规格型号',
        dataIndex: 'theSpecifications',
    }, {
        title: '数量',
        dataIndex: 'theQuantity',
    }, {
        title: '总金额',
        dataIndex: 'totalAmount',
    }, {
        title: '已入库数量',
        dataIndex: 'inStorageQuantity',
    },
];
//编辑页面
class PaymentsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: getLocQueryByLabel('paymentId') || '', //控制底面表格显隐
            loading: true,
            memberList: [], //入库人列表（员工列表）
            paymentRecordMst: {}, //列表信息详情
            paymentDtlList: [], //明细列表
            checkRecordlList: [], //检查记录列表

            warehousingsListModalVisible: false, //入库明细新增------Modal显隐
            purchaseRecordMstList: [], //入库明细新增Modal列表 --- （采购单列表）
            paymentRecordDtlList: [], //入库明细新增Modal列表 --- （采购单明细列表）
            purOrdSelectedRowKeysArr: [], //入库明细新增Modal列表的选择tableId --- （采购单明细列表）

            paymentRecordMstId: '', //Modal头部搜索
            serialNumber: '', //Modal头部搜索
            theName: '', //Modal头部搜索
        }
        this._getMemberList = this._getMemberList.bind(this);
        this._getPaymentDetail = this._getPaymentDetail.bind(this);
        this._getPaymentRecordList = this._getPaymentRecordList.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
        this._getPurchaseRecordMstListUnStockList = this._getPurchaseRecordMstListUnStockList.bind(this);
        this._getPurchaseRecordDtlListUnStockList = this._getPurchaseRecordDtlListUnStockList.bind(this);
    }

    componentDidMount() {
        this._getMemberList();
        this._getPaymentDetail({ tableId: this.state.tableId });
        this._getPaymentRecordList({ paymentRecordMstId: this.state.tableId });
        this._getCheckRecordList({ paymentRecordMstId: this.state.tableId });
    }

    //获取入库人列表
    _getMemberList() {
        getMemberList({}).then(res => {
            console.log('getMemberList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取入库人列表失败');
                return;
            }
            var memberList = res.data.memberList.map(item => {
                let member = {
                    value: item.tableId,
                    label: item.realName
                };

                return member;
            });

            this.setState({
                memberList: memberList
            });
        }).catch(err => {
            MyToast('获取入库人列表失败')
        });
    }
    //获取付款单列表详情
    _getPaymentDetail(params) {
        this.setState({
            loading: false
        });
        if (!params.tableId) return;

        getPaymentDetail(params).then(res => {
            console.log('getPaymentDetail ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            this.setState({
                loading: false,
                paymentRecordMst: res.data.paymentRecordMst,
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    //审核btn
    onCheck() {

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

            console.log('when save purOrder付款单保存前 ----------', data);

            var tableId = self.state.tableId;
            if (tableId === '') {
                //新增
                getPaymentAdd(data).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info);
                        return
                    }
                    MyToast('新增成功');
                    self.setState({
                        tableId: res.data.tableId,
                    });
                }).catch(err =>
                    MyToast(err)
                    )
            } else {
                getPaymentEdit({ ...data, tableId: tableId }).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        return
                    }
                    MyToast('编辑成功');
                }).catch(err =>
                    MyToast(err)
                    )
            }
        })
    }
    /** -------------------------------------付款单明细------------------------------ */
    //数据列表格式化
    formatDatasource(dataSource) {
        if (!dataSource) return;

        var data = dataSource.map(data => {
            // theSpecifications
            return {
                tableId: data.tableId,
                serialNumber: {
                    value: data.serialNumber,
                    disabled: true,
                },
                theAmount: {
                    value: data.theAmount
                },
                theRemarks: {
                    value: data.theRemarks,
                },
                editDatetime: {
                    value: data.editDatetime,
                },
            }
        });

        return data;
    }
    //数据提交格式化
    serializeRecord(record) {
        //file
        return {
            tableId: record.tableId,
            serialNumber: record.serialNumber.value,
            theName: record.theName.value,
            theSpecifications: record.theSpecifications.value,
            theQuantity: record.theQuantity.value,
            thePrice: record.thePrice.value,
        }

    }
    //获取付款单明细列表    
    _getPaymentRecordList(params) {
        console.log('------------params', params)
        if (!params.paymentRecordMstId) return;

        getPaymentRecordList(params).then(res => {
            console.log('getPaymentRecordList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.paymentRecordDtlList || [];
            dataSource = this.formatDatasource(dataSource)
            this.setState({
                loading: false,
                paymentDtlList: dataSource
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    // //付款单明细新增
    // addBtnPayment(record) 

    //付款单明细新增btn
    warehousingAddBtn() {
        this._getPurchaseRecordMstListUnStockList();
        this.setState({
            warehousingsListModalVisible: true
        })
    }
    //付款单明细编辑   
    updatePayment(record) {
        console.log('明细编辑-----------------------', record);
        var _record = this.serializeRecord(record);

        return new Promise((resolve, reject) => {
            getPaymentRecordnEdit({
                tableId: record.tableId,
                theQuantity: record.theQuantity,
            }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    tableId: res.data.tableId,
                    msg: '编辑成功'
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    // 付款单明细删除
    deletePayment(id) {
        return new Promise((resolve, reject) => {
            getPaymentRecordnDelete({ tableId: id }).then(res => {
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
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    /** -------------------------------------检查记录列表---------------------------------- */

    //检查记录列表
    _getCheckRecordList(params) {
        console.log('params', params)
        if (!params.paymentRecordMstId) return;

        // getCheckRecordList(params).then(res => {
        //     console.log('getCheckRecordList ------------', res)
        //     if (res.data.result !== 'success') {
        //         MyToast(res.data.info || '接口失败')
        //         return;
        //     }
        // var data = res.data.checkRecordlList;
        var data = [{
            tableId: 1,
            checkTime: '2017-08-08',
            checkPerson: '审查人',
            checkOpinion: '审查意见'
        }];
        this.setState({
            loading: false,
            checkRecordlList: data
        })
        // }).catch(err => {
        //     MyToast('接口失败');
        //     this.setState({
        //         loading: false
        //     });
        // })
    }

    /** ----------------------------------------Modal------------------------------------- */
    //付款单明细新增----获取采购单(可付款)列表
    _getPurchaseRecordMstListUnStockList() {

        getPurchaseRecordMstListUnStockList({}).then(res => {
            console.log('getPurchaseRecordMstList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var purchaseRecordMstList = res.data.purchaseRecordMstList && res.data.purchaseRecordMstList.map(item => {
                let purchaseRecord = {
                    value: item.tableId + '',
                    label: item.manufacturerName
                };

                return purchaseRecord;
            });
            purchaseRecordMstList.unshift({
                value: '全部',
                label: '全部'
            })
            this.setState({
                loading: false,
                purchaseRecordMstList: purchaseRecordMstList
            });
        })
    }
    //付款单明细新增----获取采购单(可付款)-明细列表
    _getPurchaseRecordDtlListUnStockList(params) {
        console.log('params', params)
        if (!params.paymentRecordMstId) return;

        getPurchaseRecordDtlListUnStockList(params).then(res => {
            console.log('getPurchaseRecordDtlList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            this.setState({
                loading: false,
                paymentRecordDtlList: res.data.paymentRecordDtlList
            })
        })
    }
    //头部搜索
    handleFormSearch(values) {
        this._getPurchaseRecordDtlListUnStockList({
            paymentRecordMstId: values.paymentRecordMstId,
            // serialNumber: values.serialNumber || '',
            // theName: values.theName || '',
        });
    }
    //明细新增 --- Modal确定  
    purordListModalOk() {
        var purOrdSelectedRowKeysArr = this.state.purOrdSelectedRowKeysArr.join(',');
        console.log('------------', this.state.purOrdSelectedRowKeysArr)

        getPaymentRecordnAdd({
            tableIdArr: purOrdSelectedRowKeysArr,
            paymentRecordMstId: this.state.tableId,
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info);
                return;
            }
            MyToast('明细新增成功');
            this.setState({
                warehousingsListModalVisible: false,
            });
            this._getPaymentRecordList({ paymentRecordMstId: this.state.tableId });
        }).catch(err =>
            MyToast(err)
            )
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var paymentRecordMst = this.state.paymentRecordMst;
        var purOrdSelectedRecord = this.state.purOrdSelectedRecord;

        var self = this;
        var purOrdSelectedRowKeysArr = self.state.purOrdSelectedRowKeysArr;

        //付款单Modal的行标选择        
        const warehousingsDataRowSelection = {
            purOrdSelectedRowKeysArr,
            onChange(purOrdSelectedRowKeysArr) {
                console.log(`purOrdSelectedRowKeys changed: ${purOrdSelectedRowKeysArr}`);
                self.setState({
                    purOrdSelectedRowKeysArr: purOrdSelectedRowKeysArr,
                })
            }
        }
        // Modal头部搜索
        const rcsearchformData = {
            colspan: 2,
            fields: [
                //     {
                //     type: 'input',
                //     label: '单据编号',
                //     name: 'serialNumber',
                // }, {
                //     type: 'input',
                //     label: '品名',
                //     name: 'theName',
                // },
                {
                    type: 'select',
                    label: '采购单主表',
                    name: 'paymentRecordMstId',
                    defaultValue: '全部',
                    options: this.state.purchaseRecordMstList,
                }]
        }
        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap">
                    <div className="yzy-tab-content-item-wrap">
                        <Form onSubmit={this.saveDetail.bind(this)}>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">付款单基本信息</h2>
                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="菜单">
                                            {getFieldDecorator('menuId', {
                                                initialValue: paymentRecordMst.menuId ? paymentRecordMst.menuId : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                                // ],
                                            })(
                                                <Input placeholder="菜单" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="备注">
                                            {getFieldDecorator('theRemarks', {
                                                initialValue: paymentRecordMst.theRemarks ? paymentRecordMst.theRemarks : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                // pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                                //],
                                            })(
                                                <Input placeholder="备注" />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                {
                                    getLocQueryByLabel('paymentId') ?
                                        <Row>
                                            {/* <Col span={8}>
                                        <FormItem {...formItemLayout} label="创建人">
                                            {getFieldDecorator('storageInMemberId', {
                                                initialValue: paymentRecordMst.editor ? paymentRecordMst.editor.realName + '' : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/ } 
                                                //],
                                            })(
                                                <Select placeholder="创建人">
                                                    {
                                                        this.state.memberList.map(item => {
                                                            return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                        })
                                                    }
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col> */}
                                            <Col span={8}>
                                                <FormItem {...formItemLayout} label="单据编号">
                                                    {paymentRecordMst.serialNumber}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem {...formItemLayout} label="审核情况">
                                                    {paymentRecordMst.isPass ? '完成' : '未完成'}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem {...formItemLayout} label="创建日期">
                                                    {paymentRecordMst.createDatetime}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        : null}
                                <div className="yzy-block-center">
                                    <Button type="primary" style={{ padding: '0 30px' }} onClick={this.onCheck.bind(this)}>审核通过</Button>
                                    <Button type="primary" style={{ padding: '0 40px', marginLeft: 8 }} htmlType="submit">保存</Button>
                                </div>
                            </div>
                            {this.state.tableId ?
                                <div>
                                    <div className="baseinfo-section">
                                        <h2 className="yzy-tab-content-title">付款单明细</h2>
                                        <Button type="primary" style={{ marginLeft: 8, float: 'right' }} onClick={this.warehousingAddBtn.bind(this)}>新增</Button>
                                        <EditableTableSection
                                            columns={columns}
                                            dataSource={this.state.paymentDtlList}
                                            onDelete={this.deletePayment.bind(this)}
                                            //onSaveAdd={this.addBtnPayment.bind(this)}
                                            onSaveUpdate={this.updatePayment.bind(this)}
                                            //itemDataModel={getPaymentRecord}
                                            loading={this.state.loading}
                                        />
                                    </div>
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
                                </div>
                                : null}
                            {/* 明细新增------采购单选择 */}
                            <DraggableModal
                                title="明细新增，选择采购单"
                                width='90%'
                                visible={this.state.warehousingsListModalVisible}
                                onCancel={() => this.setState({ warehousingsListModalVisible: false })}
                                className='modal'
                            >
                                <RcSearchForm {...rcsearchformData}
                                    handleSearch={this.handleFormSearch.bind(this)} />
                                <Table
                                    style={{ marginTop: 20 }}
                                    rowSelection={warehousingsDataRowSelection}
                                    columns={warehousingsColumns}
                                    dataSource={this.state.paymentRecordDtlList}
                                    rowKey="tableId"
                                    rowClassName={(record, index) => {
                                        if (index % 2 !== 0) {
                                            return 'active'
                                        }
                                    }}
                                />
                                <div className="yzy-block-center">
                                    <Button type="primary" style={{ padding: '0 40px', margin: '20px 0' }} onClick={this.purordListModalOk.bind(this)}>确定</Button>
                                </div>
                            </DraggableModal>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
var PaymentsEditForm = Form.create()(PaymentsEdit);
ReactDOM.render(<PaymentsEditForm />, document.getElementById('root'));
