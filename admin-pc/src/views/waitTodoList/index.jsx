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
    uMemberWaitTodoList,
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
            proclamationList: [],
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑
        }

        this._getuMemberWaitTodoList = this._getuMemberWaitTodoList.bind(this);
    }

    componentDidMount() {
        this._getuMemberWaitTodoList({});

        columns[2].render = (text, record, index) => {
            return (
                <div>
                    <a title="查看" onClick={() => this.waitTodoClick(record)}><Icon type="eye" style={{ marginRight: '10px' }} className="yzy-icon" /></a>
                </div>
            )
        }

    }

    waitTodoClick(record) {
        parent.window.iframeHook.changePage({
            url: record.theLink + '?tableId=' + record.sourceId,
            breadIncrement: record.theName
        });
    }

    // 获取公告列表
    _getuMemberWaitTodoList(params) {
        uMemberWaitTodoList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var proclamationList = res.data.waitTodoList;

            this.setState({
                loading: false,
                proclamationList
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);

        this._getuProclamationList({
            keyword: values.keyword,
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
                        dataSource={this.state.proclamationList}
                        rowKey="sourceId"
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