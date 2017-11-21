/**
 * 菜单编辑页面
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
    Select
} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    uMenuDetail,
    uMenuAdd,
    uMenuUpdate,
} from '../../common/api/api.menumanagement';
import { uFlowMstList } from '../../common/api/api.flow';


class AuthoritySubDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {}, // 详情数据
            flowMsList: [], // 流程主表列表, 作为选择用

            recordEdit: this.props.recordEdit || {},//新增子表返回的子表id用来显示底面的员工列表
        });

        this.getData = this.getData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            this.setState({
                recordEdit: nextProps.recordEdit
            });
            this.getData({
                tableId: nextProps.tableId
            });
        }

    }
    componentDidMount() {
        this.setState({
            recordEdit: this.props.recordEdit
        });

        this.getData({
            tableId: this.props.recordEdit.tableId
        });
    }

    // 获取数据 流程主表 && 详情数据
    getData(params) {
        var self = this;
        // 流程主表信息
        uFlowMstList({}).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var flowMsList = res.data.flowMstList;
            this.setState({
                flowMsList,
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });

        // 新增时不需要获取详情信息
        if (self.state.recordEdit.modalType == 'add') {
            return;
        }
        // 详情信息接口
        uMenuDetail(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.menu;
            this.setState({
                data
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });

    }
    // 确定 区分新增 || 编辑
    saveDetail() {
        var self = this;
        const {
            recordEdit,
            TestCancel,
            getData,
            getTreeData
        } = this.props;
        var form = this.props.form;
        form.validateFields((err, values) => {
            console.log(values);
            if (err) return;

            if (recordEdit.modalType == 'add') {
                var params = {
                    theName: values.theName,
                    theLink: values.theLink,
                    fatherMenuId: values.fatherMenuId,
                    theSort: values.theSort,
                    flowMstId: values.flowMstId,
                    tableName: values.tableName,
                }
                uMenuAdd(params).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '接口失败')
                        return;
                    }
                    MyToast('成功');
                    TestCancel();
                    getData({
                        keyword: recordEdit.keyword,
                        fatherMenuId: recordEdit.fatherMenuId,
                    });
                    getTreeData();
                }).catch(err => {
                    MyToast(err || '接口失败')
                });
            } else {
                var params = {
                    tableId: recordEdit.tableId,
                    theName: values.theName,
                    theLink: values.theLink,
                    theSort: values.theSort,
                    flowMstId: values.flowMstId,
                    tableName: values.tableName,
                }
                uMenuUpdate(params).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '接口失败')
                        return;
                    }
                    MyToast('成功');
                    TestCancel();
                    getData({
                        keyword: recordEdit.keyword,
                        fatherMenuId: recordEdit.fatherMenuId,
                    });
                    getTreeData();
                }).catch(err => {
                    MyToast(err || '接口失败')
                });
            }
        });
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        var data = this.state.data;
        var recordEdit = this.props.recordEdit;
        var fatherMenuId = '';
        if (recordEdit.modalType == 'add') {
            fatherMenuId = recordEdit.fatherMenuId;
        } else {
            if(data.fatherMenu){
                fatherMenuId = data.fatherMenu.tableId;
            }else{
                fatherMenuId = '';
            }
        }
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <Form>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="名称：">
                                    {
                                        getFieldDecorator('theName', {
                                            initialValue: data ? data.theName : '',
                                            rules: [{ required: true }],
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="路径：">
                                    {
                                        getFieldDecorator('theLink', {
                                            initialValue: data ? data.theLink : '',
                                            rules: [{ required: true }],
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="父菜单ID：">
                                    {
                                        getFieldDecorator('fatherMenuId', {
                                            initialValue: fatherMenuId,
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="数据库表名称：">
                                    {
                                        getFieldDecorator('tableName', {
                                            initialValue: data ? data.tableName : '',
                                            rules: [{ required: true }],
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="流程主表ID：">
                                    {
                                        getFieldDecorator('flowMstId', {
                                            initialValue: data && data.flowMst ? data.flowMst.tableId + '' : '',
                                            rules: [{ required: true }],
                                        })(
                                            <Select>
                                                {
                                                    this.state.flowMsList.length ?
                                                        this.state.flowMsList.map((item, index) => {
                                                            return <Option value={item.tableId.toString()} key={index}>{item.theName}</Option>
                                                        }) : ''
                                                }
                                            </Select>
                                            )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="排序：">
                                    {
                                        getFieldDecorator('theSort', {
                                            initialValue: data ? data.theSort : '',
                                            rules: [{ required: true }],
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>
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
