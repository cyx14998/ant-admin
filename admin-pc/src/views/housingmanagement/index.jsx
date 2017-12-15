//仓库管理
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Button,
    Icon,
    Pagination,
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Select,
    Popconfirm
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import moment from 'moment';

import {
    getHousingTableList,
    getHousingAdd,
    getHousingEdit,
    getHousingDelete,
} from '../../common/api/api.housingmanagement.js';

import {
    getMemberList, //获取入库人列表 （员工列表）
} from '../../common/api/api.purchaseorderswarehousing.js'

/**
 * @props columns
 *     配置数据校验
 * @props dataSource
 *     在接口与组件之间要进行数据转换，只维护columns相关数据
 * @desc
 *     只关心增删改查的接口调用与数据转换
 */
import EditableTable from '../../components/editableTable/index';
import RcSearchForm from '../../components/rcsearchform';

import { MyToast, getLocQueryByLabel, } from '../../common/utils';

//仓库头部
const columns = [
    {
        title: '仓库名称',
        dataIndex: 'theName',
    }, {
        title: '仓库地址',
        dataIndex: 'address',
    }, {
        title: '备注',
        dataIndex: 'theRemarks',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: 120,
    }
];
//仓库新增
const getHousing = {
    tableId: '',
    editable: true,
    theName: {
        value: '',
    },
    address: {
        value: ''
    },
    theRemarks: {
        value: ''
    },
};
//编辑页面
class HousingListEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            warehouseList: [], //列表

            houseList: [],//仓库列表
            memberList: [], //入库人列表
        }
        this._getHousingTableList = this._getHousingTableList.bind(this);

        this._getMemberList = this._getMemberList.bind(this);
    }

    componentDidMount() {
        this._getHousingTableList({});
        this._getMemberList({});
    }
    //数据列表格式化
    formatDatasource(dataSource) {
        var data = dataSource.map(data => {
            return {
                tableId: data.tableId,
                theName: {
                    value: data.theName,
                },
                address: {
                    value: data.address || '',
                },
                theRemarks: {
                    value: data.theRemarks || '',
                },
            }
        });

        return data;
    }
    //数据提交格式化
    serializeRecord(record) {
        //file
        return {
            tableId: record.tableId,
            address: record.address.value,
            theName: record.theName.value,
            theRemarks: record.theRemarks.value,
        }

    }
    //仓库Table列表    
    _getHousingTableList(params) {

        getHousingTableList(params).then(res => {
            console.log('getHousingTableList Table ------------', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var dataSource = res.data.warehouseList;

            this.setState({
                loading: false,
                warehouseList: this.formatDatasource(dataSource)
            })

            var houseList = res.data.warehouseList.map(item => {
                let house = {
                    value: item.tableId + '',
                    label: item.theName
                };

                return house;
            });
            houseList.unshift({
                value: '全部',
                label: '全部'
            })
            this.setState({
                houseList: houseList
            });
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }
    //仓库新增
    addBtnPurchaseorder(record) {
        console.log('新增-----------------------', record);
        var _record = this.serializeRecord(record);

        return new Promise((resolve, reject) => {
            getHousingAdd({
                ..._record,
                purchaseRecordMstId: this.state.tableId
            }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    tableId: res.data.tableId,
                    msg: '新增成功'
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        });
    }
    //仓库更新    
    updatePurchaseorder(record) {
        console.log('编辑-----------------------', record);
        var _record = this.serializeRecord(record);

        return new Promise((resolve, reject) => {
            getHousingEdit({ ..._record }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    tableId: res.data.tableId,
                    msg: '编辑成功'
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    // 仓库删除
    deletePurchaseorder(id) {
        return new Promise((resolve, reject) => {
            getHousingDelete({ tableId: id }).then(res => {
                if (res.data.result != 'success') {
                    resolve({
                        code: -1,
                        msg: res.data.info
                    });
                    return;
                }

                resolve({
                    code: 0,
                    msg: '删除成功'
                });
            }).catch(err => resolve({ code: -1, msg: err }))
        })
    }
    //头部搜索
    handleFormSearch(values) {
        this._getHousingTableList({
            warehouseId: values.warehouseId,
            storageInMemberId: values.storageInMemberId,
            isPass: values.isPass,
            theState: values.theState,
        });
    }

    //获取入库人列表
    _getMemberList() {
        getMemberList({}).then(res => {
            console.log('getMemberList res', res)

            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取入库人列表失败');
                return;
            }
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
    render() {
        var purchaseRecordMst = this.state.purchaseRecordMst;
        var self = this;
        // 头部搜索
        const rcsearchformData = {
            colspan: 2,
            fields: [
                {
                    type: 'select',
                    label: '仓库',
                    name: 'warehouseId',
                    defaultValue: '全部',
                    options: self.state.houseList
                }, {
                    type: 'select',
                    label: '入库人',
                    name: 'storageInMemberId',
                    defaultValue: '全部',
                    options: self.state.memberList
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
                    label: '仓库状态',
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
                    <EditableTable
                        columns={columns}
                        dataSource={this.state.warehouseList}
                        onDelete={this.deletePurchaseorder.bind(this)}
                        onSaveAdd={this.addBtnPurchaseorder.bind(this)}
                        onSaveUpdate={this.updatePurchaseorder.bind(this)}
                        itemDataModel={getHousing}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        )
    }
}
ReactDOM.render(<HousingListEdit />, document.getElementById('root'));
