/**
 * 废水污染物排放情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteSolidList,
  getWastesolidDelete,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '是否危废',
  dataIndex: 'isHazardousWaste',
  width: '10%'
}, {
  title: '处置方式',
  dataIndex: 'hazardousWasteName',
  width: '10%'
}, {
  title: '废物名称',
  dataIndex: 'disposalMethod',
  width: '10%'
}, {
  title: '废物产生工艺',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '危险废物名称',
  dataIndex: 'processing',
  width: '10%'
}, {
  title: '贮存场所位置',
  dataIndex: 'storagePlaceAddress',
  width: '10%'
}, {
  title: '处置单位名称',
  dataIndex: 'disposeUnitName',
  width: '10%'
}, {
  title: '备案信息',
  dataIndex: 'filingInfoURL',
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
  isHazardousWaste: '',
  hazardousWasteName: '',
  disposalMethod: '',
  theName: '',
  processing: '',
  storagePlaceAddress: '',
  disposeUnitName: '',
  filingInfoURL: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '固体废物基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      console.log("ssssssss");
      getWasteSolidList({}).then(res => {
        console.log('getWasteSolidList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteSolidList;
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
    // // 新增
    // console.log('apiSave record ----', record);
    // var self = this;

    // if (record.tableId === '') {
    //   return new Promise((resolve, reject) => {
    //     // 新增
    //     getWastewaterDischargeAdd({
    //       ...record,
    //     }).then(res => {
    //       if (res.data.result !== 'success') {
    //         resolve({
    //           code: 1,
    //           info: res.data.info,
    //         });
    //         return;
    //       }

    //       resolve({
    //         code: 0 // success
    //       })
    //     }).catch(err => {
    //       reject(err)
    //     });
    //   });
    // } else {
    //   // 编辑
    //   return new Promise((resolve, reject) => {
    //     getWastewaterDischargeUpdate({
    //       ...record,
    //     }).then(res => {
    //       if (res.data.result !== 'success') {
    //         resolve({
    //           code: 1,
    //           info: res.data.info,
    //         });
    //         return;
    //       }

    //       resolve({
    //         code: 0 // success
    //       })
    //     }).catch(err => {
    //       reject(err)
    //     });
    //   });
    // }
  },
  apiDel: function (tableId) {
    //删除
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWastesolidDelete(tableId).then(res => {
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