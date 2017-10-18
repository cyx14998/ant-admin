/**
 * 客户信息查询
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './customer.less';

class Page extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="customer-page">
        <h1>客户信息查询</h1>
      </div>
    )
  }
}


const render = () => {
    ReactDOM.render(
        <Page />, document.getElementById('customerreactwrapper'));
}
render();
// store.subscribe(render);