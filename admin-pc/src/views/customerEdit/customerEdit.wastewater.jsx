/**
 *  废水排放口基本信息列表
 */
import React from 'react';

import {
  Button
} from 'antd';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废水排放基本信息详情
import WasteWaterDischargeDetail from './customerEdit.wastewater.dischargedetail';
//废水治理基本情况
import WasteWaterTreatment from './customerEdit.wastewater.treatment';
//废水因子基本情况
import WasteWaterDischargeFactor from './customerEdit.wastewater.dischargefactor';
//废水排放检测记录
import WasteWaterMonitoringRecord from './customerEdit.wastewtaer.monitoringrecord';

import { 
  getWastewaterDischargeList,
  getWastewaterDischargeDelete
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

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
  title: '排放口去向',
  dataIndex: 'emissionDestination',
  width: '10%'
}, {
  title: '水体名称',
  dataIndex: 'nameOfWaterBody',
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
  theName: '',
  outletLocation: '',
  emissionDestination: '',
  nameOfWaterBody: '',
  dischargeLaw: '',
  functionalAreaCategory: '',
  createDatetime: '',
};

const wastewaterDischargeIsShow = localStorage.getItem("wastewaterDischargeIsShow")

const InnerComponent = ({
  editId,
  itemVisible,
  showItemVisible
}) => (
  <div>
    <WasteWaterDischargeDetail showItemVisible={showItemVisible} editId={editId} />
    {
      editId?<div>
        <WasteWaterTreatment />
        <WasteWaterDischargeFactor />
        <WasteWaterMonitoringRecord />
      </div>: itemVisible && <div>
        <WasteWaterTreatment />
        <WasteWaterDischargeFactor />
        <WasteWaterMonitoringRecord />
      </div>
    }
  </div>
);

const WasteWaterDemoSection = connectUneditableSectionApi({
  secTitle: '废水排放口基本信息列表',
  columns: columns,
  apiLoader: function () {

    return new Promise((resolve, reject) => {
      //获取数据
      getWastewaterDischargeList({}).then(res => {
        console.log('getWastewaterList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterDischargePortList;
        resolve({
          code: 0,
          data,
        })
      }).catch(err => {
        MyToast('接口调用失败')
      })
    })  
  },
  
  apiDel: function (tableId) {
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getProductBaseInfoDelete(tableId).then(res => {
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
  apiDel: function (tableId) {
    //删除
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWastewaterDischargeDelete(tableId).then(res => {
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
  modalTitle: '废水排放口',
  modalComponent: InnerComponent
});

export default WasteWaterDemoSection;