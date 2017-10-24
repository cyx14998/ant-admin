/**
 * 废水污染物排放情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteSolidDetail,
  getWastesolidAdd,
  getWastesolidUpdate,
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
  width: '6%'
}, {
  title: '是否危废',
  dataIndex: 'isHazardousWaste',
  width: '6%'
}, {
  title: '处置方式',
  dataIndex: 'hazardousWasteName',
  width: '6%'
}, {
  title: '废物名称',
  dataIndex: 'disposalMethod',
  width: '6%'
}, {
  title: '废物产生工艺',
  dataIndex: 'theName',
  width: '6%'
}, {
  title: '危险废物名称',
  dataIndex: 'processing',
  width: '6%'
}, {
  title: '危险代码',
  dataIndex: 'dangerCode',
  width: '6%'
}, {
  title: '危险废物产生环节',
  dataIndex: 'generatingLinks',
  width: '8%'
}, {
  title: '危险废物年产生量',
  dataIndex: 'annualProduction',
  width: '8%'
}, {
  title: '贮存场所位置',
  dataIndex: 'storagePlaceAddress',
  width: '6%'
}, {
  title: '贮存场所照片',
  dataIndex: 'storagePlaceImageURL',
  width: '6%'
}, {
  title: '台账记录',
  dataIndex: 'standingBookURL',
  width: '6%'
}, {
  title: '处置单位名称',
  dataIndex: 'disposeUnitName',
  width: '6%'
}, {
  title: '备案信息',
  dataIndex: 'filingInfoURL',
  width: '6%'
}, {
  title: '转移联单',
  dataIndex: 'transferManifestURL',
  width: '6%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '6%'
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
  dangerCode: '',
  generatingLinks: '',
  annualProduction: '',
  storagePlaceAddress: '',
  storagePlaceImageURL: '',
  standingBookURL: '',
  disposeUnitName: '',
  filingInfoURL: '',
  transferManifestURL: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '固体废物基本信息详情',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      console.log("ssssssss");
      getWasteSolidDetail({}).then(res => {
        console.log('getWastewaterDetail res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = [res.data.wasteSolid];
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
        getWastesolidAdd({
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
        console.log(record)
        getWastesolidUpdate({
          ...record,
        }).then(res => {
          console.log("getWastesolidUpdate res",res)
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