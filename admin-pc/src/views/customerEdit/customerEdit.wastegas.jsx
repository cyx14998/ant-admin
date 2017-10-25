/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';
//废水排放基本信息列表
import WasteGasDischargeList from './customerEdit.wastegas.discharge.List';
//废水排放基本信息详情
import WasteGasDischargeDetail from './customerEdit.wastegas.discharge.Detail';
//废水治理基本情况
import WasteWaterTreatment from './customerEdit.wastewater.treatment';
// //废水因子基本情况
import WasteGasDischargeFactor from './customerEdit.wastegas.dischargefactor';
// //废水排放检测记录
import WasteGasMonitoringRecord from './customerEdit.wastegas.monitoringrecord';

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
        <WasteGasDischargeList />
        <WasteGasDischargeDetail />
         <WasteWaterTreatment />
         <WasteGasDischargeFactor />
         <WasteGasMonitoringRecord />   
      </div>
    )
  }
}



export default WasteWater;