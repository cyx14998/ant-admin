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
    getOutboundRecordnAdd,
    getStockList,//明细新增---库存列表
} from '../../common/api/api.purchaseordersoutbound.js';
import {
    getHousingList, //获取仓库列表
} from '../../common/api/api.purchaseorderswarehousing.js'

import { MyToast, getLocQueryByLabel, } from '../../common/utils';

//库存明细头部-----（用于新增出库明细）
const stockColumns = [
    {
        title: '仓库名称',
        dataIndex: 'warehouse.theName',
    }, {
        title: '厂商',
        dataIndex: 'manufacturerName',
    }, {
        title: '品名',
        dataIndex: 'theName',
    }, {
        title: '规格型号',
        dataIndex: 'theSpecifications',
    },
    //  {
    //     title: '数量',
    //     dataIndex: 'theQuantity',
    // },
    //  {
    //     title: '出库中数量',
    //     dataIndex: 'outingQuantity',
    // },
    //  {
    //     title: '已出库数量',
    //     dataIndex: 'hasOutQuantity',
    // },
    {
        title: '可出库数量',
    }, {
        title: '入库时间',
        dataIndex: 'createDatetime'
    }, {
        title: '本次出库数量',
        dataIndex: 'willOutStorageQuantity'
    }
];

//Modal页面
class OutBoundRecordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houseList: [], //库存列表
            stockList: [], //出库明细新增Modal列表 --- 库存列表

            stockSelectedRowKeysArr: [], //选择tableId Arr --- （库存）
            stockSelectedRowArrQuarity: [], //数量Arr --- （库存）

            warehouseId: '0', //Modal头部搜索
        }
        this._getHousingList = this._getHousingList.bind(this);
        this._getStockList = this._getStockList.bind(this);
    }

    componentDidMount() {
        this._getHousingList();
        this._getStockList({
            warehouseId: this.state.warehouseId,
        });
        stockColumns[4].render = (text, record, index) => {
            return (<span>{record.theQuantity - record.outingQuantity}</span>)
        }
        stockColumns[6].render = (text, record, index) => {
            return (<Input onChange={this.selectQuantity.bind(this, record, text, index)} />)
        }
    }
    //获取仓库列表
    _getHousingList() {
        // getHousingList({}).then(res => {
        //     console.log('getHousingList res', res)

        //     if (res.data.result !== 'success') {
        //         MyToast(res.data.info || '获取仓库列表失败');
        //         return;
        //     }

        //     var houseList = res.data.warehouseList.map(item => {
        //         let house = {
        //             value: item.tableId + '',
        //             label: item.theName
        //         };

        //         return house;
        //     });

        //     this.setState({
        //         houseList: houseList
        //     });
        // }).catch(err => {
        //     MyToast('获取仓库列表失败')
        // });
    }
    //获取库存列表
    _getStockList(params) {
        console.log('------------params', params)

        getStockList({ ...params }).then(res => {
            console.log('getStockList ------------', res)
            if (res.data.result !== 'success') {
                console.log(res.data.info)
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.storageItemList || [];
            this.setState({
                loading: false,
                stockList: dataSource
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }

    //头部搜索
    handleFormSearch(values) {
        this._getStockList({
            warehouseId: values.warehouseId,
        });
    }
    //采购单数量Input
    selectQuantity(record, text, index, e) {

        if (!(/^[0-9]+\.{0,1}[0-9]{0,6}$/).test(e.target.value.trim())) {
            MyToast("请输入数字");
            return;
        }
        var stockSelectedRowArrQuarity = this.state.stockSelectedRowArrQuarity;
        var tableIdDouble = 0;
        //当tableId已经存在
        stockSelectedRowArrQuarity.map((item, index) => {
            if (item.tableId === record.tableId) {
                stockSelectedRowArrQuarity[index].willOutStorageQuantity = e.target.value;
                tableIdDouble = 1;
            }
        });
        if (!stockSelectedRowArrQuarity.length || tableIdDouble == 0) {
            var selectQuantityObj = {
                tableId: record.tableId,
                willOutStorageQuantity: e.target.value,
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
        var stockSelectedRowKeysArr = this.state.stockSelectedRowKeysArr;
        if (stockSelectedRowKeysArr.length == 0) {
            MyToast('请先选择数据');
            return;
        }
        var stockSelectedRowArrQuarity = this.state.stockSelectedRowArrQuarity;
        console.log(stockSelectedRowKeysArr, '1111111111', stockSelectedRowArrQuarity)

        stockSelectedRowKeysArr.map((aItem) => {
            aItem.willOutStorageQuantity = aItem.theQuantity - aItem.outingQuantity;
            if (stockSelectedRowArrQuarity.length) {
                stockSelectedRowArrQuarity.map((qItem) => {
                    if (qItem.tableId == aItem.tableId) {
                        if (qItem.willOutStorageQuantity) {
                            aItem.willOutStorageQuantity = qItem.willOutStorageQuantity;
                        }
                    }
                });
            }
        })

        var temp = [];
        stockSelectedRowKeysArr.map((item) =>
            temp.push({ tableId: item.tableId, willOutStorageQuantity: item.willOutStorageQuantity })
        );

        var submitData = [];
        if (temp.length) {
            temp.map((item, index) => {
                // var itemData = Object.values(item);
                submitData.push(item);
            });
        }

        console.log(submitData)
        getOutboundRecordnAdd({
            data: submitData,
            storageOutRecordMstId: this.props.tableId,
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info);
                return;
            }
            MyToast('明细新增成功');
            this.setState({
                stockSelectedRowArrQuarity: [],
                stockSelectedRowKeysArr: [],
            });
            this.props.onCancelModal();
            this.props._getOutboundRecordList({ storageOutRecordMstId: this.props.tableId });
        }).catch(err =>
            MyToast(err)
            )
    }
    render() {
        var self = this;
        var stockSelectedRowKeysArr = self.state.stockSelectedRowKeysArr;
        //出库单Modal的行标选择        
        const outboundDataRowSelection = {
            stockSelectedRowKeysArr,
            // onChange(stockSelectedRowKeysArr) {
            //     console.log(`purOrdSelectedRowKeys changed: ${stockSelectedRowKeysArr}`);
            //     // self.setState({
            //     //     stockSelectedRowKeysArr: stockSelectedRowKeysArr,
            //     // })
            // },
            onChange: (selected, stockSelectedRowKeysArr) => {
                console.log('-----------', stockSelectedRowKeysArr)
                self.setState({
                    stockSelectedRowKeysArr: stockSelectedRowKeysArr,
                })
            },

        }
        return (
            <div>
                <Table
                    style={{ marginTop: 20 }}
                    rowSelection={outboundDataRowSelection}
                    columns={stockColumns}
                    dataSource={this.state.stockList}
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
export default OutBoundRecordModal;
