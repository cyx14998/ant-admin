/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';
// //废水排放基本信息详情
import WasteWaterDischarge from './customerEdit.dynamicinfo.wastewater.discharge';
//废水因子基本情况
import WasteWaterDischargeFactor from './customerEdit.dynamicinfo.wastewater.dischargefactor';

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
        <WasteWaterDischarge />
        <WasteWaterDischargeFactor />
      </div>
    )
  }
}



export default WasteWater;