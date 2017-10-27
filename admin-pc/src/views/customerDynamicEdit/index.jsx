import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

// import table from './assets/table.png';


import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;
import CustomerEditBaseinfoDetail from './customerEdit.dynamicinfo';
//废水污染物基本情况
import CustomerEditDynamicinfoWasteWater from './customerEdit.dynamicinfo.wastewater';
//废气污染物基本情况
import CustomerEditDynamicinfoWasteGas from './customerEdit.dynamicinfo.wastegas';
//固体废物产生与处置基本情况
import CustomerEditDynamicinfoWasteSolidRecord from './customerEdit.dynamicinfo.wastesolid.record';
//边界噪声基本情况
import CustomerEditDynamicinfoBoundaryNoise from './customerEdit.dynamicinfo.boundarynoise';

import {
    getCustomerId
} from '../../common/api/index';
import {
    MyToast,
    getLocQueryByLabel
} from '../../common/utils';


/**
 * 企业信息编辑或新增
 * 当新增企业信息时，务必保证首先保存基本信息
 */
class Dynamicinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPaneDisabled: false
        };
    }

    componentDidMount() {
        var cusId = getLocQueryByLabel('id');
        var dynamicId = getLocQueryByLabel('dynamicId');

        console.log('Dynamicinfo cusId dynamicId ------', cusId, dynamicId)
        var cusId = getCustomerId();
        if (!cusId) {
            this.setState({
                tabPaneDisabled: true
            })
        }
    }

    setTabPaneActive() {
        this.setState({
            tabPaneDisabled: false
        })
    }
    
    render() {
        
        return (
            <div className="yzy-page">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="生产信息" key="1">
                         <CustomerEditBaseinfoDetail onBaseinfoSave={this.setTabPaneActive.bind(this)} /> 
                    </TabPane>
                    <TabPane tab="废水污染物基本情况" disabled={this.state.tabPaneDisabled} key="2">
                        <CustomerEditDynamicinfoWasteWater />
                    </TabPane>
                    <TabPane tab="废气污染物基本情况" disabled={this.state.tabPaneDisabled} key="3">
                        <CustomerEditDynamicinfoWasteGas />
                    </TabPane>
                    <TabPane tab="固体废物基本情况" disabled={this.state.tabPaneDisabled} key="4">
                        <CustomerEditDynamicinfoWasteSolidRecord />
                    </TabPane>
                    <TabPane tab="边界噪声基本情况" disabled={this.state.tabPaneDisabled} key="5">
                        <CustomerEditDynamicinfoBoundaryNoise />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const DynamicinfoForm = Form.create()(Dynamicinfo);

ReactDOM.render(<DynamicinfoForm />, document.getElementById('root'));
