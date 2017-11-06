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
    getCheckplanSubAddMulti,
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
            SubCusSelectedRowKeysArr: [], //子表新增企业选择--批量
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
    //列表新增企业确定btn -- 可批量
    customerListModalOk() {
        var customerIdArr = this.state.SubCusSelectedRowKeysArr.join(',');
        getCheckplanSubAddMulti({
            inspectionPlanMstId: checkplanId,//主表Id
            customerIdArr: customerIdArr, //企业Id数组
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
                    <a title="查看" onClick={this.showTestModal.bind(this, record)}><Icon type="eye-o" className="yzy-icon" /></a>                    
                    <a title="执行者选择" style={{ marginLeft: 8 }} onClick={this.singlePerformSelect.bind(this, record.tableId)}><Icon type="link" className="yzy-icon" /></a>                    
                    {this.state.checkplanSubList.length > 1 ?
                        (
                            <Popconfirm title="确定要删除吗？" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                                <a className="delete" href="#"><Icon type="delete" className="yzy-icon" /></a>
                            </Popconfirm>
                        ) : null}
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
                    {record.theState === 1 ? '男' : '女'}
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
                <a href="#" title="选择" onClick={this.selectPerformer.bind(this, record.tableId)} ><Icon type="check" className="yzy-icon" /></a>
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
        },];
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
        const customersDataRowSelection = {
            onChange(selectedRowKeys) {
                console.log(`CustomerSelectedRowKeys changed: ${selectedRowKeys}`);
                self.state.SubCusSelectedRowKeysArr = selectedRowKeys;
            }
        }

        return (
            <div className="yzy-page">
                <div className="yzy-tab-content-item-wrap">
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">检查计划子表基本信息</h2>
                        <div style={{ lineHeight: 2, paddingTop: 10, paddingBottom: 10, paddingLeft: 8, paddingRight: 8, marginBottom: 10, fontSize: 12, backgroundColor: '#fff' }}>
                            <Row>
                                <Col span={8}>
                                    <Col span={3}>编号：</Col>
                                    <Col span={6}>{checkplanDetail.serialNumber}</Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8}>需检查企业总数：</Col>
                                    <Col span={10}>{checkplanDetail.totalCount}</Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8}>检查开始日期：</Col>
                                    <Col span={10}>{checkplanDetail.planDateStart}</Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Col span={3}>批号：</Col>
                                    <Col span={6}>{checkplanDetail.lotNumber}</Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8}>已完成检查数量：</Col>
                                    <Col span={10}>{checkplanDetail.completeCount}</Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8}>检查结束日期：</Col>
                                    <Col span={10}>{checkplanDetail.planDateEnd}</Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16}>
                                    <Col span={3}>备注：</Col>
                                    <Col span={6}>{checkplanDetail.theRemarks}</Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8}>计划创建时间：</Col>
                                    <Col span={10}>{checkplanDetail.createDatetime}</Col>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <div className="yzy-list-btns-wrap" style={{ paddingTop: 10 }}>
                        <Button type="primary">导出excel</Button>
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={this.subAddbtn.bind(this)}>新增</Button>
                        <Modal
                            title="子表数据新增，选择企业"
                            width='70%'
                            visible={this.state.customerListModalVisible}
                            onCancel={() => this.setState({ customerListModalVisible: false })}
                            onOk={this.customerListModalOk.bind(this)}
                            className='modal'
                        >
                            <Table
                                rowSelection={customersDataRowSelection}
                                columns={customersData}
                                dataSource={this.state.customerList}
                                rowKey="tableId"
                                rowClassName={(record, index) => {
                                    if (index % 2 !== 0) {
                                        return 'active'
                                    }
                                }}
                            />
                        </Modal>
                        <Popconfirm title="确定新增全部" onConfirm={this.addAll.bind(this)}>
                            <Button type="primary" style={{ marginLeft: 8 }}>新增(全部)</Button>
                        </Popconfirm>
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
                                rowKey="tableId"
                                rowClassName={(record, index) => {
                                    if (index % 2 !== 0) {
                                        return 'active'
                                    }
                                }}
                            />
                        </Modal>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        onTestClick={this.onTestClick}
                        dataSource={this.state.checkplanSubList}
                        rowKey="tableId"
                        loading={this.state.loading}
                        rowClassName={(record, index) => {
                          if (index % 2 !== 0) {
                            return 'active'
                          }
                        }}
                        />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<CustomerCheckPlanSub />, document.getElementById('root'));
