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

import { 
  MyToast,
  convertObjectLabel
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '测点名称',
  dataIndex: 'measuringPointName',
  width: '10%'
}, {
  title: '测点位置',
  dataIndex: 'measuringPointPosition',
  width: '10%'
}, {
  title: '噪声源名称',
  dataIndex: 'noiseSourceName',
  width: '10%'
}, {
  title: '噪声源性质',
  dataIndex: 'noiseSourcePropertyId',
  width: '10%'
}, {
  title: '功能区类型',
  dataIndex: 'functionalAreaTypeId',
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
  measuringPointName: '',
  measuringPointPosition: '',
  noiseSourceName: '',
  noiseSourcePropertyId:{
    value: '',
    options: [{
      value: '',
      label: ''
    }]
  },
  functionalAreaTypeId: {
    value: '',
    options: [{
      value: '',
      label: ''
    }]
  }
};


const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '边界噪声基本情况',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getBoundaryNoiseList({}).then(res => {
        console.log('getBoundaryNoiseList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        //获取功能区类型列表
        getFunctionalAreaTypeList({}).then(list => {
          var functionalAreaTypeList = list.data.functionalAreaTypeList;
          var data = {
            value: "1",
            options: convertObjectLabel(functionalAreaTypeList)
          };
          console.log(data)
          itemDataModel.functionalAreaTypeId = data;
        }).catch(err => {
          MyToast('接口调用失败')
        })
        
        //获取噪声源性质列表
        getNoiseSourcePropertyList({}).then(list => {
          var noiseSourcePropertyList = list.data.noiseSourcePropertyList;
          var data = {
            value: "1",
            options: convertObjectLabel(noiseSourcePropertyList)
          };
          itemDataModel.noiseSourcePropertyId = data;
        }).catch(err => {
          MyToast('接口调用失败')
        })

        var data = res.data.boundaryNoiseList;
        data = data.map((item,index) => {
          return {
            ...item,
            functionalAreaTypeId:{
              value: item.functionalAreaType.theName,
              options: [{
                value: '',
                label: ''
              }]},
            noiseSourcePropertyId: item.noiseSourceProperty.theName,
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
    console.log('apiSave record ----', record);
    record.noiseSourcePropertyId = record.noiseSourcePropertyId.value;
    record.functionalAreaTypeId = record.functionalAreaTypeId.value;
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