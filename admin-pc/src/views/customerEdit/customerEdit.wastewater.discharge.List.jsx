/**
 *  废水排放口基本信息列表
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWastewaterDischargeList,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '排水口编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '排放口名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '排放口位置',
  dataIndex: 'outletLocation',
  width: '10%'
}, {
  title: '排放口去向',
  dataIndex: 'emissionDestination',
  width: '10%'
}, {
  title: '水体名称',
  dataIndex: 'nameOfWaterBody',
  width: '10%'
}, {
  title: '污水排放规律',
  dataIndex: 'dischargeLaw',
  width: '10%'
}, {
  title: '功能区类别',
  dataIndex: 'functionalAreaCategory',
  width: '10%'
}, {
  title: '创建时间',
  dataIndex: 'createDatetime',
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
  serialNumber: '',
  theName: '',
  outletLocation: '',
  emissionDestination: '',
  nameOfWaterBody: '',
  dischargeLaw: '',
  functionalAreaCategory: '',
  createDatetime: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '废水排放口基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getWastewaterDischargeList({}).then(res => {
        console.log('getWastewaterList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterDischargePortList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;