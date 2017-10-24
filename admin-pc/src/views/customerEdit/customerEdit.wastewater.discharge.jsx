/**
 * 废水污染物排放情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWastewaterBaseInfoList,
  deleteWastewaterPort,
  addWastewaterPort
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '排水口编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '排放口名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '排放口位置',
  dataIndex: 'outletLocation',
  width: '10%'
}, {
  title: '经度',
  dataIndex: 'longitude',
  width: '5%'
}, {
  title: '纬度',
  dataIndex: 'latitude',
  width: '5%'
}, {
  title: '排放去向',
  dataIndex: 'emissionDestination',
  width: '10%'
}, {
  title: '污水排放规律',
  dataIndex: 'dischargeLaw',
  width: '10%'
}, {
  title: '功能区类别',
  dataIndex: 'functionalAreaCategory',
  width: '10%'
}, {
  title: '创建时间',
  dataIndex: 'createDatetime',
  width: '10%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '10%'
}];

/**
 * 可选项
 */
const options = [{
  value: 'sy',
  label: '事业单位'
}, {
  value: 'qy',
  label: '企业单位'
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  serialNumber: '',
  theName: '',
  outletLocation: '',
  longitude: '',
  latitude: '',
  emissionDestination: '',
  dischargeLaw: '',
  functionalAreaCategory: '',
  createDatetime: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '测试模块',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getWastewaterBaseInfoList({}).then(res => {
        console.log('getWastewaterList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterDischargePortList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  apiSave: function (record) {
    // 新增
    console.log('apiSave record ----', record);
    var self = this;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getProductBaseInfoAdd({
          ...record,
        }).then(res => {
          if (res.data.result !== 'success') {
            resolve({
              code: 1,
              info: res.data.info,
            });
            return;
          }

          resolve({
            code: 0 // success
          })
        }).catch(err => {
          reject(err)
        });
      });
    } else {
      // 编辑
    }
  },
  apiDel: function (tableId) {
    return new Promise((resolve,reject) => {
      deleteWastewaterPort({tableId:tableId}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.result);
          return;
        }
        // var datas = res.data.wasteWaterDischargePortList;
        console.log("=======================",res);
        // resolve({
        //   data: datas,
        // })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;