/**
 * HOC 高阶组件
 * 以接口为标准的可编辑区域
 */
import React, { Component } from 'react';

import EditableSection from './editable.section';

/**
 * options
 * @params secTitle
 * @params columns
 * @params apiLoader
 * @params apiSave
 * @params apiDel
 * @params itemDataModel
 * @params checkInNewpage    添加新页面查看功能
 */
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