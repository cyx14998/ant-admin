/**
 * 边界噪声情况
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getBoundaryNoiseList,
  getBoundaryNoiseAdd,
  getBoundaryNoiseUpdate,
  getBoundaryNoiseDelete,
  getFunctionalAreaTypeList,
  getNoiseSourcePropertyList,
} from '../../common/api/api.customer.plus.js';
const downloadUrl = BaseConfig.qiniuPath;


import {
  MyToast,
  convertObjectLabel
} from '../../common/utils';

import axios from '../../common/api';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
}, {
  title: '测点名称',
  dataIndex: 'measuringPointName',
}, {
  title: '测点位置',
  dataIndex: 'measuringPointPosition',
}, {
  title: '噪声源名称',
  dataIndex: 'noiseSourceName',
}, {
  title: '噪声源性质',
  dataIndex: 'noiseSourcePropertyId',
}, {
  title: '功能区类型',
  dataIndex: 'functionalAreaTypeId',
}, {
  title: '检测报告',
  dataIndex: 'examiningReportURL',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  serialNumber: '',
  measuringPointName: '',
  measuringPointPosition: '',
  noiseSourceName: '',
  noiseSourcePropertyId: '',
  functionalAreaTypeId: '',
  examiningReportURL: {
    cellType: 'fileUpload',
    fileList: []
  },
};

const BoundaryNoise = connectEditableSectionApi({
  secTitle: '边界噪声基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      axios.all([
        getFunctionalAreaTypeList({}),
        getNoiseSourcePropertyList({}),
        getBoundaryNoiseList({})
      ]).then(axios.spread((areaList, noiseSourceList, noiseList) => {
        //获取表单数据
        var noiseData = noiseList.data.boundaryNoiseList;
        //获取功能区类型列表
        var functionalAreaTypeList = areaList.data.functionalAreaTypeList;
        var areaData = {
          value: "1",
          options: convertObjectLabel(functionalAreaTypeList)
        };
        //获取噪声源性质列表
        var noiseSourcePropertyList = noiseSourceList.data.noiseSourcePropertyList;
        var noiseSourceData = {
          value: "1",
          options: convertObjectLabel(noiseSourcePropertyList)
        };
        //改变新增默认值
        itemDataModel.noiseSourcePropertyId = noiseSourceData;  //噪声源性质
        itemDataModel.functionalAreaTypeId = areaData;  //功能区类型
        //重新拼接数据
        noiseData = noiseData.map(item => {
          //文件上传
          var fileList = item.examiningReportURL ? [{ uid: -1, name: '文件', url: item.examiningReportURL }] : [];

          return {
            ...item,
            functionalAreaTypeId: {
              value: item.functionalAreaType.tableId + '',
              options: convertObjectLabel(functionalAreaTypeList)
            },
            noiseSourcePropertyId: {
              value: item.noiseSourceProperty.tableId + '',
              options: convertObjectLabel(noiseSourcePropertyList),
            },
            examiningReportURL: {
              cellType: 'fileUpload',
              fileList,
            }
          }
        });
        //渲染页面
        resolve({
          code: 0,
          data: noiseData,
        })
      }))
    })
  },
  apiSave: function (record) {
    var file = record.examiningReportURL.fileList[0];
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
    itemDataModel.examiningReportURL.fileList = [];

    const _record_for_save = {
      ...record,
      noiseSourcePropertyId: record.noiseSourcePropertyId.value,
      functionalAreaTypeId: record.functionalAreaTypeId.value,
      examiningReportURL: filePath,
    }
    console.log('-------------',_record_for_save)
    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getBoundaryNoiseAdd({
          ..._record_for_save,
        }).then(res => {
          // console.log("getBoundaryNoiseAdd res",res)
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
        getBoundaryNoiseUpdate({
          ..._record_for_save,
        }).then(res => {
          // console.log("getBoundaryNoiseUpdate res",res)
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
    // console.log(`apiDel ${tableId}`);

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

export default BoundaryNoise;