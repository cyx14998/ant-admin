/**
 * 主要产品基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { getLocQueryByLabel } from '../../common/utils';

import {
  getProductBaseInfoList,
  getProductBaseInfoAdd,
  getProductBaseInfoDelete,
} from '../../common/api/api.customer';

const prodDataSourth = (function () {
  var cusId = getLocQueryByLabel('id');

  if (!cusId) return;

  // 获取产品信息列表
  getProductBaseInfoList({ id: cusId }).then(res => {
    if (res.data.result !== 'success') {
      return
    }
    console.log(res)
    return res.data.customer
  }).catch(err => console.log(err))
})();
/**
 * table head
 */
const columns = [{
  title: '主要产品名称',
  dataIndex: 'theName',
  width: '10%'
}, {
  title: '计量单位',
  dataIndex: 'unitOfMeasurement',
  width: '10%'
}, {
  title: '设计年产量',
  dataIndex: 'designAnnualOutput',
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
  unitOfMeasurement: '',
  company: {
    value: '',
    options: options
  },
  designAnnualOutput: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  key: '0',
  theName: '名称',
  unitOfMeasurement: 'kg',
  designAnnualOutput: '22.33',
  // pany: {
  //   value: '',
  //   options: options
  // },
},
  //  {
  //   key: '1',
  //   theName: 'Edward King 1',
  //   unitOfMeasurement: '32',
  //   company: {
  //     value: 'qy',
  //     options: options
  //   },
  //   designAnnualOutput: 'London, Park Lane no. 1'
  // }
];

export const CustomerEditBaseinfoProd = connectEditableSectionApi({
  secTitle: '主要产品基本信息',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      // 获取产品信息列表
      var cusId = getLocQueryByLabel('id');

      if (!cusId) return;
      
      getProductBaseInfoList({ id: cusId }).then(res => {
        if (res.data.result !== 'success') {
          return
        }
        console.log(res)
        // return res.data.
        return {
          data: res.data
        }
      }).catch(err => console.log(err))
    })
    // return Promise.resolve({
    //   data: dataSource
    // })
  },
  apiSave: function () {
    var cusId = getLocQueryByLabel('id');
    var data = dataSource[0];
    data.customerId = cusId;
    console.log(data);
    getProductBaseInfoAdd(data).then(res => {
      console.log('AddProd res', res);
      if (res.data.result !== 'success') {
        return
        console.log('success');
      }
    }).catch(err => console.log(err))
  },
  apiDel: function (key) {
    var tableId = key;
    // console.log(tableId)
    getProductBaseInfoDelete(tableId).then(res => {
      console.log('DeleteProd res', res);
      if (res.data.result !== 'success') {
        return
        console.log('success');
      }
    }).catch(err => console.log(err))
  },
  itemDataModel: itemDataModel
})

export default CustomerEditBaseinfoProd;