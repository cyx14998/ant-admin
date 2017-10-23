import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getProductBaseInfoList,
  getProductBaseInfoDelete,
  getProductBaseInfoAdd
} from '../../common/api/api.customer';

import {
  MyToast
} from '../../common/utils';

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
  title: '设计年产量',
  dataIndex: 'designAnnualOutput',
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
  designAnnualOutput: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '名称--',
  unitOfMeasurement: 'kg',
  designAnnualOutput: '22.33',

}];

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '测试模块',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      getProductBaseInfoList({id: 1}).then(res => {
        console.log('getProductBaseInfoList res ---', res)
        var data = res.data.mainProductBaseInfoList;

        resolve({
          data,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
    // return Promise.resolve({
    //   data: dataSource
    // })    
  },
  apiSave: function (record) {
    console.log('apiSave record ----', record);
    var self = this;

    // 新增
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        getProductBaseInfoAdd({
          ...record,
        }).then(res => {
          if (res.data.result === 'success') {
            resolve({
              code: 0 // success
            })
          } else {
            resolve({
              code: 1,
              info: res.data.info,
            })
          }
        }).catch(err => {
          reject(err)
        });
      });
    } else {
      // 编辑
    }
  },
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getProductBaseInfoDelete(tableId).then(res => {
        if (res.data.result === 'success') {
          resolve({
            code: 0 // success
          })
        } else {
          resolve({
            code: 1,
            info: res.data.info,
          })
        }
      }).catch(err => {
        reject(err)
      });
    });
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;