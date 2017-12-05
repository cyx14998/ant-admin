/**
 * 角色管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Icon,
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';
import DraggableModal from '../../components/modal.draggable';
import RoleSubDetail from './index.detail'
import EditableTableSection from '../../components/editableTable/index';

import './index.less';

import {
    uRoleList,
    uRoleAdd,
    uRoleUpdate,
    uRoleDelete
} from '../../common/api/api.role';

import {
    MyToast
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
const columns = [
    {
        title: '角色名称',
        dataIndex: 'theName',
    }, {
        title: '创建时间',
        dataIndex: 'createDatetime',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: '140px',
    }
];

//角色新增
const roleAddRecord = {
    tableId: '',
    editable: true,
    theName: {
        value: '',
    },
    createDatetime: {
        value: '',
        disabled: true,
    },
};


class RoleManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            uRoleList: [],
            editModalVisible: false,
            recordEdit: {},
        }

        this.getData = this.getData.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({});
    }

    handleFormSearch(values) {
        console.log('handleSearch ---------', values);

        this.getData({
            keyword: values.keyword
        });
    }
    //编辑|| 新增Modal------隐藏
    TestCancel() {
        this.setState({ editModalVisible: false });
    }
    //编辑|| 新增Modal-----显示
    showTestModal(recordEdit) {
        console.log(recordEdit)
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

    getData(params) {
        //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
        uRoleList(params).then(res => {
            console.log('uRoleList ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.roleList;
            this.setState({
                loading: false,
                uRoleList: this.formatDatasource(data)
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }
    //数据列表格式化
    formatDatasource(dataSource) {
        var data = dataSource.map(data => {
            return {
                tableId: data.tableId,
                theName: {
                    value: data.theName || '',
                },
                createDatetime: {
                    value: data.createDatetime || '',
                    disabled: true,
                },
            }
        });

        return data;
    }
    onEditDelete(id) {
        var self = this;
        return new Promise((resolve, reject) => {
            uRoleDelete({ tableId: id }).then(res => {
                console.log(res);
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    msg: '删除成功'
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        });
    }

    onSaveUpdate(record) {
        console.log('编辑-----------------------', record);
        var self = this;
        var _record = this.serializeRecord(record);
        return new Promise((resolve, reject) => {
            uRoleUpdate({ ..._record, }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    msg: '编辑成功'
                });
                self.getData({});
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }

    onSaveAdd(record) {
        console.log('新增-----------------------', record);
        var self = this;
        var _record = this.serializeRecord(record);
        return new Promise((resolve, reject) => {
            uRoleAdd({ ..._record, }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    msg: '新增成功'
                });
                self.getData({});
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }

    //数据提交格式化
    serializeRecord(record) {
        //file
        if (record.tableId) {
            return {
                tableId: record.tableId,
                theName: record.theName.value,
            }
        }
        return {
            theName: record.theName.value,
        }
    }

    render() {
        return (
            <div className="yzy-page">
                <div className="list-area">
                    <div className="yzy-search-form-wrap">
                        <RcSearchForm {...rcsearchformData}
                            handleSearch={this.handleFormSearch.bind(this)} />
                    </div>
                    <div className="yzy-list-wrap">
                        <EditableTableSection
                            columns={columns}
                            dataSource={this.state.uRoleList}
                            itemDataModel={roleAddRecord}
                            onDelete={this.onEditDelete.bind(this)}
                            onSaveAdd={this.onSaveAdd.bind(this)}
                            onSaveUpdate={this.onSaveUpdate.bind(this)}
                            loading={this.state.loading}
                            CustomerBtn={
                                ({ record }) => {
                                    return (
                                        <span>
                                            <a title="查看角色菜单" onClick={this.showTestModal.bind(this, record)}><Icon type="eye-o" /></a>
                                        </span>
                                    )
                                }
                            }
                        />
                    </div>
                </div>
                <DraggableModal
                    visible={this.state.editModalVisible}
                    title='角色菜单编辑'
                    width='40%'
                    okText=''
                    footer={null}
                    onCancel={this.TestCancel.bind(this)}
                    className='modal editModal'
                >
                    {
                        this.state.editModalVisible && <RoleSubDetail recordEdit={this.state.recordEdit} getData={this.getData.bind(this)} TestCancel={this.TestCancel.bind(this)} />
                    }
                </DraggableModal>
            </div>
        )
    }
}


ReactDOM.render(<RoleManagement />, document.getElementById('root'));