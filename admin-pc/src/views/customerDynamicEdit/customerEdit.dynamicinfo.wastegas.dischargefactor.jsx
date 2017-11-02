/**
 * 废气排放因子基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteGasDischargeFactorRecordList,
  getWasteGasDischargeFactorRecordAdd,
  getWasteGasDischargeFactorRecordDelete,
  getWasteGasDischargeFactorRecordUpdate,
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
  width: '5%'
}, {
  title: '特别排放限值',
  dataIndex: 'specialEmissionLimits',
  width: '5%'
}, {
  title: '实测浓度-排放浓度',
  dataIndex: 'measuredConcentration',
}, {
  title: '折算浓度-排放浓度',
  dataIndex: 'conversionConcentration',
}, {
  title: '排放速率标准值-排放速率',
  dataIndex: 'emissionRateStandardValue',
}, {
  title: '实际排放速率-排放速率',
  dataIndex: 'emissionRateActual',
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
  pollutantName: '',
  standardValue: '',
  specialEmissionLimits: '',
  measuredConcentration: '',
  conversionConcentration: '',
  emissionRateStandardValue: '',
  emissionRateActual: '',
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

const WasteGasDemoSection = connectEditableSectionApi({
  secTitle: '废气排放因子基本情况',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    var editId = apiListItemId;
    if(editId === undefined){
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve,reject) => {
      //获取数据
      getWasteGasDischargeFactorRecordList({wasteGasDischargeRecordId: editId}).then(res => {
        console.log('getWasteGasDischargeFactorRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteGasDischargeFactorRecordList;
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
    record.isOverproof = record.isOverproof.value;
    var self = this;
    if(record.apiListItemId === undefined){
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    }
    record.wasteGasDischargePortId = record.apiListItemId;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWasteGasDischargeFactorRecordAdd({
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
      return new Promise((resolve, reject) => {
        getWasteGasDischargeFactorRecordUpdate({
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
      getWasteGasDischargeFactorRecordDelete(tableId).then(res => {
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

export default WasteGasDemoSection;