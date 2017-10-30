/**
 * 企业附件信息基本情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废气排放基本信息详情
import AttachmentRecordDetail from './customerEdit.dynamicinfo.attachment.detail';

import { 
  getAttachmentRecordList,
  getAttachmentRecordDelete,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  MyToast
} from '../../common/utils';

//获取query
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
const InnerComponent = ({
  editId,
  itemVisible,
}) => (
  <div>
    <AttachmentRecordDetail editId={editId} />
  </div>
);

const AttachmentRecord = connectUneditableSectionApi({
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

        var data = res.data.attachmentDynamicList;
        data = data.map((item,index) => {
          return {
            ...item,
            attachmentTypeId: item.attachmentType.tableId,
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
  // 弹窗组件
  modalTitle: '企业附件基本情况',
  modalComponent: InnerComponent
})

export default AttachmentRecord;