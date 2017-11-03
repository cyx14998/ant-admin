import React from 'react';
import {
  Button
} from 'antd';

import QiniuUploadFile from '../../components/upload.file';

/**
 * 模块测试
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import connectEditableModalSectionApi from '../../components/hoc.editable.modal.section';
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
}, {
  title: '计量单位',
  dataIndex: 'unitOfMeasurement',
}, {
  title: '文件上传',
  dataIndex: 'fileUpload',
  width: 180,
}, {
  title: '设计年产量',
  dataIndex: 'designAnnualOutput',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  theName: '',
  fileUpload: {
    cellType: 'fileUpload',
    fileList: []
  },
  unitOfMeasurement: '',
  designAnnualOutput: {
    value: '',
    options: []
  }
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '名称--',
  fileUpload: {
    cellType: 'fileUpload',
    fileList: [{
      uid: -1,
      name: 'file999.pdf',
      url: 'http://'
    }]
  },
  // unitOfMeasurement: 'kg',
  designAnnualOutput: {
    value: 'so',
    disabled: true,
    options: [{
      label: 'sosososo',
      value: 'so'
    }, {
      label: 'hahaha',
      value: 'ha'
    }]
  }
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

      <p>{(itemVisible && itemVisible.toString()) || 'hello'}</p>

      {
        itemVisible && <p>可控制隐藏显示---></p>
      }
    </div>
    { showItemVisible && (<Button onClick={showItemVisible}>showItemVisible</Button>) }
  </div>
);

/**
 * 可编辑模块
 */
const EditableDemoSection = connectEditableSectionApi({
  secTitle: '可编辑table测试模块',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: dataSource
      });
      return;
      
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
    });
    // return Promise.resolve({
    //   data: dataSource
    // })    
  },
  apiSave: function (record) {
    console.log('apiSave record ----', record);

    return Promise.resolve({
      code: 0,    
    });

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

/**
 * 不可编辑模块 + 弹框
 */
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


/**
 * 可编辑模块 + 弹框
 */
const EditableModalDemoSection = connectEditableModalSectionApi({
  secTitle: '可编辑table模块 + modal',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: dataSource
      });
      return;
      
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
  },
  apiSave: function (record) {
    console.log('apiSave record ----', record);

    return Promise.resolve({
      code: 0,    
    });

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
  itemDataModel: itemDataModel,

  // 弹窗组件
  modalTitle: '某某模块',
  modalComponent: InnerComponent
});



export {
  EditableDemoSection,
  UneditableDemoSection,
  EditableModalDemoSection
}

