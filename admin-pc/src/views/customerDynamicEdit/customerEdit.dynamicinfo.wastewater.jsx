/**
 * 废水污染物排放情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废水因子基本情况
import WasteWaterDischargeFactor from './customerEdit.dynamicinfo.wastewater.dischargefactor';
//废水排放基本信息详情
import WasteWaterDischargeDetail from './customerEdit.dynamicinfo.wastewater.discharge';

import { 
  getWastewaterDischargeRecordList,
  getWastewaterDischargeRecordDelete,
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
  title: '排放量',
  dataIndex: 'emissionAmount',
  width: '10%'
}, {
  title: '排放去向',
  dataIndex: 'emissionDestination',
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
  emissionAmount: '',
  emissionDestination: '',
};

const InnerComponent = ({
  editId,
  itemVisible,
  showItemVisible
}) => (
  <div>
    <WasteWaterDischargeDetail showItemVisible={showItemVisible} editId={editId} />
    {
      editId === "" ? (itemVisible && (<div>
        <WasteWaterDischargeFactor />
      </div>)) : (<div>
        <WasteWaterDischargeFactor apiListItemId={editId} />
      </div>)
    }
  </div>
);

const WasteWaterDischargeRecord = connectUneditableSectionApi({
  secTitle: '废水排放基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      var cusMId = getLocQueryByLabel("dynamicId");
      getWastewaterDischargeRecordList({
        customerMonthDclarationId: cusMId,
      }).then(res => {
        console.log('getWastewaterDischargeRecordList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.wasteWaterDischargeRecordList;
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
      getWastewaterDischargeRecordDelete(tableId).then(res => {
        if (res.data.result !== 'success') {
          resolve({
            code: 1,
            info: res.data.info,
          });
          return;
        }
        console.log(res);
        resolve({
          code: 0 // success
        });
      }).catch(err => {
        reject(err)
      });
    });
  },
  // 弹窗组件
  modalTitle: '废水排放基本情况',
  modalComponent: InnerComponent
})

export default WasteWaterDischargeRecord;