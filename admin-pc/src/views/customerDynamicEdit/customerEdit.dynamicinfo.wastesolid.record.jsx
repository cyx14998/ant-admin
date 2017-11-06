/**
 * 固体废物产生及处置情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWasteSolidRecordList,
  getWasteSolidRecordAdd,
  getWasteSolidRecordUpdate,
  getWasteSolidRecordDelete,

  getWasteSolidList,
} from '../../common/api/api.customer.dynamic.plus';

import {
  getLocQueryByLabel,
  convertObjectLabel,
  MyToast
} from '../../common/utils';

const dynamicId = getLocQueryByLabel('dynamicId');

/**
 * table head
 */
const columns = [{
  title: '废物名称',
  dataIndex: 'theName',
}, {
  title: '所属固体废物',
  dataIndex: 'wasteSolidId',
  width: 80,
}, {
  title: '主要污染物',
  dataIndex: 'mainPollutants',
}, {
  title: '产生量(顿)',
  dataIndex: 'productionQuantity',
}, {
  title: '综合利用量',
  dataIndex: 'comprehensiveUtilization',
}, {
  title: '处置去向',
  dataIndex: 'disposeWhereabouts',
}, {
  title: '处置量-符合环保标准的量(吨)',
  dataIndex: 'disposalCapacityLawful',
}, {
  title: '贮存量-符合环保标准的量(吨)',
  dataIndex: 'storageCapacityLawful',
}, {
  title: '处置量-不符合环保标准的量(吨)',
  dataIndex: 'disposalCapacityUnLawful',
}, {
  title: '贮存量-不符合环保标准的量(吨)',
  dataIndex: 'storageCapacityUnLawful',
}, {
  title: '排放量-不符合环保标准的量(吨)',
  dataIndex: 'emissionAmount',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  theName: '',
  wasteSolidId: {
    value: '',
    options: []
  },
  mainPollutants: '',
  productionQuantity: '',
  comprehensiveUtilization: '',
  disposeWhereabouts: '',
  disposalCapacityLawful: '',
  storageCapacityLawful: '',
  disposalCapacityUnLawful: '',
  storageCapacityUnLawful: '',
  emissionAmount: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '固体废物产生及处置情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      if(!dynamicId) return;

      /**
       * 固体废物可选项
       */
      getWasteSolidList({}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.info || '获取固体废物选项失败');
          return;
        }

        var wasteSolidList = res.data.wasteSolidList;

        var wasteSolidListOptions = convertObjectLabel(wasteSolidList, 'tableId', 'theName'); 
        return wasteSolidListOptions;
      }).then(wasteSolidListOptions => {
        console.log('wasteSolidListOptions-----------', wasteSolidListOptions);
        itemDataModel.wasteSolidId.options = wasteSolidListOptions;

        getWasteSolidRecordList({customerMonthDclarationId: dynamicId}).then(res => {
          console.log('getWasteSolidRecordList res ---', res);
          
          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            })
            return;
          }

          var data = res.data.wasteSolidRecordList;

          data = data.map(item => {
            return {
              ...item,
              wasteSolidId: {
                value: (item.wasteSolidId && item.wasteSolidId + '') || '',
                options: wasteSolidListOptions
              }
            }
          });

          resolve({
            code: 0,
            data,
          })
        }).catch(err => {
          MyToast('接口调用失败')
        })

      }).catch(err => MyToast(err));
    })
  },
  apiSave: function (record) {
    // 新增
    console.log('apiSave record ----', record);
    var self = this;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWasteSolidRecordAdd({
          ...record,
          customerMonthDclarationId: dynamicId,
          wasteSolidId: parseInt(record.wasteSolidId.value),
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
        getWasteSolidRecordUpdate({
          ...record,
          customerMonthDclarationId: dynamicId,
          wasteSolidId: parseInt(record.wasteSolidId.value),
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
      getWasteSolidRecordDelete(tableId).then(res => {
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