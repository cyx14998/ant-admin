import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './exchange.less';
import $db from '../../common/dal.js';
import store from '../../models/exchange';

import { Input, Table, Button, Popconfirm, Row, Col, Icon, Select, Form, message, Pagination, DatePicker, TimePicker, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
//添加与编辑页面弹窗
class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    //优惠券类型选择OrderAmount Discount Price
    handleTicketType = (value) => {
        console.log(value)
        this.props.form.setFieldsValue({
            Discount: `${value == 0 ? '满减类无需设置折扣' : ''}`,
            Price: `${value == 1 ? '折扣类无需设置优惠额' : ''}`,
            OrderAmount: `${value == 1 ? '折扣类无需设置满减条件' : ''}`,
        });
        store.dispatch({ value: value, type: 'COUPONTYPE' });
    }
    componentDidMount() {
    }
    //时间选择
    startDate(date, dateString) {
        // console.log(date, dateString);
        store.dispatch({ value: dateString, type: 'STARTDATE' })
    }
    endDate(date, dateString) {
        // console.log(date, dateString);
        store.dispatch({ value: dateString, type: 'ENDDATE' })
    }
    startTime(time, timeString) {
        // console.log( timeString);
        store.dispatch({ value: timeString, type: 'STARTT' })
    }
    endTime(time, timeString) {
        // console.log( timeString);
        store.dispatch({ value: timeString, type: 'ENDT' })
    }
    // 配置提交
    handleSubmit = (e) => {
        // console.log(e)
        e.preventDefault();
        var Data = store.getState().Data;
        const formData = this.props.form.getFieldsValue();

        if (Data.StartDate != null && Data.StartT != null && Data.StartDate != '' && Data.StartT != '') {
            var start = Data.StartDate + ' ' + Data.StartT;
            store.dispatch({ value: start, type: 'STARTTIME' })
        }
        if (Data.EndDate != null && Data.EndT != null && Data.EndDate != '' && Data.EndT != '') {
            var end = Data.EndDate + ' ' + Data.EndT;
            store.dispatch({ value: end, type: 'ENDTIME' })
        }
        if (Data.StartDate != null && Data.StartT != null && Data.StartDate != '' && Data.StartT != '' && Data.EndDate != null && Data.EndT != null && Data.EndDate != '' && Data.EndT != '') {
            var reg = /^\s*|\s*$/g;
            var t1 = store.getState().Data.StartTime.replace(reg, "");
            var t2 = store.getState().Data.EndTime.replace(reg, "");
            reg = /^(\d+)\-(\d+)\-(\d+)\s+(\d+)\:(\d+)\:(\d*)$/;

            var d1 = new Date(t1.replace(reg, "$1"), parseInt(t1.replace(reg, "$2")) - 1, t1.replace(reg, "$3"));
            d1.setHours(t1.replace(reg, "$4"), t1.replace(reg, "$5"), t1.replace(reg, "$6"));
            var d2 = new Date(t2.replace(reg, "$1"), parseInt(t2.replace(reg, "$2")) - 1, t2.replace(reg, "$3"));
            d2.setHours(t2.replace(reg, "$4"), t2.replace(reg, "$5"), t2.replace(reg, "$6"));
            if (d1 >= d2) {
                message.info("活动起止日期设置错误")
            } else {
                this.props.form.validateFields((err, values) => {
                    if (!err) {
                        const formData = this.props.form.getFieldsValue();
                        formData.CouponId = store.getState().CouponId;

                        formData.StartTime = store.getState().Data.StartTime;
                        formData.EndTime = store.getState().Data.EndTime;

                        if (formData.CouponType == 0) {
                            delete formData.Discount;
                        } else if (formData.CouponType == 1) {
                            delete formData.Price;
                            delete formData.OrderAmount;
                        }
                        console.log(formData)

                        $db.AddCoupon(formData, function (result) {
                            // console.log(result);
                            if (result.code == 1) {
                                store.dispatch({ value: false, type: 'VISIBLE' });
                                window.location.href = "/admin/exchange";
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

        } else if (formData.Prompt != null && Data.Prompt != '') {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    formData.CouponId = store.getState().CouponId;

                    if (formData.CouponType == 0) {
                        delete formData.Discount;
                    } else if (formData.CouponType == 1) {
                        delete formData.Price;
                        delete formData.OrderAmount;
                    }
                    console.log(formData)

                    $db.AddCoupon(formData, function (result) {
                        // console.log(result);
                        if (result.code == 1) {
                            store.dispatch({ value: false, type: 'VISIBLE' });
                            window.location.href = "/admin/exchange";
                        } else {
                            message.info("提交失败")
                        }
                    });
                }
            })
        } else {
            message.info("优惠时间设置不完整")
        }
    }

    render() {
        const columns = this.columns;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <div className="content" >
                <Form onSubmit={this.handleSubmit}>
                    <div className="top">
                        <div className="topLeft">
                            <div className="infoTitle"><i></i>基本信息</div>
                            <Row className="clearfix">
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="名称">
                                        {getFieldDecorator('CouponName', {
                                            initialValue: store.getState().Data.CouponName,
                                            rules: [
                                                { required: true, message: 'Please input your CouponName!' },
                                            ],
                                        })(
                                            <Input className="disabled" size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="所需积分">
                                        {getFieldDecorator('NeedIntegral', {
                                            initialValue: store.getState().Data.NeedIntegral,
                                            rules: [{ required: true, message: 'Please input your NeedIntegral!' },
                                            { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="优惠券类型">
                                        {getFieldDecorator('CouponType', {
                                            initialValue: store.getState().Data.CouponType ? store.getState().Data.CouponType : '0',
                                            rules: [{ required: true, message: 'Please input your CouponType!' }],
                                        })(
                                            <Select size="small" onChange={this.handleTicketType}>
                                                <Option value="0">满减类</Option>
                                                <Option value="1">折扣类</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="折扣">
                                        {getFieldDecorator('Discount', {
                                            initialValue: store.getState().Data.CouponType ? store.getState().Data.Discount : '折扣类无需设置优惠额',
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="优惠">
                                        {getFieldDecorator('Price', {
                                            initialValue: store.getState().Data.Price,
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="满减条件">
                                        {getFieldDecorator('OrderAmount', {
                                            initialValue: store.getState().Data.OrderAmount,
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="限时时间">
                                        {getFieldDecorator('Prompt', {
                                            initialValue: store.getState().Data.Prompt,
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="备注">
                                        {getFieldDecorator('CodeNotes', {
                                            initialValue: store.getState().Data.CodeNotes,
                                            rules: [{ required: true, message: 'Please input your CodeNotes!' },
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="起始时间">
                                        {/* {getFieldDecorator('StartTime', {
                                            initialValue: store.getState().Data.StartTime,
                                            rules: [{ required: true, message: 'Please input your StartTime!' },
                                            ],
                                        })( */}
                                        <div><DatePicker onChange={this.startDate} /><TimePicker onChange={this.startTime} /></div>
                                        {/* )} */}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="截止时间">
                                        {/* {getFieldDecorator('EndTime', {
                                            initialValue: store.getState().Data.EndTime,
                                            rules: [{ required: true, message: 'Please input your EndTime!' },
                                            ],
                                        })( */}
                                        <div><DatePicker onChange={this.endDate} /><TimePicker onChange={this.endTime} /></div>
                                        {/* )} */}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="发行张数">
                                        {getFieldDecorator('Num', {
                                            initialValue: store.getState().Data.Num,
                                            rules: [{ required: true, message: 'Please input your NeedIntegral!' },
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="个人最大张数">
                                        {getFieldDecorator('PerMax', {
                                            initialValue: store.getState().Data.PerMax,
                                            rules: [{ required: true, message: 'Please input your PerMax!' },
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
                        <Button className="submit" type="primary" htmlType="submit" >提交</Button>
                    </div>
                </Form>
            </div >
        );
    }
}
const TicketForm = Form.create()(Ticket);
//列表页面
class Exchange extends React.Component {
    constructor(props) {
        super(props);
        //列表底部表格头部
        this.columns = [{
            title: '优惠券名称',
            dataIndex: 'CouponName',
        }, {
            title: '所需积分',
            dataIndex: 'NeedIntegral',
        }, {
            title: '券类型',
            dataIndex: 'CouponType',
            render: (text, index) => index.CouponType ? <p>折扣类</p> : <p>满减类</p>
        }, {
            title: '券值',
            dataIndex: 'Discount',
            width: '8%',
            render: (text, index) => index.CouponType ? <div><span>优惠券打</span>{index.Discount}<span>折</span></div> : <div><span>满</span>{index.OrderAmount}<span>减</span>{index.Price}</div>
        },
        {
            title: '限时时间',
            dataIndex: 'Prompt',
        }, {
            title: '起始时间',
            dataIndex: 'StartTime',
        }, {
            title: '截止时间',
            dataIndex: 'EndTime',
        }, {
            title: '发放数量',
            dataIndex: 'Num',
            width: '6%',
        }, {
            title: '个人最大数量',
            dataIndex: 'PerMax',
            width: '6%',
        }, {
            title: '备注',
            dataIndex: 'CodeNotes',
        },
        {
            title: '编辑',
            key: 'edit',
            render: (text, index) => <div>
                {/* <Button type="primary" onClick={this.showModal.bind(this, index)}>编辑</Button> */}
                <Modal className="modal"
                    title="优惠券配置"
                    visible={store.getState().Visible}
                    onCancel={this.handleCancel.bind(this)}
                    width='70%'
                >
                    <TicketForm index={index} />
                </Modal>
            </div>
        },
            //  {
            //             title: '删除',
            //             dataIndex: 'operation',
            //             width: '6%',
            //             render: (text, record, index) => {
            //                 return (
            //                     store.getState().DataAll.length > 1 ?
            //                         (
            //                             <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
            //                                 <a className="delete" href="#">Delete</a>
            //                             </Popconfirm>
            //                         ) : null
            //                 );
            //             },
            //         }
        ];

        this.state = {
        };
    }
    componentWillMount() {
        this.handleSearch(1);
    }
    //列表页面初始化页码搜索
    handleSearch(pageNumber) {
        if (pageNumber == 1) {
            store.dispatch({ value: 1, type: 'PAGENUMBER' })
        }
        this.setState({ loading: true, });
        $db.GetAllCoupon(null, function (results) {
            console.log(results);
            if (results.code == 1) {
                var result = results.result;
                // console.log(result);
                result.map((item, index) => {
                    item.StartTime = JSON.parse(JSON.stringify(item.StartTime).replace(/T/, ' '));
                    item.EndTime = JSON.parse(JSON.stringify(item.EndTime).replace(/T/, ' '));
                })
                store.dispatch({
                    count: results.count,
                    value: result,
                    type: 'DATAALL'
                });
            }
            this.setState({ loading: false });
        }.bind(this));
    }
    //改变页码
    onChangeNum(pageNumber) {
        console.log(pageNumber)
        store.dispatch({ value: pageNumber, type: 'PAGENUMBER' })
        this.handleSearch(pageNumber);
    }

    //头部字段搜索
    // headSearch = (value) => {
    //     // 手机号 /^1[34578]\d{9}$/
    //     //订单编号 /^[A-Z]{2}[0-9]{22}$/
    //     var Phone = /^1[34578]\d{9}$/;
    //     var OrderID = /^[A-Z]{2}[0-9]{22}$/;
    //     if (Phone.test(value)) {
    //         const data1 = { Phone: value }
    //         store.dispatch({ value: data1, type: 'KEYWORD' });
    //     } else if (OrderID.test(value)) {
    //         const data1 = { OrderID: value }
    //         store.dispatch({ value: data1, type: 'KEYWORD' });
    //     } else if (value == '') {
    //         this.handleSearch(1);
    //     } else {
    //         const data1 = { Consignee: value }
    //         store.dispatch({ value: data1, type: 'KEYWORD' });
    //     }
    //     const data1 = store.getState().keyWord
    //     console.log(data1)
    // $db.GetAllOrder(data1, function (results) {
    //     console.log(results)
    //     var result = results.result;
    //     // console.log(result)
    //     store.dispatch({
    //         count: results.count,
    //         value: result,
    //         type: 'DATAALL'
    //     });
    // }.bind(this));
    // }
    // 增加弹窗  
    handleAdd = () => {
        var data = {};
        store.dispatch({ value: data, type: 'EDIT_DATA' });
        store.dispatch({ value: '', type: 'CouponId' });
        console.log(store.getState().CouponId);
        console.log(store.getState().Data);

        store.dispatch({ value: true, type: 'VISIBLE' });
    }
    // 列表删除
    onDelete = (index) => {
        // console.log(index);
        var data1 = {
            CouponId: store.getState().DataAll[index].CouponId
        };
        console.log(data1)
        $db.DeleteCouponInfo(data1, function (result) {
            console.log(result);
            //     console.log(result);
            //     if (result.code == 1) {
            store.dispatch({ index: index, type: 'DELETE' });
            //     } else {
            //         message.info("删除失败")
            //     }
        });
    }
    //编辑弹出Modal
    showModal = (index) => {
        console.log(index);
        var self = this;
        var data1 = index.CouponId;
        store.dispatch({ value: data1, type: 'COUPONID' });
        store.dispatch({ value: index, type: 'EDIT_DATA' });

        // console.log(store.getState().Data)
        // $db.GetOrderByID(data1, function (result) {
        //     // console.log(result);
        //     console.log(result);
        //     if (result.code == 1) {
        //         store.dispatch({ value: result.result, type: 'EDIT_DATA' });
        store.dispatch({ value: true, type: 'VISIBLE' });
        //     } else {
        //         message.info("数据获取失败")
        //     }
        // });
    }
    //Modal页面取消
    handleCancel = (e) => {
        // console.log(e);
        store.dispatch({ value: false, type: 'VISIBLE' });
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
                {/* <Search className="search"
                    placeholder="关键字搜索"
                    style={{ width: 300 }}
                    onSearch={this.headSearch.bind(this)}
                /> */}
                <div className="bottom">
                    <div className="table">
                        <Button className="editable-add-btn f_right" onClick={this.handleAdd}>Add</Button>
                        <Table className="clearfix" rowSelection={rowSelection} rowKey="CouponId" pagination={false} dataSource={store.getState().DataAll} columns={columns} />
                    </div>
                </div>
                <Pagination showQuickJumper defaultCurrent={1} total={store.getState().count} onChange={this.onChangeNum.bind(this)} />
            </div >
            // current={store.getState().pageNumber}
        );
    }
}

const render = () => {
    ReactDOM.render(
        <Exchange></Exchange>, document.getElementById('goodsreactwrapper'));
}
render();
store.subscribe(render);