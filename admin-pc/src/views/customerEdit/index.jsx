import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

// import table from './assets/table.png';


import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;

import CustomerEditBaseinfo from './customerEdit.baseinfo';

import CustomerEditBaseinfoDetailProd from './customerEdit.baseinfo.detail.prodInfo';
//废水排放基本情况
import CustomerEditWasteWater from './customerEdit.wastewater';
//废气排放基本情况
import CustomerEditWasteGas from './customerEdit.wastegas';
//固体污染物基本情况
import CustomerEditWasteSolid from './customerEdit.wastesolid';
//边界噪声基本情况
import CustomerEditBoundaryNoise from './customerEdit.boundarynoise';
//企业遵守法律法规情况
import CustomerEditEIA from './customerEdit.EIA';
//列表页面//
class Customerinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    //总标签tab
    bigTabCallback(key) {
        console.log(key);
        // store.dispatch({ value: key, type: 'TABKEY' });
    }
    

    render() {
        
        return (
            <div className="yzy-page">
                <Tabs defaultActiveKey="1" onChange={this.bigTabCallback.bind(this)}>
                    <TabPane tab="排污单位基本情况" key="1">
                        <CustomerEditBaseinfo />
                    </TabPane>
                     <TabPane tab="排污单位基本情况-产品" key="2">
                        <CustomerEditBaseinfoDetailProd />
                    </TabPane>
                    <TabPane tab="废水污染物基本情况" key="3">
                        <CustomerEditWasteWater />
                    </TabPane>
                    <TabPane tab="废气污染物基本情况" key="4">
                        <CustomerEditWasteGas />
                    </TabPane>
                    <TabPane tab="固体废物基本情况" key="5">
                        <CustomerEditWasteSolid />
                    </TabPane>
                    <TabPane tab="边界噪声基本情况" key="6">
                        <CustomerEditBoundaryNoise />
                    </TabPane>
                    <TabPane tab="企业遵守法律法规情况" key="7">
                        <CustomerEditEIA />
                    </TabPane>
                    <TabPane tab="企业证照材料" key="8">
                    </TabPane>
                    <TabPane tab="企业内部环保管理制度" key="9">
                        4
                    </TabPane>
                    <TabPane tab="现场检查,监管信息" key="10">
                        4
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const CustomerinfoForm = Form.create()(Customerinfo);

ReactDOM.render(<CustomerinfoForm />, document.getElementById('root'));
