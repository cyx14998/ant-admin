/**
 * 废气污染物排放情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteGasDischargeRecordList,
  getWasteGasDischargeRecordAdd,
  getWasteGasDischargeRecordUpdate,
  getWasteGasDischargeRecordDelete,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '实测排放量',
  dataIndex: 'measuredExhaustVolume',
  width: '10%'
}, {
  title: '排放时间',
  dataIndex: 'emissionTime',
  width: '10%'
}, {
  title: '废气排放量',
  dataIndex: 'exhaustEmission',
  width: '10%'
}, {
  title: '数据来源',
  dataIndex: 'dataSources',
  width: '10%'
}, {
  title: '燃料',
  dataIndex: 'fuel',
  width: '10%'
}, {
  title: '林格曼黑度',
  dataIndex: 'ringermanBlackness',
  width: '10%'
}, {
  title: '废气类型',
  dataIndex: 'exhaustGasType',
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
  measuredExhaustVolume: '',
  emissionTime: '',
  exhaustEmission: '',
  dataSources: '',
  fuel: '',
  ringermanBlackness: '',
  exhaustGasType: '',
};

const WasteGasDemoSection = connectEditableSectionApi({
  secTitle: '废气排放基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getWasteGasDischargeRecordList({
        customerMonthDclarationId:1,
        theYear:1,
        theMonth:1,
      }).then(res => {
        console.log('getWasteGasDischargeRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteGasDischargeRecordList;
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
        getWasteGasDischargeRecordAdd({
          ...record,
          customerMonthDclarationId:1,
          wasteGasDischargePortId:1,
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
        getWasteGasDischargeRecordUpdate({
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
      getWasteGasDischargeRecordDelete(tableId).then(res => {
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