/**
 * 废水污染物基本情况
 */
import React, { Component } from 'react';

import WasteWaterDischarge from './customerEdit.wastewater.discharge';

/**
 * 废水污染物基本情况
 */
class WasteWater extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //新增
    // const data = {
    //   customerId: cusId,
    //   dischargeLaw:"35",
    //   emissionDestination:"ttt",
    //   functionalAreaCategory:"65",
    //   longitude:"1",
    //   latitude: "2",
    //   nameOfWaterBody:"123",
    //   outletLocation:"fff",
    //   serialNumber:"qwewqe123",
    //   theName:"wer123"
    // }
    // addWastewaterPort(data).then(res => {
    //   console.log('getCustomerList ---', res)
    // }).catch(err => {
    //   alert(res.data.info || '接口失败')
    // })
    //查询
    // getWastewaterList({customerId:cusId}).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   alert(res.data.info || '接口失败')
    // })

  }
  
  render() {
    return (
      <div className="yzy-tab-content-wrap">
        <WasteWaterDischarge />
      </div>
    )
  }
}



export default WasteWater;