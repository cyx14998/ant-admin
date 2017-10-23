/**
 * 排污单位基本情况
 */
import React from 'react';
import {
  Row,
  Col
} from 'antd';

import CustomerEditBaseinfoDetail from './customerEdit.baseinfo.detail';
import CustomerEditBaseinfoProd from './customerEdit.baseinfo.prod';

class CustomerEditBaseinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="yzy-tab-content-wrap">
        <CustomerEditBaseinfoDetail />
        <Row>
          <Col span={12}>
            <CustomerEditBaseinfoProd />
          </Col>
        </Row>
      </div>
    )
  }
}

export default CustomerEditBaseinfo;