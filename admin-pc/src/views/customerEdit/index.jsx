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
//企业证照资料情况
import CustomerEditCertification from './customerEdit.certification';
// 企业内部环保管理制度
import CustomerIEPS from './customerEdit.IEPS';
// 现场检查、监管信息
import CustomerSiteInspection from './customerEdit.siteInspection';

import {
    getCustomerId
} from '../../common/api/index';
import {
    MyToast
} from '../../common/utils';


/**
 * 企业信息编辑或新增
 * 当新增企业信息时，务必保证首先保存基本信息
 */
class Customerinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPaneDisabled: false
        };
    }

    componentDidMount() {
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
                    <TabPane tab="排污单位基本情况" key="1">
                        <CustomerEditBaseinfo onBaseinfoSave={this.setTabPaneActive.bind(this)} />
                    </TabPane>
                     <TabPane tab="排污单位基本情况-产品" disabled={this.state.tabPaneDisabled} key="2">
                        <CustomerEditBaseinfoDetailProd />
                    </TabPane>
                    <TabPane tab="废水污染物基本情况" disabled={this.state.tabPaneDisabled} key="3">
                        <CustomerEditWasteWater />
                    </TabPane>
                    <TabPane tab="废气污染物基本情况" disabled={this.state.tabPaneDisabled} key="4">
                        <CustomerEditWasteGas />
                    </TabPane>
                    <TabPane tab="固体废物基本情况" disabled={this.state.tabPaneDisabled} key="5">
                        <CustomerEditWasteSolid />
                    </TabPane>
                    <TabPane tab="边界噪声基本情况" disabled={this.state.tabPaneDisabled} key="6">
                        <CustomerEditBoundaryNoise />
                    </TabPane>
                    <TabPane tab="企业遵守法律法规情况" disabled={this.state.tabPaneDisabled} key="7">
                        <CustomerEditEIA />
                    </TabPane>
                    <TabPane tab="企业证照材料" disabled={this.state.tabPaneDisabled} key="8">
                        <CustomerEditCertification />
                    </TabPane>
                    <TabPane tab="企业内部环保管理制度" disabled={this.state.tabPaneDisabled} key="9">
                        <CustomerIEPS />
                    </TabPane>
                    <TabPane tab="现场检查,监管信息" disabled={this.state.tabPaneDisabled} key="10">
                        <CustomerSiteInspection />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const CustomerinfoForm = Form.create()(Customerinfo);

ReactDOM.render(<CustomerinfoForm />, document.getElementById('root'));
