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
  }, {
    title: '截止日期',
    dataIndex: 'expiryDatetime'
  }, {
    title: '文件下载',
    dataIndex: 'filePath'
  }
];

const dataBlob = [{
  tableId: 1,
  theName: '证券从业证'
}];

/**
 * ModalEdit component
 */
const InnerComponent = ({
  editId,
  showItemVisible,
  itemVisible,
}) => (
  <div>
    <div>
      待编辑数据的id是--{editId}
    </div>
    <div>

      <p>{itemVisible.toString()}</p>

      {
        itemVisible && <p>可控制隐藏显示---></p>
      }
    </div>
    <Button onClick={showItemVisible}>showItemVisible</Button>
  </div>
);

/**
 * 证照信息
 * 不可编辑模块 + 弹框
 */
const StaffCertModule = connectUneditableSectionApi({
  secTitle: '证照信息',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    // console.log('StaffCertModule apiListItemId--------------', apiListItemId)
    return new Promise((resolve, reject) => {
      getStarffCertList({staffId: apiListItemId}).then(res => {
        console.log('getProductBaseInfoList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = dataBlob; //res.data.memberCertificationList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        reject(err)
      })
    })
    // return Promise.resolve({
    //   data: dataSource
    // })    
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