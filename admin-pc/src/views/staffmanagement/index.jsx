/**
 * 员工管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class StaffManagement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>员工管理</h1>
    )
  }
}


ReactDOM.render(<StaffManagement />, document.getElementById('root'));