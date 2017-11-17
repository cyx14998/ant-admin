/**
 * 能源基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
  getEnergyBaseInfoList,
  getEnergyBaseInfoAdd,
  getEnergyBaseInfoEdit,
  getEnergyBaseInfoDelete,
} from '../../common/api/api.customer';

/**
 * table head
 */
const columns = [{
  title: '企业使用能源情况',
  dataIndex: 'theContent',
}, {
  title: '能源种类',
  dataIndex: 'theType',
}, {
  title: '年耗量',
  dataIndex: 'annualConsumption',
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
  theContent: '',
  theType: '',
  annualConsumption: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theContent: '本地名称',
  theType: 'kg',
  annualConsumption: '22.33',
}];

export const CustomerEditBaseinfoEnergy = connectEditableSectionApi({
  secTitle: '企业能源信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      // 获取能源信息列表
      var cusId = getLocQueryByLabel('id');
      if (!cusId) {
        cusId = localStorage.getItem('yt-customerId');
      }
      if (!cusId) return;

      getEnergyBaseInfoList({}).then(res => {
        console.log('Energyllist res', res)
        if (res.data.result !== 'success') {
          console.log(res.data.info)
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }
        var data = res.data.useInfoEnergyList;
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
        getEnergyBaseInfoAdd(record).then(res => {
          console.log('AddEnergyl res', res);
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
        getEnergyBaseInfoEdit(record).then(res => {
          console.log('AddEnergyl res', res);
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
      getEnergyBaseInfoDelete(tableId).then(res => {
        console.log('DeleteEnergyl res', res);
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

export default CustomerEditBaseinfoEnergy;