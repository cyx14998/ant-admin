/**
 * 主要产品基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';

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
  key: '0',
  name: 'Edward King 0',
  age: '2017-11-11',
  company: {
    value: '',
    options: options
  },
  address: 'London, Park Lane no. 0'
}, {
  key: '1',
  name: 'Edward King 1',
  age: '32',
  company: {
    value: 'qy',
    options: options
  },
  address: 'London, Park Lane no. 1'
}];

const CustomerEditBaseinfoProd = connectEditableSectionApi({
  secTitle: '主要产品基本信息',
  columns: columns,
  apiLoader: function () {
    return Promise.resolve({
      data: dataSource
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

export default CustomerEditBaseinfoProd;