/**
 * 废气污染物排放情况
 */
import React from 'react';

import {
  Button
} from 'antd';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废气排放基本信息详情
import WasteGasDischargeDetail from './customerEdit.wastegas.dischargedetail';
//废气治理基本情况
import WasteGasTreatment from './customerEdit.wastegas.treatment';
// //废气因子基本情况
import WasteGasDischargeFactor from './customerEdit.wastegas.dischargefactor';
// //废气排放检测记录
import WasteGasMonitoringRecord from './customerEdit.wastegas.monitoringrecord';

import { 
  getWasteGasDischargeList,
  getWasteGasDischargeDelete
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '排放口编号',
  dataIndex: 'serialNumber',
}, {
  title: '排放口名称',
  dataIndex: 'theName',
}, {
  title: '排放口位置',
  dataIndex: 'outletLocation',
}, {
  title: '排放规律',
  dataIndex: 'dischargeLaw',
}, {
  title: '功能区类别',
  dataIndex: 'functionalAreaCategory',
}, {
  title: '排放方式',
  dataIndex: 'dischargeMode',
}, {
  title: '排放口类型',
  dataIndex: 'dischargePortType',
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
  theName: '',
  outletLocation: '',
  dischargeLaw: '',
  functionalAreaCategory: '',
  dischargeMode: '',
  dischargePortType: '',
};

const InnerComponent = ({
  editId,
  itemVisible,
  showItemVisible
}) => (
  <div>
    <WasteGasDischargeDetail showItemVisible={showItemVisible} editId={editId} />
    {
      editId === "" ? (itemVisible && (<div>
        <WasteGasTreatment />
        <WasteGasDischargeFactor />
        <WasteGasMonitoringRecord />
      </div>)): (<div>
        <WasteGasTreatment apiListItemId={editId} />
        <WasteGasDischargeFactor apiListItemId={editId} />
        <WasteGasMonitoringRecord apiListItemId={editId} />
      </div>)
    }
  </div>
);

const WasteGasDischarge = connectUneditableSectionApi({
  secTitle: '废气排放基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getWasteGasDischargeList({}).then(res => {
        console.log('getWasteGasDischargeList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteGasDischargePortList;
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
    //删除
    // console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWasteGasDischargeDelete(tableId).then(res => {
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
  modalTitle: '废气排放口',
  modalComponent: InnerComponent
})

export default WasteGasDischarge;