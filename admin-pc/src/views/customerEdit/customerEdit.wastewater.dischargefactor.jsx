/**
 * 废水排放因子基本情况
 */
import React from 'react';
import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getWastewaterDischargeFactorList,
  getWastewaterDischargeFactorAdd,
  getWastewaterDischargeFactorDelete,
  getWastewaterDischargeFactorUpdate,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast,
  convertObjectLabel,
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '污染物名称',
  dataIndex: 'pollutantName',
}, {
  title: '输入执行标准文件号',
  dataIndex: 'executeStandardNumber',
}, {
  title: '标准值',
  dataIndex: 'standardValue',
}, {
  title: '污染源自动监控设施有/无',
  dataIndex: 'isAutoMOPS',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
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
  isAutoMOPS: {
    value: '1',
    options: [{
      value: "1",
      label: '是'
    }, {
      value: "0",
      label: '否'
    }]
  },
};

function getEditIdHook(id) {
  return id;
}

/**
 * @params apiListItemId
 */
const WasteWaterDischargeFactor = connectEditableSectionApi({
  secTitle: '废水排放因子基本情况',
  columns: columns,
  apiLoader: function ({ apiListItemId }) {
    var editId = apiListItemId;
    if (editId === undefined) {
      editId = localStorage.getItem('wastewater-discharge-editId');
    }

    // console.log('apiLoader eidtId -----------', editId)
    return new Promise((resolve, reject) => {
      //获取数据
      getWastewaterDischargeFactorList({ wasteWaterDischargePortId: editId }).then(res => {
        // console.log('-------------getWastewaterDischargeFactorList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterDischargeFactorList || [];

        data = data.map((item, index) => {
          return {
            ...item,
            isAutoMOPS: {
              value: item.isAutoMOPS == true ? "1" : "0",
              options: [{
                value: "1",
                label: "是"
              }, {
                value: "0",
                label: "否"
              }]
            }
          }
        })
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
    // console.log('apiSave apiListItemId ----', record);
    // record.isAutoMOPS = record.isAutoMOPS.value;
    var self = this;

    if (record.apiListItemId === undefined) {
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    }

    // record.wasteWaterDischargePortId = record.apiListItemId;
    // record.isAutoMOPS = record.isAutoMOPS.value === '1' ? true : false;

    const _record_for_save = {
      ...record,
      wasteWaterDischargePortId: record.apiListItemId,
      isAutoMOPS: record.isAutoMOPS.value === '1' ? true : false,
    }

    console.log('废水因子保存-------------', record)
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterDischargeFactorAdd({
          ..._record_for_save,
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
          ..._record_for_save,
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
});

export default WasteWaterDischargeFactor;