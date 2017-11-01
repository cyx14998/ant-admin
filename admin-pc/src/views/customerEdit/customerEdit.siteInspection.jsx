// /**
//  * 监管记录
//  */
/**
 * 监管记录基本情况
 */
import React from 'react';

import connectUneditableSectionApi from '../../components/hoc.uneditable.section';

//废气排放基本信息详情
import SiteInspectionDetail from './customerEdit.siteinspection.detail';

import {
  getSiteInspectionList,
  getSiteInspectionDelete,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [{
  title: '文件名称',
  dataIndex: 'fileName',
}, {
  title: '文件类型',
  dataIndex: 'theType',
}, {
  title: '文件大小',
  dataIndex: 'fileSize',
}, {
  title: '文件路径',
  dataIndex: 'filePath',
  type: 'downloadfile'
}, {
  title: '备注',
  dataIndex: 'theRemarks',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];


/**
 * 新数据默认值
 */
const itemDataModel = {
  theName: '',
  theType: {
    value: '1',
    options: [{
      value: "1",
      label: '园区约谈情况'
    }, {
      value: "2",
      label: '监察支队处理情况'
    }, {
      value: "3",
      label: '行政处罚情况'
    }, {
      value: "4",
      label: '信访记录'
    }]
  },
  theSize: '',
  filePath: '',
};

const InnerComponent = ({
  editId,
}) => (
    <div>
      <SiteInspectionDetail editId={editId} />
    </div>
  );

const SiteInspection = connectUneditableSectionApi({
  secTitle: '监管记录',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      //获取数据
      getSiteInspectionList({}).then(res => {
        console.log('getAttachmentRecordList res 监管记录列表 ---', res);

        if (res.data.result !== 'success') {
          resolve({
            code: -1,
            info: res.data.info,
          })
          return;
        }

        var data = res.data.customerSuperviseList;

        data.map((item, index) => {
          if (item.theType == '0') {
            item.theType = '整改报告'
          } else if (item.theType == 1) {
            item.theType = '园区约谈情况'
          } else if (item.theType == 2) {
            item.theType = '监察支队处理情况'
          } else if (item.theType == 3) {
            item.theType = '行政处罚情况'
          } else if (item.theType == 4) {
            item.theType = '信访记录'
          }
          // return {
          //   ...item,
          //   attachmentTypeId: item.tableId,
          // }
        })
        console.log(data)
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
      getSiteInspectionDelete(tableId).then(res => {
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
  modalTitle: '监管记录基本情况',
  modalComponent: InnerComponent
})

export default SiteInspection;
