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
    getWarehousingRecordnAdd,
    getPurchaseRecordMstListUnStockList, //明细新增---采购单主表列表
    getPurchaseRecordDtlListUnStockList,//明细新增---采购单主表--明细列表
} from '../../common/api/api.purchaseorderswarehousing.js';

/**
 * @props columns
 *     配置数据校验
 * @props dataSource
 *     在接口与组件之间要进行数据转换，只维护columns相关数据
 * @desc
 *     只关心增删改查的接口调用与数据转换
 */
import EditableTableSection from '../../components/editableTable/index';

import { MyToast, getLocQueryByLabel, } from '../../common/utils';

//采购单明细头部-----（用于新增入库明细）
const warehousingsColumns = [
    {
        title: '单据编号',
        dataIndex: 'serialNumber',
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
    //     title: '总金额',
    //     dataIndex: 'totalAmount',
    // }, 
    // {
    //     title: '已入库数量',
    //     dataIndex: 'inStorageQuantity',
    // }, 
    {
        title: '可入库数量',
        dataIndex: 'couldStorageQuantity',
    }, {
        title: '本次入库数量',
        dataIndex: 'willInStorageQuantity'
    }
];
//Modal页面
class WarehousingRecordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseRecordMstList: [], //采购单列表
            purchaseRecordDtlList: [], //采购单明细列）
            purOrdSelectedRowKeysArr: [], //选择tableId Arr 
            purOrdSelectedRowKeysArrQuarity: [], //数量 Arr

            purchaseRecordMstId: '全部', //Modal头部搜索
            serialNumber: '', //Modal头部搜索
            theName: '', //Modal头部搜索
        }
        this._getPurchaseRecordMstListUnStockList = this._getPurchaseRecordMstListUnStockList.bind(this);
        this._getPurchaseRecordDtlListUnStockList = this._getPurchaseRecordDtlListUnStockList.bind(this);
    }

    componentDidMount() {
        this._getPurchaseRecordMstListUnStockList();
        this._getPurchaseRecordDtlListUnStockList({
            purchaseRecordMstId: this.state.purchaseRecordMstId,
        });
        //  stockColumns[6].render = (text, record, index) => {
        //     return (<span>{record.theQuantity - record.inStorageQuantity - record.hasInQuantity}</span>)
        // }
        warehousingsColumns[4].render = (text, record, index) => {
            return (<Input onChange={this.selectQuantity.bind(this, record, text, index)} />)
        }
    }
    //入库单明细新增----获取采购单列表
    _getPurchaseRecordMstListUnStockList() {

        getPurchaseRecordMstListUnStockList({}).then(res => {
            console.log('getPurchaseRecordMstList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var purchaseRecordMstList = res.data.purchaseRecordMstList && res.data.purchaseRecordMstList.map(item => {
                let purchaseRecord = {
                    value: item.tableId + '',
                    label: item.manufacturerName
                };

                return purchaseRecord;
            });
            purchaseRecordMstList.unshift({
                value: '全部',
                label: '全部'
            })
            this.setState({
                loading: false,
                purchaseRecordMstList: purchaseRecordMstList
            });
        })
    }
    //入库单明细新增----获取采购单-明细列表
    _getPurchaseRecordDtlListUnStockList(params) {
        console.log('params', params)
        if (!params.purchaseRecordMstId) return;

        getPurchaseRecordDtlListUnStockList(params).then(res => {
            console.log('getPurchaseRecordDtlList ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            this.setState({
                loading: false,
                purchaseRecordDtlList: res.data.purchaseRecordDtlList,
                purOrdSelectedRowKeysArrQuarity: [],
                purOrdSelectedRowKeysArr: [],
            })
        })
    }
    //头部搜索
    handleFormSearch(values) {
        this._getPurchaseRecordDtlListUnStockList({
            purchaseRecordMstId: values.purchaseRecordMstId,
        });
    }
    //入库单明细新增----采购单数量Input
    selectQuantity(record, text, index, e) {
          if (!(/^[0-9]+\.{0,1}[0-9]{0,6}$/).test(e.target.value.trim())) {
            MyToast("请输入数字");
            return;
        }
        var purOrdSelectedRowKeysArrQuarity = this.state.purOrdSelectedRowKeysArrQuarity;
        var tableIdDouble = 0;
        //当tableId已经存在
        purOrdSelectedRowKeysArrQuarity.map((item, index) => {
            if (item.tableId === record.tableId) {
                purOrdSelectedRowKeysArrQuarity[index].willInStorageQuantity = e.target.value;
                tableIdDouble = 1;
            }
        });
        if (!purOrdSelectedRowKeysArrQuarity.length || tableIdDouble == 0) {
            var selectQuantityObj = {
                tableId: record.tableId,
                willInStorageQuantity: e.target.value,
            };
            purOrdSelectedRowKeysArrQuarity.push(selectQuantityObj);
            this.setState({
                purOrdSelectedRowKeysArrQuarity,
            });
        }
        console.log(purOrdSelectedRowKeysArrQuarity)
    }
    //明细新增 --- Modal确定  
    purordListModalOk() {
        // console.log(this.state.purOrdSelectedRowKeysArrQuarity);
        var purOrdSelectedRowKeysArr = this.state.purOrdSelectedRowKeysArr;
        if (purOrdSelectedRowKeysArr.length == 0) {
            MyToast('请先选择数据');
            return;
        }
        var purOrdSelectedRowKeysArrQuarity = this.state.purOrdSelectedRowKeysArrQuarity;
        console.log(purOrdSelectedRowKeysArr, '1111111111', purOrdSelectedRowKeysArrQuarity)

        purOrdSelectedRowKeysArr.map((aItem) => {
            aItem.willInStorageQuantity = aItem.theQuantity - aItem.inStorageQuantity;
            if (purOrdSelectedRowKeysArrQuarity.length) {
                purOrdSelectedRowKeysArrQuarity.map((qItem) => {
                    if (qItem.tableId == aItem.tableId) {
                        aItem.willInStorageQuantity = qItem.willInStorageQuantity;
                        // temp.push({ tableId: aItem.tableId, willInStorageQuantity: qItem.willInStorageQuantity });
                    }
                });
            } else {
                aItem.willInStorageQuantity = aItem.theQuantity - aItem.inStorageQuantity;
                // temp.push({ tableId: aItem.tableId, willInStorageQuantity: aItem.theQuantity - aItem.inStorageQuantity });
            }
        })

        var temp = [];
        purOrdSelectedRowKeysArr.map((item) =>
            temp.push({ tableId: item.tableId, willInStorageQuantity: item.willInStorageQuantity })
        );

        var submitData = [];
        if (temp.length) {
            temp.map((item, index) => {
                // var itemData = Object.values(item);
                submitData.push(item);
            });
        }

        console.log(submitData)
        getWarehousingRecordnAdd({
            data: submitData,
            storageInRecordMstId: this.props.tableId,
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info);
                return;
            }
            MyToast('明细新增成功');
            this.setState({
                purOrdSelectedRowKeysArrQuarity: [],
                purOrdSelectedRowKeysArr: [],
            });
            this.props.onCancelModal();
            this.props._getWarehousingRecordList({ storageInRecordMstId: this.props.tableId });
        }).catch(err =>
            MyToast(err)
            )
    }
    render() {
        var self = this;
        var purOrdSelectedRowKeysArr = self.state.purOrdSelectedRowKeysArr;
        //入库单Modal的行标选择        
        const warehousingsDataRowSelection = {
            purOrdSelectedRowKeysArr,
            // onChange(purOrdSelectedRowKeysArr) {
            //     console.log(`purOrdSelectedRowKeys changed: ${purOrdSelectedRowKeysArr}`);
            //     // self.setState({
            //     //     purOrdSelectedRowKeysArr: purOrdSelectedRowKeysArr,
            //     // })
            // },
            onSelect: (record, selected, purOrdSelectedRowKeysArr) => {
                console.log('-----------',purOrdSelectedRowKeysArr)
                self.setState({
                    purOrdSelectedRowKeysArr: purOrdSelectedRowKeysArr,
                })
            },

        }
        // Modal头部搜索
        const rcsearchformData = {
            colspan: 2,
            fields: [
                //     {
                //     type: 'input',
                //     label: '单据编号',
                //     name: 'serialNumber',
                // }, {
                //     type: 'input',
                //     label: '品名',
                //     name: 'theName',
                // },
                {
                    type: 'select',
                    label: '采购单主表',
                    name: 'purchaseRecordMstId',
                    defaultValue: '全部',
                    options: this.state.purchaseRecordMstList,
                }]
        }
        return (
            <div>
                <RcSearchForm {...rcsearchformData}
                    handleSearch={this.handleFormSearch.bind(this)} />
                <Table
                    style={{ marginTop: 20 }}
                    rowSelection={warehousingsDataRowSelection}
                    columns={warehousingsColumns}
                    dataSource={this.state.purchaseRecordDtlList}
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
export default WarehousingRecordModal;
