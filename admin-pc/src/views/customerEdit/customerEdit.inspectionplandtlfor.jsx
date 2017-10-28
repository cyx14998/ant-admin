/**
 * 现场检查、监督信息
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
      resolve({
        code: 0,
        data,
      })
    }).catch(err => {
      MyToast('接口调用失败')
    })
  }
  render() {
    const columns = [{
      title: '编号',
      dataIndex: 'serialNumber',
      width: '10%'
    }, {
      title: '监管日期',
      dataIndex: 'InspectionDate',
      width: '10%'
    }, {
      title: '监管记录',
      dataIndex: 'recordURL',
      width: '10%'
    }, {
      title: '反馈单',
      dataIndex: 'feedBackRecordURL',
      width: '10%'
    }, {
      title: '整改报告',
      dataIndex: 'correctionReportURL',
      width: '10%'
    }, {
      title: '约谈记录',
      dataIndex: 'interviewRecordURL',
      width: '10%'
    }, {
      title: '检查支队处理情况',
      dataIndex: 'supervisionProcessing',
      width: '10%'
    }, {
      title: '行政处罚',
      dataIndex: 'administrativePenaltiesURL',
      width: '10%'
    }, {
      title: '信访记录',
      dataIndex: 'petitionRecordURL',
      width: '10%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '10%'
    }];
    return (
      <div className="yzy-tab-content-item-wrap">
        <div className="baseinfo-section">
          <h2 className="yzy-tab-content-title">排放口基本信息</h2>
          <Table
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource}
            rowKey="tableId" />
        </div>
      </div>
    )
  }
}

export default SiteInspection;