/**
 * 主要产品基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
  getProductDynamicInfoList,
  getProductDynamicInfoAdd,
  getProductDynamicInfoEdit,
  getProductDynamicInfoDelete,
} from '../../common/api/api.customer.dynamic';

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
  title: '产量',
  dataIndex: 'yield',
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
  yield: '',
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '本地名称',
  unitOfMeasurement: 'kg',
  yield: '20'
}];

export const CustomerEditDynamicinfoProd = connectEditableSectionApi({
  secTitle: '主要产品基本信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      // 获取产品信息列表
      var cusId = getLocQueryByLabel('id');
      if (!cusId) return;

      getProductDynamicInfoList({}).then(res => {
        console.log('prolist res',res)        
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }
        var data = res.data.mainProductOutputList;
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
    console.log('record--------------------', record)
    // var self = this;
    if (record.tableId === '') {
      // 新增      
      return new Promise((resolve, reject) => {
        getProductDynamicInfoAdd(record).then(res => {
          console.log('AddProd res', res);
          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            });
            return
          }
          resolve({
            code: 0 // success
          })
        }).catch(err => {
          reject(err)
        });
      })
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getProductDynamicInfoEdit(record).then(res => {
          console.log('AddProd res', res);
          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            });
            return
          }
          resolve({
            code: 0 // success
          })
        }).catch(err => {
          reject(err)
        });
      })
    }
  },
  apiDel: function (tableId) {
    console.log(tableId)
    return new Promise((resolve, reject) => {
      getProductDynamicInfoDelete(tableId).then(res => {
        console.log('DeleteProd res', res);
        if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            });
            return
          }
          resolve({
            code: 0 // success
          })
      }).catch(err => {
        reject(err)
      });
    });
  },
  itemDataModel: itemDataModel
})

export default CustomerEditDynamicinfoProd;