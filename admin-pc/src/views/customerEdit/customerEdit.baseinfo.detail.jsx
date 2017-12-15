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
	getJurisdictionList,
} from '../../common/api/api.customer';

//引入上传图片组件
import QiniuUpload from '../../components/upload';
const downloadUrl = BaseConfig.qiniuPath;
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
			customer: {},  // 详细信息
			jurisdictionList: [],
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
			tableId: '', //控制新增or编辑

			superviseLevelClass: '', // 监管等级className
		});

		this.initMap = this.initMap.bind(this);
	}

	componentDidMount() {
		// map init
		this.initMap()

		//获取管辖归属列表----------
		getJurisdictionList({}).then(res => {
			console.log('管辖归属-----------------', res.data.jurisdictionAscriptionList)
			if (res.data.result !== 'success') {
				return
			}
			this.setState({
				jurisdictionList: res.data.jurisdictionAscriptionList,
			})
		}).catch(err => console.log(err));
		//获取省份-----------       
		getProvinceList({}).then(res => {
			console.log('省------------', res.data.provinceList)
			if (res.data.result !== 'success') {
				return
			}
			this.setState({
				provinceList: res.data.provinceList,
			})
		}).catch(err => console.log(err));

		this.getCustomerInfoById();
	}

	//获取基本信息-----------
	getCustomerInfoById() {
		//获取基本信息-----------
		var self = this;
		getCustomerInfoById().then(res => {
			console.log('getCustomerInfoById res----------------', res);
			if (res.data.result !== 'success') {
				return
			}
			this.setState({
				customer: res.data.customer
			});
			// 初始化监管等级
			this.superviseLevelChange(res.data.customer.superviseLevel);
			//图片初始化
			if (res.data.customer.productionFlowChartURL) {
				var proFlowArr = res.data.customer.productionFlowChartURL.split(',');
				if (proFlowArr.length) {
					var prodFileList = [];
					proFlowArr.map((item, index) => {
						prodFileList.push({
							uid: index,
							name: '生产流程图',
							url: item
						});
					});
					self.setState({
						prodFileList
					});
				}
			} else {
				self.setState({
					prodFileList: [],
				});
			}
			if (res.data.customer.factoryFloorPlanURL) {
				var facFlowArr = res.data.customer.factoryFloorPlanURL.split(',');
				if (facFlowArr.length) {
					var positionFileList = [];
					facFlowArr.map((item, index) => {
						positionFileList.push({
							uid: index,
							name: '地理位置图',
							url: item
						});
					});
					self.setState({
						positionFileList
					});
				}
			} else {
				self.setState({
					positionFileList: [],
				});
			}
			// 经纬度获取地图信息
			if (res.data.customer && res.data.customer.latitude && res.data.customer.longitude) {
				self.addMarker(res.data.customer.longitude, res.data.customer.latitude, 1);
			}
			//地址（省市区）初始化
			if (res.data.customer.provinceId) {
				self.changeProvince(res.data.customer.provinceId);
			}
			if (res.data.customer.cityId) {
				self.changeProvince(res.data.customer.provinceId);
				self.changeCity(res.data.customer.cityId);
			}
			if (res.data.customer.areaId) {
				self.changeCity(res.data.customer.cityId);
				self.changeTown(res.data.customer.townId);
			}
			if (res.data.customer.townId) {
				self.changeTown(res.data.customer.townId);
			}
		}).catch(err => console.log(err));
	}

	initMap() {
		var self = this;
		// 百度地图API功能
		var map = new BMap.Map("i-map");    // 创建Map实例
		self.map = map;
		var lng = self.state.customer && self.state.customer.lng ? self.state.customer.lng : 121.47;
		var lat = self.state.customer && self.state.customer.lat ? self.state.customer.lat : 31.23;

		map.centerAndZoom(new BMap.Point(lng, lat), 13);  // 初始化地图,设置中心点坐标和地图级别
		map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		function showInfo(e) {
			self.addMarker(e.point.lng, e.point.lat);
		}
		map.addEventListener("click", showInfo);
	}

	// 添加地图上的点
	addMarker(lng, lat, type) {
		const {
			form
		} = this.props;

		if (type) {
			this.map.centerAndZoom(new BMap.Point(lng, lat), 16);
		}
		this.map.clearOverlays(); // 清楚点
		var marker = new BMap.Marker(new BMap.Point(lng, lat)); // 创建点
		this.map.addOverlay(marker);    //增加点

		var customer = this.state.customer;
		customer.latitude = lat;
		customer.longitude = lng;

		// 这边rc-form的一个bug  提交后setState没效果。 只能用rc-form的方式来解决这个bug---------------------------------//
		form.setFieldsValue({
			latitude: lat,
			longitude: lng,
		});
		this.setState({
			customer
		});
	}

	// 详细地址keyDown事件
	onKeyDown(e) {
		if (e.keyCode === 13) {
			this.mapSearch();
		}
	}

	// 地图上搜索
	mapSearch() {
		var self = this;
		const {
			form
		} = self.props;

		var provinceId = form.getFieldValue('provinceId');
		var cityId = form.getFieldValue('cityId');
		var areaId = form.getFieldValue('areaId');
		var townId = form.getFieldValue('townId');
		var address = form.getFieldValue('address');
		var searchAddr = '';
		// 地址处理-----------------
		var provinceName = self.state.provinceId ? self.state.provinceList[provinceId - 1].theName : '';
		var cityName = '';
		self.state.cityId ?
			self.state.cityList.map((item) => {
				if (item.tableId == cityId)
					cityName = item.theName;
			}) : '';
		var areaName = '';
		self.state.areaId ?
			self.state.areaList.map((item) => {
				if (item.tableId == areaId)
					areaName = item.theName;
			}) : '';
		var townName = '';
		self.state.townId ?
			self.state.townList.map((item) => {
				if (item.tableId == townId)
					townName = item.theName;
			}) : '';
		searchAddr = provinceName + cityName + areaName + townName + address;

		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(searchAddr, function (point) {
			if (point) {
				var customer = self.state.customer;
				customer.latitude = point.lat;
				customer.longitude = point.lng;
				self.setState({
					customer
				});
				self.addMarker(point.lng, point.lat, 1);
			} else {
				MyToast("您输入地址没有解析到结果!");
			}
		}, provinceName);
	}
	//改变管辖归属
	changejurisdiction(key) {
		// console.log(key);
	}
	//更改省份
	changeProvince(key) {
		this.setState({
			provinceId: key,
			cityList: [],
			cityId: '市',
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
					// cityId: res.data.cityList[0].tableId,
				})
			}).catch(err => console.log(err));
		})
	}
	//改变城市
	changeCity(key) {
		this.setState({
			cityId: key,
			areaList: [],
			areaId: '区',
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
					// areaId: res.data.areaList[0].tableId,
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
					// townId: res.data.areaList[0].townId,
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

		form.validateFieldsAndScroll((err, values) => {
			if (err) return;

			var data = { ...values };
			// 地址处理-----------------
			var provinceName = self.state.provinceId && self.state.provinceList && self.state.provinceList.length && self.state.provinceList[data.provinceId - 1] ?
				self.state.provinceList[data.provinceId - 1].theName : '';
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
			//时间处理---------------------
			data.openingDate = data.openingDate ? data.openingDate.format('YYYY-MM-DD') : new Date().format('YYYY-MM-DD');
			// 图片处理--------------------
			//生产工艺流程图及排污环节
			var prodFileUrl = self.state.prodFileList;
			var prodFileArr = [];
			if (!prodFileUrl.length) {
				prodFileArr = [];
			} else {
				prodFileUrl.map(item => {
					var url = item.url;
					// 上传
					if (!url) {
						url = item.response.filePath;
					}
					if (url.indexOf(downloadUrl) === -1) {
						url = downloadUrl + url;
					}
					prodFileArr.push(url);
				});
			}
			//企业地理位置图和厂区平面布局图
			var positionFileUrl = self.state.positionFileList;
			var positionArr = [];
			if (!positionFileUrl.length) {
				positionArr = [];
			} else {
				positionFileUrl.map(item => {
					var url = item.url;
					// 上传
					if (!url) {
						url = item.response.filePath;
					}
					if (url.indexOf(downloadUrl) === -1) {
						url = downloadUrl + url;
					}
					positionArr.push(url);
				});
			}

			data.productionFlowChartURL = prodFileArr.join(',');
			data.factoryFloorPlanURL = positionArr.join(',');
			console.log('when savebaseInfoDetail ----------', data);

			var cusId = getLocQueryByLabel('id') || self.state.tableId;
			if (cusId === '') {
				//新增
				saveAddCustomerInfoById(data).then(res => {
					console.log('saveCustomerInfoById res', res);

					if (res.data.result !== 'success') {
						MyToast(res.data.info || '接口出错');
						return
					}
					MyToast('新增成功');
					self.state.onBaseinfoSave(); //控制其他tabs可用
					localStorage.setItem("yt-customerId", res.data.tableId);
					self.setState({
						tableId: res.data.tableId,
					});
				}).catch(err => MyToast(err || '接口出错'))
			} else {
				saveEditCustomerInfoById(data).then(res => {
					console.log('saveCustomerInfoById res', res);

					if (res.data.result !== 'success') {
						MyToast(res.data.info || '接口出错');
						return
					}
					MyToast('编辑成功');
				}).catch(err => MyToast(err || '接口出错'))
			}
		})
	}

	// 切换监管等级 更改颜色等级
	superviseLevelChange(val) {
		if (val == 0) {
			this.setState({
				superviseLevelClass: 'orange'
			});
		} else if (val == 1) {
			this.setState({
				superviseLevelClass: 'yellow'
			});
		} else if (val == 2) {
			this.setState({
				superviseLevelClass: 'blue'
			});
		} else if (val == 3) {
			this.setState({
				superviseLevelClass: 'green'
			});
		} else {
			this.setState({
				superviseLevelClass: 'orange'
			});
		}
	}
	render() {
		let { getFieldDecorator } = this.props.form;
		var customer = this.state.customer;
		//管辖归属option
		var jurisdictionOptions = this.state.jurisdictionList.map((item, index) => {
			return <Option key={item.tableId}>{item.theName}</Option>
		});
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
			<div className="yzy-tab-content-item-wrap" >
				<Form>
					<div className="baseinfo-section">
						<h2 className="yzy-tab-content-title">基本信息</h2>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="网格号">
									{getFieldDecorator('gridNumber', {
										initialValue: customer.gridNumber ? customer.gridNumber : '',
										rules: [
											{ required: true, message: '请填写网格号' },
										],
									})(
										<Input placeholder="网格号" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="监管等级" className="superviseLevel">
									{getFieldDecorator('superviseLevel', {
										initialValue: customer.superviseLevel ? customer.superviseLevel.toString() : '',
										rules: [
											{ required: true, message: '请选择监管等级' },
										],
									})(
										<Select onChange={this.superviseLevelChange.bind(this)} className={this.state.superviseLevelClass}>
											<Option value="0" style={{ 'backgroundColor': 'orange' }}> &nbsp;</Option>
											<Option value="1" style={{ 'backgroundColor': 'yellow' }}> &nbsp;</Option>
											<Option value="2" style={{ 'backgroundColor': 'rgb(62, 196, 236)' }}> &nbsp;</Option>
											<Option value="3" style={{ 'backgroundColor': 'rgb(158, 235, 106)' }}> &nbsp;</Option>
										</Select>
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="企业名称">
									{getFieldDecorator('customerName', {
										initialValue: customer.customerName ? customer.customerName : '',
										rules: [{ required: true, message: '必填!' },
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
										//  rules: [{ required: true, message: '必填!' }, 
										//{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
										//],
									})(
										<Input placeholder="社会信用代码" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="单位类别">
									{getFieldDecorator('unitCategory', {
										initialValue: customer.unitCategory ? customer.unitCategory : '',
										//rules: [{ required: true, message: '必填!' },
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
								<FormItem {...formItemLayout} label="邮政编码">
									{getFieldDecorator('postalCode', {
										initialValue: customer.postalCode ? customer.postalCode + "" : '',
										rules: [
											{ pattern: /^[1-9][0-9]{5}$/, message: '请输入正确的邮编!' }
										],
									})(
										<Input placeholder="邮政编码" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="法人代表">
									{getFieldDecorator('legalPersonName', {
										initialValue: customer.legalPersonName ? customer.legalPersonName : '',
									})(
										<Input placeholder="法人代表" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="联系方式">
									{getFieldDecorator('legalPersonPhone', {
										initialValue: customer.legalPersonPhone ? customer.legalPersonPhone : '',
										rules: [
											{ pattern: /^[0-9]*$/, message: '请输入正确的法人联系方式号码!' }
										],
									})(
										<Input placeholder="法人联系方式" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="联系人">
									{getFieldDecorator('contactPerson', {
										initialValue: customer.contactPerson ? customer.contactPerson : '',
										rules: [{ required: true, message: '必填' },
										],
									})(
										<Input placeholder="联系人" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="邮箱">
									{getFieldDecorator('email', {
										initialValue: customer.email ? customer.email : '',
										rules: [
											{ pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱!' }
										],
									})(
										<Input placeholder="邮箱" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="电话">
									{getFieldDecorator('phoneNumber', {
										initialValue: customer.phoneNumber ? customer.phoneNumber : '',
										rules: [
											{ required: true, message: '请填写电话号码' },
											{ pattern: /^[0-9]*$/, message: '请输入正确的电话号码!' }
										],
									})(
										<Input placeholder="电话" />
										)}
								</FormItem>
							</Col>
						</Row>

						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="中心经度">
									{getFieldDecorator('longitude', {
										initialValue: customer.longitude ? customer.longitude + "" : '',
										rules: [
											{ pattern: /^\d+(\.\d+)?$/, message: '请输入正确的经度!' }
										],
									})(
										<Input placeholder="从下面地图上选择" disabled />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="中心纬度">
									{getFieldDecorator('latitude', {
										initialValue: customer.latitude ? customer.latitude + "" : '',
										rules: [
											{ pattern: /^\d+(\.\d+)?$/, message: '请输入正确的纬度!' }
										],
									})(
										<Input placeholder="从下面地图上选择" disabled />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="传真">
									{getFieldDecorator('fax', {
										initialValue: customer.fax ? customer.fax : '',
										rules: [
											{ pattern: /^[0-9]*$/, message: '请输入正确格式的传真' }
										],
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
										//rules: [{ required: true, message: '必填' },
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
										initialValue: this.state.jurisdictionList && customer.jurisdictionAscriptionId ? customer.jurisdictionAscriptionId + "" : '',
									})(
										<Select onChange={this.changejurisdiction.bind(this)} >
											{jurisdictionOptions}
										</Select>
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="行业类别">
									{getFieldDecorator('industryCategory', {
										initialValue: customer.industryCategory ? customer.industryCategory : '',
										//rules: [{ required: true, message: '必填' },
										//{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
										//],
									})(
										<Input placeholder="行业类别" />
										)}
								</FormItem>
							</Col>
						</Row>

						<Row>
							<Col span={5} style={{ marginRight: '10px' }}>
								<FormItem labelCol={{ span: 13 }} wrapperCol={{ span: 11 }} label="企业地址">
									{getFieldDecorator('provinceId', {
										initialValue: (this.state.provinceList && customer.provinceId ? customer.provinceId : '') + "",
										//rules: [{ required: true, message: '必填' },
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
										//rules: [{ required: true, message: '必填' },
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
										//rules: [{ required: true, message: '必填' },
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
										////rules: [{ required: true, message: '必填' },
										////{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
										//// ],
									})(
										<Select onChange={this.changeTown.bind(this)}>
											{townOptions}
										</Select>
										)}
								</FormItem>
							</Col>
							<Col span={7} style={{ marginRight: '10px' }}>
								<FormItem>
									{getFieldDecorator('address', {
										initialValue: customer.address ? customer.address : '',
										//rules: [{ required: true, message: '必填' },
										//{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
										//],
									})(
										<Input placeholder="详细地址" onKeyDown={this.onKeyDown.bind(this)} />
										)}
								</FormItem>
							</Col>
							<Col span={1}>
								<Button type="primary" onClick={this.mapSearch.bind(this)}>搜索</Button>
							</Col>
						</Row>
						<Row>
							<div className="i-map" id="i-map">

							</div>
						</Row>
					</div>

					<div className="baseinfo-section">
						<h2 className="yzy-tab-content-title">其他信息</h2>
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
										//rules: [{ required: true, message: '必填' },
										//{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
										//],
									})(
										<Input placeholder="重点级别" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="投产日期">
									{getFieldDecorator('openingDate', {
										initialValue: moment(customer.openingDate || new Date(), 'YYYY-MM-DD'),
									})(
										//<DatePicker value={customer.openingDate ? moment(customer.openingDate, 'YYYY/MM/DD') : moment(new Date(), 'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
										<DatePicker style={{ width: '100%' }} />
										)}
								</FormItem>
							</Col>
						</Row>

						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="重点类型">
									{getFieldDecorator('priorityType', {
										initialValue: customer.priorityType ? customer.priorityType : '',
										//rules: [{ required: true, message: '必填' },
										//{ pattern: /^[0-9]*$/, message: '编号为纯数字!' } 
										//],
									})(
										<Input placeholder="重点类型" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="废气排放口数量">
									{getFieldDecorator('exhaustEmissionsPorts', {
										initialValue: customer.exhaustEmissionsPorts ? customer.exhaustEmissionsPorts + "" : '',
										rules: [
											{ pattern: /^[0-9]*$/, message: '数量为纯数字!' }
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
										rules: [
											{ pattern: /^[0-9]*$/, message: '数量为纯数字!' }
										],
									})(
										<Input placeholder="废水排放口数量" addonAfter="个" />
										)}
								</FormItem></Col>

						</Row>

						<Row>
							<Col span={8}>
								<Col span={12}>
									<FormItem {...formItemLayoutInner} label="是否燃气电厂">
										{getFieldDecorator('isGasPowerPlant', {
											initialValue: (customer.isGasPowerPlant !== true ? 'false' : 'true') + "",
											//rules: [{ required: true, message: '必填' },
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
											initialValue: (customer.isCentralEnterprises !== true ? 'false' : 'true') + "",
											//rules: [{ required: true, message: '必填' },
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
							<Col span={8}>
								<FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="是否30万千瓦以上电力">
									{getFieldDecorator('isMoreThan30PowerEnterprise', {
										initialValue: (customer.isMoreThan30PowerEnterprise !== true ? 'false' : 'true') + "",
										//rules: [{ required: true, message: '必填' },
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
								<FormItem {...formItemLayout} label="央企名称">
									{getFieldDecorator('centralEnterprisesName', {
										initialValue: customer.centralEnterprisesName ? customer.centralEnterprisesName + "" : '',
										//rules: [{ required: true },
										//{ pattern: /^[0-9]*$/ } 
										//],
									})(
										<Input placeholder="央企名称" />
										)}
								</FormItem>
							</Col>
						</Row>

						<Row>
							{/*含小数点的正则： /^-?\d+\.\d+$/ */}
							<Col span={8}>
								<FormItem {...formItemLayout} label="氮氧化物">
									{getFieldDecorator('aiNitrogenOxide', {
										initialValue: customer.aiNitrogenOxide ? customer.aiNitrogenOxide + "" : '',
										rules: [
											{ pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
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
										rules: [
											{ pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
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
										rules: [
											{ pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
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
										rules: [
											{ pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
										],
									})(
										<Input placeholder="悬浮物" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="氮氧">
									{getFieldDecorator('aiAmmoniaNitrogen', {
										initialValue: customer.aiAmmoniaNitrogen ? customer.aiAmmoniaNitrogen + "" : '',
										rules: [
											{ pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
										],
									})(
										<Input placeholder="氮氧" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="化学需氧量">
									{getFieldDecorator('aiChemicalOxygenDemand', {
										initialValue: customer.aiChemicalOxygenDemand ? customer.aiChemicalOxygenDemand + "" : '',
										rules: [
											{ pattern: /^\d+$|^\d+\.\d+$/g, message: '请输入数值' }
										],
									})(
										<Input placeholder="化学需氧量" />
										)}
								</FormItem>
							</Col>
						</Row>

						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="其他">
									{getFieldDecorator('aiOther', {
										initialValue: customer.aiOther ? customer.aiOther : '',
										//rules: [{ required: true, message: '必填' },
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
									maxLength={20}
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
									maxLength={20}
									uploadedFileList={this.state.positionFileList}
									handleUploadedFileList={this.handlePositionFileList.bind(this)}
								/>
							</div>
						</Col>
					</Row>
					<div className="yzy-block-center">
						<Button type="primary" style={{ padding: '0 40px' }} onClick={this.saveDetail.bind(this)}>保存</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default Form.create()(CustomerEditBaseinfoDetail);