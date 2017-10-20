import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

// import table from './assets/table.png';


import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;

import CustomerEditBaseinfo from './customerEdit.baseinfo';

import {
    getCustomerInfoById
} from '../../common/api/api.customer';

//省
const provinceData = ['Zhejiang', 'Jiangsu'];
// 市
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo'],
    Jiangsu: ['Nanjing', 'Suzhou'],
};
// 区
const countyData = {
    Hangzhou: ['hang'],
    Ningbo: ['ning'],
    Nanjing: ['nan'],
    Suzhou: ['su'],
}
// 镇
const townData = {
    hang: ['h'],
    ning: ['n'],
    nan: ['nn'],
    su: ['s'],
}

const initData = {
    customerBaseinfo: {
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
        thirdCounty: countyData[cityData[provinceData[0]][0]],
        forthTown: townData[countyData[cityData[provinceData[0]][0]][0]],
    },
}
//列表页面//
class Customerinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerBaseinfo: {
                customer: {},
                cities: cityData[provinceData[0]],
                secondCity: cityData[provinceData[0]][0],
                thirdCounty: countyData[cityData[provinceData[0]][0]],
                forthTown: townData[countyData[cityData[provinceData[0]][0]][0]],
            },
        };
    }

    componentDidMount() {
        var cusId = window.location.search.split('=')[1];
        console.log(window.location.search)
        console.log(cusId)

        if (!cusId) return;

        getCustomerInfoById(cusId).then(res => {
            console.log('getCustomerInfoById res', res)
            this.setState(prev => ({
                customerBaseinfo: {
                    ...prev.customerBaseinfo,
                    customer: res.data.customer,
                }
            }));
            console.log(this.state.customerBaseinfo.customer)
        }).catch(err => console.log(err))

    }
    //总标签tab
    bigTabCallback(key) {
        console.log(key);
        // store.dispatch({ value: key, type: 'TABKEY' });
    }
    //选择省
    handleProvinceChange(field, value) {
        this.setState(prev => ({
            customerBaseinfo: {
                ...prev.customerBaseinfo,
                city: {

                }
            }
        }));
    }
    // 选择市
    onSecondCityChange(value) {
        this.setState();
    }
    //选择区
    onCountyChange(value) {
        this.setState({
            county: value,
            forthTown: townData[value],
        });
    }
    // 选择镇
    onTownChange(value) {
        this.setState({
            town: value,
        });
    }
    handleBaseinfoChange(section, field, value) {
        // this.setState(prev => ({
        //     customerBaseinfo: {
        //         ...prev.customerBaseinfo,
        //         [section]: {
        //             ...prev.customerBaseinfo[section],
        //             [field]: value
        //         }
        //     }
        // }))
    }

    handleBaseinfoSubmit(data) {

    }
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formData = this.props.form.getFieldsValue();
                console.log(formData)
            } else {
                console.log('Received values of form: ', values);
                return false;
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
        const cityOptions = this.state.customerBaseinfo.cities.map(city => <Option key={city}>{city}</Option>);
        const countyOptions = this.state.customerBaseinfo.thirdCounty.map(county => <Option key={county}>{county}</Option>);
        const townOptions = this.state.customerBaseinfo.forthTown.map(town => <Option key={town}>{town}</Option>);
        //图片上传
        // const props = {
        //     name: 'file',
        //     action: $db.uploadProImg,
        //     headers: {
        //         authorization: 'authorization-text',
        //     },
        //     onChange(info) {
        //         // if (info.file.status !== 'uploading') {
        //         //     console.log(info.file, info.fileList);
        //         // }
        //         if (info.file.status === 'done') {
        //             // console.log(info.file.response.result);
        //             message.success(`${info.file.name} file uploaded successfully`);
        //             const picItem = {
        //                 key: info.file.response.result,
        //             }
        //             store.dispatch({ value: picItem, type: 'PICITEM' })
        //             console.log(picItem)
        //         } else if (info.file.status === 'error') {
        //             message.error(`${info.file.name} file upload failed.`);
        //         }
        //     },
        // };
        return (
            <div className="content">
                <Tabs defaultActiveKey="1" onChange={this.bigTabCallback.bind(this)}>
                    <TabPane tab="排污单位基本情况" key="1">
                        <CustomerEditBaseinfo
                            provinceData={provinceData}
                            provinceOptions={provinceOptions}
                            cityOptions={cityOptions}
                            countyOptions={countyOptions}
                            townOptions={townOptions}
                            customerBaseinfo={this.state.customerBaseinfo}
                            handleProvinceChange={this.handleProvinceChange.bind(this)}
                            onSecondCityChange={this.onSecondCityChange.bind(this)}
                            onCountyChange={this.onCountyChange.bind(this)}
                            onTownChange={this.onTownChange.bind(this)}
                            handleChange={this.handleBaseinfoChange.bind(this)}
                            handleSubmit={this.handleBaseinfoSubmit.bind(this)}
                            handleFormSubmit={this.handleFormSubmit.bind(this)}
                            getFieldDecorator={getFieldDecorator} />
                    </TabPane>
                    <TabPane tab="废水污染物基本情况" key="2">
                    </TabPane>
                    <TabPane tab="废气污染物基本情况" key="3">
                        3
                    </TabPane>
                    <TabPane tab="固体废物基本情况" key="4">
                        4
                    </TabPane>
                    <TabPane tab="边界噪声基本情况" key="5">
                        4
                    </TabPane>
                    <TabPane tab="企业遵守法律法规情况" key="6">
                    </TabPane>
                    <TabPane tab="企业证照材料" key="7">
                        3
                    </TabPane>
                    <TabPane tab="企业内部环保管理制度" key="8">
                        4
                    </TabPane>
                    <TabPane tab="现场检查,监管信息" key="9">
                        4
                    </TabPane>
                </Tabs>
            </div >
        )
    }
}

const CustomerinfoForm = Form.create()(Customerinfo);

ReactDOM.render(<CustomerinfoForm />, document.getElementById('root'));
