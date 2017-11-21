/**
 * 审批流程详情（设定审核人员）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Button,
    Row,
    Col,
    Popconfirm,
    Table,
    Icon
} from 'antd';

import {
    uFlowRoleList,
    uFlowRoleAdd,
    uFlowRoleDelete,
} from '../../common/api/api.flow';

import {
    uRoleList,
} from '../../common/api/api.role';

import {
    MyToast,
} from '../../common/utils';

const chosedRoleColumns = [
    {
        title: '编号',
        dataIndex: 'tableId',
    }, {
        title: '角色名称',
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

const roleColumns = [
    {
        title: '编号',
        dataIndex: 'tableId',
    }, {
        title: '角色名称',
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

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
};

/**
 * @props departmentId
 */
class EditDepartmentMember extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            roleData: [], // 可选角色
            chosedRoleData: [], // 已选角色
            selectedRowKeys: [],
        }

        this._uFlowRoleList = this._uFlowRoleList.bind(this);
        this._uRoleList = this._uRoleList.bind(this);
    }

    componentDidMount() {
        this._uFlowRoleList();
        this._uRoleList();


        chosedRoleColumns[3].render = (text, record, index) => {
            return (
                <div>
                    <Popconfirm title="确定删除么?" onConfirm={this._chosedRoleDelete.bind(this, text, record, index)}>
                        <a title="删除" className="delete" href="#" style={{ marginLeft: 8 }}><Icon type="delete" className="yzy-icon" /></a>
                    </Popconfirm>
                </div>
            )
        };
        roleColumns[3].render = (text, record, index) => {
            return (
                <div>
                    <a title="新增" className="plus" href="#" style={{ marginLeft: 8 }} onClick={this._uFlowRoleAdd.bind(this, text, record, index)}><Icon type="plus" className="yzy-icon" /></a>
                </div>
            )
        }
    }


    _uFlowRoleList() {
        // todo
        // 这边有个bug，当新增子流程时，不存在流程ID，这时候拿到的flowDtlId是上一步骤的ID。
        var param = {
            flowDtlId: this.props.flowDtlId
        };
        uFlowRoleList(param).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '未加入部门员工列表获取失败');
                return;
            }

            let flowRoleList = res.data.flowRoleList;

            flowRoleList.map(item => {
                item.theName = item.role.theName;
            });

            this.setState({
                loading: false,
                chosedRoleData: flowRoleList
            });
        }).catch(err => MyToast(err));
    }

    _uRoleList() {
        uRoleList({}).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '角色列表获取失败');
                return;
            }

            let roleList = res.data.roleList;

            this.setState({
                loading: false,
                roleData: roleList
            });
        }).catch(err => MyToast(err));
    }

    _chosedRoleDelete(text, record, index) {
        uFlowRoleDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
            }
            this._uFlowRoleList({
                flowDtlId: this.props.flowDtlId
            });
        }).catch(err => MyToast('删除失败'));
    }

    _uFlowRoleAdd(text, record, index) {
        var roleId = record.tableId;
        var params = {
            flowDtlId: this.props.flowDtlId,
            roleId,
        };
        uFlowRoleAdd(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            this.state.roleData.splice(index, 1);
            this.setState({
                roleData: this.state.roleData,
            });
            this._uFlowRoleList({
                flowDtlId: this.props.flowDtlId
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    render() {
        let selectedMembers = this.state.selectedRowKeys.length;

        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="yzy-list-btns-wrap">
                    <Row>
                        <Col span={11}>
                            <h2 className="yzy-tab-content-title">已选人员</h2>
                            <Table
                                columns={chosedRoleColumns}
                                dataSource={this.state.chosedRoleData}
                                rowKey="tableId"
                                pagination={
                                    {
                                        defaultPageSize: 5
                                    }
                                } />
                        </Col>
                        <Col span={11} offset={1}>
                            <h2 className="yzy-tab-content-title">可选人员</h2>
                            <Table
                                columns={roleColumns}
                                dataSource={this.state.roleData}
                                rowKey="tableId"
                                pagination={
                                    {
                                        defaultPageSize: 5
                                    }
                                } />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <h2 className="yzy-tab-content-title">已选角色</h2>
                            <Table
                                columns={chosedRoleColumns}
                                dataSource={this.state.chosedRoleData}
                                rowKey="tableId"
                                pagination={
                                    {
                                        defaultPageSize: 5
                                    }
                                } />
                        </Col>
                        <Col span={11} offset={1}>
                            <h2 className="yzy-tab-content-title">可选角色</h2>
                            <Table
                                columns={roleColumns}
                                dataSource={this.state.roleData}
                                rowKey="tableId"
                                pagination={
                                    {
                                        defaultPageSize: 5
                                    }
                                } />
                        </Col>
                    </Row>
                    <div className="yzy-block-center">
                        <Button type="primary" onClick={this.props.handleModalCancel.bind(this)}>确定</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditDepartmentMember;