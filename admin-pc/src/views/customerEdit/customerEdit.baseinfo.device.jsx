/**
 * 生产装置基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
    getDeviceBaseInfoList,
    getDeviceBaseInfoAdd,
    getDeviceBaseInfoEdit,
    getDeviceBaseInfoDelete,
} from '../../common/api/api.customer';

/**
 * table head
 */
const columns = [{
    title: '编号',
    dataIndex: 'serialNumber',
    width: '10%'
}, {
    title: '名称',
    dataIndex: 'theName',
    width: '10%'
}, {
    title: '型号',
    dataIndex: 'theModel',
    width: '10%'
}, {
    title: '台套数',
    dataIndex: 'theQuantity',
    width: '10%'
}, {
    title: '对应工艺',
    dataIndex: 'processing',
    width: '10%'
}, {
    title: '使用能源',
    dataIndex: 'useEnergy',
    width: '10%'
}, {
    title: '生产污染物名称',
    dataIndex: 'pollutantName',
    width: '10%'
}, {
    title: '对应处理设施名称',
    dataIndex: 'facilitiesName',
    width: '10%'
},
{
    title: '操作',
    dataIndex: 'operation',
    width: '10%'
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
    tableId: '',
    serialNumber: '',
    theName: '',
    theModel: '',
    theQuantity: '',
    processing: '',
    useEnergy: '',
    pollutantName: '',
    facilitiesName: '',
};

/**
 * 接口返回的数据
 */
const dataSource = [{
    tableId: 'id-001',
    serialNumber: '本地名称',
    theModel: '22.33',
}];

export const CustomerEditBaseinfoDevice = connectEditableSectionApi({
    secTitle: '企业主要生产装置一览表',
    columns: columns,
    apiLoader: function () {
        return new Promise((resolve, reject) => {
            // 获取生产装置信息列表
            var cusId = getLocQueryByLabel('id');
            if (!cusId) return;

            getDeviceBaseInfoList({}).then(res => {
                console.log('Devicelist res', res)
                if (res.data.result !== 'success') {
                    console.log(res.data.info)
                    resolve({
                        code: -1,
                        info: res.data.info,
                    })
                    return;
                }
                var data = res.data.mainProductionDeviceList;
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
                getDeviceBaseInfoAdd(record).then(res => {
                    console.log('AddDevice res', res);
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
                getDeviceBaseInfoEdit(record).then(res => {
                    console.log('AddDevice res', res);
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
            getDeviceBaseInfoDelete(tableId).then(res => {
                console.log('DeleteDevice res', res);
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

export default CustomerEditBaseinfoDevice;