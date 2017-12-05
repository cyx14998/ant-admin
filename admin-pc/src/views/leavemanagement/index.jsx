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
const columns = [{
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
}];


class LeaveManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            staffList: [],
            departmentList: [], // 部门列表
            editModalVisible: false,
            recordEdit: {},
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑
            colspan: 2, // 搜索处参数
            fields: [ // 搜索处参数
                {
                    type: 'input',
                    label: '关键字',
                    name: 'keyword',
                    placeholder: '请输入姓名/手机号',
                },
                {
                    type: 'select',
                    label: '部门',
                    name: 'departmentId',
                    placeholder: '请输入部门',
                    options: [
                    ]
                }
            ]
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
            var fields = [
                {
                    type: 'input',
                    label: '关键字',
                    name: 'keyword',
                    placeholder: '请输入姓名/手机号',
                },
                {
                    type: 'select',
                    label: '部门',
                    name: 'departmentId',
                    placeholder: '请输入部门',
                    options: departmentList
                }
            ]

            this.setState({
                loading: false,
                fields
            });
        }).catch(err => MyToast(err));

        columns[7].render = (text, record, index) => {
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

    handleFormSearch(values) {

        this.getData({
            keyword: values.keyword,
            departmentId: values.departmentId
        });
    }
    //编辑||新增跳页面-----
    showTestModal(record) {
        parent.window.iframeHook.changePage({
            url: '/leaveEdit.html?tableId=' + record.tableId,
            breadIncrement: '请假单编辑'
        });
        return;
    }
    // 删除操作
    onEditDelete(text, record, index) {
        // console.log(text, record, index);
        var self = this;
        uLeaveApplicationDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
            }
            setTimeout(() => {
                self.getData({});
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
                    <RcSearchForm fields={this.state.fields} colspan={this.state.colspan}
                        handleSearch={this.handleFormSearch.bind(this)} />
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