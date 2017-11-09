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
	Select,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {
	MyToast
} from '../../common/utils';

import {
	getLocQueryByLabel
} from '../../common/utils';

const cusMId = getLocQueryByLabel("dynamicId");

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

import {
	getWastewaterDischargeRecordDetail,
	getWastewaterDischargeRecordAdd,
	getWastewaterDischargeRecordUpdate,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
	getWastewaterDischargeList
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
			tableId: "",
			dischargePort: [],
			dischargePortItem: "",
		}
	}

	componentDidMount() {
		//获取所有排放口
		getWastewaterDischargeList({}).then(res => {
			if (res.data.result !== 'success') {
				MyToast(res.data.info)
				return;
			}
			var tableId = [];
			res.data.wasteWaterDischargePortList.map((item, index) => {
				tableId.push(item.tableId);
			})
			this.setState({ dischargePort: tableId })
		}).catch(err => {
			MyToast('接口调用失败')
		})
		var tableId = this.props.editId;
		if (tableId === '') return;
		getWastewaterDischargeRecordDetail({ tableId: tableId }).then(res => {
			console.log("ssssssssssssssssssssssssssssssssssssss", res);
			if (res.data.result !== 'success') {
				MyToast(data.info)
				return;
			}
			this.setState({
				data: res.data.wasteWaterDischargeRecord,
				tableId: res.data.wasteWaterDischargeRecord.tableId,
				dischargePortItem: res.data.wasteWaterDischargeRecord.wasteWaterDischargePort.tableId
			})
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
			var tableId = this.props.editId;
			if (!tableId) {
				tableId = this.state.tableId;
			}
			//编辑
			if (tableId) {
				getWastewaterDischargeRecordUpdate({
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
				getWastewaterDischargeRecordAdd({
					...values,
					customerMonthDclarationId: cusMId,
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
						<h2 className="yzy-tab-content-title">废水排放基本信息详情</h2>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放量">
									{getFieldDecorator('emissionAmount', {
										initialValue: this.state.data.emissionAmount,
										rules: [{ required: true, message: '请输入排放量' },
										{ pattern: /^[0-9]*$/, message: '数字格式' }
										],
									})(
										<Input placeholder="排放量" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放去向">
									{getFieldDecorator('emissionDestination', {
										initialValue: this.state.data.emissionDestination,
										rules: [{ required: true, message: '请输入排放去向' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放去向" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="废水排放口">
									{getFieldDecorator('wasteWaterDischargePortId', {
										initialValue: this.state.dischargePortItem + '' || this.state.dischargePort[0] + '',
										rules: [{ required: true, message: '请选择废水排放口' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Select>
											{
												this.state.dischargePort.map((item, index) => {
													return (
														<Option key={index} value={item.toString()}>{item.toString()}</Option>
													)
												})
											}
										</Select>
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