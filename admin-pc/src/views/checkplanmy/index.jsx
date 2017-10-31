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

const clou = [{}, {}, {}]

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
    MyPlanlist,
    // getCheckplanDetail,
    // getCheckplanSubDelete,
    // getCheckplanSubPerformer,    
    // getCheckplanSubPerformerMulti,
    // getCheckplanSubAdd,
    // getCheckplanSubAddAll,
    getCheckplanSubComplete,
    // getCustomerList,
} from '../../common/api/api.checkplan.my';
import CheckplanDetailForm from './index.detail'

//列表页面
class CustomerCheckPlanMy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checkplanMyList: [], //子表数据列表
            editModalVisible: false,
            performerId: '',
            // checkSubIdArr: [], //批量选择的key
            checkSubId: [],
            // multiModalVisible: false, //批量管理modal显隐
            // customerList: [], //企业列表
            // customerListModalVisible: false,
            // checkplanDetail: {},

            attachmentImgUrl: '', // 子组件 附件上传数据
            prodImgUrl: '',  //  子组件  反馈单数据
            positionImgUrl: '' // 子组件  检查记录表数据

        }

        this.getData = this.getData.bind(this);
        // this.getCustomerList = this.getCustomerList.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({ inspectionPlanMstId: 1 });
        // this.getCustomerList();
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
    }
    //获取列表数据--封装
    getData(params) {
        //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
        MyPlanlist(params).then(res => {
            console.log('MyPlanlist ---', res)
            if (res.data.result !== 'success') {
                alert(res.data.info || '接口失败')
                return;
            }
            this.setState({
                loading: false,
                checkplanMyList: res.data.inspectionPlanDtlList
            })
        }).catch(err => {
            alert(err || '接口失败')
        })
    }
    // //获取企业列表    
    // getCustomerList() {
    //     getCustomerList({ inspectionPlanMstId: checkplanId }).then(res => {
    //         console.log('getCustomerList res ---', res);

    //         if (res.data.result !== 'success') {
    //             console.log(res.data.info, )
    //             return;
    //         }
    //         this.setState({
    //             customerList: res.data.customerList,
    //         });
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
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
    // //列表删除
    // onEditDelete(text, record, index) {
    //     var self = this;
    //     //调用列表删除接口
    //     getCheckplanSubDelete({ tableId: record.tableId }).then(res => {
    //         console.log('getCheckplanSubDelete ---', res)
    //         if (res.data.result !== 'success') {
    //             alert(res.data.info || '接口失败')
    //             return;
    //         }
    //         self.state.checkplanMyList.splice(index, 1);
    //         self.setState({
    //             checkplanMyList: self.state.checkplanMyList
    //         })
    //     }).catch(err => {
    //         alert(err || '接口失败')
    //     })
    // }
    // //列表新增
    // selectCustomer(record) {
    //     getCheckplanSubAdd({
    //         inspectionPlanMstId: checkplanId,//主表Id
    //         customerId: record.tableId, //企业Id
    //     }).then(res => {
    //         this.setState({
    //             customerListModalVisible: false,
    //         });
    //         console.log(res)

    //         if (res.data.result !== 'success') {
    //             MyToast(res.data.info)
    //             return;
    //         }
    //         MyToast("添加成功");
    //         this.getData({ inspectionPlanMstId: checkplanId });
    //         this.getCustomerList();
    //     }).catch(err => {
    //         console.log(err);
    //         MyToast("添加失败")
    //     });
    // }
    // //列表单个执行者
    // singlePerformSelect(tableId) {
    //     this.setState({
    //         multiModalVisible: true,
    //         checkSubId: tableId,
    //     })
    // }
    //列表完成
    clickComplete(tableId) {
        console.log(tableId)
        getCheckplanSubComplete({ tableId: tableId }).then(res => {
            console.log('getCheckplanSubComplete ---', res)
            if (res.data.result !== 'success') {
                alert(res.data.info || '接口失败')
                return;
            }
            MyToast('完成');
            this.getData({ inspectionPlanMstId: checkplanId })
        }).catch(err => {
            alert(err || '接口失败')
        })
    }
    // //批量新增
    // addAll() {
    //     getCheckplanSubAddAll({ inspectionPlanMstId: checkplanId }).then(res => {
    //         console.log('批量新增 res ---', res);
    //         if (res.data.result !== 'success') {
    //             MyToast(res.data.info)
    //             return;
    //         }
    //         MyToast('批量新增成功');
    //         this.getData({ inspectionPlanMstId: checkplanId })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    // //执行者批量按钮点击
    // performerbtn() {
    //     if (this.state.checkSubIdArr.length > 0) {
    //         this.setState({ multiModalVisible: true })
    //     } else {
    //         MyToast('请先选择要管理的数据');
    //     }
    // }
    // //选择执行人员
    // selectPerformer(tableId) {
    //     console.log('performerSelect = ', tableId);
    //     //单个选择
    //     if (this.state.checkSubId) {
    //         getCheckplanSubPerformer({ tableId: this.state.checkSubId, performerId: tableId }).then(res => {
    //             console.log('perfomerSave res ---', res);
    //             this.setState({
    //                 multiModalVisible: false,
    //             });
    //             if (res.data.result !== 'success') {
    //                 MyToast(res.data.info)
    //                 return;
    //             }
    //             MyToast('选择成功');
    //             this.getData({ inspectionPlanMstId: checkplanId });
    //         }).catch(err => {
    //             console.log(err)
    //             MyToast('选择失败')
    //         })
    //         this.setState({
    //             checkSubId: '',
    //         });
    //     } else {
    //         //批量选择
    //         console.log(this.state.checkSubIdArr);
    //         getCheckplanSubPerformerMulti({ tableIdArr: this.state.checkSubIdArr, performerId: tableId }).then(res => {
    //             console.log('perfomerMultiSave res ---', res);
    //             this.setState({
    //                 multiModalVisible: false,
    //             });
    //             if (res.data.result !== 'success') {
    //                 MyToast(res.data.info)
    //                 return;
    //             }
    //             MyToast('批量选择成功');
    //             this.getData({ inspectionPlanMstId: checkplanId });
    //             this.setState({
    //                 checkSubId: '',
    //             });
    //         }).catch(err => {
    //             console.log(err)
    //             MyToast('批量选择失败')
    //         })
    //     }
    // }
    saveFormRef(form) {
        this.form = form.props.form;
    }
    TestCancel() {
        this.form.resetFields();
        this.setState({ editModalVisible: false });
    }
    //显示编辑Modal
    showTestModal(recordEdit) {
        console.log('showModal---------------', recordEdit)
        this.setState({
            recordEdit: recordEdit,
            editModalVisible: true,
        });
    }
    // 存储子组件数据
    onSaveInfo(type, data, tableId) {
        console.log(type);
        this.setState({
            prodImgUrl: data
        });
    }
    //saveInnerInfo 保存编辑弹窗里面的form数据
    saveInnerInfo() {
        console.log(this.state.prodImgUrl);
    }
    render() {
        // const checkplanDetail = this.state.checkplanDetail;
        // console.log(checkplanDetail)
        var self = this;

        const columns = [{
            title: '企业',
            dataIndex: 'customer.customerName',
            width: '10%'
        }, {
            title: '批号',
            dataIndex: 'inspectionPlanMst.lotNumber',
            width: '10%'
        }, {
            title: '开始',
            width: '15%',
            dataIndex: 'inspectionPlanMst.planDateStart',
        }, {
            title: '结束',
            width: '15%',
            dataIndex: 'inspectionPlanMst.planDateEnd',
        }, {
            title: '备注',
            dataIndex: 'theRemarks',
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
            title: '操作',
            key: 'action',
            width: '15%',
            render: (text, record, index) => (
                <div>
                    <a onClick={() => self.showTestModal(record)} style={{ marginRight: 8 }}>编辑</a>
                    
                    {/* {this.state.checkplanMyList.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                                <a className="delete" href="#">删除</a>
                            </Popconfirm>
                        ) : null} */}
                    {/* <a style={{ marginLeft: 8 }} onClick={this.singlePerformSelect.bind(this, record.tableId)}>执行者</a> */}
                    <a style={{ marginLeft: 8 }} onClick={this.clickComplete.bind(this, record.tableId)}>完成</a>
                </div>
            )
        },
        ];
        // const memberData = [{
        //     title: '姓名',
        //     dataIndex: 'realName',
        //     width: '10%'
        // }, {
        //     title: '性别',
        //     dataIndex: 'sex',
        //     width: '10%'
        // }, {
        //     title: '年龄',
        //     dataIndex: 'age',
        //     width: '10%'
        // }, {
        //     title: '手机号',
        //     dataIndex: 'phoneNumber',
        //     width: '10%'
        // },
        // {
        //     title: '操作',
        //     dataIndex: 'operation',
        //     width: '20%',
        //     render: (text, record) => (
        //         <Button type="primary" onClick={this.selectPerformer.bind(this, record.tableId)} >选择</Button>
        //     )
        // }
        // ];
        // const customersData = [{
        //     title: '企业名称',
        //     dataIndex: 'customerName',
        //     width: '10%'
        // }, {
        //     title: '统一社会信用代码',
        //     dataIndex: 'uniformSocialCreditCode',
        //     width: '15%'
        // }, {
        //     title: '单位地址',
        //     dataIndex: 'unitAddress',
        //     width: '20%'
        // }, {
        //     title: '传真',
        //     dataIndex: 'fax',
        //     width: '5%'
        // }, {
        //     title: '联系人',
        //     dataIndex: 'contactPerson',
        //     key: 'contactPerson',
        //     width: '10%'
        // }, {
        //     title: '电话',
        //     dataIndex: 'phoneNumber',
        //     width: '10%'
        // },
        // {
        //     title: '操作',
        //     dataIndex: 'operation',
        //     width: '20%',
        //     render: (text, record) => (
        //         <Button type="primary" onClick={this.selectCustomer.bind(this, record)} >选择</Button>
        //     )
        // }];
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
                            onClick={() => this.setState({ customerListModalVisible: true })}>新增</Button>
                        <Modal
                            title="子表数据新增，选择企业"
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
                        <Button type="primary" onClick={this.addAll.bind(this)} style={{ marginLeft: 8 }}>新增(全部)</Button>                        
                        <Button type="primary" onClick={this.performerbtn.bind(this)} style={{ marginLeft: 8 }}>执行者管理</Button>
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
                        </Modal> */}
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        onTestClick={this.onTestClick}
                        dataSource={this.state.checkplanMyList}
                        rowKey="tableId"
                        loading={this.state.loading} />
                    {/* <Pagination></Pagination> */}
                </div>

                {
                    this.state.editModalVisible ? <Modal
                        visible={true}
                        title="编辑页面"
                        width='70%'
                        onCancel={this.TestCancel.bind(this)}
                        onOk={this.saveInnerInfo.bind(this)}
                        className='modal editModal'
                    >
                        <CheckplanDetailForm recordEdit={this.state.recordEdit} onSaveInfo = {this.onSaveInfo.bind(this)} wrappedComponentRef={this.saveFormRef.bind(this)} />
                    </Modal> : <div>hello--------------------</div>
                }
            </div>
        )
    }
}

ReactDOM.render(<CustomerCheckPlanMy />, document.getElementById('root'));
