/**
 * 企业动态信息编辑
 */
import React from 'react';
import ReactDOM from 'react-dom';

class CustomerDynamicEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="yzy-page">
        <h1>企业动态信息编辑</h1>
      </div>
    )
  }
}

ReactDOM.render(<CustomerDynamicEdit />, document.getElementById('root'));