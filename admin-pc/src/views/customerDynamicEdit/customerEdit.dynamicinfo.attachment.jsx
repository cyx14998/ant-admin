/**
 * 企业附件信息基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getAttachmentRecordList,
  getAttachmentRecordAdd,
  getAttachmentRecordUpdate,
  getAttachmentRecordDelete,
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
  title: '文件名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '附件类型Id',
  dataIndex: 'attachmentTypeId',
  width: '10%'
}, {
  title: '文件大小',
  dataIndex: 'theSize',
  width: '10%'
}, {
  title: '文件路径',
  dataIndex: 'filePath',
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
  theName: '',
  attachmentTypeId: '',
  theSize: '',
  filePath: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '企业附件信息基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      var dynamicId = getLocQueryByLabel('dynamicId');
      if(!dynamicId) return;
      getAttachmentRecordList({customerMonthDclarationId:dynamicId,}).then(res => {
        console.log('getAttachmentRecordList res ---', res);
        
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.AttachmentRecordList;
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
        getAttachmentRecordAdd({
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
        getAttachmentRecordUpdate({
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
      getAttachmentRecordDelete(tableId).then(res => {
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