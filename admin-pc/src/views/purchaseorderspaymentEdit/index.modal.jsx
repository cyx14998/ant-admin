import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Icon,
    Pagination,
    Input,
} from 'antd';
import RcSearchForm from '../../components/rcsearchform';

import {
    getPurchaseRecordMstListUnStockList,
    getPaymentRecordnAdd,
} from '../../common/api/api.purchaseorderspayment.js';
import {
    getHousingList, //获取仓库列表
} from '../../common/api/api.purchaseorderswarehousing.js'

import { MyToast, getLocQueryByLabel, } from '../../common/utils';
//采购单明细头部-----（用于新增付款明细）
const paymentColumns = [
    {
        title: '采购单编号',
        dataIndex: 'serialNumber',
    }, {
        title: '总金额',
        dataIndex: 'totalAmount',
    }, {
        title: '已付款金额',
        dataIndex: 'hasPaymentAmount',
    }, {
        title: '待付款金额',
        render: (record) => {
            return (record.totalAmount - record.inPaymentAmount - record.hasPaymentAmount).toFixed(2)
        }
    }, {
        title: '本次付款金额',
        dataIndex: 'paymentQuantity'
    }
];
//Modal页面
class PaymentRecordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // 选中的tableId  Arr
            purchaseRecordMstList: [], //可付款列表
            purOrdSelectedRowKeysArr: [], // 选择的数据 Arr

            stockSelectedRowArrQuarity: [],  //输入数量 Arr     

        }
        this._getPurchaseRecordMstListUnStockList = this._getPurchaseRecordMstListUnStockList.bind(this);
    }

    componentDidMount() {
        this._getPurchaseRecordMstListUnStockList({});

        paymentColumns[4].render = (text, record, index) => {
            // 输入后，翻页返回时传进去默认值
            return (<Input defaultValue={record.nowPayAcount} onChange={this.selectQuantity.bind(this, record, text, index)} />)
        }
    }
    //付款单明细新增----获取采购单(可付款)列表
    _getPurchaseRecordMstListUnStockList(params) {
        this.setState({
            purchaseRecordMstList: []
        });
        getPurchaseRecordMstListUnStockList(params).then(res => {
            console.log('getPurchaseRecordMstList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            this.setState({
                loading: false,
                purchaseRecordMstList: res.data.purchaseRecordMstList,
                selectedRowKeys: [],
                stockSelectedRowArrQuarity: [],
                purOrdSelectedRowKeysArr: [],
            })
        })
    }

    //头部搜索
    handleFormSearch(values) {
        this._getPurchaseRecordMstListUnStockList({
            keyword: values.serialNumber || '',
            // theName: values.theName || '',
        });
    }
    //付款单明细新增----采购单数量Input
    selectQuantity(record, text, index, e) {
        var inputVal = e.target.value.trim();
        if (!(/^[0-9]+\.{0,1}[0-9]{0,6}$/).test(inputVal)) {
            MyToast("请输入数字");
            return;
        }
        var stockSelectedRowArrQuarity = this.state.stockSelectedRowArrQuarity;
        var tableIdDouble = 0;
        record.nowPayAcount = inputVal; // 设置当前输入的值，翻页后返回时放进input默认值
        //当tableId已经存在
        stockSelectedRowArrQuarity.map((item, index) => {
            if (item.tableId === record.tableId) {
                stockSelectedRowArrQuarity[index].willPayment = inputVal;
                tableIdDouble = 1;
            }
        });
        if (!stockSelectedRowArrQuarity.length || tableIdDouble == 0) {
            var selectQuantityObj = {
                tableId: record.tableId,
                willPayment: inputVal,
            };
            stockSelectedRowArrQuarity.push(selectQuantityObj);
            this.setState({
                stockSelectedRowArrQuarity,
            });
        }
        console.log(stockSelectedRowArrQuarity)
    }
    //明细新增 --- Modal确定  
    purordListModalOk() {
        // console.log(this.state.stockSelectedRowArrQuarity);
        var purOrdSelectedRowKeysArr = this.state.purOrdSelectedRowKeysArr;
        if (purOrdSelectedRowKeysArr.length == 0) {
            MyToast('请先选择数据');
            return;
        }
        var stockSelectedRowArrQuarity = this.state.stockSelectedRowArrQuarity;

        purOrdSelectedRowKeysArr.map((aItem) => {
            aItem.willPayment = aItem.totalAmount - aItem.hasPaymentAmount - aItem.inPaymentAmount;
            if (stockSelectedRowArrQuarity.length) {
                stockSelectedRowArrQuarity.map((qItem) => {
                    if (qItem.tableId == aItem.tableId) {
                        if (qItem.willPayment) {
                            aItem.willPayment = qItem.willPayment;
                        }
                    }
                });
            }
        })

        var temp = [];
        purOrdSelectedRowKeysArr.map((item) =>
            temp.push({ tableId: item.tableId, willPayment: item.willPayment })
        );

        var submitData = [];
        if (temp.length) {
            temp.map((item, index) => {
                // var itemData = Object.values(item);
                submitData.push(item);
            });
        }

        console.log('提交前', submitData)
        getPaymentRecordnAdd({
            data: submitData,
            paymentRecordMstId: this.props.tableId,
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info);
                return;
            }
            MyToast('明细新增成功');
            this.setState({
                stockSelectedRowArrQuarity: [],
                purOrdSelectedRowKeysArr: [],
                selectedRowKeys: [],
            });
            this.props.onCancelModal();
            this.props._getPaymentRecordList({ paymentRecordMstId: this.props.tableId });
        }).catch(err => {
            console.log(err);
            MyToast(err)
        }
            )
    }
    render() {
        var self = this;
        let {
            selectedRowKeys,
            purOrdSelectedRowKeysArr
        } = this.state;
        //付款单Modal的行标选择        
        const paymentDataRowSelection = {
            selectedRowKeys,
            // onChange(purOrdSelectedRowKeysArr) {
            //     console.log(`purOrdSelectedRowKeys changed: ${purOrdSelectedRowKeysArr}`);
            //     // self.setState({
            //     //     purOrdSelectedRowKeysArr: purOrdSelectedRowKeysArr,
            //     // })
            // },
            onChange: (selectedRowKeys, selected) => {
                console.log('-----------', selected)
                self.setState({
                    selectedRowKeys,
                    purOrdSelectedRowKeysArr: selected,
                })
            },

        }
        // Modal头部搜索
        const rcsearchformData = {
            colspan: 2,
            fields: [
                {
                    type: 'input',
                    label: '采购单编号',
                    name: 'serialNumber',
                },
                //  {
                //     type: 'input',
                //     label: '品名',
                //     name: 'theName',
                // },
            ]
        }
        return (
            <div>
                <RcSearchForm {...rcsearchformData}
                    handleSearch={this.handleFormSearch.bind(this)} />
                <Table
                    style={{ marginTop: 20 }}
                    rowSelection={paymentDataRowSelection}
                    columns={paymentColumns}
                    dataSource={this.state.purchaseRecordMstList}
                    rowKey="tableId"
                    rowClassName={(record, index) => {
                        if (index % 2 !== 0) {
                            return 'active'
                        }
                    }}
                />
                <div className="yzy-block-center">
                    <Button type="primary" style={{ padding: '0 40px', margin: '20px 0' }} onClick={this.purordListModalOk.bind(this)}>确定</Button>
                </div>
            </div>
        )
    }
}
export default PaymentRecordModal;
