/**
 * 废水排放检测记录基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWastewaterMonitoringRecordList,
  getWastewaterMonitoringRecordAdd,
  getWastewaterMonitoringRecordDelete,
  getWastewaterMonitoringRecordUpdate,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '监测时间',
  dataIndex: 'monitoringDatetime',
  width: '10%'
}, {
  title: '监测部门',
  dataIndex: 'monitoringDepart',
  width: '10%'
}, {
  title: '监测结果',
  dataIndex: 'monitoringResult',
  width: '10%'
}, {
  title: '监测报告',
  dataIndex: 'monitoringReportURL',
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
  monitoringDatetime: '',
  monitoringDepart: '',
  monitoringResult: '',
  monitoringReportURL: '',
};

/**
 * @params apiListItemId
 */
const WasteWaterMonitoringRecord = connectEditableSectionApi({
  secTitle: '废水排放检测记录基本情况',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    var editId = apiListItemId;
    if(editId === undefined){
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve,reject) => {
      //获取数据
      getWastewaterMonitoringRecordList({wasteWaterDischargePortId: editId}).then(res => {
        // console.log('getWastewaterMonitoringRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterMonitoringRecordList;
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
    // console.log('apiSave record ----', record);
    var self = this;
    if(record.apiListItemId === undefined){
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    }
    record.wasteWaterDischargePortId = record.apiListItemId;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterMonitoringRecordAdd({
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
        getWastewaterMonitoringRecordUpdate({
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
    // console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWastewaterMonitoringRecordDelete(tableId).then(res => {
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

export default WasteWaterMonitoringRecord;