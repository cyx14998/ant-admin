/**
 * 废气治理基本情况
 */

import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getApproachList,
  getWastewaterTreatmentList,
  getWastewaterTreatmentAdd,
  getWastewaterTreatmentDelete,
  getWastewaterTreatmentUpdate,
} from '../../common/api/api.customer.plus.js';
const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';

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
  title: '处理方法',
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
 * 新数据默认值
 */
const itemDataModel = {
  theName: '',
  governanceType: '',
  approachId: '',
  designProcessingPower: '',
  putInUseDate: moment(new Date()).format(dateFormat),
  standingBookURL: {
    cellType: 'fileUpload',
    fileList: []
  },
};

/**
 * @params apiListItemId
 */
const WasteGasTreatment = connectEditableSectionApi({
  secTitle: '废气治理基本情况',
  columns: columns,
  apiLoader: function ({ apiListItemId }) {
    var editId = apiListItemId;
    if (editId === undefined) {
      editId = localStorage.getItem('wastewater-discharge-editId');
    }
    return new Promise((resolve, reject) => {
      axios.all([
        getApproachList({}),
        getWastewaterTreatmentList({ sourceType: 1, sourceId: editId }),
      ]).then(axios.spread((approachList, wwTreatmentList) => {
        console.log("approachList=====================", approachList),
          console.log("wwTreatmentList=====================", wwTreatmentList)
        //废气治理列表
        var wwTreatmentData = wwTreatmentList.data.controlFacilitiesList;

        //处理方法列表
        var approachList = approachList.data.approachList;

        var approachData = {
          value: "1",
          options: convertObjectLabel(approachList)
        };

        itemDataModel.approachId = approachData;

        var data = wwTreatmentData.map(item => {
          var fileList = item.standingBookURL ? [{uid: -1, name: '文件', url: item.standingBookURL}] : [];
         
          return {
            ...item,
            approachId: {
              value: (item.approach && item.approach.tableId && item.approach.tableId + '') || '',
              options: convertObjectLabel(approachList)
            },
            standingBookURL: {
              cellType: 'fileUpload',
              fileList,
            }
          }
        });

        //渲染页面
        resolve({
          code: 0,
          data,
        })
      }))
    })
  },
  apiSave: function (record) {
 
    var self = this;
    if (record.apiListItemId === undefined) {
      record.apiListItemId = localStorage.getItem('wastewater-discharge-editId')
    };

    var file = record.standingBookURL.fileList[0];
    var filePath = '';

    if (file && file.url) {
      filePath = file.url
    }

    if (file && file.response) {
      filePath = downloadUrl + file.response.filePath;
    }

    /**
     * fix bug 
     * 文件上传后，新增项带有文件
     */
    itemDataModel.standingBookURL.fileList = [];

    const _record_for_save = {
      ...record,
      sourceId: record.apiListItemId,
      approachId: record.approachId.value,
      standingBookURL: filePath,
    }
    
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterTreatmentAdd({
          ..._record_for_save,
          sourceType: 1
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
          ..._record_for_save,
          sourceType: 1
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