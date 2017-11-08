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
	MyToast,
	getLocQueryByLabel,
	convertObjectLabel
} from '../../common/utils';

const cusMId = getLocQueryByLabel("dynamicId");

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

import {
	getWasteGasDischargeRecordDetail,
	getWasteGasDischargeRecordAdd,
	getWasteGasDischargeRecordUpdate,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
	getWasteGasDischargeList
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
			dischargePortItem: ""
		}
	}

	componentDidMount() {
		var tableId = this.props.editId;
		if (tableId === '') return;

		//获取所有排放口
		getWasteGasDischargeList({}).then(res => {
			if (res.data.result !== 'success') {
				MyToast(res.data.info || '获取所有排放口失败')
				return;
			}

			var wasteGasDischargePortList = res.data.wasteGasDischargePortList;

			var wasteGasDischargePortListOptions = convertObjectLabel(wasteGasDischargePortList, 'tableId', 'serialNumber');

			return wasteGasDischargePortListOptions;
		})then(wasteGasDischargePortListOptions => {
			getWasteGasDischargeRecordDetail({ tableId: tableId }).then(res => {
				console.log(res);
				if (res.data.result !== 'success') {
					MyToast(data.info)
					return;
				}

				/**
				 * fuck
				 */
				this.setState({
					data: res.data.wasteGasDischargeRecord,
					tableId: res.data.wasteGasDischargeRecord.tableId,
					dischargePort: wasteGasDischargePortListOptions,
					dischargePortItem: res.data.wasteGasDischargeRecord.wasteGasDischargePort.tableId + ''
				})
			}).catch(err => {
				MyToast('接口调用失败')
			})
		}).catch(err => {
			MyToast(err)
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
			if (this.state.tableId) {
				getWasteGasDischargeRecordUpdate({
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
				getWasteGasDischargeRecordAdd({
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
								<FormItem {...formItemLayout} label="废水排放口">
									{getFieldDecorator('wasteGasDischargePortId', {
										initialValue: this.state.dischargePortItem,
										rules: [{ required: true, message: '请选择废水排放口' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Select>
											{
												this.state.dischargePort.map((item, index) => {
													return (
														<Option key={index} value={item.value}>{item.label}</Option>
													)
												})
											}
										</Select>
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="实测排放量">
									{getFieldDecorator('measuredExhaustVolume', {
										initialValue: this.state.data.measuredExhaustVolume ? this.state.data.measuredExhaustVolume + '' : '',
										rules: [{ required: true, message: '请输入实测排放量' },
										{ pattern: /^[0-9]+\.{0,1}[0-9]{0,6}$/, message: '数字格式' }
										],
									})(
										<Input placeholder="实测排放量" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="排放时间">
									{getFieldDecorator('emissionTime', {
										initialValue: this.state.data.emissionTime ? this.state.data.emissionTime + '' : '',
										rules: [{ required: true, message: '请选择排放时间' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="排放时间" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="废气排放量">
									{getFieldDecorator('exhaustEmission', {
										initialValue: this.state.data.exhaustEmission ? this.state.data.exhaustEmission + '' : '',
										rules: [{ required: true, message: '请输入废气排放量' },
										{ pattern: /^[0-9]+\.{0,1}[0-9]{0,6}$/, message: '数字格式' }
										],
									})(
										<Input placeholder="废气排放量" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="数据来源">
									{getFieldDecorator('dataSources', {
										initialValue: this.state.data.dataSources,
										rules: [{ required: true, message: '请输入数据来源' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="数据来源" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="燃料">
									{getFieldDecorator('fuel', {
										initialValue: this.state.data.fuel ? this.state.data.fuel + '' : '',
										rules: [{ required: true, message: '请输入燃料' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="燃料" />
										)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem {...formItemLayout} label="林格曼黑度">
									{getFieldDecorator('ringermanBlackness', {
										initialValue: this.state.data.ringermanBlackness ? this.state.data.ringermanBlackness + '' : '',
										rules: [{ required: true, message: '请输入林格曼黑度' },
										{ pattern: /^[0-9]+\.{0,1}[0-9]{0,6}$/, message: '数字格式' }
										],
									})(
										<Input placeholder="林格曼黑度" />
										)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="废气类型">
									{getFieldDecorator('exhaustGasType', {
										initialValue: this.state.data.exhaustGasType,
										rules: [{ required: true, message: '请输入废气类型' },
										{/* { pattern: /^[0-9]*$/ } */ }
										],
									})(
										<Input placeholder="废气类型" />
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