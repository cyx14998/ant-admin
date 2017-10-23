import connectEditableSectionApi from '../../components/hoc.editable.section';

import {
  getProductBaseInfoList
} from '../../common/api/api.customer';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '10%'
}, {
  title: 'age',
  dataIndex: 'age',
  width: '10%'
}, {
  title: 'company',
  dataIndex: 'company',
  width: '10%'
}, {
  title: 'address',
  dataIndex: 'address',
  width: '60%'
}, {
  title: 'operation',
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
  tableId: 'tableId-001',
  name: 'Edward King 0',
  age: '2017-11-11',
  company: {
    value: '',
    options: options
  },
  address: 'London, Park Lane no. 0'
}, {
  tableId: 'tableId-002',
  name: 'Edward King 1',
  age: '32',
  company: {
    value: 'qy',
    options: options
  },
  address: 'London, Park Lane no. 1'
}];

const WasteWaterDemoSection = connectEditableSectionApi({
  secTitle: '测试模块',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      getProductBaseInfoList({id: 1}).then(res => {
        console.log('getProductBaseInfoList res ---', res)
        var data = res.data.mainProductBaseInfoList;

        resolve({
          data: dataSource,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })
    // return Promise.resolve({
    //   data: dataSource
    // })    
  },
  apiSave: function (record) {
    console.log('apiSave record ----', record);

    // 新增
    if (record.tableId === '') {

    } else {
      // 编辑
    }
  },
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`)
  },
  itemDataModel: itemDataModel
})

export default WasteWaterDemoSection;