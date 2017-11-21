/**
 * 菜单管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Button,
    Table,
    Icon,
    Row,
    Col,
    Tree,
    Popconfirm,
    Affix
} from 'antd';
const TreeNode = Tree.TreeNode;


import RcSearchForm from '../../components/rcsearchform';
import DraggableModal from '../../components/modal.draggable';
import MenuSubDetail from './index.detail'

import './index.less';

import {
    uMenuList,
    uMenuAdd,
    uMenuUpdate,
    uMenuDelete,
    uMenuListForTree
} from '../../common/api/api.menumanagement';

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
        title: '菜单名称',
        dataIndex: 'theName',
    }, {
        title: '菜单层级',
        dataIndex: 'theLevel',
    }, {
        title: '菜单路径',
        dataIndex: 'theLink',
    }, {
        title: '排序',
        dataIndex: 'theSort',
    }, {
        title: '创建时间',
        dataIndex: 'createDatetime',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: '100px',
    }
];


class AuthorityManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            menuList: [],
            editModalVisible: false,
            fatherMenuId: '',
            keyword: '',
            recordEdit: {},
            modalType: 'add', // 弹窗类型 add 新增  edit 编辑

            treeData: [], // 树形菜单
        }

        this.getData = this.getData.bind(this);
        this.getTreeData = this.getTreeData.bind(this);
        this.showTestModal = this.showTestModal.bind(this);
    }

    componentDidMount() {
        this.getData({});
        this.getTreeData();

        columns[5].render = (text, record, index) => {
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

    // 获取菜单列表
    getData(params) {
        uMenuList(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var data = res.data.menuList;

            this.setState({
                loading: false,
                menuList: data
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }

    // 获取树形菜单列表
    getTreeData() {
        uMenuListForTree({}).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var treeData = res.data.menuList;
            treeData = this.dealTreeData(treeData);
            this.setState({
                loading: false,
                treeData
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
                    key: item.tableId
                }
                if (item.menuList && item.menuList.length) {
                    var children = [];
                    item.menuList.map((child) => {
                        var childTmpl = {
                            title: child.theName,
                            key: child.tableId
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

    // 搜索
    handleFormSearch(values) {
        console.log('handleSearch ---------', values);
        this.setState({
            keyword: values.keyword
        });
        this.getData({
            keyword: values.keyword
        });
    }
    //编辑|| 新增Modal------隐藏
    TestCancel() {
        this.setState({ editModalVisible: false });
    }
    //编辑|| 新增Modal-----显示
    showTestModal(recordEdit, type) {
        if (type) {
            //
            this.setState({
                modalType: type
            });
        }
        recordEdit.modalType = type;
        recordEdit.keyword = this.state.keyword;
        recordEdit.fatherMenuId = this.state.fatherMenuId;
        this.setState({
            recordEdit: recordEdit,
            editModalVisible: true,
        });
    }
    // 删除操作
    onEditDelete(text, record, index) {
        // console.log(text, record, index);
        var self = this;
        uMenuDelete({ tableId: record.tableId }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除失败');
            }

            this.state.menuList.splice(index, 1);
            this.setState({
                menuList: this.state.menuList
            });
        }).catch(err => MyToast('删除失败'));
    }

    onSelect(selectedKeys, info) {
        // console.log('onSelect', selectedKeys);
        var params = {
            fatherMenuId: selectedKeys[0],
            keyword: this.state.keyword
        };
        this.setState({
            fatherMenuId: selectedKeys[0],
        })
        this.getData(params);
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
        return (
            <div className="yzy-page">
                <Row>
                    <Col span={4} offset={1}>
                        <Affix>
                            <div className="tree-area">
                                <Tree
                                    showLine
                                    onSelect={this.onSelect.bind(this)}
                                >
                                    {this.renderTreeNodes(this.state.treeData)}
                                </Tree>
                            </div>
                        </Affix>
                    </Col>
                    <Col span={18}>
                        <div className="list-area">
                            <div className="yzy-search-form-wrap">
                                <RcSearchForm {...rcsearchformData}
                                    handleSearch={this.handleFormSearch.bind(this)} />
                            </div>
                            <div className="yzy-list-wrap">
                                <div className="yzy-list-btns-wrap">
                                    <Button type="primary" style={{ marginLeft: 8 }}
                                        onClick={() => this.showTestModal({}, 'add')}>新增</Button>
                                </div>
                                <Table
                                    columns={columns}
                                    dataSource={this.state.menuList}
                                    rowKey="tableId"
                                    loading={this.state.loading}
                                    rowClassName={(record, index) => {
                                        if (index % 2 !== 0) {
                                            return 'active'
                                        }
                                    }}
                                    pagination={
                                        false
                                        // {
                                        //     defaultPageSize: 1000
                                        // }
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <DraggableModal
                    visible={this.state.editModalVisible}
                    title={this.state.modalType == 'add' ? '新增菜单' : '菜单编辑'}
                    width='70%'
                    okText=''
                    footer={null}
                    onCancel={this.TestCancel.bind(this)}
                    className='modal editModal'
                >
                    {
                        this.state.editModalVisible && <MenuSubDetail recordEdit={this.state.recordEdit} getTreeData={this.getTreeData.bind(this)} getData={this.getData.bind(this)} TestCancel={this.TestCancel.bind(this)} />
                    }
                </DraggableModal>
            </div>
        )
    }
}


ReactDOM.render(<AuthorityManagement />, document.getElementById('root'));