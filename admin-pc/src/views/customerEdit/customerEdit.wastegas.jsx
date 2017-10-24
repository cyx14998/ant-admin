/**
 * 废气污染物基本情况
 */
import React, { Component } from 'react';


import WasteGasDischarge from './customerEdit.wastegas.discharge';

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
        <WasteGasDischarge />
      </div>
    )
  }
}



export default WasteWater;