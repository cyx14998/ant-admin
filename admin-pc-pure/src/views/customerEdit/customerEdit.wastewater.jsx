/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';

import WasteWaterPaifang from './customerEdit.wastewater.paifang';
import WasteWaterZhili from './customerEdit.wastewater.zhili';

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
        <WasteWaterPaifang />
        <WasteWaterZhili />
      </div>
    )
  }
}



export default WasteWater;