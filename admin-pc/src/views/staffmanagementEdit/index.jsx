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

    this.state = {
      staffId: getLocQueryByLabel('staffId') || ''
    }
  }

  componentDidMount() {
    
  }

  onStaffDetailsSave(values) {
    console.log('onStaffDetailsSave---------------', values)
    if (this.state.staffId === '') {
      // add
      getStaffListAdd(values).then(res => {
        console.log('getStaffListAdd res --------', res)
        if (res.data.result !== 'success') {
          MyToast(res.data.info || '新增失败');
          return;
        }

        MyToast('新增成功');
        // this.setState({
        //   staffId: res.data.tableId
        // });

        setTimeout(() => {
          window.location.search = `staffId=${res.data.tableId}`;
        }, 500);
        
      }).catch(err => MyToast('新增失败'));
    } else {
      // update
      getStaffListUpdate({
        ...values,
        staffId: this.state.staffId
      }).then(res => {
        if (res.data.result !== 'success') {
          return MyToast(res.data.info || '更新失败')
        }

        MyToast('更新成功');
      }).catch(err => MyToast('更新失败'));
    }
  }



  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <StaffDetails staffId={this.state.staffId} onSave={this.onStaffDetailsSave.bind(this)} />
          { this.state.staffId && <StaffCertModule apiListItemId={this.state.staffId} /> }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<StaffManagementEdit />, document.getElementById('root'));