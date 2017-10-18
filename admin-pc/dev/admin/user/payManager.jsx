import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './payManager.less';
import $db from '../../common/dal.js';
import store from '../../models/payManager';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const { TextArea } = Input;

//添加与编辑页面Modal
class PayForm extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { visible, onCancel, onCreate, handleSubmit, form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <Modal
                title="商品添加"
                width='72%'
                visible={visible}
                onCancel={onCancel}
                onOk={onCreate}
                className='modal'
            >
                <div className="content">
                    <Form onSubmit={handleSubmit} >
                        <div className="top">
                            <div className="topLeft">
                                <div className="infoTitle"><i></i>基本信息</div>
                                <Row className="clearfix">
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="用户编号">
                                            {getFieldDecorator('userid', {
                                                initialValue: store.getState().Data.userid,
                                                rules: [
                                                    { required: true, message: '请输入用户编号!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="微信appid">
                                            {getFieldDecorator('appid', {
                                                initialValue: store.getState().Data.appid,
                                                rules: [
                                                    { required: true, message: '请输入微信appid!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="商户号">
                                            {getFieldDecorator('mchid', {
                                                initialValue: store.getState().Data.mchid,
                                                rules: [
                                                    { required: true, message: '请输入商户号!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="支付回调Url">
                                            {getFieldDecorator('notifyurl', {
                                                initialValue: store.getState().Data.notifyurl,
                                                rules: [{ required: false, message: '请输入回调url!' },
                                                { pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, message: '请输入正确的链接!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="终端ip">
                                            {getFieldDecorator('ip', {
                                                initialValue: store.getState().Data.ip,
                                                rules: [
                                                    { required: true, message: '请输入终端ip!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="appsecret">
                                            {getFieldDecorator('appsecret', {
                                                initialValue: store.getState().Data.appsecret,
                                                rules: [
                                                    { required: true, message: '请输入appsecret!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="支付密匙">
                                            {getFieldDecorator('paykey', {
                                                initialValue: store.getState().Data.paykey,
                                                rules: [{ required: true, message: '请输入支付密匙' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="证书路径">
                                            {getFieldDecorator('sslcertpath', {
                                                initialValue: store.getState().Data.sslcertpath,
                                                rules: [{ required: true, message: '请输入证书路径!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="证书密匙">
                                            {getFieldDecorator('sslcertpwd', {
                                                initialValue: store.getState().Data.sslcertpwd,
                                                rules: [{ required: false, message: '请输入证书密匙!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
        )
    }
};
const EnhancedForm = Form.create()(PayForm);
//列表页面
class PayManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.handleSearch(1);
    }
    //页面初始化页码搜索
    handleSearch(pageNumber) {
        if (pageNumber == 1) {
            store.dispatch({ value: 1, type: 'PAGENUMBER' })
        }
        this.setState({ loading: true, });
        var data1 = {
            InnerID: store.getState().InnerID,
            pageIndex: store.getState().pageNumber,
        }
        $db.getAllWeCahtPay(data1, function (results) {
            if(results && results.code && results.code == 1){
                var result = results.result;
                store.dispatch({
                    count: results.count,
                    value: result,
                    type: 'DATAALL'
                });
                // store.dispatch({value: results.count, type: 'COUNT' });
                this.setState({ loading: false, });
            }
        }.bind(this));
    }
    //头部关键字搜索
    headSearch = (value) => {
        store.dispatch({ value: value, type: 'InnerID' });
        const data1 = {
            keyWord: value,
        }
        $db.getAllWeCahtPay(data1, function (results) {
            var result = results.result;
            store.dispatch({
                count: results.count,
                value: result,
                type: 'DATAALL'
            });
            // store.dispatch({value: results.count, type: 'COUNT' });
        }.bind(this));
    }
    // 弹窗增加
    showModal = () => {
        store.dispatch({ value: true, type: 'VISIBLE' });
    }
    //列表页面删除
    onDeleteList = (index) => {
        console.log(index);
        const data1 = store.getState().DataAll[index].InnerID;

        $db.delWeCahtPay(data1, function (result) {
            if (result.code == 1) {
                message.info("删除成功");
                store.dispatch({ index: index, type: 'DELETE' });
            } else {
                message.info("删除失败")
            }
        });
    }
    //改变页码
    onChangeNum(pageNumber) {
        store.dispatch({ value: pageNumber, type: 'PAGENUMBER' })
        this.handleSearch(pageNumber, );
    }
    //编辑弹出Modal
    editModal = (data) => {
        var self = this;
        store.dispatch({ value: data.InnerID, type: 'INNERID' });
        store.dispatch({ value: true, type: 'VISIBLE' });
        store.dispatch({
            value: data,
            type: 'EDIT_DATA'
        });
    }
    //Modal取消
    handleCancel = (e) => {
        const form = this.form;
        form.resetFields();
        store.dispatch({ value: '', type: 'INNERID' });
        store.dispatch({ type: 'EDIT_DATA' });
        store.dispatch({ value: false, type: 'VISIBLE' });
        store.dispatch({ type: 'EMPTYDATA' });
    }
    //modal确定
    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                const formData = form.getFieldsValue();
                formData.InnerID = store.getState().InnerID;
                $db.saveWeChatPayConfig(formData, function (result) {
                    if (result.code == 1) {
                        message.info('提交成功');
                        store.dispatch({ value: true, type: 'VISIBLE' });
                        //确定时清空数据
                        form.resetFields();
                        store.dispatch({ type: 'EMPTYDATA' });
                        window.location.href = "/admin/payManager";
                    } else {
                        message.info("保存失败")
                    }
                });
            } else {
                console.log('Received values of form: ', values);
                return false;
            }
        });
    }
    saveFormRef = (form) => {
        this.form = form.props.form;
    }
    render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'InnerID',
                key: 'InnerID',
            }, {
                title: '用户编号',
                dataIndex: 'userid',
                key: 'userid',
            }, {
                title: '微信appid',
                dataIndex: 'appid',
                key: 'appid',
            }, {
                title: '商户号',
                dataIndex: 'mchid',
                key: 'mchid',
            }, {
                title: '支付回调Url',
                dataIndex: 'notifyurl',
                key: 'notifyurl'
            },{
                title: '终端ip',
                dataIndex: 'ip',
                key: 'ip'
            },{
                title: 'appsecret',
                dataIndex: 'appsecret',
                key: 'appsecret'
            },{
                title: '支付密匙',
                dataIndex: 'paykey',
                key: 'paykey'
            }, {
                title: '证书路径',
                dataIndex: 'sslcertpath',
                key: 'sslcertpath'
            },{
                title: '证书密匙',
                dataIndex: 'sslcertpwd',
                key: 'sslcertpwd'
            },{
                title: '编辑',
                key: 'action',
                render: (text, index) => <div>
                    <Button type="primary" onClick={this.editModal.bind(this, index)}>编辑</Button>
                </div>
            },{
                title: '删除',
                dataIndex: 'Delete',
                render: (text, record, index) => {
                    return (
                        store.getState().DataAll.length >= 1 ?
                            (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDeleteList(index)}>
                                    <a className="delete" href="#">Delete</a>
                                </Popconfirm>
                            ) : null
                    );
                },
            }
        ];
        //表格最左边的控件
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        return (
            <div className="divBorder">
                <div className="divHeader">
                    <Search className="search"
                        placeholder="关键字搜索"
                        style={{ width: 300 }}
                        onSearch={this.headSearch.bind(this)}
                    />
                    <EnhancedForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={store.getState().Visible}
                        startTime={this.startTime}
                        showModal={this.showModal}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        handlePicPreview={this.handlePicPreview}
                        handlePicChange={this.handlePicChange}
                        picModalCancel={this.picModalCancel}
                    />
                    <Button className="editable-add-btn f_right" onClick={this.showModal}>Add</Button>
                </div>
                <Table
                    rowKey='InnerID'
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={store.getState().DataAll}
                    pagination={false}
                    loading={this.state.loading}
                />
                <Pagination showQuickJumper defaultCurrent={1} current={store.getState().pageNumber} total={store.getState().count} onChange={this.onChangeNum.bind(this)} />
            </div >
        )
    }
}
const render = () => {
    ReactDOM.render(
        <PayManager></PayManager>, document.getElementById('payManagerreactwrapper'));
}
render();
store.subscribe(render);