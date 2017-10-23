/**
 * HOC 高阶组件
 * 以接口为标准的可编辑区域
 * @columns
 * @promiseLoader
 * @save
 * @delete
 */
import React, { Component } from 'react';

import EditableSection from './editable.section';

function connectEditableSectionApi(options) {
  // return function(Comp) {
    return class extends Component {
      constructor(props) {
        super(props);
      }

      render() {
        return (
          <EditableSection {...this.props} {...options} />
        )
      }
    }
  // }
}

export default connectEditableSectionApi;