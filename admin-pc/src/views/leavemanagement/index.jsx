/**
 * 员工管理
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
    uLeaveApplicationList,
    uLeaveApplicationCancel,
    uLeaveApplicationDelete
} from '../../common/api/api.LeaveManagement';

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
        title: '姓名',
        dataIndex: 'realName',
    }, {
        title: '性别',
        dataIndex: 'sex',
    }, {
        title: '手机号码',
        dataIndex: 'phoneNumber',
    }, {
        title: '开始时间',
        dataIndex: 'beginDatetime',
    }, {
        title: '结束时间',
        dataIndex: 'endDatetime',
    }, {
        title: '请假时长(/h)',
        dataIndex: 'theHoure',
    }, {
        title: '状态',
        dataIndex: 'theState',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: '100px',
    }
];


const rcsearchformData = {
    colspan: 2,
    fields: [
        {
            type: 'input',
            label: '单据编号',
            name: 'keyword',
            placeholder: '请输入单据编号',
        },
        // {
        //     type: 'select',
        //     label: '部门',
        //     name: 'departmentId',
        //     placeholder: '请输入部门',
        //     options: departmentList
        // }
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


class LeaveManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            staffList: [],
            departmentList: [], // 部门列表
            keyword: '',       // 搜索字段 单据编号
            editerKeyword: '', // 搜索字段 申请人
            theState: '-1',    // 搜索字段 单据状态
            startDate: '',     // 搜索字段 开始时间
            endDate: '',       // 搜索字段 结束时间
        }

        this.getData = this.getData.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({});
        var params = {};
        getDepartmentList(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取部门列表失败')
            }

            var departmentList = res.data.departmentList;
            departmentList.length ?
                departmentList.map((item) => {
                    item.label = item.theName;
                    item.value = JSON.stringify(item.tableId);
                }) : '';

            this.setState({
                loading: false,
            });
        }).catch(err => MyToast(err));

        columns[8].render = (text, record, index) => {
            return (
                <div>
                    <a title="编辑" onClick={() => this.showTestModal(record)}><Icon type="edit" className="yzy-icon" /></a>
                    <Popconfirm title="确定要作废吗？" onConfirm={() => this.cancelLeavemanagerment(record.tableId)}>
                        <a title="作废"><Icon type="close" className="yzy-icon" /></a>
                    </Popconfirm>
                    <Popconfirm title="确定删除么?" onConfirm={this.deleteLeavemanagerment.bind(this, record)}>
                        <a title="删除" className="delete" href="#" ><Icon type="delete" className="yzy-icon" /></a>
                    </Popconfirm>
                </div>
            )
        }

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
    }
    //编辑||新增跳页面-----
    showTestModal(record) {
        parent.window.iframeHook.changePage({
            url: 'leaveEdit.html?tableId=' + record.tableId,
            breadIncrement: '请假单编辑'
        });
        return;
    }

    // 请假单作废
    cancelLeavemanagerment(id) {
        var self = this;
        uLeaveApplicationCancel({ tableId: id }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }

            MyToast('作废成功')
            setTimeout(() => {
                self.getData({
                    keyword: self.state.keyword,
                    editerKeyword: self.state.editerKeyword,
                    theState: self.state.theState,
                    startDate: self.state.startDate,
                    endDate: self.state.endDate,
                });
            }, 500);
        }).catch(err => MyToast('作废失败'));
    }

    // 请假单删除
    deleteLeavemanagerment(record) {
        // console.log(text, record, index);
        var self = this;
        uLeaveApplicationDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
                return;
            }

            MyToast('删除成功');
            setTimeout(() => {
                self.getData({
                    keyword: self.state.keyword,
                    editerKeyword: self.state.editerKeyword,
                    theState: self.state.theState,
                    startDate: self.state.startDate,
                    endDate: self.state.endDate,
                });
            }, 500);
        }).catch(err => MyToast('删除失败'));
    }

    getData(params) {
        //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
        uLeaveApplicationList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var data = res.data.leaveApplicationList;

            data = data.map(item => {
                item.realName = item.member.realName;
                item.phoneNumber = item.member.phoneNumber;
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
                return {
                    ...item,
                    sex: item.member.sex === 1 ? '男' : '女',
                    theState
                }
            });

            this.setState({
                loading: false,
                staffList: data
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    render() {
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm
                        {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)}
                    />
                </div>
                <div className="yzy-list-wrap">
                    {/* <div className="yzy-list-btns-wrap">
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={() => this.showTestModal()}>新增</Button>
                    </div> */}
                    <Table
                        columns={columns}
                        dataSource={this.state.staffList}
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


ReactDOM.render(<LeaveManagement />, document.getElementById('root'));