import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

// import table from './assets/table.png';


import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;

import CustomerEditBaseinfoDetail from './customerEdit.dynamicinfo';


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
class Dynamicinfo extends React.Component {
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
                    <TabPane tab="生产信息" key="1">
                         <CustomerEditBaseinfoDetail onBaseinfoSave={this.setTabPaneActive.bind(this)} /> 
                    </TabPane>
                     <TabPane tab="排污单位基本情况-产品" disabled={this.state.tabPaneDisabled} key="2">
                         1
                    </TabPane>
                    <TabPane tab="废水污染物基本情况" disabled={this.state.tabPaneDisabled} key="3">
                        2
                    </TabPane>
                    <TabPane tab="废气污染物基本情况" disabled={this.state.tabPaneDisabled} key="4">
                    </TabPane>
                    <TabPane tab="固体废物基本情况" disabled={this.setTabPaneActive.bind(this)} key="5">
                    </TabPane>
                    <TabPane tab="边界噪声基本情况" disabled={this.setTabPaneActive.bind(this)} key="6">
                    </TabPane>
                    <TabPane tab="企业遵守法律法规情况" disabled={this.setTabPaneActive.bind(this)} key="7">
                    </TabPane>
                    <TabPane tab="企业证照材料" disabled={this.setTabPaneActive.bind(this)} key="8">
                    </TabPane>
                    <TabPane tab="企业内部环保管理制度" disabled={this.state.tabPaneDisabled} key="9">
                    </TabPane>
                    <TabPane tab="现场检查,监管信息" disabled={this.state.tabPaneDisabled} key="10">
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const DynamicinfoForm = Form.create()(Dynamicinfo);

ReactDOM.render(<DynamicinfoForm />, document.getElementById('root'));
