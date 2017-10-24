/**
 * 固体废物基本情况
 */
import React, { Component } from 'react';
//固体废物基本信息列表
import WasteSolidList from './customerEdit.wastesolid.List';
//固体废物基本信息详情
import WasteSolidDetail from './customerEdit.wastesolid.Detail';

class WasteWater extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="yzy-tab-content-wrap">
        <WasteSolidList />
        <WasteSolidDetail />
      </div>
    )
  }
}



export default WasteWater;