/**
 * 燃料基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
    getFuelDynamicInfoList,
    getFuelDynamicInfoAdd,
    getFuelDynamicInfoEdit,
    getFuelDynamicInfoDelete,
} from '../../common/api/api.customer.dynamic';

/**
 * table head
 */
const columns = [{
    title: '燃料名称',
    dataIndex: 'theName',
}, {
    title: '产地',
    dataIndex: 'placeOfOrigin',
}, {
    title: '用量',
    dataIndex: 'consumption',
}, {
    title: '单位',
    dataIndex: 'theUnit',
},{
    title: '硫含量（%）',
    dataIndex: 'sulfurContent',
}, {
    title: '灰分（%）',
    dataIndex: 'ashContent',
}, {
    title: '热值',
    dataIndex: 'calorificValue',
},{
    title: '热值单位',
    dataIndex: 'calorificValueUnit',
},{
    title: '计量单位',
    dataIndex: 'unitOfMeasurement',
}, {
    title: '操作',
    dataIndex: 'operation',
    width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
    tableId: '',
    theName: '',
    placeOfOrigin: '',
    consumption: '',
    theUnit: '',
    sulfurContent: '',
    ashContent: '',
    calorificValue: '',
    calorificValueUnit: '',
    unitOfMeasurement: '',

};

/**
 * 接口返回的数据
 */
const dataSource = [{
    tableId: 'id-001',
    theName: '本地名称',
    unitOfMeasurement: 'kg',
    yield: '20'
}];
const dynamicId = getLocQueryByLabel('dynamicId');

export const CustomerEditDynamicinfoFuel = connectEditableSectionApi({
    secTitle: '燃料基本信息',
    columns: columns,
    apiLoader: function () {
        return new Promise((resolve, reject) => {
            // 获取产品信息列表
            var cusId = getLocQueryByLabel('id');
            if (!cusId) return;

            getFuelDynamicInfoList({customerMonthDclarationId: dynamicId}).then(res => {
                console.log('fuellist res', res)
                if (res.data.result !== 'success') {
                    resolve({
                        code: -1,
                        info: res.data.info,
                    })
                    return;
                }
                var data = res.data.fuelConsumptionList;
                resolve({
                    code: 0,
                    data,
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    apiSave: function (record) {
        console.log('record--------------------', record)
        // var self = this;
        if (record.tableId === '') {
            // 新增      
            return new Promise((resolve, reject) => {
                getFuelDynamicInfoAdd({...record,customerMonthDclarationId: dynamicId}).then(res => {
                    console.log('AddFuel res', res);
                    if (res.data.result !== 'success') {
                        resolve({
                            code: -1,
                            info: res.data.info,
                        });
                        return
                    }
                    resolve({
                        code: 0 // success
                    })
                }).catch(err => {
                    reject(err)
                });
            })
        } else {
            // 编辑
            return new Promise((resolve, reject) => {
                getFuelDynamicInfoEdit({...record,customerMonthDclarationId: dynamicId}).then(res => {
                    console.log('AddFuel res', res);
                    if (res.data.result !== 'success') {
                        resolve({
                            code: -1,
                            info: res.data.info,
                        });
                        return
                    }
                    resolve({
                        code: 0 // success
                    })
                }).catch(err => {
                    reject(err)
                });
            })
        }
    },
    apiDel: function (tableId) {
        console.log(tableId)
        return new Promise((resolve, reject) => {
            getFuelDynamicInfoDelete(tableId).then(res => {
                console.log('DeleteFuel res', res);
                if (res.data.result !== 'success') {
                    resolve({
                        code: -1,
                        info: res.data.info,
                    });
                    return
                }
                resolve({
                    code: 0 // success
                })
            }).catch(err => {
                reject(err)
            });
        });
    },
    itemDataModel: itemDataModel
})

export default CustomerEditDynamicinfoFuel;