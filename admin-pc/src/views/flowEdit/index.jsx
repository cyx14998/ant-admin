/**
 * 审批流程管理 -- 新增 编辑
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Button,
    Icon,
    Affix,
    BackTop,
    Popconfirm
} from 'antd';

import {
    uFlowDtlList,
    uFlowDtlDetail,
    uFlowDtlDelete,
} from '../../common/api/api.flow';
import DraggableModal from '../../components/modal.draggable';
import FlowDetail from './flow.details';

import {
    getLocQueryByLabel,
    MyToast
} from '../../common/utils';

import './index.less';


/**
 * 审批流程编辑页面
 * @params flowMstId from querystring
 */
class FlowEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flowMstId: getLocQueryByLabel('flowMstId') || '',
            editModalVisible: false,
            recordEdit: {}, // 点击编辑时接口返回的子表详情数据

            modalType: 'add', // 新增 || 编辑 add/edit

            flowList: [

            ]
        }
    }

    componentDidMount() {
        this.getData({
            flowMstId: this.state.flowMstId
        });
    }
    getData(params) {
        var self = this;
        uFlowDtlList(params).then(res => {
            console.log('uFlowDtlList ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.flowDtlList;

            self.setState({
                loading: false,
                flowList: data
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }
    //编辑|| 新增Modal------隐藏
    TestCancel() {
        this.setState({ editModalVisible: false });
    }
    //编辑Modal-----显示
    showEditModal(data) {
        var params = {
            tableId: data.tableId
        };
        uFlowDtlDetail(params).then(res => {
            console.log('uFlowDtlDetail ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            res.data.flowDtl.modalType = 'edit';
            this.setState({
                editModalVisible: true,
                recordEdit: res.data.flowDtl,
                modalType: 'edit'
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });

    }

    // 新增流程  Modal---- 显示
    addFlow() {
        var recordEdit = {};
        var length = this.state.flowList.length;
        if (length) {
            var lastFlowDtlTheName = this.state.flowList[length - 1].theRemark;
            var tableId = this.state.flowList[length - 1].tableId;
            recordEdit = {
                tableId,
                lastFlowDtl: {
                    theRemark: lastFlowDtlTheName
                }
            };
        }
        recordEdit.modalType = 'add';
        recordEdit.flowMstId = this.state.flowMstId;
        this.setState({
            editModalVisible: true,
            recordEdit,
            modalType: 'add'
        });
    }

    // 插入流程
    insertFlow(index) {
        var lastFlowDtlTheName = this.state.flowList[index].theRemark;
        var nextFlowDtlTheName = this.state.flowList[index + 1].theRemark;
        var recordEdit = {
            lastFlowDtl: {
                theRemark: lastFlowDtlTheName
            },
            nextFlowDtl: {
                theRemark: nextFlowDtlTheName
            }
        };
        recordEdit.modalType = 'insert';
        recordEdit.flowMstId = this.state.flowMstId;
        recordEdit.tableId = this.state.flowList[index].tableId;
        this.setState({
            editModalVisible: true,
            recordEdit,
            modalType: 'insert'
        });
    }

    // 删除流程
    delFlow(data, index) {
        var params = {
            tableId: data.tableId
        };
        uFlowDtlDelete(params).then(res => {
            console.log('uFlowDtlDelete ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            this.state.flowList.splice(index, 1);
            var flowList = this.state.flowList;
            this.setState({
                flowList
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    // 保存流程
    approvalProcessSave() {
        console.log('save--------------');
        MyToast('保存成功');
    }

    render() {
        var self = this;
        var modalType = '新增审批流程';
        if (this.state.modalType == 'edit') {
            modalType = '审批流程编辑';
        } else if (this.state.modalType == 'insert') {
            modalType = '插入审批流程';
        }
        return (
            <div>
                <div className="yzy-page">
                    <div className="yzy-list-wrap">
                        <div className="approval-add">
                            <Affix>
                                <Button type="primary" onClick={self.addFlow.bind(self)}>新增</Button>
                            </Affix>
                        </div>
                        <div className="approval-content">
                            <div className="approval-list">
                                {
                                    self.state.flowList && self.state.flowList.length ?
                                        self.state.flowList.map((item, index) => {
                                            return <div className="approval-item" key={index}>
                                                <div className="item-body">
                                                    <p className={item.title}>流程{index + 1}</p>
                                                    <Popconfirm title="确定删除么?" onConfirm={this.delFlow.bind(self, item, index)}>
                                                        <a title="删除" className="item-del" href="#" style={{ marginLeft: 8 }}><Icon type="delete" className="yzy-icon" /></a>
                                                    </Popconfirm>
                                                    <div className="item-edit" title="编辑" onClick={self.showEditModal.bind(self, item)}>
                                                        <Icon type="edit" />
                                                    </div>
                                                </div>
                                                <div className="item-nextArr">
                                                    <div className="insert-action" onClick={self.insertFlow.bind(self, index)}>
                                                        <p>插入</p>
                                                    </div>
                                                </div>
                                            </div>
                                        }) : ''
                                }
                            </div>
                        </div>
                    </div>
                    <DraggableModal
                        visible={this.state.editModalVisible}
                        title={modalType}
                        width='70%'
                        okText=''
                        footer={null}
                        onCancel={this.TestCancel.bind(this)}
                        className='modal editModal'
                    >
                        {
                            this.state.editModalVisible && <FlowDetail getData={this.getData.bind(this)} recordEdit={this.state.recordEdit} TestCancel={this.TestCancel.bind(this)} />
                        }
                    </DraggableModal>
                </div>
                <div className="approvalProcessSave">
                    <Button type="primary" onClick={this.approvalProcessSave.bind(this)}>保存</Button>
                </div>
                <BackTop />
            </div>
        )
    }
}

ReactDOM.render(<FlowEdit />, document.getElementById('root'));