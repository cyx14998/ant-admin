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
//企业附件基本情况
import CustomerEditDynamicinfoAttachment from './customerEdit.dynamicinfo.attachment';

import {
  getCustomerDynamicList,
} from '../../common/api/api.customer.dynamic';

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
            tabPaneDisabled: false,

            // 动态月份选择
            selectedDynamicId: '',
            dynamicOptions: []
        };

        this.customerId = getLocQueryByLabel('id') || '';
        this.defaultDynamicId = getLocQueryByLabel('dynamicId') || '';

        // this.getDynamicListOptions = this.getDynamicListOptions.bind(this);
    }

    componentDidMount() {        

        if (this.customerId === '') {
            this.setState({
                tabPaneDisabled: true,                
            })
        };

        // this.getDynamicListOptions();
    }

    //getDynamicListOptions() {
      //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
    //   getCustomerDynamicList({}).then(res => {
    //     console.log('getCustomerDynamicList ---', res)
    //     if (res.data.result !== 'success') {
    //       MyToast(res.data.info || '获取动态列表失败')
    //       return;
    //     }

    //     var dynamicList = res.data.customerMonthDclarationList;

    //     var dynamicOptions = dynamicList.map(item => {
    //         return {
    //             key: item.tableId.toString(),
    //             value: item.tableId.toString(),
    //             label: item.theYear + '-' + item.theMonth
    //         }
    //     });

    //     this.setState({
    //         dynamicOptions,
    //         selectedDynamicId: this.defaultDynamicId
    //     });
    //   }).catch(err => {
    //     MyToast(err || '获取动态列表失败')
    //   })
    //}

    setTabPaneActive() {
        this.setState({
            tabPaneDisabled: false
        })
    }

    // onSeletChange(dynamicId) {
    //     this.setState({
    //         selectedDynamicId: dynamicId
    //     })
    // }

    // refreshDynamicId(tableId) {
    //     // 根据动态id，重新请求数据
    //     if (this.defaultDynamicId === this.state.selectedDynamicId) return;

    //     if(tableId){
    //         window.location.search = `id=${this.customerId}&dynamicId=${tableId}`;
    //     }else{

    //     }

    //     // window.location.search = `id=${this.customerId}&dynamicId=${this.state.selectedDynamicId}`;
    // }
    
    render() {
        
        return (
            <div className="yzy-customerDynamicEdit">
                {/* <div className="yzy-tab-content-item-wrap" 
                    style={{padding: 20, backgroundColor: '#fff', marginBottom: 20}}>
                   <h2 className="yzy-tab-content-title">选择动态月份</h2>
                  <div style={{padding: '20px'}}>
                    <Select 
                        style={{width: '200px'}} 
                        placeholder="选择动态月份" 
                        onChange={this.onSeletChange.bind(this)}
                        value={this.state.selectedDynamicId}>
                        {
                            this.state.dynamicOptions.map(item => (
                                <Option key={item.key} value={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>
                    <Button style={{marginLeft: '20px'}} type="primary" onClick={this.refreshDynamicId.bind(this)}>确定</Button>
                  </div>
                </div> */}
                <div style={{padding: 20, backgroundColor: '#fff'}}>
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
                        <TabPane tab="企业附件基本情况" disabled={this.state.tabPaneDisabled} key="6">
                            <CustomerEditDynamicinfoAttachment />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}


export default Dynamicinfo;
