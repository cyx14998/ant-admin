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
    getMemberList, //获取入库人列表 （员工列表）
} from '../../common/api/api.purchaseorderswarehousing.js'

import {
    MyToast,
    convertObjectLabel
} from '../../common/utils';

//库存列表头部
const columns = [ {
        title: '仓库',
        dataIndex: 'warehouse.theName',
    }, {
        title: '厂商',
        dataIndex: 'manufacturerName',
    }, {
        title: '品名',
        dataIndex: 'theName',
    }, {
        title: '数量',
        dataIndex: 'theQuantity',
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
            memberList: [], //入库人列表
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
        getMemberList({}).then(res => {
            console.log('getMemberList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取入库人列表失败');
                return;
            }
            console.log('-------------', res.data.memberList)
            var memberList = res.data.memberList.map(item => {
                let member = {
                    value: item.tableId + '',
                    label: item.realName
                };

                return member;
            });
            memberList.unshift({
                value: '全部',
                label: '全部'
            })

            this.setState({
                memberList: memberList
            });
        }).catch(err => {
            MyToast('获取入库人列表失败')
        });
    }
    //头部搜索
    handleFormSearch(values) {
        this.getData({
            storageInMemberId: values.storageInMemberId,
            isPass: values.isPass,
            theState: values.theState,
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
                    options: []
                }, {
                    type: 'select',
                    label: '入库人',
                    name: 'storageInMemberId',
                    options: this.state.memberList
                },
                {
                    type: 'select',
                    label: '审核情况',
                    name: 'isPass',
                    defaultValue: '0',
                    options: [{
                        value: '0',
                        label: '全部'
                    }, {
                        value: '1',
                        label: '审核完成'
                    }, {
                        value: '2',
                        label: '未审核'
                    }]
                }, {
                    type: 'select',
                    label: '库存状态',
                    name: 'theState',
                    defaultValue: '0',
                    options: [{
                        value: '0',
                        label: '全部'
                    }, {
                        value: '1',
                        label: '正常'
                    }, {
                        value: '2',
                        label: '作废'
                    }]
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
