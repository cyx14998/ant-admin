/**
 * 员工证照模块
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button
} from 'antd';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';
import StaffCertEdit from './staff.cert.edit';

import {
  getStarffCertList,
  getStarffCertListAdd,
  getStarffCertListUpdate,
  getStarffCertListDelete
} from '../../common/api/api.staffmanagement';

import {
  getLocQueryByLabel,
  MyToast
} from '../../common/utils';


const columns = [
  {
    title: '证照名称',
    dataIndex: 'theName'
  },
  {
    title: '证书编号',
    dataIndex: 'serialNumber'
  }, {
    title: '专业类别',
    dataIndex: 'professionalCategory',
  }, {
    title: '发证单位',
    dataIndex: 'certificationUnit'
  }, {
    title: '复证周期',
    dataIndex: 'repetitionCycle'
  }, 
  // {
  //   title: '截止日期',
  //   dataIndex: 'expiryDatetime'
  // }, 
  {
    title: '文件下载',
    dataIndex: 'filePath',
    type: 'downloadfile'
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: '100px'
  }
];

const dataBlob = [{
  tableId: 1,
  theName: '证券从业证'
}];

/**
 * 证照信息
 * 不可编辑模块 + 弹框
 */
const StaffCertModule = connectUneditableSectionApi({
  secTitle: '证照信息',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    // 新增员工证照时，不需要调用接口
    if (apiListItemId === '') {
      return Promise.resolve({
        code: 0,
        data: []
      });
    }


    return new Promise((resolve, reject) => {
      getStarffCertList({staffId: apiListItemId}).then(res => {

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.memberCertificationList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        reject(err)
      })
    });  
  },
  
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getStarffCertListDelete(tableId).then(res => {
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
  modalTitle: '员工证照信息',
  modalComponent: StaffCertEdit
});





export default StaffCertModule;