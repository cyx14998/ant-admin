/**
 * 客户检查计划管理 -- 子表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CustomerCheckPlanSub extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>客户检查计划管理子表</h1>
    )
  }
}


ReactDOM.render(<CustomerCheckPlanSub />, document.getElementById('root'));