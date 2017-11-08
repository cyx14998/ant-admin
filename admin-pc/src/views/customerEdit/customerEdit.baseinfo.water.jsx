/**
 * 用水基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
    getWaterBaseInfoList,
    getWaterBaseInfoAdd,
    getWaterBaseInfoEdit,
    getWaterBaseInfoDelete,
} from '../../common/api/api.customer';

/**
 * table head
 */
const columns = [{
    title: '企业用水量',
    dataIndex: 'consumption',
}, {
    title: '年耗量',
    dataIndex: 'annualConsumption',
    validateType: 'number',
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
    consumption: '',
    annualConsumption: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
    tableId: 'id-001',
    consumption: '本地名称',
    annualConsumption: '22.33',
}];

export const CustomerEditBaseinfoWater = connectEditableSectionApi({
    secTitle: '企业用水信息',
    columns: columns,
    apiLoader: function () {
        return new Promise((resolve, reject) => {
            // 获取用水信息列表
            var cusId = getLocQueryByLabel('id');
            if (!cusId) return;

            getWaterBaseInfoList({}).then(res => {
                console.log('Waterlist res', res)
                if (res.data.result !== 'success') {
                    console.log(res.data.info)
                    resolve({
                        code: -1,
                        info: res.data.info,
                    })
                    return;
                }
                var data = res.data.useInfoWaterList;
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
        console.log(record)
        // var self = this;
        if (record.tableId === '') {
            // 新增      
            return new Promise((resolve, reject) => {
                getWaterBaseInfoAdd(record).then(res => {
                    console.log('AddWater res', res);
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
                getWaterBaseInfoEdit(record).then(res => {
                    console.log('AddWater res', res);
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
            getWaterBaseInfoDelete(tableId).then(res => {
                console.log('DeleteWater res', res);
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

export default CustomerEditBaseinfoWater;