/**
 * 原辅材料基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
  getMaterialBaseInfoList,
  getMaterialBaseInfoAdd,
  getMaterialBaseInfoEdit,
  getMaterialBaseInfoDelete,
} from '../../common/api/api.customer';

/**
 * table head
 */
const columns = [{
  title: '原辅材料名称',
  dataIndex: 'theName',
}, {
  title: '计量单位',
  dataIndex: 'unitOfMeasurement',
}, {
  title: '设计用耗量',
  dataIndex: 'designConsumption',
  validateType: 'number',
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
  unitOfMeasurement: '',
  designConsumption: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '本地名称',
  unitOfMeasurement: 'kg',
  designConsumption: '22.33',
}];

export const CustomerEditBaseinfoProd = connectEditableSectionApi({
  secTitle: '原辅材料基本信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      // 获取原辅材料信息列表
      var cusId = getLocQueryByLabel('id');
            
      if (!cusId) {
        cusId = localStorage.getItem('yt-customerId');
      }
      if (!cusId) return;

      getMaterialBaseInfoList({}).then(res => {
        console.log('materiallist res', res)
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }
        var data = res.data.auxiliaryMaterialsBaseInfoList;
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
    console.log(record)
    // var self = this;
    if (record.tableId === '') {
      // 新增      
      return new Promise((resolve, reject) => {
        getMaterialBaseInfoAdd(record).then(res => {
          console.log('AddMaterial res', res);
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
          console.log('err-------------------------', err)
          // reject(err)
        });
      })
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getMaterialBaseInfoEdit(record).then(res => {
          console.log('AddMaterial res', res);
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
      getMaterialBaseInfoDelete(tableId).then(res => {
        console.log('DeleteMaterial res', res);
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