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
    DatePicker,
    message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col, Modal,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';


import EditableCell from '../../components/editable.cell';
import { getLocQueryByLabel } from '../../common/utils';
import { getToken, } from '../../common/api/index';

import {
    getCustomerInfoById,
    saveAddCustomerInfoById,
    saveEditCustomerInfoById,
    getProductBaseInfoList,
    getProvinceList,
    getCityList,
    getAreaList,
    getTownList
} from '../../common/api/api.customer';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com';
const uploadUrl = downloadUrl + '&token=' + getToken();

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const formItemLayoutInner = {
    labelCol: { span: 16 },
    wrapperCol: { span: 8 },
}
const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
);
class CustomerEditBaseinfoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            prodImgUrl: '',
            prodFileList: [], //生产工艺流程图
            customer: {},
            provinceList: [],
            cityList: [],
            areaList: [],
            townList: [],
            provinceId: 1,
            cityId: 1,
            areaId: 1,
            townId: 1,
        })
    }

    componentDidMount() {
        // fetch data from api for FormItem initialValue
        //获取基本信息
        getCustomerInfoById().then(res => {
            console.log('getCustomerInfoById res', res);
            if (res.data.result !== 'success') {
                return
            }
            // console.log(res.data.customer)
            this.setState({
                customer: res.data.customer
            })
        }).catch(err => console.log(err));
        //获取省份
        return new Promise((resolve, reject) => {
            getProvinceList({}).then(res => {
                console.log('getProvinceList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                // console.log(res.data.customer)
                this.setState({
                    provinceList: res.data.provinceList
                })
            }).catch(err => console.log(err));
        })
    }
    //投产日期
    onCellChange(date, dateString) {
        console.log(date, dateString);
    }
    //更改省份
    changeProvince(key) {
        this.setState({
            provinceId: key,
        })
        console.log('provinceId', key);

        //获取城市列表
        return new Promise((resolve, reject) => {
            getCityList({ id: key }).then(res => {
                console.log('getCityList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                console.log(res.data.cityList)
                this.setState({
                    cityList: res.data.cityList
                })
            }).catch(err => console.log(err));
        })
    }
    //改变城市
    changeCity(key) {
        this.setState({
            cityId: key,
        })
        console.log('cityId', key);

        //获取区列表        
        return new Promise((resolve, reject) => {
            getAreaList({ id: key, provinceId: this.state.provinceId, }).then(res => {
                console.log('getAreaList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                // console.log(res.data.customer)
                this.setState({
                    areaList: res.data.areaList
                })
            }).catch(err => console.log(err));
        })
    }
    //改变区
    changeArea(key) {
        this.setState({
            areaId: key,
        })
        console.log('areaId', key);

        //获取镇列表        
        return new Promise((resolve, reject) => {
            getTownList({ id: key, provinceId: this.state.provinceId, cityId: this.state.cityId}).then(res => {
                console.log('getTownList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                // console.log(res.data.customer)
                this.setState({
                    townList: res.data.townList
                })
            }).catch(err => console.log(err));
        })
    }
    //改变镇
    changeTown(key) {
        // this.setState({
        //     townId: key,
        // })
    }
    //图片上传
    handlePicChange({ fileList }) {
        this.setState({
            prodFileList: fileList,
        });
        console.log(this.state.prodFileList);
        var index = fileList.length;
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                console.log(fileList[index - 1].response);
                // console.log(fileList[index - 1].response.result)
                this.setState({
                    prodImgUrl: DownloadUrl + fileList[index - 1].response.result,
                });
            }
        }
    }
    //图片取消预览
    picModalCancel() {
        // store.dispatch({
        //     previewImage: [],
        //     previewVisible: false,
        //     type: 'PICPREVIEW'
        // })
    }
    //图片预览
    handlePicPreview(file) {
        // store.dispatch({
        //     previewImage: file.url || file.thumbUrl,
        //     previewVisible: true,
        //     type: 'PICPREVIEW'
        // })
    }
    // 基本信息保存
    saveDetail(e) {
        e.preventDefault();
        const {
          form
        } = this.props;

        form.validateFields((err, values) => {
            if (err) return;
            console.log('when saveDetail ---', values);
            var cusId = getLocQueryByLabel('id');

            // address
            var data = { ...values };
            if (cusId === '') {
                saveAddCustomerInfoById(data).then(res => {
                    console.log('saveCustomerInfoById res', res);
                    if (res.data.result !== 'success') {
                        return
                        console.log('success');
                    }
                }).catch(err => console.log(err))
            } else {
                saveEditCustomerInfoById(data).then(res => {
                    console.log('saveCustomerInfoById res', res);
                    if (res.data.result !== 'success') {
                        return
                        console.log('success');
                    }
                }).catch(err => console.log(err))
            }
        })
    }
    render() {
        console.log(uploadUrl);

        let { getFieldDecorator } = this.props.form;
        var customer = this.state.customer;

        //省option
        var provinceOptions = this.state.provinceList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        });
        // 市option
        var cityOptions = this.state.provinceId ? this.state.cityList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        }) : '';
        // 区option
        var areaOptions = this.state.cityId ? this.state.areaList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        }) : '';
        // 镇option
        var townOptions = this.state.areaId ? this.state.townList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        }) : '';
        // console.log('sss',provinceOptions);

        return (
            <div className="yzy-tab-content-item-wrap">
                <Form onSubmit={this.saveDetail.bind(this)}>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">基本信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业名称">
                                    {getFieldDecorator('customerName', {
                                        initialValue: customer.customerName,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="企业名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="社会信用代码">
                                    {getFieldDecorator('uniformSocialCreditCode', {
                                        initialValue: customer.uniformSocialCreditCode,
                                        rules: [{ required: true, message: 'Please input your uniformSocialCreditCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="社会信用代码" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="单位类别">
                                    {getFieldDecorator('unitCategory', {
                                        initialValue: customer.unitCategory,
                                        rules: [{ required: true, message: 'Please input your unitCategory!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="单位类别" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="中心纬度">
                                    {getFieldDecorator('latitude', {
                                        initialValue: customer.latitude ? customer.latitude + "" : '',
                                        rules: [{ required: true, message: 'Please input your latitude!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="中心纬度" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="中心经度">
                                    {getFieldDecorator('longitude', {
                                        initialValue: customer.longitude ? customer.longitude + "" : '',
                                        rules: [{ required: true, message: 'Please input your longitude!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="中心经度" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="邮政编码">
                                    {getFieldDecorator('postalCode', {
                                        initialValue: customer.postalCode ? customer.postalCode + "" : '',
                                        rules: [{ required: true, message: 'Please input your postalCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="邮政编码" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="联系人">
                                    {getFieldDecorator('contactPerson', {
                                        initialValue: customer.contactPerson,
                                        rules: [{ required: true, message: 'Please input your contactPerson!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="联系人" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="电话">
                                    {getFieldDecorator('phoneNumber', {
                                        initialValue: customer.phoneNumber,
                                        rules: [{ required: true, message: 'Please input your phoneNumber!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="电话" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="传真">
                                    {getFieldDecorator('fax', {
                                        initialValue: customer.fax,
                                        rules: [{ required: true, message: 'Please input your fax!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="传真" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="行业类别">
                                    {getFieldDecorator('industryCategory', {
                                        initialValue: customer.industryCategory,
                                        rules: [{ required: true, message: 'Please input your industryCategory!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="行业类别" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业规模">
                                    {getFieldDecorator('enterpriseScale', {
                                        initialValue: customer.enterpriseScale,
                                        rules: [{ required: true, message: 'Please input your enterpriseScale!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="企业规模" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="管辖归属">
                                    {getFieldDecorator('jurisdictionAscriptionId', {
                                        initialValue: customer.jurisdictionAscriptionId ? customer.jurisdictionAscriptionId+"": '',
                                        rules: [{ required: true, message: 'Please input your jurisdictionAscriptionId!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="管辖归属" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5} style={{ marginRight: '10px' }}>
                                <FormItem labelCol={{ span: 13 }} wrapperCol={{ span: 11 }} label="企业地址">
                                    {getFieldDecorator('provinceId', {
                                        //initialValue: this.state.provinceList[0] ? this.state.provinceList[0].tableId : '',
                                        initialValue: (customer.provinceId ? customer.provinceId : '') + "",
                                        rules: [{ required: true, message: 'Please input your provinceId!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select onChange={this.changeProvince.bind(this)}>
                                            {provinceOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={3} style={{ marginRight: '10px' }}>
                                <FormItem>
                                    {getFieldDecorator('cityId', {
                                        //initialValue: this.state.cityList[0].tableId ? this.state.cityList[0].tableId : '',
                                        initialValue: (customer.cityId ? customer.cityId : '') + "",
                                        rules: [{ required: true, message: 'Please input your cityId!' },
                                            //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                        ],
                                    })(
                                        <Select onChange={this.changeCity.bind(this)}>
                                            {cityOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={3} style={{ marginRight: '10px' }}>
                                <FormItem>
                                    {getFieldDecorator('areaId', {
                                        //initialValue: this.state.areaList[0].tableId ? this.state.areaList[0].tableId : '',
                                        initialValue: (customer.areaId ? customer.areaId : '') + "",
                                        //rules: [{ required: true, message: 'Please input your areaId!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Select onChange={this.changeArea.bind(this)}>
                                            {areaOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={3} style={{ marginRight: '10px' }}>
                                <FormItem>
                                    {getFieldDecorator('townId', {
                                        //initialValue: this.state.townList[0].tableId ? this.state.provinceList[0].tableId : '',
                                        initialValue: (customer.townId ? customer.townId : '') + "",
                                        //rules: [{ required: true, message: 'Please input your townId!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        // ],
                                    })(
                                        <Select onChange={this.changeTown.bind(this)}>
                                            {townOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    {getFieldDecorator('address', {
                                        initialValue: customer.address,
                                        rules: [{ required: true, message: 'Please input your address!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="详细地址" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>

                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">其他信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="行业类别">
                                    {getFieldDecorator('industryCategory', {
                                        initialValue: customer.industryCategory,
                                        rules: [{ required: true, message: 'Please input your industryCategory!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="行业类别" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业规模">
                                    {getFieldDecorator('enterpriseScale', {
                                        initialValue: customer.enterpriseScale,
                                        rules: [{ required: true, message: 'Please input your enterpriseScale!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="企业规模" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="投产日期">
                                    {getFieldDecorator('openingDate', {
                                    })(
                                        //<DatePicker value={customer.openingDate ? moment(customer.openingDate, 'YYYY/MM/DD') : moment(new Date(), 'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
                                        //<Input placeholder="投产日期" />
                                        <DatePicker  value="2017-10-10" onChange={(data,dataString)=> console.log(data,'sss',dataString)}/>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="隶属关系">
                                    {getFieldDecorator('affiliation', {
                                        initialValue: customer.affiliation,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="隶属关系" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="重点级别">
                                    {getFieldDecorator('priorityLevel', {
                                        initialValue: customer.priorityLevel,
                                        rules: [{ required: true, message: 'Please input your priorityLevel!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="重点级别" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="重点类型">
                                    {getFieldDecorator('unitCategory', {
                                        initialValue: customer.unitCategory,
                                        rules: [{ required: true, message: 'Please input your unitCategory!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="重点类型" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废气排放口数量">
                                    {getFieldDecorator('exhaustEmissionsPorts', {
                                        initialValue: customer.exhaustEmissionsPorts ? customer.exhaustEmissionsPorts + "" : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="废气排放口数量" addonAfter="个" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废水排放口数量">
                                    {getFieldDecorator('wastewaterDischargePorts', {
                                        initialValue: customer.wastewaterDischargePorts ? customer.wastewaterDischargePorts + "" : '',
                                        rules: [{ required: true, message: 'Please input your wastewaterDischargePorts!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="废水排放口数量" addonAfter="个" />
                                        )}
                                </FormItem></Col>
                            <Col span={8}>
                                <Col span={12}>
                                    <FormItem {...formItemLayoutInner} label="是否燃气电厂">
                                        {getFieldDecorator('isGasPowerPlant', {
                                            initialValue: (customer.isGasPowerPlant ? customer.isGasPowerPlant : 'true') + "",
                                            rules: [{ required: true, message: 'Please input your isGasPowerPlant!' },
                                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                            ],
                                        })(
                                            <Select>
                                                <Option value="true">是</Option>
                                                <Option value="false">否</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem {...formItemLayoutInner} label="是否央企">
                                        {getFieldDecorator('isCentralEnterprises', {
                                            initialValue: (customer.isCentralEnterprises ? customer.isCentralEnterprises : 'true') + "",
                                            rules: [{ required: true, message: 'Please input your isCentralEnterprises!' },
                                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                            ],
                                        })(
                                            <Select>
                                                <Option value="true">是</Option>
                                                <Option value="false">否</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="是否30万千瓦以上电力">
                                    {getFieldDecorator('isMoreThan30PowerEnterprise', {
                                        initialValue: (customer.isMoreThan30PowerEnterprise ? customer.isMoreThan30PowerEnterprise : 'true') + "",
                                        rules: [{ required: true, message: 'Please input your isMoreThan30PowerEnterprise!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="true">是</Option>
                                            <Option value="false">否</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="化学需氧量">
                                    {getFieldDecorator('aiChemicalOxygenDemand', {
                                        initialValue: customer.aiChemicalOxygenDemand ? customer.aiChemicalOxygenDemand + "" : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="化学需氧量" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="氮氧">
                                    {getFieldDecorator('aiAmmoniaNitrogen', {
                                        initialValue: customer.aiAmmoniaNitrogen ? customer.aiAmmoniaNitrogen + "" : '',
                                        rules: [{ required: true, message: 'Please input your aiAmmoniaNitrogen!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="氮氧" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="氮氧化物">
                                    {getFieldDecorator('aiNitrogenOxide', {
                                        initialValue: customer.aiNitrogenOxide ? customer.aiNitrogenOxide + "" : '',
                                        rules: [{ required: true, message: 'Please input your aiNitrogenOxide!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="氮氧化物" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="烟尘">
                                    {getFieldDecorator('aiSmoke', {
                                        initialValue: customer.aiSmoke ? customer.aiSmoke + "" : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="烟尘" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="二氧化硫">
                                    {getFieldDecorator('aiSulfurDioxide', {
                                        initialValue: customer.aiSulfurDioxide ? customer.aiSulfurDioxide + "" : '',
                                        rules: [{ required: true, message: 'Please input your aiSulfurDioxide!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="二氧化硫" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="悬浮物">
                                    {getFieldDecorator('aiSuspendedSolids', {
                                        initialValue: customer.aiSuspendedSolids ? customer.aiSuspendedSolids + "" : '',
                                        rules: [{ required: true, message: 'Please input your aiSuspendedSolids!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="悬浮物" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="其他">
                                    {getFieldDecorator('aiOther', {
                                        initialValue: customer.aiOther,
                                        rules: [{ required: true, message: 'Please input your aiOther!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="其他" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={12}>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">生产工艺流程图及排污环节</h2>
                                <Upload
                                    action={downloadUrl}
                                    listType="picture-card"
                                    fileList={this.state.prodFileList}
                                    onPreview={this.handlePicPreview.bind(this)}
                                    onChange={this.handlePicChange.bind(this)}
                                >
                                    {this.state.prodFileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.picModalCancel.bind(this)}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                </Modal>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">企业地理位置图和厂区平面布局图</h2>

                            </div>
                        </Col>
                    </Row>
                    <div className="yzy-block-center">
                        <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Form.create()(CustomerEditBaseinfoDetail);