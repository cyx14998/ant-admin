/**
 * 现场检查、监督信息
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getSiteInspectionList,
  getSiteInspectionAdd,
  getSiteInspectionUpdate,
  getSiteInspectionDelete,
} from '../../common/api/api.customer.plus.js';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '监管日期',
  dataIndex: 'InspectionDate',
  width: '10%'
}, {
  title: '监管记录',
  dataIndex: 'recordURL',
  width: '10%'
}, {
  title: '反馈单',
  dataIndex: 'feedBackRecordURL',
  width: '10%'
}, {
  title: '整改报告',
  dataIndex: 'correctionReportURL',
  width: '10%'
}, {
  title: '约谈记录',
  dataIndex: 'interviewRecordURL',
  width: '10%'
}, {
  title: '检查支队处理情况',
  dataIndex: 'supervisionProcessing',
  width: '10%'
}, {
  title: '行政处罚',
  dataIndex: 'administrativePenaltiesURL',
  width: '10%'
}, {
  title: '信访记录',
  dataIndex: 'petitionRecordURL',
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
  InspectionDate: '',
  recordURL: '',
  feedBackRecordURL: '',
  correctionReportURL: '',
  interviewRecordURL: '',
  supervisionProcessing: '',
  administrativePenaltiesURL: '',
  petitionRecordURL: '',
};

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '现场检查、监督信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getSiteInspectionList({}).then(res => {
        console.log('getSiteInspectionList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerSiteInspectionList;
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
        getSiteInspectionAdd({
          ...record,
        }).then(res => {
          console.log("getSiteInspectionAdd res",res)
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
        getSiteInspectionUpdate({
          ...record,
        }).then(res => {
          console.log("getSiteInspectionUpdate res",res)
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
      getSiteInspectionDelete(tableId).then(res => {
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