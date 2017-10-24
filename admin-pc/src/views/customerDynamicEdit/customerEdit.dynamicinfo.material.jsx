/**
 * 原辅材料基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
  getMaterialDynamicInfoList,
  getMaterialDynamicInfoAdd,
  getMaterialDynamicInfoEdit,
  getMaterialDynamicInfoDelete,
} from '../../common/api/api.customer';

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
  title: '设计用耗量',
  dataIndex: 'consumption',
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
  consumption: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '本地名称',
  unitOfMeasurement: 'kg',
  consumption: '22.33',
}];

export const CustomerEditDynamicinfoMaterial = connectEditableSectionApi({
  secTitle: '原辅材料基本信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      // 获取原辅材料信息列表
      var cusId = getLocQueryByLabel('id');
      if (!cusId) return;

      getMaterialDynamicInfoList({}).then(res => {
        console.log('materiallist res',res)        
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }
        var data = res.data.auxiliaryMaterialsConsumptionLis;
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
        getMaterialDynamicInfoAdd(record).then(res => {
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
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getMaterialDynamicInfoEdit(record).then(res => {
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
      getMaterialDynamicInfoDelete(tableId).then(res => {
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

export default CustomerEditDynamicinfoMaterial;