/**
 * 角色菜单编辑页面
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Tree
} from 'antd';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    uRoleMenuRelationList,
    uRoleMenuRelationUpdate
} from '../../common/api/api.role';

import { uMenuListForTree } from '../../common/api/api.menumanagement';


class RoleSubManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            treeData: [],  // 树形结构
            checkedKeys: [],  // 勾选中的
            defaultCheckedKeys: [], // 默认选中的

            recordEdit: this.props.recordEdit || {},//新增子表返回的子表id用来显示底面的员工列表
        });


        this.getTreeData = this.getTreeData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            self.setState({
                recordEdit: nextProps.recordEdit
            })
        }
        this.getTreeData({});
    }
    componentDidMount() {
        var self = this;
        self.setState({
            recordEdit: self.props.recordEdit
        });

        this.getTreeData({});
    }

    getTreeData(params) {

        uMenuListForTree(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var roleParam = {
                ...params,
                roleId: this.state.recordEdit.tableId
            }
            uRoleMenuRelationList(roleParam).then(checkedKeys => {
                if (checkedKeys.data.result !== 'success') {
                    MyToast(checkedKeys.data.info || '获取默认角色菜单信息接口失败')
                    return;
                }
                var checkedKeys = checkedKeys.data.roleMenuRelationList;
                var treeData = res.data.menuList;
                treeData = this.dealTreeData(treeData);

                checkedKeys = this.dealCheckedKeys(checkedKeys);

                this.setState({
                    loading: false,
                    treeData,
                    checkedKeys,
                    defaultCheckedKeys: checkedKeys
                });

            }).catch(err => {
                MyToast(err || '获取默认角色菜单信息接口失败')
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    // 处理树形结构数据
    dealTreeData(data) {
        var treeData = [];
        if (data && data.length) {
            data.map((item) => {
                var tmpl = {
                    title: item.theName,
                    key: item.tableId.toString()
                }
                if (item.menuList && item.menuList.length) {
                    var children = [];
                    item.menuList.map((child) => {
                        var childTmpl = {
                            title: child.theName,
                            key: child.tableId.toString()
                        }
                        children.push(childTmpl);
                    });
                    tmpl.children = children;
                }
                treeData.push(tmpl);
            });
        }
        return treeData;
    }

    // 处理选中的菜单数据
    dealCheckedKeys(checkedKeys) {
        var arr = [];
        checkedKeys.length ?
            checkedKeys.map((item) => {
                arr.push(item.menu.tableId.toString());
            }) : '';
        return arr;
    }
    // 确定
    saveDetail() {
        var self = this;
        var roleId = this.state.recordEdit.tableId;
        var menuIdArr = this.state.checkedKeys.join(',');
        var updateParam = {
            roleId,
            menuIdArr
        }
        uRoleMenuRelationUpdate(updateParam).then(checkedKeys => {
            if (checkedKeys.data.result !== 'success') {
                MyToast(checkedKeys.data.info || '获取默认角色菜单信息接口失败')
                return;
            }
            MyToast('成功');
            this.props.TestCancel();

        }).catch(err => {
            MyToast(err || '获取默认角色菜单信息接口失败')
        });
    }

    // 选择树形菜单
    onCheck(checkedKeys) {
        // console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    render() {
        var recordEdit = this.state.recordEdit;
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <Form>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="名称：">
                                    {recordEdit.theName ? recordEdit.theName.value : ''}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            {
                                this.state.treeData.length &&
                                <Tree
                                    checkable
                                    defaultCheckedKeys={this.state.defaultCheckedKeys}
                                    onCheck={this.onCheck.bind(this)}
                                >
                                    {this.renderTreeNodes(this.state.treeData)}
                                </Tree>
                            }
                        </Row>
                    </Form>
                    <div className="actions-btns">
                        <Button type="primary" onClick={this.saveDetail.bind(this)}>保存</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(RoleSubManagement);
