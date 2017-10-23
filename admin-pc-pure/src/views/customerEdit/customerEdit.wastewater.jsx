/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';


import WasteWaterDemoSection from './customerEdit.wastewater.demosection';

/**
 * 废水污染物基本情况
 */
class WasteWater extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="yzy-tab-content-wrap">
        <WasteWaterDemoSection />
      </div>
    )
  }
}



export default WasteWater;