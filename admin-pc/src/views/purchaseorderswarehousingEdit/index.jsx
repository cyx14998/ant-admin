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

import DraggableModal from '../../components/modal.draggable';
import RcSearchForm from '../../components/rcsearchform';
import WarehousingRecordModal from './index.modal';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
import {
    getWarehousingDetail,
    getWarehousingCancel,
    getWarehousingPass,
    getWarehousingReject,
    getWarehousingAdd,
    getWarehousingEdit,
    getWarehousingRecordList,
    getWarehousingRecordnDelete,
    getCheckRecordList,
    getHousingList, //仓库列表
    getMemberList, //入库人列表
} from '../../common/api/api.purchaseorderswarehousing.js';

/**
 * @props columns
 *     配置数据校验
 * @props dataSource
 *     在接口与组件之间要进行数据转换，只维护columns相关数据
 * @desc
 *     只关心增删改查的接口调用与数据转换
 */
import { MyToast, getLocQueryByLabel, } from '../../common/utils';

//入库单明细头部
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
    },
    {
        title: '厂商',
        dataIndex: 'manufacturerName',
    },
    {
        title: '入库数量',
        dataIndex: 'theQuantity',
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
            {record.theFlowResult ? '审核通过' : '审核不通过'}
        </span>
    }
];
//编辑页面
class WarehousingsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: getLocQueryByLabel('tableId') || '', //控制底面表格显隐
            flowOrderStateId: '',
            loading: true,
            houseList: [], //仓库列表
            memberList: [], //入库人列表（员工列表）
            storageInRecordMst: {}, //列表信息详情

            suggestModalVisible: false, //审核意见弹窗显隐
            suggestContent: '', //审核意见
            checkType: '', //点击的审核按钮类型

            warehousingDtlList: [], //明细列表
            checkRecordlList: [], //检查记录列表

            warehousingsListModalVisible: false, //入库明细新增------Modal显隐
        }
        this._getHousingList = this._getHousingList.bind(this);
        this._getMemberList = this._getMemberList.bind(this);
        this._getWarehousingDetail = this._getWarehousingDetail.bind(this);
        this._getWarehousingRecordList = this._getWarehousingRecordList.bind(this);
        this._getCheckRecordList = this._getCheckRecordList.bind(this);
    }

    componentDidMount() {
        this._getHousingList();
        this._getMemberList();
        this._getWarehousingDetail({ tableId: this.state.tableId });
        this._getWarehousingRecordList({ storageInRecordMstId: this.state.tableId });
        columns[5].render = (text, record, index) => {
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
                    value: item.tableId,
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
    //获取入库人列表
    _getMemberList() {
        getMemberList({}).then(res => {
            console.log('getMemberList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取入库人列表失败');
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
            MyToast('获取入库人列表失败')
        });
    }
    //获取入库单列表详情
    _getWarehousingDetail(params) {
        this.setState({
            loading: false
        });
        if (!params.tableId) return;

        getWarehousingDetail(params).then(res => {
            console.log('getWarehousingDetail ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.storageInRecordMst;
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
                storageInRecordMst: data,
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
    //入库单作废
    onCheckCancel() {
        getWarehousingCancel({ tableId: this.state.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }

            MyToast('入库单已作废');
            this._getWarehousingDetail({ tableId: this.state.tableId });
            // this.props.onCancel();            
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //入库单退回
    onCheckReject() {
        getWarehousingReject({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '退回失败');
                return;
            }

            MyToast('入库单已退回');
            this.setState({
                suggestModalVisible: false,
            });
            this._getWarehousingDetail({ tableId: this.state.tableId });
            this._getCheckRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err =>
            MyToast('接口失败')
            );
    }
    //入库单送审
    onCheckPass() {
        getWarehousingPass({
            tableId: this.state.tableId,
            theContent: this.state.suggestContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '送审失败');
                return;
            }

            MyToast('入库单已送审');
            this.setState({
                suggestModalVisible: false,
            });
            this._getWarehousingDetail({ tableId: this.state.tableId });
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
            data.storageInDatetime = data.storageInDatetime ? data.storageInDatetime.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');

            console.log('when save purOrder入库单保存前 ----------', data);

            var tableId = self.state.tableId;
            if (tableId === '') {
                //新增
                getWarehousingAdd(data).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info);
                        return
                    }
                    MyToast('新增成功');
                    self.setState({
                        tableId: res.data.tableId,
                        flowOrderStateId: res.data.flowOrderStateId,
                    });
                }).catch(err =>
                    MyToast(err)
                    )
            } else {
                getWarehousingEdit({ ...data, tableId: tableId }).then(res => {
                    console.log('savePurOrder res', res);

                    if (res.data.result !== 'success') {
                        MyToast(res.data.info);
                        return
                    }
                    MyToast('编辑成功');
                }).catch(err =>
                    MyToast(err)
                    )
            }
        })
    }
    /** -------------------------------------入库单明细------------------------------ */
    //获取入库单明细列表    
    _getWarehousingRecordList(params) {
        console.log('------------params', params)
        if (!params.storageInRecordMstId) return;

        getWarehousingRecordList(params).then(res => {
            console.log('getWarehousingRecordList 明细--------------------------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var dataSource = res.data.storageInRecordDtlList || [];
            this.setState({
                loading: false,
                warehousingDtlList: dataSource
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    //入库单明细新增btn
    warehousingAddBtn() {
        this.setState({
            warehousingsListModalVisible: true
        })
    }
    //modal显隐
    onCancelModal() {
        this.setState({
            warehousingsListModalVisible: false,
        })
    }
    // 入库单明细删除
    onEditDelete(text, record, index) {
        var self = this;

        //调用列表删除接口
        getWarehousingRecordnDelete({ tableId: record.tableId }).then(res => {
            console.log('getWarehousingRecordnDelete --------------', res);

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败');
                return;
            }

            self.state.warehousingDtlList.splice(index, 1);
            self.setState({
                warehousingDtlList: self.state.warehousingDtlList
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
        var storageInRecordMst = this.state.storageInRecordMst;
        var purOrdSelectedRecord = this.state.purOrdSelectedRecord;
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
                                <h2 className="yzy-tab-content-title">入库单基本信息</h2>
                                <Row>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="单据编号">
                                            {getFieldDecorator('serialNumber', {
                                                initialValue: storageInRecordMst.serialNumber ? storageInRecordMst.serialNumber : '',
                                            })(
                                                <Input placeholder="单据编号" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="单据状态">
                                            {getFieldDecorator('theState', {
                                                initialValue: storageInRecordMst.theState,
                                            })(
                                                <Input placeholder="单据状态" disabled={true} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="创建人">
                                            {getFieldDecorator('editor.realName', {
                                                initialValue: storageInRecordMst.editor ? storageInRecordMst.editor.realName : '',
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
                                                initialValue: storageInRecordMst.warehouse ? storageInRecordMst.warehouse.tableId + '' : '',
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
                                        <FormItem {...formItemLayout} label="入库人">
                                            {getFieldDecorator('storageInMemberId', {
                                                initialValue: storageInRecordMst.storageInMember ? storageInRecordMst.storageInMember.memberId + '' : '',
                                                //rules: [{ required: true, message: '必填!' },
                                                //{ pattern: /^[0-9]*$/ } 
                                                //],
                                            })(
                                                <Select placeholder="入库人">
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
                                        <FormItem {...formItemLayout} label="入库时间">
                                            {getFieldDecorator('storageInDatetime', {
                                                initialValue: moment(storageInRecordMst.storageInDatetime || new Date(), 'YYYY-MM-DD'),
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
                                                initialValue: storageInRecordMst.theRemarks ? storageInRecordMst.theRemarks : '',
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
                                        <h2 className="yzy-tab-content-title">入库单明细</h2>
                                        <Button type="primary" style={{ marginLeft: 8, marginBottom: 10 }} onClick={this.warehousingAddBtn.bind(this)}>新增</Button>
                                        <Table
                                            columns={columns}
                                            dataSource={this.state.warehousingDtlList}
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
                            title="明细新增，选择采购单"
                            width='90%'
                            visible={this.state.warehousingsListModalVisible}
                            onCancel={this.onCancelModal.bind(this)}
                            className='modal'
                        >
                            <WarehousingRecordModal _getWarehousingRecordList={this._getWarehousingRecordList.bind(this)} onCancelModal={this.onCancelModal.bind(this)} tableId={this.state.tableId} />
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
var WarehousingsEditForm = Form.create()(WarehousingsEdit);
ReactDOM.render(<WarehousingsEditForm />, document.getElementById('root'));
