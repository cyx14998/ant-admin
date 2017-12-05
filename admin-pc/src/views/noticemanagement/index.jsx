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
import DraggableModal from '../../components/modal.draggable';

import './index.less';

import {
    uProclamationList,
    uProclamationDelete
} from '../../common/api/api.noticemanagement';

import {
    getDepartmentList
} from '../../common/api/api.department';

import {
    MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [
    {
        title: '主题',
        dataIndex: 'theTitle',
    }, {
        title: '公司',
        dataIndex: 'publishCompany',
    }, {
        title: '部门',
        dataIndex: 'publishDepart',
    }, {
        title: '公告时间',
        dataIndex: 'theDatetime',
    }, {
        title: '状态',
        dataIndex: 'isPass',
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

        this._getuProclamationList = this._getuProclamationList.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this._getuProclamationList({});

        columns[5].render = (text, record, index) => {
            return (
                <div>
                    <a title="编辑" onClick={() => this.showTestModal(record)}><Icon type="edit" style={{ marginRight: '10px' }} className="yzy-icon" /></a>
                    <Popconfirm title="确定删除么?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                        <a title="删除" className="delete" href="#" style={{ marginLeft: 8 }}><Icon type="delete" className="yzy-icon" /></a>
                    </Popconfirm>
                </div>
            )
        }

    }

    // 获取公告列表
    _getuProclamationList(params) {
        uProclamationList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var proclamationList = res.data.proclamationList;

            proclamationList.length && proclamationList.map(item => {
                var state = '';
                if (item.isPass) {
                    state = '已审核';
                } else {
                    if (item.theState == 0) {
                        state = '审核中';
                    } else if (item.theState == 1) {
                        state = '已作废';
                    }
                }
                item.isPass = state;
            });

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
    //编辑|| 新增Modal-----显示
    showTestModal(record) {
        parent.window.iframeHook.changePage({
            url: '/noticeEdit.html?tableId=' + record.tableId,
            breadIncrement: '公告编辑'
        });
    }
    // 删除操作
    onEditDelete(text, record, index) {
        // console.log(text, record, index);
        var self = this;
        uProclamationDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
            }
            setTimeout(() => {
                self._getuProclamationList({});
            }, 500);
        }).catch(err => MyToast('删除失败'));
    }

    render() {
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...RcSearchFormData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <Table
                        columns={columns}
                        dataSource={this.state.proclamationList}
                        rowKey="tableId"
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