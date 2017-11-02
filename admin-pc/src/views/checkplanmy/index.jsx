import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Pagination,
    Row,
    Col,
    Modal,
    Form,
    Icon,
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
    getCheckplanSubComplete,
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
            checkSubIdArr: [],
        }

        this.getData = this.getData.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({});
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
    //头部搜索
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);
        this.getData({
            customerName: values.customerName,
            inspectionPlanMstId: checkplanId
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
    //编辑Modal页面隐藏
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
        var self = this;

        const columns = [{
            title: '企业',
            dataIndex: 'customer.customerName',
        }, {
            title: '批号',
            dataIndex: 'inspectionPlanMst.lotNumber',
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
        }, {
            title: '状态',
            dataIndex: 'theState',
            render: (text, record, index) => (
                <div>
                    {record.theState ? '已完成' : '执行中'}
                </div>
            )
        }, {
            title: '操作',
            key: 'action',
            width: 120,
            render: (text, record, index) => (
                <div>
                    <a onClick={() => self.showTestModal(record)} style={{ marginRight: 8 }}><Icon type="edit" className="yzy-icon" /></a>
                    {record.theState ?
                        <a style={{ marginLeft: 8 }} onClick={this.clickComplete.bind(this, record.tableId)}><Icon type="check" className="yzy-icon" /></a>
                        : ''
                    }
                </div>
            )
        },
        ];
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <div className="yzy-list-btns-wrap">
                        <Button type="primary">导出excel</Button>
                    </div>
                    <Table
                        columns={columns}
                        onTestClick={this.onTestClick}
                        dataSource={this.state.checkplanMyList}
                        rowKey="tableId"
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }}
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
                        className='modal editModal'
                    >
                        <CheckplanDetailForm recordEdit={this.state.recordEdit} getData={this.getData.bind(this)} TestCancel={this.TestCancel.bind(this)} wrappedComponentRef={this.saveFormRef.bind(this)} />
                    </Modal> : null
                }
            </div>
        )
    }
}

ReactDOM.render(<CustomerCheckPlanMy />, document.getElementById('root'));
