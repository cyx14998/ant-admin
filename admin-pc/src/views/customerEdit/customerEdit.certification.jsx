/**
 * 企业证照材料基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getCertificationList,
  getCertificationAdd,
  getCertificationUpdate,
  getCertificationDelete,
} from '../../common/api/api.customer.plus.js';

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

/**
 * table head
 */
const columns = [{
  title: '名称',
  dataIndex: 'theName',
}, {
  title: '发放日期',
  dataIndex: 'releaseDatetime',
}, {
  title: '截止日期',
  dataIndex: 'expiryDatetime',
}, {
  title: '下载路径',
  dataIndex: 'filePath',
}, {
  title: '审批单位',
  dataIndex: 'approvalUnit',
}, {
  title: '备注',
  dataIndex: 'theRemarks',
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
  releaseDatetime: moment(new Date()).format(dateFormat),
  expiryDatetime: moment(new Date()).format(dateFormat),
  filePath: '',
  approvalUnit: '',
  theRemarks: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '企业证照材料基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getCertificationList({}).then(res => {
        console.log('getCertificationList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerCertificationList;
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
        getCertificationAdd({
          ...record,
        }).then(res => {
          console.log("getCertificationAdd res",res)
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
        getCertificationUpdate({
          ...record,
        }).then(res => {
          console.log("getCertificationUpdate res",res)
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
      getCertificationDelete(tableId).then(res => {
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