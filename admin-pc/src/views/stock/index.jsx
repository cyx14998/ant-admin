//库存
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Icon,
    Popconfirm,
    Pagination
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';

import {
    getStockList,
    getStockDelete,
} from '../../common/api/api.stock.js';

import {
    getHousingList, //获取仓库列表
} from '../../common/api/api.purchaseorderswarehousing.js'

import {
    MyToast,
    convertObjectLabel
} from '../../common/utils';

//库存列表头部
const columns = [{
    title: '仓库',
    dataIndex: 'warehouse.theName',
}, {
    title: '厂商',
    dataIndex: 'manufacturerName',
}, {
    title: '品名',
    dataIndex: 'theName',
}, {
    title: '规格',
    dataIndex: 'theSpecifications',
}, {
    title: '库存数量',
    dataIndex: 'theQuantity',
}, {
    title: '可出库数量',
    render: (record) => {
        return record.theQuantity - record.outingQuantity
    }
}, {
    title: '出库中数量',
    dataIndex: 'outingQuantity',
}, {
    title: '已出库数量',
    dataIndex: 'hasOutQuantity',
},
{
    title: '创建时间',
    dataIndex: 'createDatetime',
},
];
//列表页面
class PurchaseordersstockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            storageItemList: [],
            houseList: [], //仓库列表
        }

        this.getData = this.getData.bind(this);
        this._getMemberList = this._getMemberList.bind(this);
    }

    componentDidMount() {
        this.getData({});
        this._getMemberList();
    }
    //获取库存列表
    getData(params) {
        this.setState({
            loading: true
        });
        getStockList(params).then(res => {
            console.log('getStockList ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }
            var data = res.data.storageItemList;
            data = data.map(item => {


                return {
                    ...item,
                    isPass: item.isPass == 'true' ? '是' : '否',
                    theState: item.theState == '0' ? '正常' : '作废',
                }
            });
            this.setState({
                loading: false,
                storageItemList: data,
            })
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    //获取入库人列表
    _getMemberList() {
        getHousingList({}).then(res => {
            console.log('getHousingList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取仓库列表失败');
                return;
            }

            var houseList = res.data.warehouseList.map(item => {
                let house = {
                    value: item.tableId.toString(),
                    label: item.theName.toString()
                };

                return house;
            });

            this.setState({
                houseList: houseList
            });
        }).catch(err => {
            MyToast('获取入库人列表失败')
        });
    }
    //头部搜索
    handleFormSearch(values) {
        this.getData({
            warehouseId: values.warehouseId,
            keyword: values.keyword
        });
    }

    // 库存删除
    onEditDelete(id) {
        getStockDelete({ tableId: id }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '删除库存失败')
            }

            MyToast('删除库存成功');

            setTimeout(this.getData({}), 500);
        }).catch(err => MyToast(err));
    }

    render() {
        // 头部搜索
        const rcsearchformData = {
            colspan: 2,
            fields: [
                {
                    type: 'select',
                    label: '仓库',
                    name: 'warehouseId',
                    options: this.state.houseList
                },
                {
                    type: 'input',
                    label: '关键词',
                    name: 'keyword',
                },
            ]
        }
        return (
            <div className="yzy-page">
                <div className="yzy-search-form-wrap">
                    <RcSearchForm {...rcsearchformData}
                        handleSearch={this.handleFormSearch.bind(this)} />
                </div>
                <div className="yzy-list-wrap">
                    <Table
                        columns={columns}
                        dataSource={this.state.storageItemList}
                        loading={this.state.loading}
                        rowKey="tableId"
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) {
                                return 'active'
                            }
                        }}
                        pagination={true} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<PurchaseordersstockList />, document.getElementById('root'));
