/**
 * 公告管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Button,
    Table,
    Icon,
    Popconfirm
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';

import './index.less';

import {
    uMemberOrderFlowHistoryList,
} from '../../common/api/api.notificatoins';

import {
    MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [
    {
        title: '名称',
        dataIndex: 'theName',
    }, {
        title: '创建人',
        dataIndex: 'realName',
    }, {
        title: '创建时间',
        dataIndex: 'createDatetime',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: '100px',
    }
];

const RcSearchFormData = {
    colspan: 2,
    fields: [{
        type: 'input',
        label: '关键词',
        name: 'keyword',
        placeholder: '请输入关键词',
    }]
}


class NoticeManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            memberOrderFlowHistoryList: [],
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑
        }

        this._getuMemberOrderFlowHistoryList = this._getuMemberOrderFlowHistoryList.bind(this);
    }

    componentDidMount() {
        this._getuMemberOrderFlowHistoryList({});

        columns[3].render = (text, record, index) => {
            return (
                <div>
                    <a title="查看" onClick={() => this.waitTodoClick(record)}><Icon type="eye" style={{ marginRight: '10px' }} className="yzy-icon" /></a>
                </div>
            )
        }

    }

    waitTodoClick(record) {
        if (record.theLink.indexOf('/') == 0) {
            record.theLink = record.theLink.substring(1, record.theLink.length);
        }
        parent.window.iframeHook.changePage({
            url: record.theLink + '?tableId=' + record.sourceId,
            breadIncrement: record.theName
        });
    }

    // 获取公告列表
    _getuMemberOrderFlowHistoryList(params) {
        uMemberOrderFlowHistoryList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var memberOrderFlowHistoryList = res.data.memberOrderFlowHistoryList;

            this.setState({
                loading: false,
                memberOrderFlowHistoryList
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    render() {
        return (
            <div className="yzy-page">
                {/* <div className="yzy-search-form-wrap">
                    <RcSearchForm {...RcSearchFormData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div> */}
                <div className="yzy-list-wrap">
                    <Table
                        columns={columns}
                        dataSource={this.state.memberOrderFlowHistoryList}
                        rowKey="createDatetime"
                        loading={this.state.loading}
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }} />
                </div>
            </div>
        )
    }
}


ReactDOM.render(<NoticeManagement />, document.getElementById('root'));