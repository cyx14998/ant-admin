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
import OutBoundRecordModal from './index.modal';
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    getOutboundDetail,
    getOutboundCancel,
    getOutboundPass,
    getOutboundReject,
    getOutboundAdd,
    getOutboundEdit,
    getOutboundRecordList,
    getOutboundRecordnDelete,
} from '../../common/api/api.purchaseordersoutbound.js';

import {
    getHousingList, //获取仓库列表
    getMemberList, //获取出库人列表 （员工列表）
    getCheckRecordList,
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
    },
    //  {
    //     title: '仓库名称',
    //     dataIndex: 'warehouse.theName',
    // }, 
    {
        title: '厂商',
        dataIndex: 'manufacturerName',
    },
    {
        title: '品名',
        dataIndex: 'theName',
    }, {
        title: '规格型号',
        dataIndex: 'theSpecifications',
    }, {
        title: '已出库数量',
        dataIndex: 'theQuantity',
    }, {
        title: '入库时间',
        dataIndex: 'createDatetime',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: 120,
    }
];

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
            tableId: getLocQueryByLabel('tableId') || '', //控制底面表格显隐
            flowOrderStateId: '',
            loading: true,
            houseList: [], //仓库列表
            memberList: [], //出库人列表（员工列表）
            storageOutRecordMst: {}, //列表信息详情

            suggestModalVisible: false, //审核意见弹窗显隐
            suggestContent: '', //审核意见
            checkType: '', //点击的审核按钮类型

            outboundDtlList: [], //明细列表
            checkRecordlList: [], //检查记录列表

            outboundListModalVisible: false, //入库明细新增------Modal显隐
        }
        this._getHousingList = this._getHousingList.bind(this);
        this._getMemberList = this._getMemberList.bind(this);
        this._getOutboundDetail = this._getOutboundDetail.bind(this);
        this._getOutboundRecordList = this._getOutboundRecordList.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
    }

    componentDidMount() {
        this._getHousingList();
        this._getMemberList();
        this._getOutboundDetail({ tableId: this.state.tableId });
        this._getOutboundRecordList({ storageOutRecordMstId: this.state.tableId });
        columns[6].render = (text, record, index) => {
            return (<Popconfirm title="确定删除么?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                <a title="删除" className="delete" href="#" ><Icon type="delete" className="yzy-icon" /></a>
            </Popconfirm>)
        }
    }

    //获取仓库列表
    _getHousingList() {
        getHousingList({}).then(res => {
            console.log('getHousingList res', res)

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
            var data = res.data.storageOutRecordMst;

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
                storageOutRecordMst: data,
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
    //出库单作废
    onCheckCancel() {
        getOutboundCancel({ tableId: this.state.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }

            MyToast('出库单已作废');
            this._getOutboundDetail({ tableId: this.state.tableId });
            // this.props.onCancel(); 
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //出库单退回
    onCheckReject() {
        getOutboundReject({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '退回失败');
                return;
            }

            MyToast('出库单已退回');
            this.setState({
                suggestModalVisible: false,
            });
            this._getOutboundDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //出库单送审
    onCheckPass() {
        getOutboundPass({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '送审失败');
                return;
            }

            MyToast('出库单已送审');
            this.setState({
                suggestModalVisible: false,
            });
            this._getOutboundDetail({ tableId: this.state.tableId });
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
            data.storageOutDatetime = data.storageOutDatetime ? data.storageOutDatetime.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');

            console.log('when save purOrder出库单保存前 ----------', data);

            var tableId = self.state.tableId;
            if (tableId === '') {
                //新增
                getOutboundAdd(data).then(res => {
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

                    self._getOutboundDetail({
                        tableId: res.data.tableId,
                    });
                }).catch(err => MyToast(err || '新增失败'))
            } else {
                getOutboundEdit({ ...data, tableId: tableId }).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '编辑保存失败');
                        return
                    }
                    MyToast('编辑成功');
                }).catch(err => MyToast(err || '编辑保存失败'))
            }
        })
    }
    /** -------------------------------------出库单明细------------------------------ */
    //获取出库单明细列表    
    _getOutboundRecordList(params) {
        if (!params.storageOutRecordMstId) return;

        getOutboundRecordList(params).then(res => {
            console.log('getOutboundRecordList 明细------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.storageOutRecordDtlList || [];
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
    //出库单明细新增btn
    outboundAddBtn() {
        this.setState({
            outboundListModalVisible: true
        })
    }
    //modal显隐
    onCancelModal() {
        this.setState({
            outboundListModalVisible: false,
        })
    }
    // 出库单明细删除
    onEditDelete(text, record, index) {
        var self = this;

        //调用列表删除接口
        getOutboundRecordnDelete({ tableId: record.tableId }).then(res => {
            console.log('getOutboundRecordnDelete --------------', res);

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败');
                return;
            }

            self.state.outboundDtlList.splice(index, 1);
            self.setState({
                warehousingDtlList: self.state.outboundDtlList
            })

        }).catch(err => {
            MyToast(err || '删除失败');
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
                            <div>
                                <Button type="primary" style={{ padding: '0 20px', }} htmlType="submit">保存</Button>
                                <Button type="primary" style={{ padding: '0 20px', marginLeft: 8 }} onClick={this.oncheckbtn.bind(this, 'checkPass')} >审核</Button>
                                <Popconfirm title="确定要作废么？" onConfirm={this.onCheckCancel.bind(this)}>
                                    <Button type="primary" className="btn-cancel" style={{ padding: '0 20px', marginLeft: 8 }} >作废</Button>
                                </Popconfirm>
                                <Button type="primary" className="btn-reject" style={{ padding: '0 20px', marginLeft: 8 }} onClick={this.oncheckbtn.bind(this, 'checkReject')}>退回</Button>
                            </div>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">出库单基本信息</h2>
                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="单据编号">
                                            {getFieldDecorator('serialNumber', {
                                                initialValue: storageOutRecordMst.serialNumber ? storageOutRecordMst.serialNumber : '',
                                            })(
                                                <Input placeholder="单据编号" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="单据状态">
                                            {getFieldDecorator('theState', {
                                                initialValue: storageOutRecordMst.theState,
                                            })(
                                                <Input placeholder="单据状态" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="创建人">
                                            {getFieldDecorator('editor.realName', {
                                                initialValue: storageOutRecordMst.editor ? storageOutRecordMst.editor.realName : localStorage.getItem('userName'),
                                            })(
                                                <Input placeholder="创建人" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
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
                                                initialValue: storageOutRecordMst.storageOutMember ? storageOutRecordMst.storageOutMember.tableId + '' : localStorage.getItem('memberId'),
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

                            </div>
                            {this.state.tableId ?
                                <div>
                                    <div className="baseinfo-section">
                                        <h2 className="yzy-tab-content-title">出库单明细</h2>
                                        <Button type="primary" style={{ marginLeft: 8, marginBottom: 10 }} onClick={this.outboundAddBtn.bind(this)}>新增</Button>
                                        <Table
                                            columns={columns}
                                            dataSource={this.state.outboundDtlList}
                                            rowKey="tableId"
                                            loading={this.state.loading}
                                            pagination={false}
                                            rowClassName={(record, index) => {
                                                if (index % 2 !== 0) {
                                                    return 'active'
                                                }
                                            }}
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
                        </Form>
                        {/* 明细新增------采购单选择 */}
                        <DraggableModal
                            title="明细新增，选择库存"
                            width='90%'
                            visible={this.state.outboundListModalVisible}
                            onCancel={this.onCancelModal.bind(this)}
                            className='modal'
                        >
                            <OutBoundRecordModal _getOutboundRecordList={this._getOutboundRecordList.bind(this)} onCancelModal={this.onCancelModal.bind(this)} tableId={this.state.tableId} />
                        </DraggableModal>
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
var OutboundEditForm = Form.create()(OutboundEdit);
ReactDOM.render(<OutboundEditForm />, document.getElementById('root'));
