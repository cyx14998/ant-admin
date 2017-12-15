/**
 * 企业遵守法律法规详情
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

//企业遵守法律法规详情
import EIADetail from './customerEdit.EIADetail';


/**
 * table head
 */
const columns = [
  {
    title: '环评建设项目名称',
    dataIndex: 'theName',
  }, {
    title: '环评等级',
    dataIndex: 'theLevel',
  }, {
    title: '编制日期',
    dataIndex: 'editDatetime',
  }, {
    title: '试生产批复',
    children: [
      {
        title: '审批文号',
        dataIndex: 'documentNumberTPA',
      },
      {
        title: '审批时间',
        dataIndex: 'approvalTimeTPA',
      }
    ]
  }, {
    title: '环评批复',
    children: [
      {
        title: '审批文号',
        dataIndex: 'documentNumberEIA',
      },
      {
        title: '审批时间',
        dataIndex: 'approvalTimeEIA',
      }
    ]
  }, {
    title: '竣工验收批复',
    dataIndex: 'documentNumberFAA',
    children: [
      {
        title: '审批文号',
        dataIndex: 'documentNumberFAA',
      },
      {
        title: '审批时间',
        dataIndex: 'approvalTimeFAA',
      }
    ]
  }, {
    title: '自主验收文件',
    dataIndex: 'selfAcceptanceURL',
    type: 'downloadfile'
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 120
  }
];

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
  documentNumberTPA: '',
  approvalTimeTPA: '',
  documentNumberEIA: '',
  approvalTimeEIA: '',
  documentNumberFAA: '',
  approvalTimeFAA: '',
  selfAcceptanceURL: '',
};

const InnerComponent = ({
  editId,
  closeModal,
}) => (
    <div>
      <EIADetail editId={editId} closeModal={closeModal} />
    </div>
  );

const WasteWaterDemoSection = connectUneditableSectionApi({
  secTitle: '环评信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
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
      getEIADelete(tableId).then(res => {
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