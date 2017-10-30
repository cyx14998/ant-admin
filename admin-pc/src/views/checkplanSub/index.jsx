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
    getCheckplanSubPerformerMulti,
    getCheckplanSubAdd,
    getCheckplanSubAddAll,
} from '../../common/api/api.checkplan';
import {
    getCustomerList
} from '../../common/api/api.customer';
import CheckplanDetailForm from './index.detail'
function changeIframeToEdit(id, num) {
    console.log('chanageiframe', parent.window.iframeHook)
    var subId = num == 1 ? 'checkSubId' : 'customerId';
    parent.window.iframeHook.changePage({
        url: '/checkplanSubEdit.html?checkplanId=' + checkplanId + '&' + subId + '=' + id + '#' + Math.random(),
        breadIncrement: '检查计划子表编辑'
    })
}

// function changeIframeToDynamic(id) {
//   parent.window.iframeHook.changePage({
//     url: '/customerDynamic.html?id=' + id,
//     breadIncrement: '客户动态信息|/customerDynamic.html?id=' + id,
//   })
// }

//列表页面
class CustomerCheckPlanSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checkplanSubList: [], //子表数据列表
            editModalVisible: false,
            performerId: '1',
            checkSubIdArr: [], //批量选择的key
            multiModalVisible: false, //批量管理modal显隐
            customerList: [], //企业列表
            customerListModalVisible: false,
            prodPreviewImage: [], //反馈工艺
            positionPreviewImage: [], //检查单         
            prodPreviewVisible: false,
            positionPreviewVisible: false,
            prodImgUrl: '',
            positionImgUrl: '',
            prodFileList: [], //反馈工艺流程图
            positionFileList: [], //检查单图
            // checkplanDetail: {},
            tableId: ''
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        console.log(checkplanId)
        this.getData({ inspectionPlanMstId: checkplanId })
        // getCheckplanDetail({ tableId: checkplanId }).then(res => {
        //     console.log('getCheckplanDetail res ---', res);
        //     if (res.data.result !== 'success') {
        //         MyToast(res.data.info)
        //         return;
        //     }
        //     this.setState({
        //         checkplanDetail: res.data.inspectionPlanMst
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        //获取企业列表
        getCustomerList({}).then(res => {
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
    //头部搜索
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);
        this.getData({
            customerName: values.customerName,
            inspectionPlanMstId: checkplanId,
            //   industryCategory: values.industryCategory,
            //   uniformSocialCreditCode: values.uniformSocialCreditCode,
            //   unitCategory: values.unitCategory
        });
    }
    //列表删除
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
        }).catch(err => {
            alert(err || '接口失败')
        })
    }
    //子表新增
    checkPlaneSubAdd() {

    }
    //批量新增
    addAll() {
        getCheckplanSubAddAll({ inspectionPlanMstId: checkplanId }).then(res => {
            console.log('perfomerSave res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            MyToast('新增成功');
            this.getData({ inspectionPlanMstId: checkplanId })
        }).catch(err => {
            console.log(err)
        })
    }

    //选择执行人员
    selectPerformer(record) {
        console.log('checked = ', record);
        var checkSubIdArr = this.state.checkSubIdArr;
        getCheckplanSubPerformerMulti({ tableIdArr: checkSubIdArr, performerId: record.tableId }).then(res => {
            console.log('perfomerSave res ---', res);
            this.setState({
                multiModalVisible: false,
            });
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            MyToast('选择成功');
            this.getData({ inspectionPlanMstId: checkplanId })
        }).catch(err => {
            console.log(err)
            MyToast('选择失败')
        })

    }
    //新增企业
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
            this.getData({ inspectionPlanMstId: checkplanId })
        }).catch(err => {
            console.log(err);
            MyToast("添加失败")
        });
    }
    saveFormRef(form) {
        this.form = form.props.form;
    }
    TestCancel() {
        this.form.resetFields();
        this.setState({ editModalVisible: false });
    }
    showTestModal(recordEdit) {
        this.setState({ 
            recordEdit: recordEdit
        });
        var self = this;
        setTimeout(() => {
            self.setState({
                editModalVisible: true,
            });
        },20)
    }
    render() {
        // const checkplanDetail = this.state.checkplanDetail;
        // console.log(checkplanDetail)
        const columns = [{
            title: '企业',
            dataIndex: 'customer.customerName',
            width: '10%'
        }, {
            title: '执行者',
            dataIndex: 'performer.realName',
            width: '10%',
        }, {
            title: '状态',
            dataIndex: 'theState',
            width: '10%',
            render: (text, record, index) => (
                <div>
                    {record.theState ? '已完成' : '执行中'}
                </div>
            )
        }, {
            title: '反馈单下载',
            width: '10%',
            render: (text, record, index) => (
                <a href="#" style={{ marginRight: 8 }}>下载地址</a>
            )
        }, {
            title: '检查记录下载',
            width: '10%',
            render: (text, record, index) => (
                <a href="#" style={{ marginRight: 8 }}>下载地址</a>
            ),
        }, {
            title: '备注',
            dataIndex: 'theRemarks',
            width: '10%'
        }, {
            title: '创建时间',
            dataIndex: 'createDatetime',
            width: '10%'
        }, {
            title: '操作',
            key: 'action',
            width: '15%',
            render: (text, record, index) => (
                <div>
                    <a onClick={this.showTestModal.bind(this, record)} style={{ marginRight: 8 }}>编辑</a>
                    <Modal
                        title="编辑页面"
                        width='70%'
                        visible={this.state.editModalVisible}
                        onCancel={this.TestCancel.bind(this)}
                        onOk={this.TestCancel.bind(this)}
                        className='modal editModal'
                    >
                        <CheckplanDetailForm recordEdit={this.state.recordEdit} wrappedComponentRef={this.saveFormRef.bind(this)}/>
                    </Modal>
                    {this.state.checkplanSubList.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                                <a className="delete" href="#">删除</a>
                            </Popconfirm>
                        ) : null}
                    <a style={{ marginRight: 8 }}>完成</a>
                </div>
            )
        },
        ];
        const memberData = [{
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
            width: '20%',
            render: (text, record) => (
                <Button type="primary" onClick={this.selectPerformer.bind(this, record)} >选择</Button>
            )
        }
        ];
        const customersData = [{
            title: '企业名称',
            dataIndex: 'customerName',
            width: '10%'
        }, {
            title: '统一社会信用代码',
            dataIndex: 'uniformSocialCreditCode',
            width: '15%'
        }, {
            title: '单位地址',
            dataIndex: 'unitAddress',
            width: '20%'
        }, {
            title: '传真',
            dataIndex: 'fax',
            width: '5%'
        }, {
            title: '联系人',
            dataIndex: 'contactPerson',
            key: 'contactPerson',
            width: '10%'
        }, {
            title: '电话',
            dataIndex: 'phoneNumber',
            width: '10%'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            render: (text, record) => (
                <Button type="primary" onClick={this.selectCustomer.bind(this, record)} >选择</Button>
            )
        }
        ];
        var self = this;
        const rowSelection = {
            onChange(selectedRowKeys) {
                console.log(`selectedRowKeys changed: ${selectedRowKeys}`);
                console.log(self.state.performerId)
                // if (selectedRowKeys.length > 0) {
                //     this.setState({
                //         multi: true
                //     })
                // }
                // this.state.checkSubIdArr = selectedRowKeys;
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
                {/* <div className="yzy-tab-content-item-wrap">
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                        <Row style={{ marginTop: 20, marginBottom: 20, fontSize: 12 }}>
                            <Col span={8}>
                                <Col span={8}>企业名称：</Col>
                                <Col span={12}>{checkplanDetail.lotNumber}</Col>
                            </Col>
                        </Row>
                    </div>
                </div> */}
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <div className="yzy-list-btns-wrap">
                        <Button type="primary">导出excel</Button>
                        {/* <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={() => {
                                console.log('-=========------- onClick');
                                return changeIframeToEdit(checkplanId, 2);
                            }}>新增</Button> */}
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={() => this.setState({ customerListModalVisible: true })}>新增</Button>
                        <Modal
                            title="子表数据新增"
                            width='70%'
                            visible={this.state.customerListModalVisible}
                            onCancel={() => this.setState({ customerListModalVisible: false })}
                            onOk={() => this.setState({ customerListModalVisible: false })}
                            className='modal'
                        >
                            <Table
                                columns={customersData}
                                dataSource={this.state.customerList}
                                rowKey="tableId" />
                        </Modal>
                        {/* <Popconfirm title="确定新增全部" onConfirm={this.addAll.bind(this)}>
                        </Popconfirm> */}
                        <Button type="primary" onClick={() => this.setState({ multiModalVisible: true })} style={{ marginLeft: 8 }}>执行者管理</Button>
                        <Modal
                            title="执行者管理"
                            width='70%'
                            visible={this.state.multiModalVisible}
                            onCancel={() => this.setState({ multiModalVisible: false })}
                            onOk={() => this.setState({ multiModalVisible: false })}
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
