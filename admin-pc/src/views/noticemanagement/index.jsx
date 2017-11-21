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
import NoticeManagementSubDetail from './index.detail'

import './index.less';

import {
    uLeaveApplicationList,
    uLeaveApplicationDelete
} from '../../common/api/api.LeaveManagement';
import {
    uProclamationList
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
            staffList: [],
            departmentList: [], // 部门列表
            editModalVisible: false,
            recordEdit: {},
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑

        }

        this.getData = this.getData.bind(this);
        this._getuProclamationList = this._getuProclamationList.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({});
        this._getuProclamationList({});

        columns[6].render = (text, record, index) => {
            return (
                <div>
                    <a title="编辑" onClick={() => this.showTestModal(record, 'edit')}><Icon type="edit" style={{ marginRight: '10px' }} className="yzy-icon" /></a>
                    <Popconfirm title="确定删除么?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                        <a title="删除" className="delete" href="#" style={{ marginLeft: 8 }}><Icon type="delete" className="yzy-icon" /></a>
                    </Popconfirm>
                </div>
            )
        }

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
                return {
                    ...item,
                    sex: item.sex === 1 ? '男' : '女'
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

    // 获取公告列表
    _getuProclamationList(params) {
        uProclamationList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);

        this.getData({
            keyword: values.keyword,
            departmentId: values.departmentId
        });
    }
    //编辑|| 新增Modal------隐藏
    modalCancel() {
        this.setState({ editModalVisible: false });
    }
    //编辑|| 新增Modal-----显示
    showTestModal(recordEdit, type) {
        console.log(recordEdit)
        if (type) {
            //
            this.setState({
                modalType: type
            });
        }
        recordEdit.modalType = type;
        this.setState({
            recordEdit: recordEdit,
            editModalVisible: true,
        });
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

    render() {
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...RcSearchFormData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <div className="yzy-list-btns-wrap">
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={() => this.showTestModal({}, 'add')}>新增</Button>
                    </div>
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
                <DraggableModal
                    visible={this.state.editModalVisible}
                    title={this.state.modalType == 'add' ? '新增请假单' : '请假单编辑'}
                    width='70%'
                    okText=''
                    footer={null}
                    onCancel={this.modalCancel.bind(this)}
                    className='modal editModal'
                >
                    {
                        this.state.editModalVisible &&
                        <NoticeManagementSubDetail id="mediaMsgEditor" height="400" value="从这里开始写正文" recordEdit={this.state.recordEdit} getData={this.getData.bind(this)} modalCancel={this.modalCancel.bind(this)} />
                    }
                </DraggableModal>
            </div>
        )
    }
}


ReactDOM.render(<NoticeManagement />, document.getElementById('root'));