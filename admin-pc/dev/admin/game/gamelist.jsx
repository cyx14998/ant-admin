import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './gamelist.less';
import $db from '../../common/dal.js';
import store from '../../models/gamelist';

import { Form, Input, Row, Col, Table, Button, Popconfirm, Upload, Icon, Select, message, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//添加与编辑弹窗页面 GameManageForm
class GameManage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { visible, onCancel, onCreate, handleSubmit, form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //编辑页面底部表格头部
        const columns = [
            {
                title: '等级编号',
                dataIndex: 'ReturnCode',
                width: '8%',
                render: (text, index) => <Input size="small" value={index.ReturnCode} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'RETURNCODE' })} />
            }, {
                title: '等级名称',
                dataIndex: 'MessageName',
                render: (text, index) => <Input size="small" value={index.MessageName} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'MESSAGENAME' })} />
            }, {
                title: '难度系数',
                dataIndex: 'DiffCoeff',
                render: (text, index) => <Input size="small" value={index.DiffCoeff} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'DIFFCOEFF' })} />
            }, {
                title: '删除',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        store.getState().Data.RuleList.length > 1 ?
                            (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.onEditDelete(index)}>
                                    <a className="delete" href="#">Delete</a>
                                </Popconfirm>
                            ) : null
                    );
                },
            }
        ];
        return (
            <Modal
                title="游戏配置"
                width='70%'
                visible={visible}
                onCancel={onCancel}
                onOk={onCreate}
                className='modal'
            >
                <div className="content">
                    <Form onSubmit={handleSubmit}>
                        <div className="top">
                            <div className="topLeft">
                                <Row className="picRow">
                                    <Col span={24} >
                                        <FormItem {...formItemLayout} label="活动图片">
                                            {getFieldDecorator('pic')(<div>
                                                <Upload
                                                    action={$db.uploadImg}
                                                    listType="picture-card"
                                                    fileList={store.getState().fileList}
                                                    onPreview={this.props.handlePicPreview}
                                                    onChange={this.props.handlePicChange}
                                                >
                                                    {store.getState().fileList.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={store.getState().previewVisible} footer={null} onCancel={this.props.picModalCancel}>
                                                    <img alt="example" style={{ width: '100%' }} src={store.getState().previewImage} />
                                                </Modal>
                                            </div>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <div className="infoTitle"><i></i>基本信息</div>
                                <Row className="clearfix">
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="编号">
                                            {getFieldDecorator('GameCode', {
                                                initialValue: store.getState().Data.GameCode,
                                                rules: [{ required: true, message: 'Please input your GameCode!' },
                                                { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                                ],
                                            })(
                                                <Input size="small" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="名称">
                                            {getFieldDecorator('GameName', {
                                                initialValue: store.getState().Data.GameName,
                                                rules: [{ required: true, message: 'Please input your GameName!' }],
                                            })(
                                                <Input size="small" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="类型">
                                            {getFieldDecorator('GameType', {
                                                initialValue: store.getState().Data.GameType ? JSON.stringify(store.getState().Data.GameType) : '0',
                                                rules: [{ required: true, message: 'Please input your GameType!' }],
                                            })(
                                                <Select size="small" onChange={value => store.dispatch({ value: value, type: 'GAMETYPE' })}>
                                                    <Option value="0">跑酷类</Option>
                                                    <Option value="1">运气类</Option>
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="路径">
                                            {getFieldDecorator('GameUrl', {
                                                initialValue: store.getState().Data.GameUrl,
                                                rules: [{ required: true, message: 'Please input your GameUrl!' },
                                                { pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, message: '格式不正确' }
                                                ],
                                            })(
                                                <Input size="small" />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="接口">
                                            {getFieldDecorator('ApiUrl', {
                                                initialValue: store.getState().Data.ApiUrl,
                                                rules: [{ required: true, message: 'Please input your ApiUrl!' },
                                                { pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, message: '格式不正确' }
                                                ],
                                            })(
                                                <Input size="small" />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="bottom clearfix">
                            <div className="table">
                                <Table className="clearfix" rowKey="InnerID" pagination={false} dataSource={store.getState().Data.RuleList} columns={columns} />
                                <Button className="editable-add-btn f_right" onClick={this.props.handleAdd}>Add</Button>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </Form >
                </div >
            </Modal>
        )
    }
};
const GameManageForm = Form.create()(GameManage);
// 列表页面
class GameList extends React.Component {
    constructor(props) {
        super(props);
        //列表页面表格头部
        this.columns = [
            {
                title: '游戏ID',
                dataIndex: 'InnerID',
                width: '30%'
            }, {
                title: '游戏名称',
                dataIndex: 'GameName',
            }, {
                title: '游戏地址',
                dataIndex: 'GameUrl',
            }, {
                title: '图片',
                dataIndex: 'ImagesID',
                render: (text, index) => <img className="img" src={text} />
            }, {
                title: '编辑',
                dataIndex: 'edi',
                render: (text, index) => <div>
                    <Button type="primary" onClick={this.editModal.bind(this, index)}>编辑</Button>
                </div>
            }, {
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
            }];
        store.dispatch({ value: false, type: 'VISIBLE' });
    }

    componentDidMount() {
        $db.getGameList(null, function (result) {
            console.log(result)
            // if (result) {
            result.map((item, index) => {
                item.ImagesID = $db.imgUrl + item.ImagesID;
            })
            // console.log(result[0].ImagesID);
            store.dispatch({ value: result, type: 'DATAALL' });
            // }
        });
    }
    // 编辑弹窗
    editModal = (index) => {
        console.log(index);
        var self = this;
        var data1 = index.InnerID;
        store.dispatch({ value: data1, type: 'INNERID' });
        console.log(data1)
        $db.getGameEdit(data1, function (result) {
            console.log(result);
            if (result.code == 1) {
                store.dispatch({ value: true, type: 'VISIBLE' });
                var tmplId = result.result.ImagesID;
                result.result.ImagesID = $db.imgUrl + tmplId;
                // console.log(tmplId);
                store.dispatch({
                    tmplId: tmplId,
                    imgUrl: result.result.ImagesID,
                    value: result.result,
                    type: 'EDIT_DATA'
                });
            }
        });
    }
    //添加弹窗
    showModal = () => {
        store.dispatch({ value: true, type: 'VISIBLE' });;
    }
    //列表数据删除
    onDeleteList = (index) => {
        console.log(index);
        // console.log(store.getState().DataAll[index].InnerID)
        var data1 = {
            InnerID: store.getState().DataAll[index].InnerID
        };
        console.log(data1)
        $db.deleteGame(data1, function (result) {
            // console.log(result)
            if (result == 1 || result == '1') {
                message.info("删除成功");
                store.dispatch({ index: index, type: 'DELETE' });
            } else {
                message.info("删除失败")
            }
        });
    }
    //关闭modal，情况数据
    handleCancel = () => {
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
                console.log(store.getState().Data.tmplId);
                const formData = form.getFieldsValue();
                formData.InnerID = store.getState().InnerID;
                formData.ImagesID = store.getState().Data.tmplId;
                formData.RuleList = store.getState().Data.RuleList;
                delete formData.pic;
                console.log(formData);

                if (formData.InnerID == '') {
                    $db.submitGame(formData, function (result) {
                        console.log(result)
                        if (result == 1) {
                            store.dispatch({ value: true, type: 'VISIBLE' });
                            window.location.href = "/admin/gamelist";
                            //确定时清空数据
                            form.resetFields();
                            store.dispatch({ type: 'EMPTYDATA' });
                        } else {
                            message.info("修改失败")
                        }
                    });
                } else {
                    $db.editGame(formData, function (result) {
                        console.log(result)
                        if (result == 1) {
                            store.dispatch({ value: true, type: 'VISIBLE' });
                            window.location.href = "/admin/gamelist";
                            //确定时清空数据
                            form.resetFields();
                            store.dispatch({ type: 'EMPTYDATA' });
                        } else {
                            message.info("修改失败")
                        }
                    });
                }
            } else {
                console.log('Received values of form: ', values);
                return false;
            }
        });
    }
    saveFormRef = (form) => {
        this.form = form.props.form;
    }

    //图片取消预览
    picModalCancel = () => {
        store.dispatch({
            previewImage: [],
            previewVisible: false,
            type: 'PICPREVIEW'
        })
    }
    //图片预览
    handlePicPreview = (file) => {
        store.dispatch({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
            type: 'PICPREVIEW'
        })
    }
    //图片上传更改
    handlePicChange = ({ fileList }) => {
        console.log(fileList)
        store.dispatch({
            value: fileList,
            type: 'FILELIST'
        })
        var index = fileList.length;
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                // console.log(fileList[index-1].response.result)
                store.dispatch({ value: fileList[index - 1].response.result, type: 'IMAGESID' })
            }
        }
    }
    // 编辑页面底部增加  
    handleAdd = () => {
        var RuleList = store.getState().Data.RuleList;
        console.log(store.getState())
        const newData = {
            InnerID: Math.random(0, 1),
            ReturnCode: '',
            MessageName: '',
            DiffCoeff: '',
        };
        store.dispatch({ RuleList: newData, type: 'ADD_DATA' });
    }
    //编辑页面底部删除
    onEditDelete = (index) => {
        store.dispatch({ index: index, type: 'DATASOURSE' });
    }
    render() {
        const columns = this.columns;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        return (
            <div className="content">
                <GameManageForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={store.getState().Visible}
                    showModal={this.showModal}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    handleAdd={this.handleAdd}
                    handlePicPreview={this.handlePicPreview}
                    handlePicChange={this.handlePicChange}
                    picModalCancel={this.picModalCancel}
                    onEditDelete={this.onEditDelete}
                />
                <Button className="editable-add-btn f_right" onClick={this.showModal}>Add</Button>
                <Table className="clearfix" rowSelection={rowSelection} rowKey={record => record.InnerID} pagination={false} dataSource={store.getState().DataAll} columns={columns} />
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <GameList></GameList>, document.getElementById('reactwrapper'));
}
render();
store.subscribe(render);