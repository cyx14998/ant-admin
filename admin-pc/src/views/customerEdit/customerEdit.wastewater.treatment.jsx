/**
 * 废水治理基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getApproachList,
  getWastewaterTreatmentList,
  getWastewaterTreatmentAdd,
  getWastewaterTreatmentDelete,
  getWastewaterTreatmentUpdate,
} from '../../common/api/api.customer.plus.js';

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';

import axios from '../../common/api';

/**
 * table head
 */
const columns = [{
  title: '治理设施名称',
  dataIndex: 'theName',
}, {
  title: '治理类型',
  dataIndex: 'governanceType',
}, {
  title: '处理方法ID',
  dataIndex: 'approachId',
}, {
  title: '设计处理能力',
  dataIndex: 'designProcessingPower',
}, {
  title: '投入使用日期',
  dataIndex: 'putInUseDate',
}, {
  title: '传台账记录',
  dataIndex: 'standingBookURL',
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
  governanceType: '',
  approachId: '',
  designProcessingPower: '',
  putInUseDate: moment(new Date()).format(dateFormat),
  standingBookURL: '',
};

/**
 * @params apiListItemId
 */
const WasteWaterTreatment = connectEditableSectionApi({
  secTitle: '废水治理基本情况',
  columns: columns,
  apiLoader: function ({ apiListItemId }) {
    var editId = apiListItemId;
    if (editId === undefined) {
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve, reject) => {
      axios.all([
        getApproachList({}),
        getWastewaterTreatmentList({ sourceType: 0, sourceId: editId }),
      ]).then(axios.spread((approachList, wwTreatmentList) => {
        console.log("approachList=====================", approachList),
        console.log("wwTreatmentList=====================",wwTreatmentList)
        //废气治理列表
        var wwTreatmentData = wwTreatmentList.data.controlFacilitiesList;
        //处理方法列表
        var approachList = approachList.data.approachList;
        var approachData = {
          value: "1",
          options: convertObjectLabel(approachList)
        };
        itemDataModel.approachId = approachData;
        wwTreatmentData = wwTreatmentData ? wwTreatmentData.map(item => {
          return {
            ...item,
            approachId: {
              value: item.approach.tableId + '',
              options: convertObjectLabel(approachList)
            },
          }
        }) : [];
        //渲染页面
        resolve({
          code: 0,
          data: wwTreatmentData,
        })
      }))
    })
  },
  apiSave: function (record) {
    // 新增
    record.approachId = record.approachId.value;
    var self = this;
    if (record.apiListItemId === undefined) {
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    };
    record.sourceId = record.apiListItemId;
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterTreatmentAdd({
          ...record,
          sourceType: 0
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
        getWastewaterTreatmentUpdate({
          ...record,
          sourceType: 0
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
      getWastewaterTreatmentDelete(tableId).then(res => {
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

export default WasteWaterTreatment;