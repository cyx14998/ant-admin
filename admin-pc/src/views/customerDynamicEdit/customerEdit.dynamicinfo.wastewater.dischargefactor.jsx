/**
 * 废水排放因子基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteWaterDischargeFactorRecordList,
  getWasteWaterDischargeFactorRecordAdd,
  getWasteWaterDischargeFactorRecordDelete,
  getWasteWaterDischargeFactorRecordUpdate,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '污染物名称',
  dataIndex: 'pollutantName',
}, {
  title: '标准值',
  dataIndex: 'standardValue',
}, {
  title: '特别排放限值',
  dataIndex: 'specialEmissionLimits',
}, {
  title: '排放浓度',
  dataIndex: 'emissionConcentration',
}, {
  title: '数据来源',
  dataIndex: 'dataSources',
}, {
  title: '排放量(千克)',
  dataIndex: 'emissionAmount',
}, {
  title: '是否存在某一天超标',
  dataIndex: 'isOverproof',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  pollutantName: '',
  standardValue: '',
  specialEmissionLimits: '',
  emissionConcentration: '',
  dataSources: '',
  emissionAmount: '',
  isOverproof: {
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
  secTitle: '废水排放因子基本情况',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    var editId = apiListItemId;
    if(editId === undefined){
      Promise.resolve({
        code: -1,
        info: '缺失废水排放口参数',
      })
      return;
    }

    return new Promise((resolve,reject) => {
      //获取数据
      getWasteWaterDischargeFactorRecordList({wasteWaterDischargeRecordId: editId}).then(res => {
        console.log('getWasteWaterDischargeFactorRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterDischargeFactorRecordList;

        data = data.map((item,index) => {
          return {
            ...item,
            isOverproof: {
              value: item.isOverproof === true ? "1" : "0" ,
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
    var self = this;

    var wasteWaterDischargeRecordId = record.apiListItemId;
    delete record.apiListItemId;
    
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWasteWaterDischargeFactorRecordAdd({
          ...record,
          wasteWaterDischargeRecordId, 
          isOverproof: record.isOverproof.value === '1' ? true : false,
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
        getWasteWaterDischargeFactorRecordUpdate({
          ...record,
          wasteWaterDischargeRecordId,
          isOverproof: record.isOverproof.value === '1' ? true : false,
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
      getWasteWaterDischargeFactorRecordDelete(tableId).then(res => {
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