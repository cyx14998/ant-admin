/**
 * 企业遵守法律法规情况
 */
/**
 * 固体废物基本情况详情
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

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import { 
  getEIADetail,
  getEIAUpdate,
  getEIAAdd,
} from '../../common/api/api.customer.plus.js';

class WasteWaterDischargeDetail extends React.Component {
    constructor(props){
			super(props);
			this.state = {
				data: {},
			}
    }

    componentDidMount() {
			var tableId = this.props.editId;
			if (!tableId) {
				localStorage.setItem("wastewaterDischargeIsShow","none");
				return;
			}
			localStorage.setItem("wastewaterDischargeIsShow","block");
			getEIADetail({tableId:tableId}).then(res => {
				console.log('getWastewaterDischargeDetail res ---', res);
				if (res.data.result !== 'success') {
						MyToast(res.data.info)
						return;
				}
				this.setState({data:res.data.customerEIA})
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
					var tableId = this.props.editId;
					if(tableId){
            getEIAUpdate({
              ...values,
              tableId:tableId
						}).then(res => {
								if (res.data.result !== 'success') {
										MyToast(res.data.info)
										return;
								}
								MyToast("保存成功")
								localStorage.setItem("wastewaterDischargeIsShow","block");
						}).catch(err => {
								MyToast('接口调用失败')
						});
					}else{
						// 新增
						getEIAAdd({
								...values,
						}).then(res => {
								if (res.data.result !== 'success') {
										MyToast(res.data.info)
										return;
								}
								MyToast("新增成功")
								localStorage.setItem("wastewaterDischargeIsShow","block");
						}).catch(err => {
								MyToast('接口调用失败')
						});
					}
        })
    }
  render() {
		let { getFieldDecorator } = this.props.form;
    return(
    <div className="yzy-tab-content-item-wrap">
      <Form onSubmit={this.saveDetail.bind(this)}>
        <div className="baseinfo-section">
          <h2 className="yzy-tab-content-title">固体废物基本信息详情</h2>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="环评建设项目名称">
                      {getFieldDecorator('theName', {
                          initialValue: this.state.data.theName,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="环评建设项目名称" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="环评等级">
                      {getFieldDecorator('theLevel', {
                          initialValue: this.state.data.theLevel,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="环评等级" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="编制日期">
                      {getFieldDecorator('editDatetime', {
                          initialValue: this.state.data.editDatetime,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="编制日期" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="试生产批复-环保部门审批文号">
                      {getFieldDecorator('DocumentNumberTPA', {
                          initialValue: this.state.data.DocumentNumberTPA,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="试生产批复-环保部门审批文号" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="试生产批复-审批时间">
                      {getFieldDecorator('approvalTimeTPA', {
                          initialValue: this.state.data.approvalTimeTPA,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="试生产批复-审批时间" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="环评批复-环保部门审批文号">
                      {getFieldDecorator('DocumentNumberEIA', {
                          initialValue: this.state.data.DocumentNumberEIA,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="环评批复-环保部门审批文号" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="环评批复-审批时间">
                      {getFieldDecorator('approvalTimeEIA', {
                          initialValue: this.state.data.approvalTimeEIA,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="环评批复-审批时间" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="竣工验收批复-环保部门审批文号">
                      {getFieldDecorator('DocumentNumberFAA', {
                          initialValue: this.state.data.DocumentNumberFAA,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="竣工验收批复-环保部门审批文号" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="竣工验收批复-审批时间">
                      {getFieldDecorator('approvalTimeFAA', {
                          initialValue: this.state.data.approvalTimeFAA,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="竣工验收批复-审批时间" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="自主验收文件">
                      {getFieldDecorator('SelfAcceptanceURL', {
                          initialValue: this.state.data.SelfAcceptanceURL,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="自主验收文件" />
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
//   getEIADetail,
//   getEIAAdd,
//   getEIAUpdate,
//   getEIADelete,
// } from '../../common/api/api.customer.plus.js';

// /**
//  * table head
//  */
// const columns = [{
//   title: '环评建设项目名称',
//   dataIndex: 'theName',
//   width: '10%'
// }, {
//   title: '环评等级',
//   dataIndex: 'theLevel',
//   width: '5%'
// }, {
//   title: '编制日期',
//   dataIndex: 'editDatetime',
//   width: '5%'
// }, {
//   title: '试生产批复-环保部门审批文号',
//   dataIndex: 'DocumentNumberTPA',
//   width: '12%'
// }, {
//   title: '试生产批复-审批时间',
//   dataIndex: 'approvalTimeTPA',
//   width: '10%'
// }, {
//   title: '环评批复-环保部门审批文号',
//   dataIndex: 'DocumentNumberEIA',
//   width: '11%'
// }, {
//   title: '环评批复-审批时间',
//   dataIndex: 'approvalTimeEIA',
//   width: '10%'
// }, {
//   title: '竣工验收批复-环保部门审批文号',
//   dataIndex: 'DocumentNumberFAA',
//   width: '12%'
// }, {
//   title: '竣工验收批复-审批时间',
//   dataIndex: 'approvalTimeFAA',
//   width: '10%'
// }, {
//   title: '自主验收文件',
//   dataIndex: 'SelfAcceptanceURL',
//   width: '10%'
// }, {
//   title: '操作',
//   dataIndex: 'operation',
//   width: '5%'
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
//   theName: '',
//   theLevel: '',
//   editDatetime: '',
//   DocumentNumberTPA: '',
//   approvalTimeTPA: '',
//   DocumentNumberEIA: '',
//   approvalTimeEIA: '',
//   DocumentNumberFAA: '',
//   approvalTimeFAA: '',
//   SelfAcceptanceURL: '',
// };

// const WasteWaterDemoSection = connectEditableSectionApi({
//   secTitle: '环评信息详情',
//   columns: columns,
//   apiLoader: function () {
//     return new Promise((resolve,reject) => {
//       //获取数据
//       getEIADetail({}).then(res => {
//         console.log('getEIADetail res ---', res);

//         if (res.data.result !== 'success') {
//           resolve({
//             code: -1,
//             info: res.data.info,
//           })
//           return;
//         }

//         var data = [res.data.customerEIA];
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
//         getEIAAdd({
//           ...record,
//         }).then(res => {
//           console.log("getBoundaryNoiseAdd res",res)
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
//         getEIAUpdate({
//           ...record,
//         }).then(res => {
//           console.log("getEIAUpdate res",res)
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
//       getEIADelete(tableId).then(res => {
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