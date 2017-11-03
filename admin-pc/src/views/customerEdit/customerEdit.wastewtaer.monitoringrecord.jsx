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

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
}, {
  title: '监测时间',
  dataIndex: 'monitoringDatetime',
}, {
  title: '监测部门',
  dataIndex: 'monitoringDepart',
}, {
  title: '监测结果',
  dataIndex: 'monitoringResult',
}, {
  title: '监测报告',
  dataIndex: 'monitoringReportURL',
  width: 160,
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];


/**
 * 新数据默认值
 */
const itemDataModel = {
  serialNumber: '',
  monitoringDatetime: moment(new Date()).format(dateFormat),
  monitoringDepart: '',
  monitoringResult: '',
  monitoringReportURL:  {
    cellType: 'fileUpload',
    fileList: []
  },
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

        data = data.map(item => {
          let fileList = item.monitoringReportURL ? [{uid: -1, name: '文件', url: item.monitoringReportURL}] : [];

          return {
            ...item,
            monitoringReportURL: {
              cellType: 'fileUpload',
              fileList
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
    })
  },
  apiSave: function (record) {
    // 新增
    // console.log('apiSave record ----', record);
    var self = this;
    if(record.apiListItemId === undefined){
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    }

    /**
     * 处理fileList
     */
    var file = record.monitoringReportURL.fileList[0];

    var filePath = '';

    if (file && file.url) {
      filePath = file.url;
    }

    if (file && file.response.filePath) {
      filePath = downloadUrl + file.response.filePath
    }


    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterMonitoringRecordAdd({
          ...record,
          wasteWaterDischargePortId: record.apiListItemId,
          monitoringReportURL: filePath
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
          wasteWaterDischargePortId: record.apiListItemId,
          monitoringReportURL: filePath
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