/**
 * 权限管理
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
import FlowStepSubDetail from './index.detail'

import './index.less';

import {
    uFlowRoleList,
    uFlowRoleDelete,
    uFlowRoleAdd,
    uRoleList,
} from '../../common/api/api.flowStep';

import {
    MyToast,
    getLocQueryByLabel
} from '../../common/utils';

// RcSearchForm datablob
const rcsearchformData = {
    colspan: 2,
    fields: [{
        type: 'input',
        label: '关键词',
        name: 'keyword',
        placeholder: '请输入关键词',
    }]
};
/**
 * table head
 */
const columns = [{
    title: '编号',
    dataIndex: 'tableId',
}, {
    title: '角色名称',
    dataIndex: 'theName',
}, {
    title: '操作',
    dataIndex: 'operation',
    width: '100px',
}];

const flowStepColumns = [
    {
        title: '编号',
        dataIndex: 'tableId',
    }, {
        title: '角色名称',
        dataIndex: 'theName',
    }, {
        title: '创建时间',
        dataIndex: 'createDatetime',
    },
];

class FlowStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flowDtlId: getLocQueryByLabel('flowDtlId') || '',
            loading: true,
            flowList: [],
            departmentList: [], // 部门列表
            editModalVisible: false,
            recordEdit: {},
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑

            checkedKeys: [],
            uFlowRoleList: [],
            flowStepRowKey: {},
        }

        this.getData = this.getData.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({
            flowDtlId: this.state.flowDtlId
        });

        columns[2].render = (text, record, index) => {
            return (
                <div>
                    <Popconfirm title="确定删除么?" onConfirm={this.onEditDelete.bind(this, text, record, index)}>
                        <a title="删除" className="delete" href="#" style={{ marginLeft: 8 }}><Icon type="delete" className="yzy-icon" /></a>
                    </Popconfirm>
                </div>
            )
        }

    }

    handleFormSearch(values) {
        console.log('handleSearch ---------', values);

        this.getData({
            keyword: values.keyword,
            flowDtlId: this.state.flowDtlId
        });
    }
    //编辑|| 新增Modal------隐藏
    TestCancel() {
        this.setState({ editModalVisible: false });
    }
    //编辑|| 新增Modal-----显示
    showTestModal() {
        uRoleList({}).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.roleList;
            this.setState({
                uFlowRoleList: data,
                editModalVisible: true,
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });

    }
    // 删除操作
    onEditDelete(text, record, index) {
        // console.log(text, record, index);
        var self = this;
        uFlowRoleDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
            }
            this.getData({
                flowDtlId: this.state.flowDtlId
            });
        }).catch(err => MyToast('删除失败'));
    }

    getData(params) {
        uFlowRoleList(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var data = res.data.flowRoleList;

            data.map(item => {
                item.theName = item.role.theName;
            });

            this.setState({
                loading: false,
                flowList: data
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    onCheck(checkedKeys) {
        this.setState({ checkedKeys });
    }

    flowListModalOk() {
        var roleId = this.state.flowStepRowKey.tableId;
        var params = {
            flowDtlId: this.state.flowDtlId,
            roleId,
        };
        uFlowRoleAdd(params).then(res => {
            console.log(res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            this.setState({
                editModalVisible: false,
            });
            this.getData({
                flowDtlId: this.state.flowDtlId
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    render() {
        var self = this;
        var flowStepRowKey = this.state.flowStepRowKey;
        const flowStepRowSelection = {
            flowStepRowKey,
            type: 'radio',
            onChange(selectedRowKeys) {
                console.log(`purOrdSelectedRowKeys changed: ${selectedRowKeys}`);
            },
            onSelect(record, selected, selectedRows) {
                self.setState({
                    flowStepRowKey: record
                });
            }
        };
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <div className="yzy-list-btns-wrap">
                        <Button type="primary" style={{ marginLeft: 8 }}
                            onClick={() => this.showTestModal()}>新增</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.flowList}
                        rowKey="tableId"
                        loading={this.state.loading}
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }} />
                </div>
                <DraggableModal
                    title="角色列表"
                    width='70%'
                    visible={this.state.editModalVisible}
                    onCancel={() => this.setState({ editModalVisible: false })}
                    className='modal'
                >
                    <Table
                        rowSelection={flowStepRowSelection}
                        columns={flowStepColumns}
                        dataSource={this.state.uFlowRoleList}
                        rowKey="tableId"
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }}
                    />
                    <div className="yzy-block-center">
                        <Button type="primary" style={{ padding: '0 40px', margin: '20px 0' }} onClick={self.flowListModalOk.bind(this)}>确定</Button>
                    </div>
                </DraggableModal>
            </div>
        )
    }
}


ReactDOM.render(<FlowStep />, document.getElementById('root'));