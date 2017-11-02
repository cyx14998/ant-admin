/**
 * 企业现场检查记录
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Table,
} from 'antd';

import {
  getInspectionPlanDtlForList,
} from '../../common/api/api.customer.plus.js';

import {
  MyToast
} from '../../common/utils';

const columns = [{
  title: '编号',
  dataIndex: 'num',
  render: (text, record, index) => (index + 1)
}, {
  title: '企业名称',
  dataIndex: 'customer.customerName',
}, {
  title: '执行者名称',
  dataIndex: 'performer.realName',
}, {
  title: '监管记录',
  dataIndex: 'regulatoryRecordURL',
  render: (text, record) => (
    <a target="_blank" download="文件" href={record.regulatoryRecordURL}>{record.regulatoryRecordURL ? '下载地址' : '无'}</a>
  )
}, {
  title: '反馈单',
  dataIndex: 'feedbackSheetURL',
  render: (text, record) => (
    <a target="_blank" download="文件" href={record.feedbackSheetURL}>{record.feedbackSheetURL ? '下载地址' : '无'}</a>
  )
},
//  {
//   title: '整改报告',
//   dataIndex: 'correctionReportURL',
// },
{
  title: '执行状态',
  dataIndex: 'theState',
},
{
  title: '创建时间',
  dataIndex: 'createDatetime',
},
{
  title: '备注',
  dataIndex: 'theRemarks',
},];
class SiteInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    getInspectionPlanDtlForList({}).then(res => {
      console.log('getInspectionPlanDtlForList res ---', res);

      if (res.data.result !== 'success') {
        resolve({
          code: -1,
          info: res.data.info,
        })
        return;
      }

      this.setState({ dataSource: res.data.inspectionPlanDtlList })

    }).catch(err => {
      MyToast('接口调用失败')
    });
  }


  render() {

    return (
      <div className="yzy-tab-content-item-wrap">
        <div className="baseinfo-section">
          <h2 className="yzy-tab-content-title">现场检查</h2>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            rowKey="tableId"
            rowClassName={(record, index) => {
              if (index % 2 !== 0) {
                return 'active'
              }
            }}
          />
        </div>
      </div>
    )
  }
}

export default SiteInspection;