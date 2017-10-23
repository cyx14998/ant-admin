/**
 * 主要产品基本信息
 */
import connectEditableSectionApi from '../../components/hoc.editable.section';
import { MyToast, getLocQueryByLabel } from '../../common/utils';

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
 * 新数据默认值
 */
const itemDataModel = {
  tableId: '',
  theName: '',
  unitOfMeasurement: '',
  designAnnualOutput: ''
};

/**
 * 接口返回的数据
 */
const dataSource = [{
  tableId: 'id-001',
  theName: '本地名称',
  unitOfMeasurement: 'kg',
  designAnnualOutput: '22.33',

}];

export const CustomerEditBaseinfoMaterial = connectEditableSectionApi({
  secTitle: '原辅材料基本信息',
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
        resolve({
          data: res.data.mainProductBaseInfoList
        })
      }).catch(err => console.log(err))
    })
  },
  apiSave: function (record) {
    if (record.tableId === '') {
    // 新增
      getProductBaseInfoAdd(record).then(res => {
        console.log('AddProd res', res);
        if (res.data.result !== 'success') {
          MyToast('保存失败');
          return
        }
        MyToast('保存成功');
      }).catch(err => console.log(err))
    } else {
      // 编辑
      getProductBaseInfoAdd(record).then(res => {
        console.log('AddProd res', res);
        if (res.data.result !== 'success') {
          MyToast('编辑保存失败');
          return
        }
        MyToast('编辑保存成功');
      }).catch(err => console.log(err))
    }
  },
  apiDel: function (key) {
    var tableId = key;
    console.log(tableId)
    getProductBaseInfoDelete(tableId).then(res => {
      console.log('DeleteProd res', res);
      if (res.data.result !== 'success') {
        MyToast('删除失败');
        return
      }
      MyToast(删除成功);
    }).catch(err => console.log(err))
  },
  itemDataModel: itemDataModel
})

export default CustomerEditBaseinfoMaterial;