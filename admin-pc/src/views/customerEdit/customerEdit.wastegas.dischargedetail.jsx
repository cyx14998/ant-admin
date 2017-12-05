/**
 * 废气污染物排放情况
 */

import React from 'react';
import {
	Form,
	Row,
	Col,
	Input,
	Button,
	Upload,
} from 'antd';
const FormItem = Form.Item;

import {
	MyToast
} from '../../common/utils';

import QiniuUploadFile from '../../components/upload.file';
const downloadUrl = BaseConfig.qiniuPath; // BaseConfig.qiniuPath;
const uploadUrl = 'http://up.qiniu.com/';

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}


import {
	getWasteGasDischargeDetail,
	getWasteGasDischargeUpdate,
	getWasteGasDischargeAdd,
} from '../../common/api/api.customer.plus.js';

/**
 * @parms editId
 * @parms showItemVisible
 */
class WasteGasDischargeDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			tableId: "", // 新增后的tableId
			prodFileList: [], //检测报告
		}
	}

	componentDidMount() {
		var tableId = this.props.editId;
		if (tableId === '') return;
		getWasteGasDischargeDetail({ tableId: tableId }).then(res => {
			console.log('getWasteGasDischargeDetail res ---', res);
			if (res.data.result !== 'success') {
				MyToast(res.data.info)
				return;
			}
			this.setState({ data: res.data.wasteGasDischargePort });
			//文件初始化
			if (res.data.customer.examiningReportURL) {
				this.setState({
					prodFileList: [{
						uid: '1',
						name: '检查报告',
						url: res.data.customer.examiningReportURL
					}],
				});
			} else {
				this.setState({
					prodFileList: [],
				});
			}
		}).catch(err => {
			MyToast('接口调用失败')
		})
	}
	//检查报告
	handleProdFileList({ fileList }) {
		this.setState({
			prodFileList: fileList,
		});
	}
	// 基本信息保存
	saveDetail(e) {
		e.preventDefault();
		const {
			form
		} = this.props;

		form.validateFields((err, values) => {
			if (err) return;

			var data = { ...values };
			//附件上传
			var prodFileUrl = this.state.prodFileList[0];
			if (!prodFileUrl) {
				prodFileUrl = "";
			} else {
				prodFileUrl = prodFileUrl.url
				// 上传
				if (!prodFileUrl) {
					prodFileUrl = this.state.prodFileList[0].response.filePath;
				}
				if (!prodFileUrl) {
					prodFileUrl = ""
				} else if (prodFileUrl.indexOf(downloadUrl) === -1) {
					prodFileUrl = downloadUrl + prodFileUrl;
				}
			}
			data.examiningReportURL = prodFileUrl;
			console.log('------------------保存前', data);

			var tableId = this.props.editId;
			if (!tableId) {
				tableId = this.state.tableId;
			}

			//编辑
			if (tableId) {
				getWasteGasDischargeUpdate({
					...data,
					tableId: tableId,
				}).then(res => {
					if (res.data.result !== 'success') {
						MyToast(res.data.info)
						return;
					}
					MyToast("保存成功")
				}).catch(err => {
					MyToast('接口调用失败')
				});
			} else {
				// 新增
				getWasteGasDischargeAdd({
					...data,
				}).then(res => {
					if (res.data.result !== 'success') {
						MyToast(res.data.info)
						return;
					}
					localStorage.setItem('wastewater-discharge-editId', res.data.tableId);
					this.setState({ tableId: res.data.tableId });
					this.props.showItemVisible();
					MyToast("新增成功")
				}).catch(err => {
					MyToast('接口调用失败')
				});
			}
		})
	}


	render() {
		let { getFieldDecorator } = this.props.form;
		return (
			<div className="yzy-tab-content-item-wrap">
				<Form onSubmit={this.saveDetail.bind(this)}>
					<div className="baseinfo-section">
						<h2 className="yzy-tab-content-title">排放口基本信息</h2>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放口编号">
									{getFieldDecorator('serialNumber', {
										initialValue: this.state.data.serialNumber,
										rules: [{ required: true, message: '请输入排放口编号' },
											//{ pattern: /^[0-9]*$/, message: '请输入数值' }
										],
									})(
										<Input placeholder="排放口编号" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放口名称">
									{getFieldDecorator('theName', {
										initialValue: this.state.data.theName,
										rules: [{ required: true, message: '请输入排放口名称' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放口名称" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放口位置">
									{getFieldDecorator('outletLocation', {
										initialValue: this.state.data.outletLocation,
										rules: [{ required: true, message: '请输入排放口位置' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放口位置" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="经度">
									{getFieldDecorator('longitude', {
										initialValue: this.state.data.longitude ? this.state.data.longitude + "" : "",
										rules: [{ message: '请输入经度' },
										{ pattern: /^\d+(\.\d+)?$/, message: '请输入正确的经度' }
										],
									})(
										<Input placeholder="经度" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="纬度">
									{getFieldDecorator('latitude', {
										initialValue: this.state.data.latitude ? this.state.data.latitude + "" : "",
										rules: [{ message: '请输入纬度' },
										{ pattern: /^\d+(\.\d+)?$/, message: '请输入正确的纬度!' }
										],
									})(
										<Input placeholder="纬度" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放规律">
									{getFieldDecorator('dischargeLaw', {
										initialValue: this.state.data.dischargeLaw,
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放规律" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="功能区类别">
									{getFieldDecorator('functionalAreaCategory', {
										initialValue: this.state.data.functionalAreaCategory,
										rules: [{ required: true, message: '请输入功能区类别' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="功能区类别" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放方式">
									{getFieldDecorator('dischargeMode', {
										initialValue: this.state.data.dischargeMode,
										rules: [{ required: true, message: '请输入排放方式' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放方式" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放口类型">
									{getFieldDecorator('dischargePortType', {
										initialValue: this.state.data.dischargePortType,
										rules: [{ required: true, message: '请输入排放口类型' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放口类型" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<div className="baseinfo-section">
									<h2 className="yzy-tab-content-title">检测报告</h2>
									<QiniuUploadFile
										uploadTitle="检测报告单"
										uploadedFileList={this.state.prodFileList}
										handleUploadedFileList={this.handleProdFileList.bind(this)}
									/>
								</div>
							</Col>
						</Row>
					</div>
					<div className="yzy-block-center">
						<Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default Form.create()(WasteGasDischargeDetail);