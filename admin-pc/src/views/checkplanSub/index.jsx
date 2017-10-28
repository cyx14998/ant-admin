import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Pagination,
    Row,
    Col,
    Popconfirm
} from 'antd';

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
    getCheckplanSublist,
    getCheckplanDetail,
    getCheckplanSubDelete
} from '../../common/api/api.checkplan';


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
            checkplanSubList: [],
            // checkplanDetail: {},
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
            customerName: values.customerName,
            inspectionPlanMstId: checkplanId,
            //   industryCategory: values.industryCategory,
            //   uniformSocialCreditCode: values.uniformSocialCreditCode,
            //   unitCategory: values.unitCategory
        });
    }
    //列表删除
    onEditDelete(text, record, index) {
        var self=this;
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
            render: (text, record, index) => (
                <div>
                    <a onClick={() => changeIframeToEdit(record.tableId, 1)} style={{ marginRight: 8 }}>编辑</a>
                    {this.state.checkplanSubList.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                                <a className="delete" href="#">删除</a>
                            </Popconfirm>
                        ) : null}
                </div>
            )
        },
        ];
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
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={() => {
                                console.log('-=========------- onClick');
                                return changeIframeToEdit(checkplanId, 2);
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
