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
					console.log("sssssssss",this.props.showItemVisible);
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




// import connectEditableSectionApi from '../../components/hoc.editable.section';

// import { 
//   getWastewaterDischargeDetail,
//   getWastewaterDischargeDelete,
//   getWastewaterDischargeUpdate,
//   getWastewaterDischargeAdd
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
//   title: '排放口去向',
//   dataIndex: 'emissionDestination',
//   width: '10%'
// }, {
//   title: '水体名称',
//   dataIndex: 'nameOfWaterBody',
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
//   emissionDestination: '',
//   nameOfWaterBody: '',
//   dischargeLaw: '',
//   functionalAreaCategory: '',
//   createDatetime: '',
// };

// const WasteWaterDemoSection = connectEditableSectionApi({
//   secTitle: '废水排放口基本情况详情',
//   columns: columns,
//   apiLoader: function () {
//     return new Promise((resolve,reject) => {
//       //获取数据
//       getWastewaterDischargeDetail({tableId:5}).then(res => {
//         console.log('getWastewaterDischargeDetail res ---', res);

//         if (res.data.result !== 'success') {
//           resolve({
//             code: -1,
//             info: res.data.info,
//           })
//           return;
//         }

//         var data = [res.data.wasteWaterDischargePort];
//         resolve({
//           code: 0,
//           data,
//         })
//       }).catch(err => {
//         reject(err)
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
//         getWastewaterDischargeAdd({
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
//         getWastewaterDischargeUpdate({
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
//       getWastewaterDischargeDelete(tableId).then(res => {
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

// export default WasteWaterDemoSection;