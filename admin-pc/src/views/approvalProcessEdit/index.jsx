/**
 * 员工管理 -- 新增 编辑
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Button
} from 'antd';

import {
  getStaffListAdd,
  getStaffListUpdate
} from '../../common/api/api.staffmanagement';

import {
  getLocQueryByLabel,
  MyToast
} from '../../common/utils';

import './index.less';


/**
 * 员工编辑页面 * 编辑员工基本信息 + 证照信息
 * @params staffId from querystring
 */
class ApprovalProcessEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffId: getLocQueryByLabel('staffId') || ''
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
            <div className="approval-add">
                <Button type="primary">新增</Button>
            </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ApprovalProcessEdit />, document.getElementById('root'));