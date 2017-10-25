import React from 'react';
/**
 * 模块测试
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

import {
  getProductBaseInfoList,
  getProductBaseInfoDelete,
  getProductBaseInfoAdd
} from '../../common/api/api.customer';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '主要产品名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '计量单位',
  dataIndex: 'unitOfMeasurement',
  width: '10%'
}, {
  title: '设计年产量',
  dataIndex: 'designAnnualOutput',
  width: '10%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '10%'
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  theName: '',
  unitOfMeasurement: '',
  designAnnualOutput: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '名称--',
  unitOfMeasurement: 'kg',
  designAnnualOutput: '22.33',

}];

/**
 * ModalEdit component
 */
const InnerComponent = ({
  editId
}) => (
  <div>
    待编辑数据的id是--{editId}
  </div>
);


const EditableDemoSection = connectEditableSectionApi({
  secTitle: '可编辑table测试模块',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      getProductBaseInfoList({}).then(res => {
        console.log('getProductBaseInfoList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.mainProductBaseInfoList;
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
  apiSave: function (record) {
    console.log('apiSave record ----', record);
    var self = this;

    // 新增
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        getProductBaseInfoAdd({
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
    }
  },
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getProductBaseInfoDelete(tableId).then(res => {
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
});

const UneditableDemoSection = connectUneditableSectionApi({
  secTitle: '不可编辑table测试模块',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      getProductBaseInfoList({}).then(res => {
        console.log('getProductBaseInfoList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.mainProductBaseInfoList;
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
      getProductBaseInfoDelete(tableId).then(res => {
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
  modalTitle: '某某模块',
  modalComponent: InnerComponent

});



export {
  EditableDemoSection,
  UneditableDemoSection
}

