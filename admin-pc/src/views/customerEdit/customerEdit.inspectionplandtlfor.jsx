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
  dataIndex: 'serialNumber',
}, {
  title: '监管日期',
  dataIndex: 'InspectionDate',
}, {
  title: '监管记录',
  dataIndex: 'recordURL',
}, {
  title: '反馈单',
  dataIndex: 'feedBackRecordURL',
}, {
  title: '整改报告',
  dataIndex: 'correctionReportURL',
}, {
  title: '操作',
  dataIndex: 'operation',
  
}];

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