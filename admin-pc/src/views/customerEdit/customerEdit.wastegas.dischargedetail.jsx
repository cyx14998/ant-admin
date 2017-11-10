/**
 * 废气污染物排放情况
 */

import React from 'react';
import {
	Form,
	Row,
	Col,
	Input,
	Button
} from 'antd';
const FormItem = Form.Item;

import {
	MyToast
} from '../../common/utils';

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
			this.setState({ data: res.data.wasteGasDischargePort })
		}).catch(err => {
			MyToast('接口调用失败')
		})
	}
	// 基本信息保存
	saveDetail(e) {
		e.preventDefault();
		const {
			form
		} = this.props;

		form.validateFields((err, values) => {
			if (err) return;
			// console.log('when saveDetail ---', values);
			var tableId = this.props.editId;
			if (!tableId) {
				tableId = this.state.tableId;
			}

			//编辑
			if (tableId) {
				getWasteGasDischargeUpdate({
					...values,
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
					...values,
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
										{ pattern: /^-?(([1-9]\d?)|(1[1-7]\d)|180)(\.\d{1,6})?$/, message: '请输入正确的经度' }
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
										{ pattern: /^-?(([1-8]\d?)|([1-8]\d)|90)(\.\d{1,6})?$/, message: '请输入正确的纬度!' }
										],
									})(
										<Input placeholder="纬度" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="污水排放规律">
									{getFieldDecorator('dischargeLaw', {
										initialValue: this.state.data.dischargeLaw,
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="污水排放规律" />
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