/**
 * 权限编辑页面
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

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
            ],
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
            ],
        }, {
            title: '0-0-2',
            key: '0-0-2',
        }],
    }, {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    }, {
        title: '0-2',
        key: '0-2',
    }
];


import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    uLeaveApplicationAdd,
    uLeaveApplicationCancel,
    uLeaveApplicationUpdate
} from '../../common/api/api.authority';


class AuthoritySubDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {},
            checkedKeys: [],

            recordEdit: this.props.recordEdit || {},//新增子表返回的子表id用来显示底面的员工列表
        });
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            self.setState({
                recordEdit: nextProps.recordEdit
            })
            // console.log('will-------------', nextProps.recordEdit);
        }

    }
    componentDidMount() {
        var self = this;
        // console.log('did-------------------', self.props.recordEdit);
        self.setState({
            recordEdit: self.props.recordEdit
        });
    }
    // 确定
    saveDetail() {
        var self = this;
        var form = this.props.form;
        form.validateFields((err, values) => {
            console.log(values);
        });
    }

    onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
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
        let { getFieldDecorator } = this.props.form;
        var recordEdit = this.state.recordEdit;
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <Form>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="名称：">
                                    <Input defaultValue={recordEdit.serialNumber ? recordEdit.serialNumber : ''} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Tree
                                checkable
                                onCheck={this.onCheck.bind(this)}
                            >
                                {this.renderTreeNodes(treeData)}
                            </Tree>
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

export default Form.create()(AuthoritySubDetail);
