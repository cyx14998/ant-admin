import connectEditableSectionApi from '../../components/hoc.editable.section';

import { getLocQueryByLabel } from '../../common/utils';

import { 
  getWastewaterList,
  deleteWastewaterPort,
  addWastewaterPort
} from '../../common/api/api.customer.plus.js';

/**
 * table head
 */
const columns = [{
  title: '排水口编号',
  dataIndex: 'serialNumber',
  width: '10%'
}, {
  title: '排放口名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '排放口位置',
  dataIndex: 'outletLocation',
  width: '10%'
}, {
  title: '经度',
  dataIndex: 'longitude',
  width: '10%'
}, {
  title: '纬度',
  dataIndex: 'latitude',
  width: '10%'
}, {
  title: '排放口去向',
  dataIndex: 'emissionDestination',
  width: '10%'
}, {
  title: '污水排放规律',
  dataIndex: 'dischargeLaw',
  width: '10%'
}, {
  title: '功能区类别',
  dataIndex: 'functionalAreaCategory',
  width: '10%'
}, {
  title: '创建时间',
  dataIndex: 'createDatetime',
  width: '10%'
}, {
  title: '纬度',
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
  name: '',
  age: '',
  company: {
    value: '',
    options: options
  },
  address: ''
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
  secTitle: '测试模块',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      var cusId = getLocQueryByLabel('id');
      if (!cusId) return;
      
      getWastewaterList({customerId:cusId}).then(res => {
        if (res.data.result !== 'success') {
          alert(res.data.info || '接口失败')
          return;
        }

        console.log(res.data.wasteWaterDischargePortList);
        return {
          data: res.data.wasteWaterDischargePortList
        }
      }).catch(err => {
        alert(res.data.info || '接口失败')
      })
    })
  },
  apiSave: function () {
    alert('apiSave')
  },
  apiDel: function () {
    alert('apiDel')
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;