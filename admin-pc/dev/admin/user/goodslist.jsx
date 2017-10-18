import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './goodslist.less';
import $db from '../../common/dal.js';
import store from '../../models/goodslist';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

//添加与编辑页面Modal
class Goods extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
                                        <FormItem {...formItemLayout} label="商品图片">
                                            {getFieldDecorator('pic')(
                                                <div className="topRight">
                                                    <Upload
                                                        action={$db.uploadProImg}
                                                        listType="picture-card"
                                                        fileList={store.getState().fileList}
                                                        beforeUpload={this.props.beforeUpload}
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
                                        <FormItem {...formItemLayout} label="关键字">
                                            {getFieldDecorator('KeyWord', {
                                                initialValue: store.getState().Data.KeyWord,
                                                rules: [
                                                    { required: true, message: 'Please input your KeyWord!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="商品名称">
                                            {getFieldDecorator('ProName', {
                                                initialValue: store.getState().Data.ProName,
                                                rules: [
                                                    { required: true, message: 'Please input your ProName!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="商品类别">
                                            {getFieldDecorator('ProType', {
                                                initialValue: store.getState().Data.ProType ? store.getState().Data.ProType : '0',
                                                rules: [{ required: true, message: 'Please input your ProType!' }],
                                            })(
                                                <Select >
                                                    <Option value="0">水果类</Option>
                                                    <Option value="1">蔬菜类</Option>
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="商品摘要">
                                            {getFieldDecorator('Summary', {
                                                initialValue: store.getState().Data.Summary,
                                                rules: [{ required: true, message: 'Please input your Summary!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="商品简介">
                                            {getFieldDecorator('Introduction', {
                                                initialValue: store.getState().Data.Introduction,
                                                rules: [{ required: true, message: 'Please input your Introduction!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="规格型号">
                                            {getFieldDecorator('VersionInfo', {
                                                initialValue: store.getState().Data.VersionInfo,
                                                rules: [{ required: true, message: 'Please input your VersionInfo!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="价格信息">
                                            {getFieldDecorator('Price', {
                                                initialValue: store.getState().Data.Price,
                                                rules: [{ required: true, message: 'Please input your Price!' },
                                                { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入正确的价格信息!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="排序">
                                            {getFieldDecorator('OrderNum', {
                                                initialValue: store.getState().Data.OrderNum,
                                                rules: [{ required: true, message: 'Please input your OrderNum!' },
                                                { pattern: /^[0-9]*$/, message: '请输入数字!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="标签">
                                            {getFieldDecorator('Tags', {
                                                initialValue: store.getState().Data.Tags,
                                                rules: [{ required: true, message: 'Please input your Tags!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="备注详情">
                                            {getFieldDecorator('Remark', {
                                                initialValue: store.getState().Data.Remark,
                                                rules: [{ required: true, message: 'Please input your Remark!' }],
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
const GoodsForm = Form.create()(Goods);
//列表页面
class GoodsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentWillMount() {
        this.handleSearch(1);
    }
    //页面初始化【页码搜索】
    handleSearch(pageNumber) {
        if (pageNumber == 1) {
            store.dispatch({ value: 1, type: 'PAGENUMBER' })
        }
        this.setState({ loading: true, });
        var data1 = {
            keyWord: store.getState().keyWord,
            pageIndex: store.getState().pageNumber,
        }
        //页码获取列表数据
        $db.getproductview(data1, function (results) {
            console.log(results)
            var result = results.result;
            result.map((item, index) => {
                var data1 = item.ProPic;
                item.ProPic = $db.imgUrl + item.ProPic;
            })
            store.dispatch({
                count: results.count,
                value: result,
                type: 'DATAALL'
            });
            this.setState({ loading: false });
        }.bind(this));
    }
    //头部【关键字搜索】
    headSearch = (value) => {
        store.dispatch({ value: value, type: 'KEYWORD' });
        const data1 = {
            keyWord: value,
        }
        $db.PostProductQuery(data1, function (results) {
            console.log(results)
            var result = results.result;
            // console.log(Math.ceil(result.length/10))
            store.dispatch({
                count: results.count,
                value: result,
                type: 'DATAALL'
            });
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
        console.log(data1)
        $db.deleteGoods(data1, function (result) {
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
        this.handleSearch(pageNumber);
    }
    //编辑弹出Modal
    editModal = (index) => {
        console.log(index);
        var self = this;
        var data1 = index.InnerID;
        store.dispatch({ value: data1, type: 'INNERID' });

        console.log(data1)
        $db.getproductbyid(data1, function (result) {
            console.log(result);
            if (result.code == 1) {
                store.dispatch({ value: true, type: 'VISIBLE' });
                var tmplId = result.result.ProPic;
                result.result.ImagesID = $db.imgUrl + tmplId;
                store.dispatch({
                    tmplId: tmplId,
                    imgUrl: result.result.ImagesID,
                    value: result.result,
                    type: 'EDIT_DATA'
                });
            } else {
                message.info("详情页数据错误")
            }
        });
    }
    //Modal取消
    handleCancel = (e) => {
        // console.log(e);
        const form = this.form;
        form.resetFields();
        store.dispatch({ type: 'EMPTYDATA' });
    }
    //modal确定
    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                const formData = form.getFieldsValue();
                formData.ProPic = store.getState().Data.tmplId;
                formData.InnerID = store.getState().InnerID;
                console.log(formData);

                $db.goods(formData, function (result) {
                    // console.log(result)
                    if (result.code == 1) {
                        message.info('提交成功');
                        store.dispatch({ value: true, type: 'VISIBLE' });
                        //确定时清空数据
                        form.resetFields();
                        store.dispatch({ type: 'EMPTYDATA' });
                        window.location.href = "/admin/goodslist";
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
    beforeUpload = () => {
        console.log(1);
    }
    //图片上传更改
    handlePicChange = ({ fileList }) => {
        // console.log(fileList)
        store.dispatch({
            value: fileList,
            type: 'FILELIST'
        })
        var index = fileList.length;
        // console.log(index);
        // console.log(fileList[index - 1]);
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                // console.log(fileList[index - 1].response);
                console.log(fileList[index - 1].response.result);
                store.dispatch({ value: fileList[index - 1].response.result, type: 'PROPIC' })
            }
        }
    }
    render() {
        const columns = [{
            title: '关键字',
            dataIndex: 'KeyWord',
            key: 'KeyWord',
        }, {
            title: '产品名称',
            dataIndex: 'ProName',
            key: 'ProName',
        }, {
            title: '价格信息',
            dataIndex: 'Price',
            key: 'Price',
        }, {
            title: '商品图片',
            dataIndex: 'ProPic',
            key: 'ProPic',
            render: (text, index) => <img className="img" src={text} />
        }, {
            title: '编辑',
            key: 'action',
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
                    <GoodsForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={store.getState().Visible}
                        startTime={this.startTime}
                        showModal={this.showModal}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        beforeUpload={this.beforeUpload}
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
        <GoodsList></GoodsList>, document.getElementById('goodsreactwrapper'));
}
render();
store.subscribe(render);