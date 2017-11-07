/**
 * 边界噪声情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getBoundaryNoiseRecordList,
  getBoundaryNoiseRecordAdd,
  getBoundaryNoiseRecordUpdate,
  getBoundaryNoiseRecordDelete,

  getBoundaryNoiseList,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  getLocQueryByLabel,
  convertObjectLabel,
  MyToast
} from '../../common/utils';

const dynamicId = getLocQueryByLabel('dynamicId');


/**
 * table head
 */
const columns = [{
  title: '边界噪声',
  dataIndex: 'boundaryNoiseId',
  width: 80,
}, {
  title: '执行标准',
  dataIndex: 'implementationStandards',
}, {
  title: '等效声级',
  dataIndex: 'equivalentSoundLevel',
}, {
  title: '峰值声级',
  dataIndex: 'peakSoundLevel',
}, {
  title: '超标分贝数',
  dataIndex: 'exceedingDecibels',
}, {
  title: '超标天数',
  dataIndex: 'exceedingStandardDays',
}, {
  title: '噪声时段 开始时刻（时）',
  dataIndex: 'noisePeriodStart',
}, {
  title: '噪声时段 结束时刻（时）',
  dataIndex: 'noisePeriodEnd',
}, {
  title: '边界超标超过100米',
  dataIndex: 'isBoundaryExceeding100',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  boundaryNoiseId: {
    value: '',
    options: []
  },
  implementationStandards: '',
  equivalentSoundLevel: '',
  peakSoundLevel: '',
  exceedingDecibels: '',
  exceedingStandardDays: '',
  noisePeriodStart: '',
  noisePeriodEnd: '',
  isBoundaryExceeding100: {
    value: '0',
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

      // 获取边界噪声选项列表
      getBoundaryNoiseList({}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.info || '获取边界噪声选项列表');
          return;
        }

        var data = res.data.boundaryNoiseList;

        var boundaryNoiseListOptions = convertObjectLabel(data, 'tableId', 'noiseSourceName');  

        return boundaryNoiseListOptions;
      }).then(boundaryNoiseListOptions => {
        // console.log('then boundaryNoiseListOptions----------', boundaryNoiseListOptions)

        itemDataModel.boundaryNoiseId.options = boundaryNoiseListOptions;

        getBoundaryNoiseRecordList({customerMonthDclarationId: dynamicId}).then(res => {
          // console.log('getBoundaryNoiseRecordList res ---', res);

          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            })
            return;
          }

          var data = res.data.boundaryNoiseRecordList;

          data = data.map((item,index) => {
            let boundaryNoiseId = (item.boundaryNoise && item.boundaryNoise.tableId) || '';

            return {
              ...item,
              boundaryNoiseId: {
                value: boundaryNoiseId + '',
                options: boundaryNoiseListOptions
              },
              isBoundaryExceeding100: {
                value: item.isBoundaryExceeding100 === true ? "1" : "0" ,
                options : [{
                  value: "1",
                  label: "是"
                }, {
                  value: "0",
                  label: "否"
                }] 
              }
            }
          });

          resolve({
            code: 0,
            data,
          })
        }).catch(err => {
          MyToast('接口调用失败')
        })
      }).catch(err => MyToast(err));
    })
  },
  apiSave: function (record) {
    // 新增
    console.log('apiSave record ----', record);


    // record.isBoundaryExceeding100 = record.isBoundaryExceeding100.value === '1' ? true : false;
    // record.boundaryNoiseId = parseInt(record.boundaryNoiseId.value);

    const _record_for_save = {
      ...record,
      boundaryNoiseId: parseInt(record.boundaryNoiseId.value),
      isBoundaryExceeding100: record.isBoundaryExceeding100.value === '1' ? true : false
    }

    
    var self = this;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getBoundaryNoiseRecordAdd({
          ..._record_for_save,
          customerMonthDclarationId: dynamicId,
        }).then(res => {
          console.log("getBoundaryNoiseRecordAdd res-------",res)
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
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        console.log(record)
        getBoundaryNoiseRecordUpdate(_record_for_save).then(res => {
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