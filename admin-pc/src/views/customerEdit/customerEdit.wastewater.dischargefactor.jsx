/**
 * 废水排放因子基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWastewaterDischargeFactorList,
  getWastewaterDischargeFactorAdd,
  getWastewaterDischargeFactorDelete,
  getWastewaterDischargeFactorUpdate,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '污染物名称',
  dataIndex: 'pollutantName',
  width: '10%'
}, {
  title: '输入执行标准文件号',
  dataIndex: 'executeStandardNumber',
  width: '10%'
}, {
  title: '标准值',
  dataIndex: 'standardValue',
  width: '10%'
}, {
  title: '污染源自动监控设施有/无',
  dataIndex: 'isAutoMOPS',
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
  pollutantName: '',
  executeStandardNumber: '',
  standardValue: '',
  isAutoMOPS: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '废水排放因子基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getWastewaterDischargeFactorList({}).then(res => {
        console.log('getWastewaterDischargeFactorList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.controlFacilitiesList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  apiSave: function (record) {
    // 新增
    console.log('apiSave record ----', record);
    var self = this;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        console.log("sssssssss")
        getWastewaterDischargeFactorAdd({
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
      return new Promise((resolve, reject) => {
        getWastewaterDischargeFactorUpdate({
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
    }
  },
  apiDel: function (tableId) {
    //删除
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWastewaterDischargeFactorDelete(tableId).then(res => {
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
})

export default WasteWaterDemoSection;