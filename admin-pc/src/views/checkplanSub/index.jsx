import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Pagination,
    Row,
    Col
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';

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
    getCheckplanSublist,
    getCheckplanDetail
} from '../../common/api/api.checkplan';

const columns = [{
    title: '企业',
    dataIndex: 'customer.customerName',
    width: '10%'
}, {
    title: '执行者',
    dataIndex: 'performer',
    width: '10%',
}, {
    title: '状态',
    dataIndex: 'theState',
    width: '10%'
}, {
    title: '反馈单下载地址',
    dataIndex: 'feedbackSheetURL',
    width: '10%'
}, {
    title: '检查记录下载地址',
    dataIndex: 'regulatoryRecordURL',
    width: '10%'
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
    render: (text, record) => (
        <div>
            <Button type="primary" onClick={() => changeIframeToEdit(record.tableId)}>编辑</Button>
            {/* <Button type="primary" onClick={() => changeIframeToDynamic(record.tableId)}>查看动态</Button> */}
        </div>
    )
}
];

function changeIframeToEdit(id) {
    console.log('chanageiframe', parent.window.iframeHook)
    parent.window.iframeHook.changePage({
        url: '/checkplanSubEdit.html?checkSubId=' + id + '#' + Math.random(),
        breadIncrement: '检查计划子表编辑'
    })
}

// function changeIframeToDynamic(id) {
//   parent.window.iframeHook.changePage({
//     url: '/customerDynamic.html?id=' + id,
//     breadIncrement: '客户动态信息|/customerDynamic.html?id=' + id,
//   })
// }
const checkplanId = getLocQueryByLabel('checkplanId');
//列表页面
class CustomerCheckPlanSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checkplanSubList: [],
            customer: {},
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData({ inspectionPlanMstId: checkplanId })
        getCheckplanDetail({ tableId: checkplanId }).then(res => {
            console.log('getCheckplanDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            this.setState({ data: res.data.inspectionPlanDtl.customer })
        }).catch(err => {
            MyToast('接口调用失败')
        })
    }

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
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);
        this.getData({
            companyName: values.companyName,
            inspectionPlanMstId: checkplanId,
            //   industryCategory: values.industryCategory,
            //   uniformSocialCreditCode: values.uniformSocialCreditCode,
            //   unitCategory: values.unitCategory
        });
    }

    render() {

        return (
            <div className="yzy-page">
                <div className="yzy-tab-content-item-wrap">
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                        <Row>
                            <Col span={8}>
                                <Col span={8}>企业名称：</Col>
                                <Col span={12}>{this.state.customer.customerName}</Col>
                            </Col>
                            <Col span={8}>
                                <Col span={8}>企业统一编码</Col>
                                <Col span={12}>{this.state.customer.uniformSocialCreditCode}</Col>
                            </Col>
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
                            onClick={() => {
                                console.log('-=========------- onClick');
                                return changeIframeToEdit('');
                            }}>新增</Button>
                    </div>
                    <Table
                        columns={columns}
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
