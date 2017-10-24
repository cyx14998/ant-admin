/**
 * 废气污染物排放情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getEIAList,
  getEIAAdd,
  getEIAUpdate,
  getEIADelete,
} from '../../common/api/api.customer.plus.js';

/**
 * table head
 */
const columns = [{
  title: '环评建设项目名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '环评等级',
  dataIndex: 'theLevel',
  width: '5%'
}, {
  title: '编制日期',
  dataIndex: 'editDatetime',
  width: '5%'
}, {
  title: '试生产批复-环保部门审批文号',
  dataIndex: 'DocumentNumberTPA',
  width: '12%'
}, {
  title: '试生产批复-审批时间',
  dataIndex: 'approvalTimeTPA',
  width: '10%'
}, {
  title: '环评批复-环保部门审批文号',
  dataIndex: 'DocumentNumberEIA',
  width: '11%'
}, {
  title: '环评批复-审批时间',
  dataIndex: 'approvalTimeEIA',
  width: '10%'
}, {
  title: '竣工验收批复-环保部门审批文号',
  dataIndex: 'DocumentNumberFAA',
  width: '12%'
}, {
  title: '竣工验收批复-审批时间',
  dataIndex: 'approvalTimeFAA',
  width: '10%'
}, {
  title: '自主验收文件',
  dataIndex: 'SelfAcceptanceURL',
  width: '10%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '5%'
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
  theLevel: '',
  editDatetime: '',
  DocumentNumberTPA: '',
  approvalTimeTPA: '',
  DocumentNumberEIA: '',
  approvalTimeEIA: '',
  DocumentNumberFAA: '',
  approvalTimeFAA: '',
  SelfAcceptanceURL: '',
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
  secTitle: '环评信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getBoundaryNoiseList({}).then(res => {
        console.log('getBoundaryNoiseList res ---', res);

        // if (res.data.result !== 'success') {
        //   resolve({
        //     code: -1,
        //     info: res.data.info,
        //   })
        //   return;
        // }

        // var data = res.data.boundaryNoiseList;
        // resolve({
        //   code: 0,
        //   data,
        // })
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
        getBoundaryNoiseAdd({
          ...record,
        }).then(res => {
          console.log("getBoundaryNoiseAdd res",res)
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
        getBoundaryNoiseUpdate({
          ...record,
        }).then(res => {
          console.log("getBoundaryNoiseUpdate res",res)
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
      getBoundaryNoiseDelete(tableId).then(res => {
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