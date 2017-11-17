/**
 * 废气排放检测记录基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getWasteGasMonitoringRecordList,
  getWasteGasMonitoringRecordAdd,
  getWasteGasMonitoringRecordDelete,
  getWasteGasMonitoringRecordUpdate,
} from '../../common/api/api.customer.plus.js';
const downloadUrl = BaseConfig.qiniuPath;

import {
  MyToast
} from '../../common/utils';

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

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
  monitoringReportURL: {
    cellType: 'fileUpload',
    fileList: []
  },
};

const WasteGasMonitoringRecord = connectEditableSectionApi({
  secTitle: '废气排放检测记录基本情况',
  columns: columns,
  apiLoader: function ({ apiListItemId }) {
    var editId = apiListItemId;
    if (editId === undefined) {
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve, reject) => {
      //获取数据
      console.log(editId);
      getWasteGasMonitoringRecordList({ id: editId }).then(res => {
        console.log('getWasteGasMonitoringRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteGasMonitoringRecordList;

        data = data.map(item => {
          var fileList = item.monitoringReportURL ? [{ uid: -1, name: '文件', url: item.monitoringReportURL }] : [];
          return {
            ...item,
            monitoringReportURL: {
              cellType: 'fileUpload',
              fileList,
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
    if (record.apiListItemId === undefined) {
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    }
    //
    var file = record.monitoringReportURL.fileList[0];
    var filePath = '';

    if (file && file.url) {
      filePath = file.url
    }

    if (file && file.response) {
      filePath = downloadUrl + file.response.filePath;
    }

    /**
     * fix bug 
     * 文件上传后，新增项带有文件
     */
    itemDataModel.monitoringReportURL.fileList = [];

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        console.log(record);
        getWasteGasMonitoringRecordAdd({
          ...record,
          monitoringReportURL: filePath,
          dischargePortId: record.apiListItemId
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
        getWasteGasMonitoringRecordUpdate({
          ...record,
          monitoringReportURL: filePath,
          dischargePortId: record.apiListItemId
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
      getWasteGasMonitoringRecordDelete(tableId).then(res => {
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

export default WasteGasMonitoringRecord;