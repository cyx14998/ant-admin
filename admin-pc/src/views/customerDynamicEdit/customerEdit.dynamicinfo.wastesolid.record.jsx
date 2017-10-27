/**
 * 固体废物产生及处置情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteSolidRecordList,
  getWasteSolidRecordAdd,
  getWasteSolidRecordUpdate,
  getWasteSolidRecordDelete,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  MyToast
} from '../../common/utils';

import {
  getLocQueryByLabel
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '废物名称',
  dataIndex: 'theName',
  width: '5%'
}, {
  title: '所属固体废物Id',
  dataIndex: 'wasteSolidId',
  width: '8%'
}, {
  title: '主要污染物',
  dataIndex: 'mainPollutants',
  width: '7%'
}, {
  title: '产生量(顿)',
  dataIndex: 'productionQuantity',
  width: '5%'
}, {
  title: '综合利用量',
  dataIndex: 'comprehensiveUtilization',
  width: '5%'
}, {
  title: '处置去向',
  dataIndex: 'disposeWhereabouts',
  width: '5%'
}, {
  title: '处置量-符合环保标准的量(吨)',
  dataIndex: 'disposalCapacityLawful',
  width: '12%'
}, {
  title: '贮存量-符合环保标准的量(吨)',
  dataIndex: 'StorageCapacityLawful',
  width: '12%'
}, {
  title: '处置量-不符合环保标准的量(吨)',
  dataIndex: 'disposalCapacityUnLawful',
  width: '12%'
}, {
  title: '贮存量-不符合环保标准的量(吨)',
  dataIndex: 'storageCapacityUnLawful',
  width: '12%'
}, {
  title: '排放量-不符合环保标准的量(吨)',
  dataIndex: 'emissionAmount',
  width: '12%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '5%'
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
  theName: '',
  wasteSolidId: '',
  mainPollutants: '',
  productionQuantity: '',
  comprehensiveUtilization: '',
  disposeWhereabouts: '',
  disposalCapacityLawful: '',
  StorageCapacityLawful: '',
  disposalCapacityUnLawful: '',
  storageCapacityUnLawful: '',
  emissionAmount: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '固体废物产生及处置情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      var dynamicId = getLocQueryByLabel('dynamicId');
      if(!dynamicId) return;
      getWasteSolidRecordList({customerMonthDclarationId:dynamicId,}).then(res => {
        console.log('getWasteSolidRecordList res ---', res);
        
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteSolidRecordList;
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
        getWasteSolidRecordAdd({
          ...record,
          customerMonthDclarationId:1,
          boundaryNoiseId:1
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
      return new Promise((resolve, reject) => {
        console.log(record)
        getWasteSolidRecordUpdate({
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
    }
  },
  apiDel: function (tableId) {
    //删除
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWasteSolidRecordDelete(tableId).then(res => {
        if (res.data.result !== 'success') {
          resolve({
            code: 1,
            info: res.data.info,
          });
          return;
        }

        resolve({
          code: 0 // success
        });
      }).catch(err => {
        reject(err)
      });
    });
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;