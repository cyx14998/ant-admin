/**
 * 废水污染物排放情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

import CustomerWasteSolidDetail from './customerEdit.wastesolid.Detail';

import {
  getWasteSolidList,
  getWastesolidDelete,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '编号',
  dataIndex: 'serialNumber',
}, {
  title: '是否危废',
  dataIndex: 'isHazardousWaste',
}, {
  title: '处置方式',
  dataIndex: 'disposalMethod',
}, {
  title: '废物名称',
  dataIndex: 'theName',
}, {
  title: '废物产生工艺',
  dataIndex: 'processing',
}, {
  title: '危险废物名称',
  dataIndex: 'hazardousWasteName',
}, {
  title: '贮存场所位置',
  dataIndex: 'storagePlaceAddress',
}, {
  title: '处置单位名称',
  dataIndex: 'disposeUnitName',
},{
  title: '贮存场所照片',
  dataIndex: 'storagePlaceImageURL',
  type: 'downloadfile'
}, {
  title: '台账',
  dataIndex: 'standingBookURL',
  type: 'downloadfile'
}, {
  title: '备案信息',
  dataIndex: 'filingInfoURL',
  type: 'downloadfile'
}, {
  title: '转移单',
  dataIndex: 'transferManifestURL',
  type: 'downloadfile'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
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

const InnerComponent = ({
  editId
}) => (
    <div>
      <CustomerWasteSolidDetail editId={editId} />
    </div>
  );

const WasteWaterDemoSection = connectUneditableSectionApi({
  secTitle: '固体废物基本信息列表',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      getWasteSolidList({}).then(res => {
        console.log('getWasteSolidList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteSolidList;
        data = data.map((item, index) => {
          return {
            ...item,
            isHazardousWaste: item.isHazardousWaste === true ? "是" : "否",
          }
        })
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        reject(err)
      })
    })
  },

  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWastesolidDelete(tableId).then(res => {
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
  // 弹窗组件
  modalTitle: '固体废物基本情况',
  modalComponent: InnerComponent

});

export default WasteWaterDemoSection;