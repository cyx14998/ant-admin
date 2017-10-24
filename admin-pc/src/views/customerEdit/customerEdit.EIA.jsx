/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';
//废水排放基本信息列表
import EIAList from './customerEdit.EIA.LIst';
//废水排放基本信息详情
import EIADetail from './customerEdit.EIA.Detail';

/**
 * 废水污染物基本情况
 */
class WasteWater extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="yzy-tab-content-wrap">
        <EIADetail />
      </div>
    )
  }
}



export default WasteWater;