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
    getOutboundDetail,
    getOutboundAdd,
    getOutboundEdit,
    getOutboundRecordList,
    getOutboundRecordnAdd,
    getOutboundRecordnEdit,
    getOutboundRecordnDelete,
    getStockList,  //明细新增---库存列表
    getCheckRecordList,
} from '../../common/api/api.purchaseordersoutbound.js';

import {
    gethousingList, //获取仓库列表
    getMemberList, //获取出库人列表 （员工列表）
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

//出库单明细头部
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

//库存明细头部-----（用于新增出库明细）
const stockColumns = [
    {
        title: '仓库',
        dataIndex: 'warehouse.theName',
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
        title: '出库中数量',
        dataIndex: 'manufacturerName',
    },
];
//编辑页面
class OutboundEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: getLocQueryByLabel('outboundId') || '', //控制底面表格显隐
            loading: true,
            houseList: [], //仓库列表
            memberList: [], //出库人列表（员工列表）
            storageOutRecordMst: {}, //列表信息详情
            outboundDtlList: [], //明细列表
            checkRecordlList: [], //检查记录列表

            outboundListModalVisible: false, //入库明细新增------Modal显隐
            stockList: [], //入库明细新增Modal列表 --- 库存列表
            stockSelectedRowKeysArr: [], //入库明细新增Modal列表的选择tableId --- （采购单明细列表）

            warehouseId: '0', //Modal头部搜索
        }
        this._gethousingList = this._gethousingList.bind(this);
        this._getMemberList = this._getMemberList.bind(this);
        this._getOutboundDetail = this._getOutboundDetail.bind(this);
        this._getOutboundRecordList = this._getOutboundRecordList.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
        this._getStockList = this._getStockList.bind(this);
    }

    componentDidMount() {
        this._gethousingList();
        this._getMemberList();
        this._getOutboundDetail({ tableId: this.state.tableId });
        this._getOutboundRecordList({ storageOutRecordMstId: this.state.tableId });
        this._getCheckRecordList({ storageOutRecordMstId: this.state.tableId });
    }

    //获取仓库列表
    _gethousingList() {
        gethousingList({}).then(res => {
            console.log('gethousingList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取仓库列表失败');
                return;
            }

            var houseList = res.data.warehouseList.map(item => {
                let house = {
                    value: item.tableId + '',
                    label: item.theName
                };

                return house;
            });

            this.setState({
                houseList: houseList
            });
        }).catch(err => {
            MyToast('获取仓库列表失败')
        });
    }
    //获取出库人列表
    _getMemberList() {
        getMemberList({}).then(res => {
            console.log('getMemberList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取出库人列表失败');
                return;
            }
            console.log('-------------', res.data.memberList)
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
            MyToast('获取出库人列表失败')
        });
    }
    //获取出库单列表详情
    _getOutboundDetail(params) {
        this.setState({
            loading: false
        });
        if (!params.tableId) return;

        getOutboundDetail(params).then(res => {
            console.log('getOutboundDetail ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            this.setState({
                loading: false,
                storageOutRecordMst: res.data.storageOutRecordMst,
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

            //时间处理---------------------
            data.storageOutDatetime = data.storageOutDatetime ? data.storageOutDatetime.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');

            console.log('when save purOrder出库单保存前 ----------', data);

            var tableId = self.state.tableId;
            if (tableId === '') {
                //新增
                getOutboundAdd(data).then(res => {
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
                getOutboundEdit({ ...data, tableId: tableId }).then(res => {
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
    /** -------------------------------------出库单明细------------------------------ */
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
                theName: {
                    value: data.theName || '',
                },
                theSpecifications: {
                    value: data.theSpecifications,
                },
                theQuantity: {
                    value: data.theQuantity || '',
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
        }
    }
    //获取出库单明细列表    
    _getOutboundRecordList(params) {
        console.log('------------params', params)
        if (!params.storageOutRecordMstId) return;

        getOutboundRecordList(params).then(res => {
            console.log('getOutboundRecordList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.storageOutRecordDtlList || [];
            dataSource = this.formatDatasource(dataSource)
            this.setState({
                loading: false,
                outboundDtlList: dataSource
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    // //出库单明细新增
    // addBtnOutbound(record) 

    //出库单明细新增btn
    outboundAddBtn() {
        this._getStockList();
        this.setState({
            outboundListModalVisible: true
        })
    }
    //出库单明细编辑   
    updateOutbound(record) {
        console.log('明细编辑-----------------------', record);
        var _record = this.serializeRecord(record);

        return new Promise((resolve, reject) => {
            getOutboundRecordnEdit({
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
    // 出库单明细删除
    deleteOutbound(id) {
        return new Promise((resolve, reject) => {
            getOutboundRecordnDelete({ tableId: id }).then(res => {
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
    /** -------------------------------------出库单明细---------------------------------- */

    //检查记录列表
    _getCheckRecordList(params) {
        console.log('params', params)
        if (!params.storageOutRecordMstId) return;

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
    //出库单明细新增----获取库存列表
    _getStockList(params) {
        console.log('------------params', params)

        getStockList({ ...params }).then(res => {
            console.log('getStockList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.storageItemList || [];
            this.setState({
                loading: false,
                stockList: dataSource
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }

    //头部搜索
    handleFormSearch(values) {
        this._getStockList({
            warehouseId: values.warehouseId,
        });
    }
    //明细新增 --- Modal确定  
    purordListModalOk() {
        var stockSelectedRowKeysArr = this.state.stockSelectedRowKeysArr;
        if (stockSelectedRowKeysArr.length == 0) {
            MyToast('请先选择数据');
            return;
        }
        stockSelectedRowKeysArr = stockSelectedRowKeysArr.join(',');
        console.log('------------', stockSelectedRowKeysArr)

        getOutboundRecordnAdd({
            tableIdArr: stockSelectedRowKeysArr,
            storageOutRecordMstId: this.state.tableId,
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info);
                return;
            }
            MyToast('明细新增成功');
            this.setState({
                stockSelectedRowKeysArr: [],
                outboundListModalVisible: false,
            });
            this._getOutboundRecordList({ storageOutRecordMstId: this.state.tableId });
        }).catch(err =>
            MyToast(err)
            )
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var storageOutRecordMst = this.state.storageOutRecordMst;
        var purOrdSelectedRecord = this.state.purOrdSelectedRecord;

        var self = this;
        var stockSelectedRowKeysArr = self.state.stockSelectedRowKeysArr;

        //出库单Modal的行标选择        
        const outboundDataRowSelection = {
            stockSelectedRowKeysArr,
            onChange(stockSelectedRowKeysArr) {
                console.log(`purOrdSelectedRowKeys changed: ${stockSelectedRowKeysArr}`);
                self.setState({
                    stockSelectedRowKeysArr: stockSelectedRowKeysArr,
                })
            }
        }
        // Modal头部搜索
        const rcsearchformData = {
            colspan: 2,
            fields: [
                {
                    type: 'select',
                    label: '仓库',
                    name: 'warehouseId',
                    defaultValue: '全部',
                    options: this.state.houseList,
                },]
        }
        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap">
                    <div className="yzy-tab-content-item-wrap">
                        <Form onSubmit={this.saveDetail.bind(this)}>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">出库单基本信息</h2>
                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="仓库">
                                            {getFieldDecorator('warehouseId', {
                                                initialValue: storageOutRecordMst.warehouse ? storageOutRecordMst.warehouse.tableId + '' : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/ } 
                                                //],
                                            })(
                                                <Select placeholder="仓库">
                                                    {
                                                        this.state.houseList.map(item => {
                                                            return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                        })
                                                    }
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="出库人">
                                            {getFieldDecorator('storageOutMemberId', {
                                                initialValue: storageOutRecordMst.storageOutMember ? storageOutRecordMst.storageOutMember.tableId + '' : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/ } 
                                                //],
                                            })(
                                                <Select placeholder="出库人">
                                                    {
                                                        this.state.memberList.map(item => {
                                                            return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                                                        })
                                                    }
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="出库日期">
                                            {getFieldDecorator('storageOutDatetime', {
                                                initialValue: moment(storageOutRecordMst.storageOutDatetime || new Date(), 'YYYY-MM-DD'),
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
                                        <FormItem {...formItemLayout} label="菜单">
                                            {getFieldDecorator('menuId', {
                                                initialValue: storageOutRecordMst.menuId ? storageOutRecordMst.menuId : '',
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
                                                initialValue: storageOutRecordMst.theRemarks ? storageOutRecordMst.theRemarks : '',
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
                                    <div className="baseinfo-section">
                                        <h2 className="yzy-tab-content-title">出库单明细</h2>
                                        <Button type="primary" style={{ marginLeft: 8 }} onClick={this.outboundAddBtn.bind(this)}>新增</Button>
                                        <EditableTableSection
                                            columns={columns}
                                            dataSource={this.state.outboundDtlList}
                                            onDelete={this.deleteOutbound.bind(this)}
                                            //onSaveAdd={this.addBtnOutbound.bind(this)}
                                            onSaveUpdate={this.updateOutbound.bind(this)}
                                            //itemDataModel={getOutboundRecord}
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
                                visible={this.state.outboundListModalVisible}
                                onCancel={() => this.setState({ outboundListModalVisible: false })}
                                className='modal'
                            >
                                <RcSearchForm {...rcsearchformData}
                                    handleSearch={this.handleFormSearch.bind(this)} />
                                <Table
                                    style={{ marginTop: 20 }}
                                    rowSelection={outboundDataRowSelection}
                                    columns={stockColumns}
                                    dataSource={this.state.stockList}
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
var OutboundEditForm = Form.create()(OutboundEdit);
ReactDOM.render(<OutboundEditForm />, document.getElementById('root'));
