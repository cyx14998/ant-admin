/**
 * 员工管理 -- 新增 编辑
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import StaffDetails from './staff.details';
import StaffCertModule from './staff.cert';

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
class StaffManagementEdit extends Component {
  constructor(props) {
    super(props);

    this.staffId = getLocQueryByLabel('staffId') || '';
  }

  componentDidMount() {
    
  }



  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <StaffDetails />
          <StaffCertModule apiListItemId={this.staffId} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<StaffManagementEdit />, document.getElementById('root'));