/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';
//废水排放基本信息列表
import WasteWaterDischargeList from './customerEdit.wastewater.dischargelist';
//废水排放基本信息详情
import WasteWaterDischargeDetail from './customerEdit.wasterwater.dischargeDetail';
//废水治理基本情况
import WasteWaterTreatment from './customerEdit.wastewater.treatment';

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
        <WasteWaterDischargeList />
        <WasteWaterDischargeDetail />
        <WasteWaterTreatment />
      </div>
    )
  }
}



export default WasteWater;