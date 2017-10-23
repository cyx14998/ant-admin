/**
 * 排污单位基本情况
 */
import React from 'react';
import {
  Row,
  Col
} from 'antd';

import CustomerEditBaseinfoDetail from './customerEdit.baseinfo.detail';

class CustomerEditBaseinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="yzy-tab-content-wrap">
        <CustomerEditBaseinfoDetail />
      </div>
    )
  }
}

export default CustomerEditBaseinfo;