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

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    getPurchaseOrderDetail,
    getPurchaseOrderAdd,
    getPurchaseOrderEdit,
    getPurchaseOrderRecordList,
    getPurchaseOrderRecordnAdd,
    getPurchaseOrderRecordnEdit,
    getPurchaseOrderRecordnDelete,
    getCheckRecordList,
} from '../../common/api/api.purchaseorders.js';

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
        validateType: 'number',
    }, {
        title: '单价',
        dataIndex: 'thePrice',
        validateType: 'number',
    }, {
        title: '总金额',
        dataIndex: 'totalAmount',
        validateType: 'number',
    }, {
        title: '已入库数量',
        dataIndex: 'inStorageQuantity',
        validateType: 'number',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: 120,
    }
];
//采购单明细新增
const getPurchaseOrderRecord = {
    tableId: '',
    editable: true,
    serialNumber: {
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
    },
    inStorageQuantity: {
        value: '',
    }
};
//审核记录
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
            tableId: getLocQueryByLabel('purOrderId') || '', //控制底面表格显隐
            loading: true,
            departmentList: [], //部门列表
            purchaseRecordMst: {}, //列表信息详情
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
        this._getCheckRecordList({ purchaseRecordMstId: this.state.tableId });
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

            this.setState({
                loading: false,
                purchaseRecordMst: res.data.purchaseRecordMst,
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
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
                getPurchaseOrderEdit({ ...data, tableId: tableId }).then(res => {
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
    //数据列表格式化
    formatDatasource(dataSource) {
        var data = dataSource.map(data => {
            // theSpecifications
            return {
                tableId: data.tableId,
                serialNumber: {
                    value: data.serialNumber,
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
                },
                inStorageQuantity: {
                    value: data.inStorageQuantity,
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

        return new Promise((resolve, reject) => {
            getPurchaseOrderRecordnAdd({
                ..._record,
                purchaseRecordMstId: this.state.tableId
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
                    msg: '新增成功'
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        });
    }
    //采购单明细更新    
    updatePurchaseorder(record) {
        console.log('编辑-----------------------', record);
        var _record = this.serializeRecord(record);

        return new Promise((resolve, reject) => {
            getPurchaseOrderRecordnEdit({ ..._record }).then(res => {
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
    // 采购单明细删除
    deletePurchaseorder(id) {
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
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    //检查记录列表
    _getCheckRecordList(params) {
        console.log('params', params)
        if (!params.purchaseRecordMstId) return;

        // getCheckRecordList(params).then(res => {
        //     console.log('getCheckRecordList ------------', res)
        //     if (res.data.result !== 'success') {
        //         MyToast(res.data.info || '接口失败')
        //         return;
        //     }
        // var data = res.data.checkRecordlList;
        var data = [{
            tableId: '1',
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
    render() {
        let { getFieldDecorator } = this.props.form;
        var purchaseRecordMst = this.state.purchaseRecordMst;
        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap">
                    <div className="yzy-tab-content-item-wrap">
                        <Form onSubmit={this.saveDetail.bind(this)}>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">采购单基本信息</h2>
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
                                        <FormItem {...formItemLayout} label="菜单">
                                            {getFieldDecorator('menuId', {
                                                initialValue: purchaseRecordMst.menuId ? purchaseRecordMst.menuId : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                                // ],
                                            })(
                                                <Input placeholder="菜单" />
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
                                </Row>
                                <Row>
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
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="厂商名称">
                                            {getFieldDecorator('manufacturerName', {
                                                initialValue: purchaseRecordMst.manufacturerName ? purchaseRecordMst.manufacturerName : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                                //],
                                            })(
                                                <Input placeholder="厂商名称" />
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
                                <div className="yzy-block-center">
                                    <Button type="primary" style={{ padding: '0 30px' }} onClick={this.onCheck.bind(this)}>审核通过</Button>
                                    <Button type="primary" style={{ padding: '0 40px', marginLeft: 8 }} htmlType="submit">保存</Button>
                                </div>
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
                    </div>
                </div>
            </div>
        )
    }
}
var PurchaseordersEditForm = Form.create()(PurchaseordersEdit);
ReactDOM.render(<PurchaseordersEditForm />, document.getElementById('root'));
