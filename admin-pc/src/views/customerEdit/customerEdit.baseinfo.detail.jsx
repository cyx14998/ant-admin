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
    DatePicker,
    message,
    Dropdown,
    Row,
    Col,
    Modal,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';

import { MyToast, getLocQueryByLabel } from '../../common/utils';

import {
    getCustomerInfoById,
    saveAddCustomerInfoById,
    saveEditCustomerInfoById,
    getProductBaseInfoList,
    getProvinceList,
    getCityList,
    getAreaList,
    getTownList,
} from '../../common/api/api.customer';

//引入上传图片组件
import QiniuUpload from '../../components/upload';
const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const formItemLayoutInner = {
    labelCol: { span: 16 },
    wrapperCol: { span: 8 },
}

class CustomerEditBaseinfoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            prodFileList: [], //生产工艺流程图
            positionFileList: [], //地理位置图
            customer: {},
            provinceList: [],
            cityList: [],
            areaList: [],
            townList: [],
            provinceId: '',
            cityId: '',
            areaId: '',
            townId: '',
            uptoken: '',
            onBaseinfoSave: this.props.onBaseinfoSave || '',
        });
    }

    componentDidMount() {
        //获取省份        
        getProvinceList({}).then(res => {
            if (res.data.result !== 'success') {
                return
            }
            this.setState({
                provinceList: res.data.provinceList,
            })
        }).catch(err => console.log(err));
        //获取基本信息
        var self = this;
        getCustomerInfoById().then(res => {
            console.log('getCustomerInfoById res', res);
            if (res.data.result !== 'success') {
                return
            }
            this.setState({
                customer: res.data.customer
            })
            //图片初始化
            if (res.data.customer.productionFlowChartURL) {
                self.setState({
                    prodFileList: [{
                        uid: '1',
                        name: '生产流程图',
                        url: res.data.customer.productionFlowChartURL
                    }],
                });
            } else {
                self.setState({
                    prodFileList: [],
                });
            }
            if (res.data.customer.factoryFloorPlanURL) {
                self.setState({
                    positionFileList: [{
                        uid: '1',
                        name: '地理位置图',
                        url: res.data.customer.factoryFloorPlanURL
                    }],
                });
            } else {
                self.setState({
                    positionFileList: [],
                });
            }
            //地址（省市区）初始化
            if (res.data.customer.cityId) {
                self.changeProvince(res.data.customer.provinceId)
            }
            if (res.data.customer.areaId) {
                self.changeCity(res.data.customer.cityId)
            }
            if (res.data.customer.townId) {
                self.changeTown(res.data.customer.townId)
            }
        }).catch(err => console.log(err));
    }
    //更改省份
    changeProvince(key) {
        this.setState({
            provinceId: key,
            cityList: [],
            cityId: '',
        })
        console.log('provinceId');

        //获取城市列表
        return new Promise((resolve, reject) => {
            getCityList({ id: key }).then(res => {
                console.log('getCityList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                console.log(res.data.cityList)
                this.setState({
                    cityList: res.data.cityList,
                    cityId: res.data.cityList[0].tableId,
                })
            }).catch(err => console.log(err));
        })
    }
    //改变城市
    changeCity(key) {
        this.setState({
            cityId: key,
            areaList: [],
            areaId: '',

        })
        console.log('cityId', key);

        //获取区列表        
        return new Promise((resolve, reject) => {
            getAreaList({ id: key }).then(res => {
                console.log('getAreaList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                // console.log(res.data.customer)
                this.setState({
                    areaList: res.data.areaList,
                    areaId: res.data.areaList[0].tableId,
                })
            }).catch(err => console.log(err));
        })
    }
    //改变区
    changeArea(key) {
        this.setState({
            areaId: key,
            townList: [],
            townId: '',
        })
        console.log('areaId', key);

        //获取镇列表        
        return new Promise((resolve, reject) => {
            getTownList({ id: key }).then(res => {
                console.log('getTownList res', res);
                if (res.data.result !== 'success') {
                    return
                }
                // console.log(res.data.customer)
                this.setState({
                    townList: res.data.townList,
                    townId: res.data.areaList[0].townId,
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

    //生产图片
    handleProdFileList({ fileList }) {
        this.setState({
            prodFileList: fileList,
        });
    }
    // 地理位置图片
    handlePositionFileList({ fileList }) {
        this.setState({
            positionFileList: fileList,
        });
    }

    // 基本信息保存
    saveDetail(e) {
        var self = this;
        e.preventDefault();
        const {
          form
        } = self.props;

        form.validateFields((err, values) => {
            if (err) return;

            var data = { ...values };
            // 地址处理
            var provinceName = self.state.provinceId ? self.state.provinceList[data.provinceId - 1].theName : '';
            var cityName = '';
            self.state.cityId ?
                self.state.cityList.map((item) => {
                    if (item.tableId == data.cityId)
                        cityName = item.theName;
                }) : '';
            var areaName = '';
            self.state.areaId ?
                self.state.areaList.map((item) => {
                    if (item.tableId == data.areaId)
                        areaName = item.theName;
                }) : '';
            var townName = '';
            self.state.townId ?
                self.state.townList.map((item) => {
                    if (item.tableId == data.townId)
                        townName = item.theName;
                }) : '';
            data.unitAddress = provinceName + cityName + areaName + townName + data.address;
            //时间处理
            data.openingDate = data.openingDate ? data.openingDate.format('YYYY-MM-DD') : new Date();
            // 图片处理
            //生产工艺流程图及排污环节
            var prodFileUrl = self.state.prodFileList[0];
            if (!prodFileUrl) {
                prodFileUrl = "";
            } else {
                prodFileUrl = prodFileUrl.url
                // 上传
                if (!prodFileUrl) {
                    prodFileUrl = self.state.prodFileList[0].response.filePath;
                }
                if (!prodFileUrl) {
                    prodFileUrl = ""
                } else if (prodFileUrl.indexOf(downloadUrl) === -1) {
                    prodFileUrl = downloadUrl + prodFileUrl;
                }
            }
            //企业地理位置图和厂区平面布局图
            var positionFileUrl = self.state.positionFileList[0];
            if (!positionFileUrl) {
                positionFileUrl = "";
            } else {
                positionFileUrl = positionFileUrl.url
                // 上传
                if (!positionFileUrl) {
                    positionFileUrl = self.state.positionFileList[0].response.filePath;
                }
                if (!positionFileUrl) {
                    positionFileUrl = ""
                } else if (positionFileUrl.indexOf(downloadUrl) === -1) {
                    positionFileUrl = downloadUrl + positionFileUrl;
                }
            }
            //图片
            data.productionFlowChartURL = prodFileUrl;
            data.factoryFloorPlanURL = positionFileUrl;
            console.log('when savebaseInfoDetail -------', data);

            var cusId = getLocQueryByLabel('id');
            if (cusId === '') {
                //新增
                saveAddCustomerInfoById(data).then(res => {
                    console.log('saveCustomerInfoById res', res);
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info);
                        return
                    }
                    console.log('123456----------------',res.data)
                    MyToast('保存成功');
                    self.state.onBaseinfoSave(); //控制其他tabs可用
                    localStorage.setItem("yt-customerId", res.data.tableId);
                }).catch(err =>
                    MyToast(err)
                    )
            } else {
                saveEditCustomerInfoById(data).then(res => {
                    console.log('saveCustomerInfoById res', res);
                    if (res.data.result !== 'success') {
                        return
                    }
                    MyToast('编辑成功');
                }).catch(err =>
                    MyToast(err)
                    )
            }
        })
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        var customer = this.state.customer;

        //省option
        var provinceOptions = this.state.provinceList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        });
        // 市option
        var cityOptions = this.state.provinceList ? this.state.cityList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        }) : '';
        // 区option
        var areaOptions = this.state.cityList ? this.state.areaList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        }) : '';
        // 镇option
        var townOptions = this.state.areaList ? this.state.townList.map((item, index) => {
            return <Option key={item.tableId}>{item.theName}</Option>
        }) : '';

        return (
            <div className="yzy-tab-content-item-wrap">
                <Form onSubmit={this.saveDetail.bind(this)}>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">基本信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业名称">
                                    {getFieldDecorator('customerName', {
                                        initialValue: customer.customerName ? customer.customerName : '',
                                        rules: [{ required: true },
                                            //{ pattern: /^[0-9]*$/ } 
                                        ],
                                    })(
                                        <Input placeholder="企业名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="社会信用代码">
                                    {getFieldDecorator('uniformSocialCreditCode', {
                                        initialValue: customer.uniformSocialCreditCode ? customer.uniformSocialCreditCode : '',
                                        rules: [{ required: true, message: 'Please input your uniformSocialCreditCode!' },
                                            //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        ],
                                    })(
                                        <Input placeholder="社会信用代码" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="单位类别">
                                    {getFieldDecorator('unitCategory', {
                                        initialValue: customer.unitCategory ? customer.unitCategory : '',
                                        //rules: [{ required: true, message: 'Please input your unitCategory!' },
                                        // pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        //rules: [{ required: true, message: 'Please input your latitude!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="中心纬度" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="中心经度">
                                    {getFieldDecorator('longitude', {
                                        initialValue: customer.longitude ? customer.longitude + "" : '',
                                        //rules: [{ required: true, message: 'Please input your longitude!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="中心经度" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="邮政编码">
                                    {getFieldDecorator('postalCode', {
                                        initialValue: customer.postalCode ? customer.postalCode + "" : '',
                                        //rules: [{ required: true, message: 'Please input your postalCode!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        initialValue: customer.contactPerson ? customer.contactPerson : '',
                                        rules: [{ required: true, message: 'Please input your contactPerson!' },
                                            //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        ],
                                    })(
                                        <Input placeholder="联系人" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="电话">
                                    {getFieldDecorator('phoneNumber', {
                                        initialValue: customer.phoneNumber ? customer.phoneNumber : '',
                                        rules: [{ required: true, message: 'Please input your phoneNumber!' },
                                            //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        ],
                                    })(
                                        <Input placeholder="电话" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="传真">
                                    {getFieldDecorator('fax', {
                                        initialValue: customer.fax ? customer.fax : '',
                                        //rules: [{ required: true, message: 'Please input your fax!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="传真" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业规模">
                                    {getFieldDecorator('enterpriseScale', {
                                        initialValue: customer.enterpriseScale ? customer.enterpriseScale : '',
                                        //rules: [{ required: true, message: 'Please input your enterpriseScale!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="企业规模" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="管辖归属">
                                    {getFieldDecorator('jurisdictionAscriptionId', {
                                        initialValue: customer.jurisdictionAscriptionId ? customer.jurisdictionAscriptionId + "" : '',
                                        //rules: [{ required: true, message: 'Please input your jurisdictionAscriptionId!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        initialValue: (this.state.provinceList && customer.provinceId ? customer.provinceId : '') + "",
                                        //rules: [{ required: true, message: 'Please input your provinceId!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        initialValue: (this.state.cityList && customer.cityId ? customer.cityId : '') + "",
                                        //rules: [{ required: true, message: 'Please input your cityId!' },
                                        //    //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                        //],
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
                                        initialValue: (this.state.areaList && customer.areaId ? customer.areaId : '') + "",
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
                                        //initialValue: this.state.townList[0] ? this.state.provinceList[0].tableId : '',
                                        initialValue: (this.state.townId ? customer.townId : '') + "",
                                        ////rules: [{ required: true, message: 'Please input your townId!' },
                                        ////{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //// ],
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
                                        initialValue: customer.address ? customer.address : '',
                                        //rules: [{ required: true, message: 'Please input your address!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        initialValue: customer.industryCategory ? customer.industryCategory : '',
                                        //rules: [{ required: true, message: 'Please input your industryCategory!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="行业类别" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业规模">
                                    {getFieldDecorator('enterpriseScale', {
                                        initialValue: customer.enterpriseScale ? customer.enterpriseScale : '',
                                        //rules: [{ required: true, message: 'Please input your enterpriseScale!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="企业规模" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="投产日期">
                                    {getFieldDecorator('openingDate', {
                                        initialValue: moment(customer.openingDate || new Date(), 'YYYY-MM-DD'),
                                    })(
                                        //<DatePicker value={customer.openingDate ? moment(customer.openingDate, 'YYYY/MM/DD') : moment(new Date(), 'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
                                        <DatePicker />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="隶属关系">
                                    {getFieldDecorator('affiliation', {
                                        initialValue: customer.affiliation ? customer.affiliation : '',
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <Input placeholder="隶属关系" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="重点级别">
                                    {getFieldDecorator('priorityLevel', {
                                        initialValue: customer.priorityLevel ? customer.priorityLevel : '',
                                        //rules: [{ required: true, message: 'Please input your priorityLevel!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="重点级别" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="重点类型">
                                    {getFieldDecorator('priorityType', {
                                        initialValue: customer.priorityType ? customer.priorityType : '',
                                        //rules: [{ required: true, message: 'Please input your priorityType!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <Input placeholder="废气排放口数量" addonAfter="个" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废水排放口数量">
                                    {getFieldDecorator('wastewaterDischargePorts', {
                                        initialValue: customer.wastewaterDischargePorts ? customer.wastewaterDischargePorts + "" : '',
                                        //rules: [{ required: true, message: 'Please input your wastewaterDischargePorts!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="废水排放口数量" addonAfter="个" />
                                        )}
                                </FormItem></Col>
                            <Col span={8}>
                                <Col span={12}>
                                    <FormItem {...formItemLayoutInner} label="是否燃气电厂">
                                        {getFieldDecorator('isGasPowerPlant', {
                                            initialValue: (customer.isGasPowerPlant ? customer.isGasPowerPlant : 'true') + "",
                                            //rules: [{ required: true, message: 'Please input your isGasPowerPlant!' },
                                            //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                            //],
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
                                            //rules: [{ required: true, message: 'Please input your isCentralEnterprises!' },
                                            //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                            //],
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
                                        //rules: [{ required: true, message: 'Please input your isMoreThan30PowerEnterprise!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <Input placeholder="化学需氧量" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="氮氧">
                                    {getFieldDecorator('aiAmmoniaNitrogen', {
                                        initialValue: customer.aiAmmoniaNitrogen ? customer.aiAmmoniaNitrogen + "" : '',
                                        //rules: [{ required: true, message: 'Please input your aiAmmoniaNitrogen!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        //rules: [{ required: true, message: 'Please input your aiNitrogenOxide!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="氮氧化物" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="烟尘">
                                    {getFieldDecorator('aiSmoke', {
                                        initialValue: customer.aiSmoke ? customer.aiSmoke + "" : '',
                                        //rules: [{ required: true },
                                        //{ pattern: /^[0-9]*$/ } 
                                        //],
                                    })(
                                        <Input placeholder="烟尘" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="二氧化硫">
                                    {getFieldDecorator('aiSulfurDioxide', {
                                        initialValue: customer.aiSulfurDioxide ? customer.aiSulfurDioxide + "" : '',
                                        //rules: [{ required: true, message: 'Please input your aiSulfurDioxide!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                        //rules: [{ required: true, message: 'Please input your aiSuspendedSolids!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
                                    })(
                                        <Input placeholder="悬浮物" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="其他">
                                    {getFieldDecorator('aiOther', {
                                        initialValue: customer.aiOther ? customer.aiOther : '',
                                        //rules: [{ required: true, message: 'Please input your aiOther!' },
                                        //{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
                                        //],
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
                                <QiniuUpload
                                    uploadTitle="图片"
                                    uploadedFileList={this.state.prodFileList}
                                    handleUploadedFileList={this.handleProdFileList.bind(this)}
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="baseinfo-section">
                                <h2 className="yzy-tab-content-title">企业地理位置图和厂区平面布局图</h2>
                                <QiniuUpload
                                    uploadTitle="图片"
                                    uploadedFileList={this.state.positionFileList}
                                    handleUploadedFileList={this.handlePositionFileList.bind(this)}
                                />
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