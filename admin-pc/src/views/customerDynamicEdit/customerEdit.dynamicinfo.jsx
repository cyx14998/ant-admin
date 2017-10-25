/**
 * 排污单位基本情况 -- 详情模块
 */
import React from 'react';
import {
    Form,
    Table,
    Icon,
    Input,
    Button,
    Select,
    Popconfirm,
    Upload,
    Menu,
    Alert,
    message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { getLocQueryByLabel } from '../../common/utils';

import {
    getCustomerInfoById,
    saveCustomerInfoById,
    getProductBaseInfoList
} from '../../common/api/api.customer';

import CustomerEditDynamicinfoProd from './customerEdit.dynamicinfo.prod';
import CustomerEditDynamicinfoMaterial from './customerEdit.dynamicinfo.material';
import CustomerEditDynamicinfoWater from './customerEdit.dynamicinfo.water';
import CustomerEditDynamicinfoFuel from './customerEdit.dynamicinfo.fuel';


class CustomerEditBaseinfoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            customer: {}
        })
    }

    componentDidMount() {
        // fetch data from api for FormItem initialValue
    }
    render() {
        let {
      getFieldDecorator
    } = this.props.form;
        var customer = this.state.customer;
        return (
            <div className="yzy-tab-content-item-wrap" style={{paddingBottom: 50}}>
                <CustomerEditDynamicinfoProd />
                <CustomerEditDynamicinfoMaterial />
                <CustomerEditDynamicinfoWater />
                <CustomerEditDynamicinfoFuel />
            </div >
        )
    }
}

export default Form.create()(CustomerEditBaseinfoDetail);