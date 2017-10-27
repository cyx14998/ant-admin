/**
 * 废水排放口基本情况详情
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
	getWastewaterDischargeDetail,
	getWastewaterDischargeUpdate,
	getWastewaterDischargeAdd,
} from '../../common/api/api.customer.plus.js';

class WasteWaterDischargeDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		}
	}

	componentDidMount() {
		var tableId = this.props.editId;
		if (tableId === ''){
 			return;
		}
		getWastewaterDischargeDetail({ tableId: tableId }).then(res => {
			console.log('getWastewaterDischargeDetail res ---', res);
			if (res.data.result !== 'success') {
				MyToast(res.data.info)
				return;
			}
			this.setState({ data: res.data.wasteWaterDischargePort })
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
			console.log('when saveDetail ---', values);
			// console.log(tableId);
			var tableId = this.props.editId;
			if (tableId) {

			} else {
				// 新增
				getWastewaterDischargeAdd({
					...values,
				}).then(res => {
					if (res.data.result !== 'success') {
						MyToast(res.data.info)
						return;
					}
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
								<FormItem {...formItemLayout} label="排水口编号">
									{getFieldDecorator('serialNumber', {
										initialValue: this.state.data.serialNumber,
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排水口编号" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放口名称">
									{getFieldDecorator('theName', {
										initialValue: this.state.data.theName,
										rules: [{ required: true },
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
										rules: [{ required: true },
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
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
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
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
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
										rules: [{ required: true },
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
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="水体名称" />
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
							<Col span={8}>
								<FormItem {...formItemLayout} label="功能区类别">
									{getFieldDecorator('functionalAreaCategory', {
										initialValue: this.state.data.functionalAreaCategory,
										rules: [{ required: true },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="功能区类别" />
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

export default Form.create()(WasteWaterDischargeDetail);