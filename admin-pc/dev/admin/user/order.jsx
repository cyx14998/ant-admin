import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './order.less';
import $db from '../../common/dal.js';
import store from '../../models/order';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, message, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

//编辑页面
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    //快递单号添加Modal
    handleCarriage = () => {
        store.dispatch({ value: true, type: 'EXPRESSVISIBLE' });
        store.dispatch({ value: store.getState().Data.expressNum ? store.getState().Data.expressNum: '', type: 'EXPRESSNUM' });
    }
    //快递单号Modal确定    
    ExpressOk = (e) => {
        const expressNum = store.getState().Data.expressNum;
        console.log(expressNum);
        if (expressNum != null && expressNum != "") {
            const data1 = {
                OrderID: store.getState().Data.OrderID,
                StatusCode: 3,
                expressNum: expressNum,
            }
            console.log(data1)
            $db.UpdateOrderStasus(data1, function (results) {
                console.log(results)
                if (results.code == 1) {
                    console.log("发货成功");
                    store.dispatch({ value: 3, type: 'EDITSTATUSCODE' });
                    store.dispatch({ value: false, type: 'EXPRESSVISIBLE' });
                }
            }.bind(this));
        } else {
            message.info("快递单号输入错误");
            store.dispatch({ value: false, type: 'EXPRESSVISIBLE' });
        }
        store.dispatch({value: '', type: 'EXPRESSNUM' });
    }
    //快递单号Modal取消
    ExpressCancel = (e) => {
        store.dispatch({ value: false, type: 'EXPRESSVISIBLE' });
        store.dispatch({value: '', empty: 1, type: 'EXPRESSNUM' });
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
        },
            // {
            //     title: '操作',
            //     key: 'action',
            //     render: (text, index) => <div>
            //         123
            //     </div>
            // },
        ];
        return (
            <div className="content">
                <div className="top">
                    <Row>
                        <Col span={8}>
                            <Col span={6}>订单号：</Col>
                            <Col span={16}>{store.getState().Data.OrderID}</Col>
                        </Col>
                        <Col span={6}>
                            <Col span={8}>收件人：</Col>
                            <Col span={14}>{store.getState().Data.Consignee}</Col>
                        </Col>
                        <Col span={6}>
                            <Col span={8}>手机号：</Col>
                            <Col span={14}>{store.getState().Data.Phone}</Col>
                        </Col>
                        <Col span={4}>
                            <Col span={8}>总价：</Col>
                            <Col span={14}>{store.getState().Data.RealTotalPrice}</Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Col span={4}>收件地址：</Col>
                            <Col span={20}>{store.getState().Data.Address}</Col>
                        </Col>
                        <Col span={12}>
                            <Col span={6}>快递单号：</Col>
                            <Col span={16}>{store.getState().Data.editStatusCode < 3 ? <Button onClick={this.handleCarriage}>发货</Button> : store.getState().Data.expressNum}</Col>
                        </Col>
                    </Row>
                </div>
                <Table
                    rowKey='ProductID'
                    columns={columns}
                    pagination={false}
                    dataSource={store.getState().Data.OrderInfo}
                />
                <Modal
                    title="快递编号"
                    visible={store.getState().Data.expressVisible}
                    onOk={this.ExpressOk.bind(this)}
                    onCancel={this.ExpressCancel.bind(this)}
                    width='30%'
                >
                    <Input value={store.getState().Data.expressNumText} onChange={e => store.dispatch({ value: e.target.value, type: 'EXPRESSNUM' })} />
                </Modal>
            </div>
        )
    }
}
const OrderForm = Form.create()(Order);

//列表页面
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
        $db.GetAllOrder(data1, function (results) {
            // console.log(results);
            var result = results.result;
            // console.log(result);
            store.dispatch({
                count: results.count,
                value: result,
                type: 'DATAALL'
            });
            this.setState({ loading: false });
        }.bind(this));
    }
    //改变页码
    onChangeNum(pageNumber) {
        console.log(pageNumber)
        store.dispatch({ value: pageNumber, type: 'PAGENUMBER' })
        this.handleSearch(pageNumber);
    }
    //点击查看弹出Modal
    showModal = (value, record, ) => {
        //整条数据  index   select的index
        // console.log(record);
        // var self = this;
        var data1 = value.OrderID;
        // console.log(store.getState().Data);
        console.log(data1)
        $db.GetOrderByID(data1, function (result) {
            // console.log(result);
            console.log(result);
            if (result.code == 1) {
                //获取数据，记录recode 
                //存入Data单条数据，单条数据的OrderID, 在列表中的索引record,(并设置Modal可见)
                store.dispatch({ value: result.result, OrderID: data1, record: record, type: 'EDIT_DATA' });
                store.dispatch({ value: result.result.StatusCode, type: 'EDITSTATUSCODE' });
                // console.log(store.getState().OrderID,'sss',store.getState().Data.record);
            } else {
                message.info("数据获取失败");
            }
        });
    }
    //编辑页面Modal确定    
    handleOk = (e) => {
        store.dispatch({ value: false, type: 'VISIBLE' });
        //发货标签+++快递单号
        // console.log(store.getState().headIndex, 'sss', store.getState().Data.expressNum);
        //为点击发货状态标签，设置默认为0全部
        if (store.getState().headIndex == undefined) {
            store.dispatch({ value: 0, type: 'HEADINDEX' });
        }
        console.log(store.getState().headIndex, 'sss', store.getState().Data.expressNum);
        if (store.getState().headIndex == 2 && store.getState().Data.expressNum != '' && store.getState().Data.expressNum != undefined) {
            // console.log('ssss', store.getState().Data.record);
            store.dispatch({ value: store.getState().Data.record, type: 'PUSH' });
        } else if (store.getState().headIndex == 0) {
            // console.log(store.getState().Data.record, store.getState().Data.editStatusCode);
            store.dispatch({ record: store.getState().Data.record, editStatusCode: store.getState().Data.editStatusCode, type: 'STATUSCODE' });
        } else {
            console.log(2);
        }
    }
    //编辑页面Modal取消
    handleCancel = (e) => {
        // console.log(e);
        store.dispatch({ value: false, type: 'VISIBLE' });
    }
    //头部字段搜索
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
        }
         // else if (value == ' ' || value == null || value == undefined) {
        //     store.dispatch({ value: '', type: 'KEYWORD' });            
        //     this.handleSearch(1);
        // }
         else {
            const data1 = { Consignee: value }
            store.dispatch({ value: data1, type: 'KEYWORD' });
        }
        const data1 = store.getState().keyWord;
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
    //发货状态搜索
    SearchCarriage = (e) => {
        if (e.target.value == 0) {
            this.handleSearch(1);
        } else {
            const data1 = {
                StatusCode: e.target.value
            };
            $db.GetAllOrder(data1, function (results) {
                // console.log(results);
                var result = results.result;
                // console.log(result);
                store.dispatch({
                    count: results.count,
                    value: result,
                    type: 'DATAALL'
                });
                this.setState({ loading: false });
            }.bind(this));
        }
        store.dispatch({ value: e.target.value, type: 'HEADINDEX' });
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
            title: '订单编号',
            dataIndex: 'OrderID',
            key: 'OrderID',
        }, {
            title: '收货地址',
            dataIndex: 'Address',
            key: 'Address',
        }, {
            title: '总价',
            dataIndex: 'RealTotalPrice',
            key: 'RealTotalPrice',
        },
        //  {
        //     title: '订单状态',
        //     key: 'StatusCode',
        //     render: (text, record, index) => <div>
        //         {/* <Select defaultValue={JSON.stringify(text.StatusCode)} style={{ width: 120 }} onChange={this.handleCarriage.bind(this, record, index)}>   */}
        //         {/* (0已取消1已支付2未支付3已发货4待发货5未评价6交易完成) */}
        //         <Select defaultValue={JSON.stringify(text.StatusCode)} style={{ width: 120 }}>
        //             <Option value="1" disabled>未支付</Option>
        //             <Option value="2" disabled>待发货</Option>
        //             <Option value="3" disabled>已发货</Option>
        //             <Option value="4" disabled>交易完成</Option>
        //         </Select>
        //     </div>
        // },
        {
            title: '订单状态',
            dataIndex: 'StatusText',
            key: 'StatusText',
        }, {
            title: '订单详情',
            key: 'Detail',
            render: (text, index, record) => <div>
                <Button type="primary" onClick={this.showModal.bind(this, index, record)}>详情</Button>
                <Modal className="modal"
                    title="订单详情"
                    visible={store.getState().Visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width='60%'
                >
                    <OrderForm index={index} />
                </Modal>
            </div>
        },
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
            <div className="content">
                <Search className="search"
                    placeholder="收件人/手机号/订单编号"
                    style={{ width: 300 }}
                    onSearch={this.headSearch.bind(this)}
                />
                <Radio.Group className="radio" onChange={this.SearchCarriage.bind(this)}>
                    <Radio.Button value="0">全部</Radio.Button>
                    {/* <Radio.Button value="4">待发货</Radio.Button>
                    <Radio.Button value="3">已发货</Radio.Button>
                    <Radio.Button value="6">交易完成</Radio.Button> */}
                    <Radio.Button value="2">待发货</Radio.Button>
                    <Radio.Button value="3">已发货</Radio.Button>
                    <Radio.Button value="4">交易完成</Radio.Button>
                </Radio.Group>
                <Table className="clearfix"
                    rowKey='OrderID'
                    columns={columns}
                    rowSelection={rowSelection}
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