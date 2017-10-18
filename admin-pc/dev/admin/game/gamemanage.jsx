import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './gamemanage.less';
import $db from '../../common/dal.js';
import store from '../../models/gamemanage';

import { Form, Input, Row, Col, Table, Button, Popconfirm, Upload, Icon, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
//图片验证
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJPG = file.type === ('image/jpeg') || ('image/png') || ('image/psd');
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
//游戏配置
class GameManage extends React.Component {
    constructor(props) {
        super(props);
        //底部表格
        this.columns = [{
            title: '等级编号',
            dataIndex: 'ReturnCode',
            width: '8%',
            render: (text, index) => <Input onChange={e => { if ((/^[0-9]*$/).test(e.target.value)) { store.dispatch({ value: e.target.value, index: index.key, type: 'RETURNCODE' }) } else { message.info("格式不正确，应为纯数字") } }} />
        }, {
            title: '等级名称',
            dataIndex: 'MessageName',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'MESSAGENAME' })} />
        }, {
            title: '难度系数',
            dataIndex: 'DiffCoeff',
            render: (text, index) => <Input onChange={e => { if ((/^(?:0|[1-9][0-9]?|100)$/).test(e.target.value)) { store.dispatch({ value: e.target.value, index: index.key, type: 'DIFFCOEFF' }) } else { message.info("应为0~100间数字") } }} />
        }, {
            title: '删除',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    store.getState().RuleList.length >= 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                <a className="delete" href="#">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
        };
    }
    // 底部删除
    onDelete = (index) => {
        store.dispatch({ index: index, type: 'DELETE' });
    }
    // 底部增加    
    handleAdd = () => {
        var RuleList = store.getState().RuleList;
        var count = store.getState().count;
        const newData = {
            key: count-1,
            ReturnCode: '',
            MessageName: '',
            DiffCoeff: '',
        };
        store.dispatch({
            RuleList: newData,
            type: 'ADD_DATA'
        });
    }
    //上传图片
    handleChange = (info) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            store.dispatch({ value: info.file.response.result, type: 'IMAGESID' })
        }
    }
    // 配置提交
    handleSubmit = (e) => {
        // console.log(e)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formData = this.props.form.getFieldsValue();
                formData.ImagesID = store.getState().ImagesID;
                formData.RuleList = store.getState().RuleList;
                delete formData.pic;
                $db.submitGame(formData, function (result) {
                    if (result == 1) {
                        // window.location.href = "/admin/gamelist";
                    } else {
                        message.info("提交失败")
                    }
                });
            } else {
                console.log('Received values of form: ', values);
                return false;
            }
        });
    }

    render() {
        const columns = this.columns;
        const imageUrl = this.state.imageUrl;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <div className="content">
                <Form onSubmit={this.handleSubmit}>
                    <div className="top">
                        <div className="topLeft">
                            <Row className="picRow">
                                <Col span={24} >
                                    <FormItem {...formItemLayout} label="游戏图片">
                                        {getFieldDecorator('pic', {
                                            rules: [{ required: true, message: 'Please input your GameCode!' },]
                                        })(
                                            <Upload
                                                className="avatar-uploader"
                                                name="avatar"
                                                showUploadList={false}
                                                action={$db.baseUrl + "/emapi/emfiles/PostGameImg"}
                                                beforeUpload={this.beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                {
                                                    imageUrl ?
                                                        <img src={imageUrl} alt="" className="avatar" /> :
                                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                                }
                                            </Upload>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className="infoTitle"><i></i>基本信息</div>
                            <Row className="clearfix">
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="编号">
                                        {getFieldDecorator('GameCode', {
                                            initialValue: store.getState().GameCode,
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="名称">
                                        {getFieldDecorator('GameName', {
                                            initialValue: store.getState().GameName,
                                            rules: [
                                                { required: true, message: 'Please input your GameName!' },
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="类型">
                                        {getFieldDecorator('GameType', {
                                            initialValue: JSON.stringify(store.getState().GameType),
                                            rules: [{ required: true, message: 'Please input your GameType!' }],
                                        })(
                                            <Select onChange={value => store.dispatch({ value: value, type: 'GAMETYPE' })} size="small">
                                                <Option value="0">运气类</Option>
                                                <Option value="1">跑酷类</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="路径">
                                        {getFieldDecorator('GameUrl', {
                                            initialValue: store.getState().GameUrl,
                                            rules: [{ required: true, message: 'Please input your GameUrl!' },
                                            { pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, message: '格式不正确' }],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="接口">
                                        {getFieldDecorator('ApiUrl', {
                                            initialValue: store.getState().ApiUrl,
                                            rules: [{ required: true, message: 'Please input your ApiUrl!' },
                                            { pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, message: '格式不正确' }],
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
                            <Table pagination={false} dataSource={store.getState().RuleList} columns={columns} />
                            <Button className="editable-add-btn f_right" onClick={this.handleAdd}>Add</Button>
                        </div>
                        <div className="clearfix"></div>
                        <Button className="submit " type="primary" htmlType="submit" >提交</Button>
                    </div>
                </Form>
            </div >
        );
    }
}
const GameManageForm = Form.create()(GameManage);

const render = () => {
    ReactDOM.render(
        <GameManageForm></GameManageForm>, document.getElementById('reactwrapper'));
}
render();
store.subscribe(render);