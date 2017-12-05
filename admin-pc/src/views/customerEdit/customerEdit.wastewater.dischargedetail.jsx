/**
 * 废水排放口基本情况详情
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
	getWastewaterDischargeDetail,
	getWastewaterDischargeUpdate,
	getWastewaterDischargeAdd,
} from '../../common/api/api.customer.plus.js';

/**
 * @params editId
 * @params showItemVisible
 */
class WasteWaterDischargeDetail extends React.Component {
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

		getWastewaterDischargeDetail({ tableId: tableId }).then(res => {
			console.log('getWastewaterDischargeDetail res ---', res);
			if (res.data.result !== 'success') {
				MyToast(res.data.info)
				return;
			}
			this.setState({ data: res.data.wasteWaterDischargePort });
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
			MyToast('接口调用失败');
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
			console.log('tableId------', tableId);
			if (!tableId) {
				tableId = this.state.tableId;
			}
			//编辑
			if (tableId) {
				getWastewaterDischargeUpdate({
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
				getWastewaterDischargeAdd({
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
										rules: [{ required: true, message: '必填' },
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
										rules: [{ required: true, message: '必填' },
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
										rules: [{ required: true, message: '必填' },
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
										rules: [{ message: '必填' },
										{ pattern: /^\d+(\.\d+)?$/, message: '请输入正确的经度' }
										],
									})(
										<Input placeholder="经度" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="维度">
									{getFieldDecorator('latitude', {
										initialValue: this.state.data.latitude ? this.state.data.latitude + "" : "",
										rules: [{ message: '必填' },
										{ pattern: /^\d+(\.\d+)?$/, message: '请输入正确的纬度!' }
										],
									})(
										<Input placeholder="维度" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放口去向">
									{getFieldDecorator('emissionDestination', {
										initialValue: this.state.data.emissionDestination,
										rules: [{ required: true, message: '必填' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放口去向" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="水体名称">
									{getFieldDecorator('nameOfWaterBody', {
										initialValue: this.state.data.nameOfWaterBody,
										rules: [{ required: true, message: '必填' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="水体名称" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放规律">
									{getFieldDecorator('dischargeLaw', {
										initialValue: this.state.data.dischargeLaw,
										rules: [{ required: true, message: '必填' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放规律" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="功能区类别">
									{getFieldDecorator('functionalAreaCategory', {
										initialValue: this.state.data.functionalAreaCategory,
										rules: [{ required: true, message: '必填' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="功能区类别" />
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

export default Form.create()(WasteWaterDischargeDetail);