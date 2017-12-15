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
    uProclamationCancel,
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
        title: '单据编号',
        dataIndex: 'serialNumber',
    },
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
        dataIndex: 'theState',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: '100px',
    }
];

// const rcsearchformData = {
//     colspan: 2,
//     fields: [{
//         type: 'input',
//         label: '关键词',
//         name: 'keyword',
//         placeholder: '请输入关键词',
//     }]
// }
// RcSearchForm datablob
const rcsearchformData = {
    colspan: 2,
    fields: [
        {
            type: 'input',
            label: '单据编号',
            name: 'keyword',
            placeholder: '请输入单据编号',
        },
        {
            type: 'input',
            label: '申请人',
            name: 'editerKeyword',
            placeholder: '请输入申请人',
        },
        {
            type: 'picker',
            label: '开始时间',
            name: 'startDate',
            placeholder: '请选择开始时间',
        },
        {
            type: 'picker',
            label: '结束时间',
            name: 'endDate',
            placeholder: '请选择结束时间',
        },
        {
            type: 'select',
            label: '单据状态',
            name: 'theState',
            placeholder: '请选中单据状态',
            defaultValue: '-1',
            options: [
                {
                    label: '全部',
                    value: '-1'
                },
                {
                    label: '已审核',
                    value: '2'
                },
                {
                    label: '审核中',
                    value: '0'
                },
                {
                    label: '已作废',
                    value: '1'
                },
            ]
        },
    ]
}


class NoticeManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            proclamationList: [],
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑
            keyword: '',       // 搜索字段 单据编号
            editerKeyword: '', // 搜索字段 申请人
            theState: null,    // 搜索字段 单据状态
            startDate: '',     // 搜索字段 开始时间
            endDate: '',       // 搜索字段 结束时间
        }

        this.getData = this.getData.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({});

        columns[6].render = (text, record, index) => {
            return (
                <div>
                    <a title="编辑" onClick={() => this.showTestModal(record)}><Icon type="edit" className="yzy-icon" /></a>
                    <Popconfirm title="确定要作废吗？" onConfirm={() => this.cancelNotice(record.tableId)}>
                        <a title="作废"><Icon type="close" className="yzy-icon" /></a>
                    </Popconfirm>
                    <Popconfirm title="确定删除么?" onConfirm={this.onEditDelete.bind(this, record)}>
                        <a title="删除" className="delete" href="#" ><Icon type="delete" className="yzy-icon" /></a>
                    </Popconfirm>
                </div>
            )
        }

    }

    // 获取公告列表
    getData(params) {
        uProclamationList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var proclamationList = res.data.proclamationList;

            proclamationList.length && proclamationList.map(item => {
                var theState = '';
                if (item.isPass) {
                    theState = '已审核';
                } else {
                    if (item.theState == 0) {
                        theState = '审核中';
                    } else if (item.theState == 1) {
                        theState = '已作废';
                    }
                }
                item.theState = theState;
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

        // 单据状态
        var theState = values.theState;
        if (theState == '-1') {        // 全部
            theState = null;
        }
        var startDate = values.startDate ? values.startDate.format('YYYY-MM-DD') : null;
        var endDate = values.endDate ? values.endDate.format('YYYY-MM-DD') : null;
        // 搜索
        this.getData({
            keyword: values.keyword,
            editerKeyword: values.editerKeyword,
            theState,
            startDate,
            endDate,
        });

        // 设置状态
        this.setState({
            keyword: values.keyword,
            editerKeyword: values.editerKeyword,
            theState,
            startDate,
            endDate,
        });
        // console.log('handleSearch ---------', values);

        // this.getData({
        //     keyword: values.keyword,
        // });

        // this.setState({
        //     keyword: values.keyword,
        // });
    }
    //编辑|| 新增Modal-----显示
    showTestModal(record) {
        parent.window.iframeHook.changePage({
            url: 'noticeEdit.html?tableId=' + record.tableId,
            breadIncrement: '公告编辑'
        });
    }

    //公告作废
    cancelNotice(id) {
        var self = this;
        uProclamationCancel({ tableId: id }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }
            MyToast('作废成功');

            setTimeout(this.getData({
                keyword: this.state.keyword,
                editerKeyword: this.state.editerKeyword,
                theState: this.state.theState,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }), 500);

        }).catch(err => MyToast(err || '作废失败'));
    }
    // 公告删除
    onEditDelete(record) {
        // console.log(text, record, index);
        var self = this;
        uProclamationDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
                return;
            }
            MyToast('删除成功');
            setTimeout(this.getData({
                keyword: this.state.keyword,
                editerKeyword: this.state.editerKeyword,
                theState: this.state.theState,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }), 500);
        }).catch(err => MyToast('删除失败'));
    }

    render() {
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
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