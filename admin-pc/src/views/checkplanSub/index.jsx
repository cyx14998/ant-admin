import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Pagination,
    Row,
    Col,
    Popconfirm,
    Checkbox,
    Modal,
    Form,
    Icon,
    Upload
} from 'antd';
const FormItem = Form.Item;

import RcSearchForm from '../../components/rcsearchform';
import { MyToast } from '../../common/utils';

const checkplanId = getLocQueryByLabel('checkplanId');

// RcSearchForm datablob
const rcsearchformData = {
    colspan: 2,
    fields: [{
        type: 'input',
        label: '企业名称',
        name: 'customerName',
    }]
}
import { getLocQueryByLabel } from '../../common/utils';

import {
    getMemberList,
    getCheckplanSublist,
    getCheckplanDetail,
    getCheckplanSubDelete,
    getCheckplanSubPerformer,
    getCheckplanSubPerformerMulti,
    getCheckplanSubAdd,
    getCheckplanSubAddAll,
    getCustomerList,
} from '../../common/api/api.checkplan';
import CheckplanSubDetail from './index.detail'

//列表页面
class CustomerCheckPlanSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checkplanSubList: [], //子表数据列表
            editModalVisible: false, //编辑Modal显隐
            performerId: '', //执行者列表的id
            checkSubIdArr: [], //批量操作多条数据的执行者时，的该多条数据的id
            checkSubId: [], //操作单条执行者存储的单条Id
            multiModalVisible: false, //批量管理modal显隐
            customerList: [], //企业列表
            customerListModalVisible: false, //企业列表Modal显隐
            checkplanDetail: {}, //根据主表id获取的子表详情,展现于头部基础信息
        }

        this.getData = this.getData.bind(this);
        this.getCustomerList = this.getCustomerList.bind(this);
    }

    componentDidMount() {
        console.log(checkplanId)
        this.getData({ inspectionPlanMstId: checkplanId });
        this.getCustomerList();
        //根据主表id获取子表基本信息
        getCheckplanDetail({ tableId: checkplanId }).then(res => {
            console.log('getCheckplanDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            this.setState({
                checkplanDetail: res.data.inspectionPlanMst
            })
        }).catch(err => {
            console.log(err)
        })
        // 获取人员列表
        return new Promise((resolve, rejcet) => {
            getMemberList({}).then(res => {
                console.log('getMemberlist res ---', res);

                if (res.data.result !== 'success') {
                    console.log(res.data.info, )
                    return;
                }
                this.setState({
                    memberList: res.data.memberList,
                });
            }).catch(err => {
                console.log(err)
            })
        })
    }
    //获取子表列表数据--封装
    getData(params) {
        //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
        getCheckplanSublist(params).then(res => {
            console.log('getCheckplanSublist ---', res)
            if (res.data.result !== 'success') {
                alert(res.data.info || '接口失败')
                return;
            }
            this.setState({
                loading: false,
                checkplanSubList: res.data.inspectionPlanDtlList
            })
        }).catch(err => {
            alert(err || '接口失败')
        })
    }
    //获取企业列表--封装    
    getCustomerList() {
        getCustomerList({ inspectionPlanMstId: checkplanId }).then(res => {
            console.log('getCustomerList res ---', res);

            if (res.data.result !== 'success') {
                console.log(res.data.info, )
                return;
            }
            this.setState({
                customerList: res.data.customerList,
            });
        }).catch(err => {
            console.log(err)
        })
    }
    //头部搜索
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);
        this.getData({
            customerName: values.customerName,
            inspectionPlanMstId: checkplanId,
        });
    }
    //列表删除btn
    onEditDelete(text, record, index) {
        var self = this;
        //调用列表删除接口
        getCheckplanSubDelete({ tableId: record.tableId }).then(res => {
            console.log('getCheckplanSubDelete ---', res)
            if (res.data.result !== 'success') {
                alert(res.data.info || '接口失败')
                return;
            }
            self.state.checkplanSubList.splice(index, 1);
            self.setState({
                checkplanSubList: self.state.checkplanSubList
            })
            self.getCustomerList();

        }).catch(err => {
            alert(err || '接口失败')
        })
    }
    //列表单个添加btn
    subAddbtn() {
        if (!this.state.customerList.length) {
            MyToast('暂无可添加数据')
        } else {
            this.setState({
                customerListModalVisible: true
            })
        }
    }
    //列表新增企业选择btn
    selectCustomer(record) {
        getCheckplanSubAdd({
            inspectionPlanMstId: checkplanId,//主表Id
            customerId: record.tableId, //企业Id
        }).then(res => {
            this.setState({
                customerListModalVisible: false,
            });
            console.log(res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            MyToast("添加成功");
            this.getData({ inspectionPlanMstId: checkplanId });
            this.getCustomerList();
        }).catch(err => {
            console.log(err);
            MyToast("添加失败")
        });
    }
    //全部新增btn
    addAll() {
        if (!this.state.customerList.length) {
            MyToast('暂无可添加数据')
        } else {
            getCheckplanSubAddAll({ inspectionPlanMstId: checkplanId }).then(res => {
                console.log('批量新增 res ---', res);
                if (res.data.result !== 'success') {
                    MyToast(res.data.info)
                    return;
                }
                MyToast('批量新增成功');
                this.getData({ inspectionPlanMstId: checkplanId });
                this.getCustomerList();
            }).catch(err => {
                console.log(err)
            })
        }
    }
    //列表单个执行者
    singlePerformSelect(tableId) {
        this.setState({
            multiModalVisible: true,
            checkSubId: tableId,
        })
    }
    //执行者批量btn
    performerbtn() {
        if (this.state.checkSubIdArr.length > 0) {
            this.setState({ multiModalVisible: true })
        } else {
            MyToast('请先选择要管理的数据');
        }
    }
    //Modal选择执行人员
    selectPerformer(tableId) {
        console.log('performerSelect = ', tableId);
        //单个选择
        if (this.state.checkSubId != '') {
            getCheckplanSubPerformer({ tableId: this.state.checkSubId, performerId: tableId }).then(res => {
                console.log('perfomerSave res ---', res);
                this.setState({
                    multiModalVisible: false,
                });
                if (res.data.result !== 'success') {
                    MyToast(res.data.info)
                    return;
                }
                MyToast('选择成功');
                this.getData({ inspectionPlanMstId: checkplanId });
            }).catch(err => {
                console.log(err)
                MyToast('选择失败')
            })
            this.setState({
                checkSubId: '',
            });
        } else if (this.state.checkSubIdArr.length > 0) {
            //批量选择
            console.log(this.state.checkSubIdArr);
            var param = this.state.checkSubIdArr.join(',');
            getCheckplanSubPerformerMulti({ tableIdArr: param, performerId: tableId }).then(res => {
                console.log('perfomerMultiSave res ---', res);
                this.setState({
                    multiModalVisible: false,
                });
                if (res.data.result !== 'success') {
                    MyToast(res.data.info)
                    return;
                }
                MyToast('批量选择成功');
                this.getData({ inspectionPlanMstId: checkplanId });
                this.setState({
                    checkSubId: '',
                });
            }).catch(err => {
                console.log(err)
                MyToast('批量选择失败')
            })
        } else {
            MyToast('请选择数据')
        }
    }
    //编辑Modal确定取消
    editModalCancel() {
        this.setState({ editModalVisible: false });
    }
    //显示编辑Modal
    showTestModal(recordEdit) {
        this.setState({
            recordEdit: recordEdit
        });
        var self = this;
        setTimeout(() => {
            self.setState({
                editModalVisible: true,
            });
        }, 20)
    }
    render() {
        var checkplanDetail = this.state.checkplanDetail;
        const columns = [{
            title: '序号',
            dataIndex: 'num',
            render: (text, record, index) => (index + 1)
        }, {
            title: '企业',
            dataIndex: 'customer.customerName',
        }, {
            title: '执行者',
            dataIndex: 'performer.realName',
        }, {
            title: '状态',
            dataIndex: 'theState',
            render: (text, record, index) => (
                <div>
                    {record.theState ? '已完成' : '执行中'}
                </div>
            )
        }, {
            title: '备注',
            dataIndex: 'theRemarks',
        }, {
            title: '创建时间',
            dataIndex: 'createDatetime',
        }, {
            title: '操作',
            key: 'action',
            width: 120,
            render: (text, record, index) => (
                <div>
                    <a onClick={this.showTestModal.bind(this, record)} style={{ marginRight: 8 }}>查看</a>
                    <Modal
                        title="检查子表查看页面"
                        width='70%'
                        visible={this.state.editModalVisible}
                        onCancel={this.editModalCancel.bind(this)}
                        onOk={this.editModalCancel.bind(this)}
                        className='modal editModal'
                    >
                        <CheckplanSubDetail recordEdit={this.state.recordEdit} />
                    </Modal>
                    {this.state.checkplanSubList.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                                <a className="delete" href="#">删除</a>
                            </Popconfirm>
                        ) : null}
                    <a style={{ marginLeft: 8 }} onClick={this.singlePerformSelect.bind(this, record.tableId)}>分配</a>
                </div>
            )
        }];
        const memberData = [{
            title: '序号',
            dataIndex: 'num',
            render: (text, record, index) => (index + 1)
        }, {
            title: '姓名',
            dataIndex: 'realName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            render: (text, record, index) => (
                <div>
                    {record.theState == 1 ? '男' : '女'}
                </div>
            )
        }, {
            title: '年龄',
            dataIndex: 'age',
        }, {
            title: '手机号',
            dataIndex: 'phoneNumber',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 60,
            render: (text, record) => (
                <Button type="primary" onClick={this.selectPerformer.bind(this, record.tableId)} >选择</Button>
            )
        }];
        const customersData = [{
            title: '序号',
            dataIndex: 'num',
            render: (text, record, index) => (index + 1)
        }, {
            title: '企业名称',
            dataIndex: 'customerName',
        }, {
            title: '统一社会信用代码',
            dataIndex: 'uniformSocialCreditCode',
        }, {
            title: '单位地址',
            dataIndex: 'unitAddress',
        }, {
            title: '传真',
            dataIndex: 'fax',
        }, {
            title: '联系人',
            dataIndex: 'contactPerson',
            key: 'contactPerson',
        }, {
            title: '电话',
            dataIndex: 'phoneNumber',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 60,
            render: (text, record) => (
                <Button type="primary" onClick={this.selectCustomer.bind(this, record)} >选择</Button>
            )
        }];
        var self = this;
        const rowSelection = {
            onChange(selectedRowKeys) {
                console.log(`selectedRowKeys changed: ${selectedRowKeys}`);
                self.state.checkSubIdArr = selectedRowKeys;
            },
            // onSelect(record, selected, selectedRows) {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll(selected, selectedRows) {
            //     console.log(selected, selectedRows);
            // }
        };
        return (
            <div className="yzy-page">
                <div className="yzy-tab-content-item-wrap">
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">检查计划子表基本信息</h2>
                        <Row style={{ marginTop: 20, marginBottom: 20, marginLeft: 8, marginRight: 8, fontSize: 12 }}>
                            <Col span={1}>批号：</Col>
                            <Col span={6}>{checkplanDetail.lotNumber}</Col>
                            <Col span={3}>已完成检查数量：</Col>
                            <Col span={6}>{checkplanDetail.completeCount}</Col>
                        </Row>
                    </div>
                </div>
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <div className="yzy-list-btns-wrap">
                        <Button type="primary">导出excel</Button>
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={this.subAddbtn.bind(this)}>新增</Button>
                        <Modal
                            title="子表数据新增，选择企业"
                            width='70%'
                            visible={this.state.customerListModalVisible}
                            onCancel={() => this.setState({ customerListModalVisible: false })}
                            footer={null}
                            className='modal'
                        >
                            <Table
                                columns={customersData}
                                dataSource={this.state.customerList}
                                rowKey="tableId" />
                        </Modal>
                        {/* <Popconfirm title="确定新增全部" onConfirm={this.addAll.bind(this)}>
                        </Popconfirm> */}
                        <Button type="primary" onClick={this.addAll.bind(this)} style={{ marginLeft: 8 }}>新增(全部)</Button>
                        <Button type="primary" onClick={this.performerbtn.bind(this)} style={{ marginLeft: 8 }}>批量分配任务</Button>
                        <Modal
                            title="执行者管理"
                            width='70%'
                            visible={this.state.multiModalVisible}
                            onCancel={() => this.setState({ multiModalVisible: false })}
                            footer={null}
                            className='modal'
                        >
                            <Table
                                columns={memberData}
                                dataSource={this.state.memberList}
                                rowKey="tableId" />
                        </Modal>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        onTestClick={this.onTestClick}
                        dataSource={this.state.checkplanSubList}
                        rowKey="tableId"
                        loading={this.state.loading} />
                    {/* <Pagination></Pagination> */}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<CustomerCheckPlanSub />, document.getElementById('root'));
