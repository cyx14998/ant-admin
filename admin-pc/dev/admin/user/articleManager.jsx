import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './articleManager.less';
import $db from '../../common/dal.js';
import store from '../../models/articleManager';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const { TextArea } = Input;

//添加与编辑页面Modal
class ArticleManagerForm extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        const { visible, onCancel, onCreate, handleSubmit, form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
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
                                <Row className="picRow">
                                    <Col span={24}>
                                        <FormItem {...formItemLayout} label="封面图片">
                                            <div className="topRight">
                                                <Upload
                                                    action={$db.uploadProImg}
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
                                        </FormItem>
                                    </Col>
                                </Row>
                                <div className="infoTitle"><i></i>基本信息</div>
                                <Row className="clearfix">
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="关键字">
                                            {getFieldDecorator('KeyWord', {
                                                initialValue: store.getState().Data.KeyWord,
                                                rules: [
                                                    { required: true, message: '请输入关键字!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="链接">
                                            {getFieldDecorator('Url', {
                                                initialValue: store.getState().Data.Url,
                                                rules: [{ required: true, message: 'Please input your Url!' },
                                                { pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, message: '请输入正确的链接!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="标题">
                                            {getFieldDecorator('Title', {
                                                initialValue: store.getState().Data.Title,
                                                rules: [
                                                    { required: true, message: '请输入标题!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="内容">
                                            {getFieldDecorator('Contents', {
                                                initialValue: store.getState().Data.Contents,
                                                rules: [{ required: true, message: '请输入内容' }],
                                            })(
                                                <TextArea autosize={{ minRows: 2, maxRows: 8 }} />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="排序">
                                            {getFieldDecorator('OrderNum', {
                                                initialValue: store.getState().Data.OrderNum ? store.getState().Data.OrderNum : 1,
                                                rules: [{ required: true, message: 'Please input your OrderNum!' },
                                                { pattern: /^[0-9]*$/, message: '请输入数字!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="备注">
                                            {getFieldDecorator('Remark', {
                                                initialValue: store.getState().Data.Remark,
                                                rules: [{ required: false, message: 'Please input your Remark!' }],
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
const EnhancedForm = Form.create()(ArticleManagerForm);
//列表页面
class ArticleManager extends React.Component {
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
            keyWord: store.getState().keyWord,
            pageIndex: store.getState().pageNumber,
        }
        $db.getArticlesView(data1, function (results) {
            if(results && results.code && results.code == 1){
                var result = results.result;
                result.map((item, index) => {
                    var tmplId = item.ImageID;
                    item.ImageID = $db.imgUrl + item.ImageID;
                    item.tmplId = tmplId;
                })
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
        store.dispatch({ value: value, type: 'KEYWORD' });
        const data1 = {
            keyWord: value,
        }
        $db.getArticlesView(data1, function (results) {
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
        const data1 = store.getState().DataAll[index].InnerID;

        $db.delArticlesByID(data1, function (result) {
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
            tmplId: data.tmplId,
            imgUrl: data.ImageID,
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
                formData.ImageID = store.getState().Data.tmplId;
                formData.InnerID = store.getState().InnerID;

                $db.saveArticles(formData, function (result) {
                    if (result.code == 1) {
                        message.info('提交成功');
                        store.dispatch({ value: true, type: 'VISIBLE' });
                        //确定时清空数据
                        form.resetFields();
                        store.dispatch({ type: 'EMPTYDATA' });
                        window.location.href = "/admin/ArticleManager";
                    } else {
                        message.info("修改失败")
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
        store.dispatch({
            value: fileList,
            type: 'FILELIST'
        })
        var index = fileList.length;
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                // console.log(fileList[index - 1].response);
                // console.log(fileList[index - 1].response.result)
                store.dispatch({ value: fileList[index - 1].response.result, type: 'IMAGEID' })
            }
        }
    }
    render() {
        const columns = [
            {
                title: '关键字',
                dataIndex: 'KeyWord',
                key: 'KeyWord',
            }, {
                title: '标题',
                dataIndex: 'Title',
                key: 'Title',
            }, {
                title: '内容',
                className: 'article-content',
                dataIndex: 'Contents',
                key: 'Contents',
            }, {
                title: '图片',
                dataIndex: 'ImageID',
                key: 'ImageID',
                render: (text, index) => <img className="img" src={text} />
            }, {
                title: '状态',
                dataIndex: 'StatusCode',
                key: 'StatusCode'
            },{
                title: '查看次数(次)',
                dataIndex: 'Hits',
                key: 'Hits'
            }, {
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
        <ArticleManager></ArticleManager>, document.getElementById('articleManagerreactwrapper'));
}
render();
store.subscribe(render);