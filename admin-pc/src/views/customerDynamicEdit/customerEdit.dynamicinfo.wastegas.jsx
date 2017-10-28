/**
 * 废气污染物排放情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废气排放基本信息详情
import WasteGasDischargeDetail from './customerEdit.dynamicinfo.wastegas.discharge';
//废气因子基本情况
import WasteGasDischargeFactor from './customerEdit.dynamicinfo.wastegas.dischargefactor';

import { 
  getWasteGasDischargeRecordList,
  getWasteGasDischargeRecordDelete,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  MyToast
} from '../../common/utils';

import {
  getLocQueryByLabel
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '实测排放量',
  dataIndex: 'measuredExhaustVolume',
  width: '10%'
}, {
  title: '排放时间',
  dataIndex: 'emissionTime',
  width: '10%'
}, {
  title: '废气排放量',
  dataIndex: 'exhaustEmission',
  width: '10%'
}, {
  title: '数据来源',
  dataIndex: 'dataSources',
  width: '10%'
}, {
  title: '燃料',
  dataIndex: 'fuel',
  width: '10%'
}, {
  title: '林格曼黑度',
  dataIndex: 'ringermanBlackness',
  width: '10%'
}, {
  title: '废气类型',
  dataIndex: 'exhaustGasType',
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
  measuredExhaustVolume: '',
  emissionTime: '',
  exhaustEmission: '',
  dataSources: '',
  fuel: '',
  ringermanBlackness: '',
  exhaustGasType: '',
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
        <WasteGasDischargeFactor />
      </div>)) : (<div>
        <WasteGasDischargeFactor apiListItemId={editId} />
      </div>)
    }
  </div>
);

const WasteGasDischargeRecord = connectUneditableSectionApi({
  secTitle: '废气排放基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      var cusMId = getLocQueryByLabel("dynamicId");
      getWasteGasDischargeRecordList({
        customerMonthDclarationId: cusMId,
      }).then(res => {
        console.log('getWasteGasDischargeRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteGasDischargeRecordList;
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
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWasteGasDischargeRecordDelete(tableId).then(res => {
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
  modalTitle: '废气排放基本情况',
  modalComponent: InnerComponent
})

export default WasteGasDischargeRecord;