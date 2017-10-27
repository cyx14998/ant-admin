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
class WasteWaterDischargeDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		}
	}

	componentDidMount() {
		var tableId = this.props.editId;
		if (tableId === '') {
			return;
		}
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
			console.log('when saveDetail ---', values);
			// console.log(tableId);
			var tableId = this.props.editId;
			if (tableId) {

			} else {
				// 新增
				getWasteGasDischargeAdd({
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
										rules: [{ required: true },
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
										rules: [{ required: true },
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
										rules: [{ required: true },
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

export default Form.create()(WasteWaterDischargeDetail);

// import connectEditableSectionApi from '../../components/hoc.editable.section';

// import { 
//   getWasteGasDischargeDetail,
//   getWasteGasDischargeDelete,
//   getWasteGasDischargeUpdate,
//   getWasteGasDischargeAdd
// } from '../../common/api/api.customer.plus.js';

// import {
//   MyToast
// } from '../../common/utils';

// /**
//  * table head
//  */
// const columns = [{
//   title: '排水口编号',
//   dataIndex: 'serialNumber',
//   width: '10%'
// }, {
//   title: '排放口名称',
//   dataIndex: 'theName',
//   width: '10%'
// }, {
//   title: '排放口位置',
//   dataIndex: 'outletLocation',
//   width: '10%'
// }, {
//   title: '经度',
//   dataIndex: 'longitude',
//   width: '10%'
// }, {
//   title: '维度',
//   dataIndex: 'latitude',
//   width: '10%'
// }, {
//   title: '污水排放规律',
//   dataIndex: 'dischargeLaw',
//   width: '10%'
// }, {
//   title: '功能区类别',
//   dataIndex: 'functionalAreaCategory',
//   width: '10%'
// }, {
//   title: '排放方式',
//   dataIndex: 'dischargeMode',
//   width: '10%'
// }, {
//   title: '排放口类型',
//   dataIndex: 'dischargePortType',
//   width: '10%'
// }, {
//   title: '操作',
//   dataIndex: 'operation',
//   width: '10%'
// }];

// /**
//  * 可选项
//  */
// const options = [{
//   value: 'sy',
//   label: '事业单位'
// }, {
//   value: 'qy',
//   label: '企业单位'
// }];

// /**
//  * 新数据默认值
//  */
// const itemDataModel = {
//   serialNumber: '',
//   theName: '',
//   outletLocation: '',
//   longitude: '',
//   latitude: '',
//   dischargeMode: '',
//   dischargePortType: '',
//   dischargeLaw: '',
//   functionalAreaCategory: '',
// };

// const WasteGasDemoSection = connectEditableSectionApi({
//   secTitle: '废气排放基本信息详情',
//   columns: columns,
//   apiLoader: function () {
//     return new Promise((resolve,reject) => {
//       //获取数据
//       console.log("ssssssss");
//       getWasteGasDischargeDetail({id:1}).then(res => {
//         console.log('getWasteGasDischargeDetail res ---', res);

//         if (res.data.result !== 'success') {
//           resolve({
//             code: -1,
//             info: res.data.info,
//           })
//           return;
//         }

//         var data = [res.data.wasteGasDischargePort];
//         resolve({
//           code: 0,
//           data,
//         })
//       }).catch(err => {
//         MyToast('接口调用失败')
//       })
//     })
//   },
//   apiSave: function (record) {
//     // 新增
//     console.log('apiSave record ----', record);
//     var self = this;

//     if (record.tableId === '') {
//       return new Promise((resolve, reject) => {
//         // 新增
//         getWasteGasDischargeAdd({
//           ...record,
//         }).then(res => {
//           if (res.data.result !== 'success') {
//             resolve({
//               code: 1,
//               info: res.data.info,
//             });
//             return;
//           }

//           resolve({
//             code: 0 // success
//           })
//         }).catch(err => {
//           reject(err)
//         });
//       });
//     } else {
//       // 编辑
//       return new Promise((resolve, reject) => {
//         getWasteGasDischargeUpdate({
//           ...record,
//         }).then(res => {
//           if (res.data.result !== 'success') {
//             resolve({
//               code: 1,
//               info: res.data.info,
//             });
//             return;
//           }

//           resolve({
//             code: 0 // success
//           })
//         }).catch(err => {
//           reject(err)
//         });
//       });
//     }
//   },
//   apiDel: function (tableId) {
//     //删除
//     console.log(`apiDel ${tableId}`);

//     return new Promise((resolve, reject) => {
//       getWasteGasDischargeDelete(tableId).then(res => {
//         if (res.data.result !== 'success') {
//           resolve({
//             code: 1,
//             info: res.data.info,
//           });
//           return;
//         }

//         resolve({
//           code: 0 // success
//         });
//       }).catch(err => {
//         reject(err)
//       });
//     });
//   },
//   itemDataModel: itemDataModel
// })

// export default WasteGasDemoSection;