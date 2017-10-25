/**
 * 废气污染物基本情况
 */
import React, { Component } from 'react';
// //废气排放基本信息详情
import WasteGasDischarge from './customerEdit.dynamicinfo.wastegas.discharge';
//废气因子基本情况
import WasteGasDischargeFactor from './customerEdit.dynamicinfo.wastegas.dischargefactor';

/**
 * 废气污染物基本情况
 */
class WasteWater extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="yzy-tab-content-wrap">
        <WasteGasDischarge />
         <WasteGasDischargeFactor /> 
      </div>
    )
  }
}



export default WasteWater;