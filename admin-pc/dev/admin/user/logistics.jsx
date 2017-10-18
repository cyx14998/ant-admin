import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './logistics.less';
import $db from '../../common/dal.js';
import store from '../../models/logistics';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, message, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

//修改订单子模块
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    //订单编辑保存
    handleSubmit = (e) => {
        //  console.log(e)
        e.preventDefault();

        // this.props.form.validateFields((err, fieldsValue) => {
        //     if (err) {
        //         return;
        //     }
        // });
        const formData = this.props.form.getFieldsValue();
        formData.OrderID = store.getState().OrderID;
        console.log(formData);

        $db.SaveOrder(formData, function (result) {
            console.log(result)
            if (result.code == 1) {
                store.dispatch({ value: true, type: 'VISIBLE' });
                // window.location.href = "/admin/order";
            } else {
                message.info("修改失败")
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const imageUrl = this.state.imageUrl;

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const columns = [{
            title: '商品名称',
            dataIndex: 'ProductName',
            key: 'ProductName',
        }, {
            title: '商品价格',
            dataIndex: 'SalePrice',
            key: 'SalePrice',
        }, {
            title: '商品数量',
            dataIndex: 'Quantity',
            key: 'Quantity',
        }, {
            title: '操作',
            key: 'action',
            render: (text, index) => <div>
                123
            </div>
        },
        ];
        return (
            <div className="content">
                <div className="top">
                    <Form onSubmit={this.handleSubmit} >
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="订单号">
                                    {getFieldDecorator('OrderID', {
                                        initialValue: store.getState().Data.OrderID,
                                        rules: [{ required: true, message: 'Please input your OrderID!' }],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="收件人">
                                    {getFieldDecorator('Consignee', {
                                        initialValue: store.getState().Data.Consignee,
                                        rules: [{ required: true, message: 'Please input your Consignee!' }],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="手机号">
                                    {getFieldDecorator('Phone', {
                                        initialValue: store.getState().Data.Phone,
                                        rules: [{ required: true, message: 'Please input your Phone!' }],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="收件地址">
                                    {getFieldDecorator('address', {
                                        initialValue: store.getState().Data.address,
                                        rules: [{ required: true, message: 'Please input your address!' }],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="总价">
                                    {getFieldDecorator('RealTotalPrice', {
                                        initialValue: store.getState().Data.RealTotalPrice,
                                        rules: [{ required: true, message: 'Please input your RealTotalPrice!' }],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Table
                            rowKey='ProductID'
                            columns={columns}
                            pagination={false}
                            dataSource={store.getState().Data.Pro}
                        />
                        <Button className="submit" type="primary" htmlType="submit">保存</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
const OrderForm = Form.create()(Order);

//订单列表主模块
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentWillMount() {
        this.handleSearch(1);
    }
    //页面初始化页码搜索
    handleSearch(pageNumber) {
        if (pageNumber == 1) {
            store.dispatch({ value: 1, type: 'PAGENUMBER' })
        }
        this.setState({ loading: true, });
        var data1 = {
            UserID: '',
            // StatusCode: store.getState().StatusCode,
            pageIndex: store.getState().pageNumber,
        }
        console.log(data1)
        // $db.GetAllOrder(data1, function (results) {
        //     console.log(results);
        //     var result = results.result;
        //     console.log(result);
        //     store.dispatch({
        //         count: results.count,
        //         value: result,
        //         type: 'DATAALL'
        //     });
        this.setState({ loading: false });
        // }.bind(this));
    }
    //改变页码
    onChangeNum(pageNumber) {
        console.log(pageNumber)
        store.dispatch({ value: pageNumber, type: 'PAGENUMBER' })
        this.handleSearch(pageNumber);
    }
    //点击查看弹出Modal
    showModal = (index) => {
        // console.log(index);
        // var self = this;
        // var data1 = index.OrderID;
        // store.dispatch({ value: data1, type: 'ORDERID' });

        // console.log(data1)
        // $db.GetOrderByID(data1, function (result) {
        //     console.log(result);
        //     var result = JSON.parse(result);
        //     if (result.code == 1) {
        //         store.dispatch({ value: result.result, type: 'EDIT_DATA' });                
        store.dispatch({ value: true, type: 'VISIBLE' });
        //     }else {
        //         message.info("数据获取失败")
        //     }
        // });
    }

    //Modal页面点击取消
    handleCancel = (e) => {
        // console.log(e);
        store.dispatch({ value: false, type: 'VISIBLE' });
    }
    //物流状态更改
    handleCarriage = (value, record, index) => {
        //整条数据  index   select的index
        // console.log(`selected ${value}`);
        const data1 = {
            OrderID: value.OrderID,
            StatusCode: index,
        }
        console.log(data1)
        $db.UpdateOrderStasus(data1, function (results) {
            console.log(results)
            if (results.code == 1) {
                console.log("更改成功");
                store.dispatch({ value: record, type: 'PUSH' });
            }
        }.bind(this));

    }
    //头部关键字搜索
    headSearch = (value) => {
        // 手机号 /^1[34578]\d{9}$/
        //订单编号 /^[A-Z]{2}[0-9]{22}$/
        var Phone = /^1[34578]\d{9}$/;
        var OrderID = /^[A-Z]{2}[0-9]{22}$/;
        if (Phone.test(value)) {
            const data1 = { Phone: value }
            store.dispatch({ value: data1, type: 'KEYWORD' });
        } else if (OrderID.test(value)) {
            const data1 = { OrderID: value }
            store.dispatch({ value: data1, type: 'KEYWORD' });
        } else if (value == '') {
            this.handleSearch(1);
        } else {
            const data1 = { Consignee: value }
            store.dispatch({ value: data1, type: 'KEYWORD' });
        }
        const data1 = store.getState().keyWord
        console.log(data1)
        $db.GetAllOrder(data1, function (results) {
            console.log(results)
            var result = results.result;
            // console.log(result)
            store.dispatch({
                count: results.count,
                value: result,
                type: 'DATAALL'
            });
        }.bind(this));
    }
    //物流状态搜索
    SearchCarriage = (e) => {
        console.log(e.target.value)
        store.dispatch({ value: e.target.value, type: 'STATUSCODE' });
        const data1 = {
            Carriage: e.target.value
        };
        // $db.GetAllOrder(data1, function (results) {
        //     // console.log(results);
        //     var result = results.result;
        //     // console.log(result);
        //     store.dispatch({
        //         count: results.count,
        //         value: result,
        //         type: 'DATAALL'
        //     });
        this.setState({ loading: false });
        // }.bind(this));
    }
    render() {
        const columns = [{
            title: '收件人',
            dataIndex: 'Consignee',
            key: 'Consignee',
        }, {
            title: '手机号',
            dataIndex: 'Phone',
            key: 'Phone',
        }, {
            title: '收货地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '订单编号',
            dataIndex: 'OrderID',
            key: 'OrderID',
        }, {
            title: '快递编号',
            dataIndex: 'expressNum',
            key: 'expressNum',
        }, {
            title: '物流状态',
            key: 'StatusCode',
            render: (text, index) => <div>
                <Select defaultValue={JSON.stringify(text.StatusCode)} style={{ width: 120 }} onChange={this.handleCarriage.bind(this)}>
                    <Option value="0" disabled>运输中</Option>
                    <Option value="1" disabled>交易完成</Option>
                </Select>
            </div>
        }, {
            title: '订单详情',
            key: 'Detail',
            render: (text, index) => <div>
                <Button type="primary" onClick={this.showModal.bind(this, index)}>编辑</Button>
                <Modal className="modal"
                    title="订单详情"
                    visible={store.getState().Visible}
                    onCancel={this.handleCancel.bind(this)}
                    width='70%'
                >
                    <OrderForm index={index} />
                </Modal>
            </div>
        },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return (
            <div>
                <Search className="search"
                    placeholder="关键字搜索"
                    style={{ width: 300 }}
                    onSearch={this.headSearch.bind(this)}
                />
                <Radio.Group className="radio clearfix" onChange={this.SearchCarriage.bind(this)}>
                    <Radio.Button value="4">运输中</Radio.Button>
                    <Radio.Button value="2">已完成</Radio.Button>
                </Radio.Group>
                <Table className="clearfix"
                    rowKey='OrderID'
                    columns={columns}
                    rowSelection={ rowSelection }
                    dataSource={store.getState().DataAll}
                    pagination={false}
                    loading={this.state.loading}
                ></Table>
                <Pagination showQuickJumper defaultCurrent={1} current={store.getState().pageNumber} total={store.getState().count} onChange={this.onChangeNum.bind(this)} />
            </div >
        )
    }
}
const render = () => {
    ReactDOM.render(
        <App></App>, document.getElementById('goodsreactwrapper'));
}
render();
store.subscribe(render);