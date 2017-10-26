/**
 * 废水污染物排放情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

import { 
  getEIAList,
  getEIADelete,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

//废水排放基本信息详情
import EIADetail from './customerEdit.EIA.Detail';


/**
 * table head
 */
const columns = [{
  title: '环评建设项目名称',
  dataIndex: 'theName',
  width: '8%'
}, {
  title: '环评等级',
  dataIndex: 'theLevel',
  width: '5%'
}, {
  title: '编制日期',
  dataIndex: 'editDatetime',
  width: '7%'
}, {
  title: '试生产批复-环保部门审批文号',
  dataIndex: 'DocumentNumberTPA',
  width: '12%'
}, {
  title: '试生产批复-审批时间',
  dataIndex: 'approvalTimeTPA',
  width: '8%'
}, {
  title: '环评批复-环保部门审批文号',
  dataIndex: 'DocumentNumberEIA',
  width: '11%'
}, {
  title: '环评批复-审批时间',
  dataIndex: 'approvalTimeEIA',
  width: '10%'
}, {
  title: '竣工验收批复-环保部门审批文号',
  dataIndex: 'DocumentNumberFAA',
  width: '12%'
}, {
  title: '竣工验收批复-审批时间',
  dataIndex: 'approvalTimeFAA',
  width: '10%'
}, {
  title: '自主验收文件',
  dataIndex: 'SelfAcceptanceURL',
  width: '10%'
}, {
  title: '操作',
  dataIndex: 'operation',
  width: '6%'
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
  theLevel: '',
  editDatetime: '',
  DocumentNumberTPA: '',
  approvalTimeTPA: '',
  DocumentNumberEIA: '',
  approvalTimeEIA: '',
  DocumentNumberFAA: '',
  approvalTimeFAA: '',
  SelfAcceptanceURL: '',
};

const InnerComponent = ({
  editId
}) => (
  <div>
      <EIADetail editId={editId} />
  </div>
);

const WasteWaterDemoSection = connectUneditableSectionApi({
  secTitle: '环评信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve,reject) => {
      //获取数据
      getEIAList({}).then(res => {
        console.log('getEIAList res ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerEIAList;
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
  modalTitle: '环评信息详情',
  modalComponent: InnerComponent
})

export default WasteWaterDemoSection;