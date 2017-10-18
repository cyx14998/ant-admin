import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './exchangedetail.less';
import $db from '../../common/dal.js';
import store from '../../models/exchangedetail';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, message, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

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
        // var data1 = {
        //     UserID: '',
        //     // StatusCode: store.getState().StatusCode,
        //     pageIndex: store.getState().pageNumber,
        // }
        // console.log(data1)
        $db.GetAllCoupon(null, function (results) {
            console.log(results);
            // var result = results.result;
            // console.log(result);
            // store.dispatch({
            //     count: results.count,
            //     value: result,
            //     type: 'DATAALL'
            // });
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
    render() {
        const columns = [{
            title: '用户',
            dataIndex: 'exchanger',
            key: 'exchanger',
        }, {
            title: '积分',
            dataIndex: 'integral',
            key: 'integral',
        }, {
            title: '优惠券类型',
            dataIndex: 'ticketType',
            key: 'ticketType',
            render: (text, index) =>
                <Select size="small" defaultValue={JSON.stringify(text)}>
                    <Option value="0">满减类</Option>
                    <Option value="1">折扣类</Option>
                </Select>
        }, {
            title: '起始日期',
            dataIndex: 'startTime',
            key: 'startTime',
        }, {
            title: '截止日期',
            dataIndex: 'endTime',
            key: 'endTime',
        }, 
        // {
        //     title: '操作',
        //     key: 'action',
        //     render: (text, index) => <div>
        //         123
        //     </div>
        // },
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
                    placeholder="关键字搜索"
                    style={{ width: 300 }}
                    onSearch={this.headSearch.bind(this)}
                />
                {/* <Radio.Group className="radio clearfix" onChange={this.SearchCarriage.bind(this)}>
                    <Radio.Button value="0">全部</Radio.Button>
                    <Radio.Button value="4">待发货</Radio.Button>
                    <Radio.Button value="3">已发货</Radio.Button>
                    <Radio.Button value="6">交易完成</Radio.Button>
                </Radio.Group> */}
                <Table className="clearfix"
                    rowKey='ExchangeID'
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