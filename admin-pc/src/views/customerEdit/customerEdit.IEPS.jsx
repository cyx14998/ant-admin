/**
 * 企业内部环保管理制度
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getIEPSList,
  getIEPSAdd,
  getIEPSUpdate,
  getIEPSDelete,
} from '../../common/api/api.customer.plus.js';
const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';

/**
 * table head
 */
const columns = [{
  title: '制度名称',
  dataIndex: 'theName',
}, {
  title: '执行情况',
  dataIndex: 'implementation',
}, {
  title: '下载路径',
  dataIndex: 'filePath',
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
  tableId: '',
  theName: '',
  implementation: '',
  filePath: {
    cellType: 'fileUpload',
    fileList: []
  },
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '企业内部环保管理制度基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      //获取数据
      getIEPSList({}).then(res => {
        console.log('getIEPSList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerIEPSList;
        data.map((item, index) => {
          if (item.filePath) {
            item.filePath = {
              cellType: 'fileUpload',
              fileList: [{
                uid: -1,
                name: 'file',
                url: item.filePath,
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
    //制度
    console.log(record)
    var prodFileUrl = record.filePath.fileList[0];
    if (!prodFileUrl) {
      prodFileUrl = "";
    } else {
      prodFileUrl = prodFileUrl.url
      // 上传
      if (!prodFileUrl) {
        prodFileUrl = record.filePath.fileList[0].response.filePath;
      }
      if (!prodFileUrl) {
        prodFileUrl = ""
      } else if (prodFileUrl.indexOf(downloadUrl) === -1) {
        prodFileUrl = downloadUrl + prodFileUrl;
      }
    }
    const _record_for_save = {
      ...record,
      filePath: prodFileUrl,
    }
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getIEPSAdd({
          ..._record_for_save,
        }).then(res => {
          console.log("getIEPSAdd res", res)
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
        getIEPSUpdate({
          ..._record_for_save,
        }).then(res => {
          console.log("getIEPSUpdate res", res)
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
      getIEPSDelete(tableId).then(res => {
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