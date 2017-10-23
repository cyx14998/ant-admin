/**
 * 废水污染物排放情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWastewaterList,
  deleteWastewaterPort,
  addWastewaterPort
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
  title: '经度',
  dataIndex: 'longitude',
  width: '5%'
}, {
  title: '纬度',
  dataIndex: 'latitude',
  width: '5%'
}, {
  title: '排放去向',
  dataIndex: 'emissionDestination',
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
  longitude: '',
  latitude: '',
  emissionDestination: '',
  dischargeLaw: '',
  functionalAreaCategory: '',
  createDatetime: '',
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  key: '0',
  name: 'Edward King 0',
  age: '2017-11-11',
  company: {
    value: '',
    options: options
  },
  address: 'London, Park Lane no. 0'
}];

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '测试模块',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      getWastewaterList({}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.result);
          return;
        }
        var datas = res.data.wasteWaterDischargePortList;
        console.log("=======================",datas);
        //后端因为字段为undefined就不返回该字段，导致出现bug，因为不太好处理该数据
        resolve({
          data: datas,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  apiSave: function (record) {
    // 新增
    console.log(record);
    if (record.tableId === '') {
      return new Promise((resolve,reject) => {
        addWastewaterPort(record).then(res => {
          if (res.data.result !== 'success') {
            MyToast(res.data.result);
            return;
          }
          // var datas = res.data.wasteWaterDischargePortList;
          // console.log("=======================",datas);
          // resolve({
          //   data: datas,
          // })
        }).catch(err => {
          MyToast('接口调用失败')
        })
      })
    } else {
      // 编辑
    }
    
  },
  apiDel: function (tableId) {
    return new Promise((resolve,reject) => {
      deleteWastewaterPort({tableId:tableId}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.result);
          return;
        }
        // var datas = res.data.wasteWaterDischargePortList;
        console.log("=======================",res);
        // resolve({
        //   data: datas,
        // })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;