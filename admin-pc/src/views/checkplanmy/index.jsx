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
        this.getData({ });
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
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        onTestClick={this.onTestClick}
                        dataSource={this.state.checkplanMyList}
                        rowKey="tableId"
                        loading={this.state.loading} />
                </div>
                {
                    this.state.editModalVisible ? <Modal
                        visible={true}
                        title="编辑页面"
                        width='70%'
                        okText=''
                        footer={null}
                        onCancel={this.TestCancel.bind(this)}
                        cancelText=''
                        className='modal editModal'
                    >
                        <CheckplanDetailForm recordEdit={this.state.recordEdit} getData={this.getData.bind(this)} TestCancel={this.TestCancel.bind(this)}wrappedComponentRef={this.saveFormRef.bind(this)} />
                    </Modal> : null
                }
            </div>
        )
    }
}

ReactDOM.render(<CustomerCheckPlanMy />, document.getElementById('root'));
