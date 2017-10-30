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
  width: '10%'
}, {
  title: '治理类型',
  dataIndex: 'governanceType',
  width: '10%'
}, {
  title: '处理方法ID',
  dataIndex: 'approachId',
  width: '10%'
}, {
  title: '设计处理能力',
  dataIndex: 'designProcessingPower',
  width: '10%'
}, {
  title: '投入使用日期',
  dataIndex: 'putInUseDate',
  width: '5%'
}, {
  title: '传台账记录',
  dataIndex: 'standingBookURL',
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
  theName: '',
  governanceType: '',
  approachId: '',
  designProcessingPower: '',
  putInUseDate: '',
  standingBookURL: '',
};

/**
 * @params apiListItemId
 */
const WasteGasTreatment = connectEditableSectionApi({
  secTitle: '废气治理基本情况',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    var editId = apiListItemId;
    if(editId === undefined){
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve,reject) => {
      axios.all([
        getApproachList({}),
        getWastewaterTreatmentList({sourceType:1,sourceId:editId}),
      ]).then(axios.spread((approachList, wwTreatmentList) => {
        console.log("approachList=====================",approachList),
        console.log("wwTreatmentList=====================",wwTreatmentList)
        //废气治理列表
        var wwTreatmentData = wwTreatmentList.data.controlFacilitiesList;
        //处理方法列表
        var approachList = approachList.data.approachList;
        var approachData = {
          value: "1",
          options: convertObjectLabel(approachList)
        };
        itemDataModel.approachId = approachData;  //噪声源性质
        wwTreatmentData = wwTreatmentData.map( item => {
          return {
            ...item,
            approachId: {
              value: item.approach.tableId+'',
              options: convertObjectLabel(approachList)
            },
          }
        });
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
    if(record.apiListItemId === undefined){
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    };
    record.sourceId = record.apiListItemId;
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterTreatmentAdd({
          ...record,
          sourceType:1
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
          sourceType:1
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

export default WasteGasTreatment;