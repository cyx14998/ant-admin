/**
 * 废水治理基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import { 
  getWastewaterTreatmentList,
  getWastewaterTreatmentAdd,
  getWastewaterTreatmentDelete,
  getWastewaterTreatmentUpdate,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

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
  dataIndex: 'approach',
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
 * 新数据默认值
 */
const itemDataModel = {
  theName: '',
  governanceType: '',
  approach: '',
  designProcessingPower: '',
  putInUseDate: '',
  standingBookURL: '',
};

const WasteWaterTreatment = connectEditableSectionApi({
  secTitle: '废水治理基本情况',
  columns: columns,
  apiLoader: function ({apiListItemId}) {
    var editId = apiListItemId;
    if(editId === undefined){
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve,reject) => {
      //获取数据
      getWastewaterTreatmentList({sourceType:0,sourceId:editId}).then(res => {
        // console.log('getWastewaterTreatmentList res ---', res);
        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.controlFacilitiesList;
        console.log(data);
        data = data.map((item,index) => {
          return {
            ...item,
            approach: item.approach.tableId
          }
        })
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
    console.log('apiSave record -------------', record);
    var self = this;
    if(record.apiListItemId === undefined){
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    }
    record.sourceId = record.apiListItemId;
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterTreatmentAdd({
          ...record,
          sourceType:0,
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
          sourceType:0
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