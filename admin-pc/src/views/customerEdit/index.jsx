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
//废水排放
import CustomerEditWasteWater from './customerEdit.wastewater';
// import CustomerEditWasteWater from './customerEdit.wastewater.dischargedetail';
//废气排放
import CustomerEditWasteGas from './customerEdit.wastegas';
//固体污染物
import CustomerEditWasteSolid from './customerEdit.wastesolid';
//边界噪声
import CustomerEditBoundaryNoise from './customerEdit.boundarynoise';
//企业遵守法律法规情况
import CustomerEditEIA from './customerEdit.EIA';
//企业证照资料情况
import CustomerEditCertification from './customerEdit.certification';
// 企业内部环保管理制度
import CustomerIEPS from './customerEdit.IEPS';
//企业现场检查记录
import CustomerInspectionPlanDtlFor from './customerEdit.inspectionplandtlfor';
//企业监管记录
import CustomerSiteInspection from './customerEdit.siteinspection';

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
                <div style={{ padding: 20, backgroundColor: '#fff' }}>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition="left"
                    >
                        <TabPane tab="企业概况" key="1">
                            <CustomerEditBaseinfo onBaseinfoSave={this.setTabPaneActive.bind(this)} />
                        </TabPane>
                        <TabPane tab="排污单位" disabled={this.state.tabPaneDisabled} key="2">
                            <CustomerEditBaseinfoDetailProd />
                        </TabPane>
                        <TabPane tab="废水污染物" disabled={this.state.tabPaneDisabled} key="3">
                            <CustomerEditWasteWater />
                        </TabPane>
                        <TabPane tab="废气污染物" disabled={this.state.tabPaneDisabled} key="4">
                            <CustomerEditWasteGas />
                        </TabPane>
                        <TabPane tab="固体废物" disabled={this.state.tabPaneDisabled} key="5">
                            <CustomerEditWasteSolid />
                        </TabPane>
                        <TabPane tab="边界噪声" disabled={this.state.tabPaneDisabled} key="6">
                            <CustomerEditBoundaryNoise />
                        </TabPane>
                        <TabPane tab="遵守法律法规" disabled={this.state.tabPaneDisabled} key="7" className="customer-law">
                            <CustomerEditEIA />
                        </TabPane>
                        <TabPane tab="证照材料" disabled={this.state.tabPaneDisabled} key="8">
                            <CustomerEditCertification />
                        </TabPane>
                        <TabPane tab="内部环保管理制度" disabled={this.state.tabPaneDisabled} key="9">
                            <CustomerIEPS />
                        </TabPane>
                        <TabPane tab="现场检查" disabled={this.state.tabPaneDisabled} key="10">
                            <CustomerInspectionPlanDtlFor />
                        </TabPane>
                        <TabPane tab="监管信息" disabled={this.state.tabPaneDisabled} key="11">
                            <CustomerSiteInspection />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const CustomerinfoForm = Form.create()(Customerinfo);

ReactDOM.render(<CustomerinfoForm />, document.getElementById('root'));
