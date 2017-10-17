/**
 * 系统界面
 */
import React from 'react';

import './index.less';

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page index-page">
        <p className="index-page-info">index page</p>
      </div>
    )
  }
}

export default IndexPage;