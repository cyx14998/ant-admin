/**
 * 主要产品基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
  getProductBaseInfoList,
  getProductBaseInfoAdd,
  getProductBaseInfoEdit,
  getProductBaseInfoDelete,
} from '../../common/api/api.customer';

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
  title: '设计年产量',
  dataIndex: 'designAnnualOutput',
  validateType: 'number',
}, {
  title: '实际产量',
  dataIndex: 'realAnnualOutput',
  validateType: 'number',
},{
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
  unitOfMeasurement: '',
  designAnnualOutput: '',
  realAnnualOutput:'',
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '本地名称',
  unitOfMeasurement: 'kg',
  designAnnualOutput: '22.33',
  realAnnualOutput:'123'

}];

export const CustomerEditBaseinfoProd = connectEditableSectionApi({
  secTitle: '主要产品基本信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      // 获取产品信息列表
      var cusId = getLocQueryByLabel('id');
      
      if (!cusId) {
        cusId = localStorage.getItem('yt-customerId');
      }

      if (!cusId)  return;

      getProductBaseInfoList({}).then(res => {
        console.log('prolist res--------',res);

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
    // var self = this;
    if (record.tableId === '') {
      // 新增      
      return new Promise((resolve, reject) => {
        getProductBaseInfoAdd(record).then(res => {
          console.log('AddProd res-------', res);

          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            });
            return
          }

          resolve({
            code: 0 // success
          });
        }).catch(err => {
          reject(err)
        });
      })
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getProductBaseInfoEdit(record).then(res => {
          console.log('AddProd res----------', res);

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
    return new Promise((resolve, reject) => {
      getProductBaseInfoDelete(tableId).then(res => {
        console.log('DeleteProd res-----------', res);

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

export default CustomerEditBaseinfoProd;