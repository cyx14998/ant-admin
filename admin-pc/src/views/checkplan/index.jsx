/**
 * 客户检查计划管理
 */
import React, { component } from 'react';
import ReactDOM from 'react-dom';

class CustomerCheckPlan extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>客户检查计划管理</h1>
    )
  }
}


ReactDOM.render(<CustomerCheckPlan />, document.getElementById('root'));