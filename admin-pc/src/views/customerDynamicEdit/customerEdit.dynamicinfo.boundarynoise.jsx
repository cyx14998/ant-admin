/**
 * 边界噪声情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getBoundaryNoiseRecordList,
  getBoundaryNoiseRecordAdd,
  getBoundaryNoiseRecordUpdate,
  getBoundaryNoiseRecordDelete,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  getLocQueryByLabel
} from '../../common/utils';
const dynamicId = getLocQueryByLabel('dynamicId');

/**
 * table head
 */
const columns = [{
  title: '执行标准',
  dataIndex: 'implementationStandards',
  width: '10%'
}, {
  title: '等效声级',
  dataIndex: 'equivalentSoundLevel',
  width: '10%'
}, {
  title: '峰值声级',
  dataIndex: 'peakSoundLevel',
  width: '10%'
}, {
  title: '超标分贝数',
  dataIndex: 'exceedingDecibels',
  width: '10%'
}, {
  title: '超标天数',
  dataIndex: 'exceedingStandardDays',
  width: '10%'
}, {
  title: '噪声时段 开始时刻（时）',
  dataIndex: 'noisePeriodStart',
  width: '10%'
}, {
  title: '噪声时段 结束时刻（时）',
  dataIndex: 'noisePeriodEnd',
  width: '10%'
}, {
  title: '边界超标长度是否超过100米',
  dataIndex: 'IsBoundaryExceeding100',
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
  implementationStandards: '',
  equivalentSoundLevel: '',
  peakSoundLevel: '',
  exceedingDecibels: '',
  exceedingStandardDays: '',
  noisePeriodStart: '',
  noisePeriodEnd: '',
  IsBoundaryExceeding100: {
    value: '1',
    options : [{
      value: "1",
      label: '是'
    }, {
      value: "0",
      label: '否'
    }]
  },
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '边界噪声基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      if(!dynamicId) return;
      getBoundaryNoiseRecordList({customerMonthDclarationId:dynamicId}).then(res => {
        console.log('getBoundaryNoiseRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.boundaryNoiseRecordList;
        data = data.map((item,index) => {
          return {
            ...item,
            IsBoundaryExceeding100: {
              value: item.IsBoundaryExceeding100 === true ? "1" : "0" ,
              options : [{
                value: "1",
                label: "是"
              }, {
                value: "0",
                label: "否"
              }] 
            }
          }
        })
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
    record.IsBoundaryExceeding100 = record.IsBoundaryExceeding100.value;
    var self = this;
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getBoundaryNoiseRecordAdd({
          ...record,
          customerMonthDclarationId: dynamicId,
          boundaryNoiseId:1,
        }).then(res => {
          console.log("getBoundaryNoiseRecordAdd res",res)
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
        getBoundaryNoiseRecordUpdate({
          ...record,
          boundaryNoiseId:1,
        }).then(res => {
          console.log("getBoundaryNoiseRecordUpdate res",res)
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
      getBoundaryNoiseRecordDelete(tableId).then(res => {
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