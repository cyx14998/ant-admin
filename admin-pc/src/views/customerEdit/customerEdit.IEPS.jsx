/**
 * 企业内部环保管理制度
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getIEPSList,
  getIEPSAdd,
  getIEPSUpdate,
  getIEPSDelete,
} from '../../common/api/api.customer.plus.js';

/**
 * table head
 */
const columns = [{
  title: '制度名称',
  dataIndex: 'theName',
}, {
  title: '执行情况',
  dataIndex: 'implementation',
}, {
  title: '下载路径',
  dataIndex: 'filePath',
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
  theName: '',
  implementation: '',
  filePath: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '企业内部环保管理制度基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getIEPSList({}).then(res => {
        console.log('getIEPSList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerIEPSList;
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
        getIEPSAdd({
          ...record,
        }).then(res => {
          console.log("getIEPSAdd res",res)
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
        getIEPSUpdate({
          ...record,
        }).then(res => {
          console.log("getIEPSUpdate res",res)
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
      getIEPSDelete(tableId).then(res => {
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