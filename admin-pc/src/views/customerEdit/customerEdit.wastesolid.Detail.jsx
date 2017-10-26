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
  getWasteSolidDetail,
  getWastesolidUpdate,
  getWastesolidAdd,
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
			getWasteSolidDetail({tableId:tableId}).then(res => {
				console.log('getWastewaterDischargeDetail res ---', res);
				if (res.data.result !== 'success') {
						MyToast(res.data.info)
						return;
				}
				this.setState({data:res.data.wasteSolid})
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
            getWastesolidUpdate({
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
						getWastesolidAdd({
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
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('serialNumber', {
                          initialValue: this.state.data.serialNumber,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="编号" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="是否危废">
                      {getFieldDecorator('isHazardousWaste', {
                          initialValue: this.state.data.isHazardousWaste?this.state.data.isHazardousWaste+'':'',
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                        <Select>
                          <Option value="true">true</Option>
                          <Option value="false">false</Option>
                        </Select>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="危险废物名称">
                      {getFieldDecorator('hazardousWasteName', {
                          initialValue: this.state.data.hazardousWasteName,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="危险废物名称" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="处置方式">
                      {getFieldDecorator('disposalMethod', {
                          initialValue: this.state.data.disposalMethod,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="处置方式" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="废物名称">
                      {getFieldDecorator('theName', {
                          initialValue: this.state.data.theName,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="废物名称" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="废物产生工艺">
                      {getFieldDecorator('processing', {
                          initialValue: this.state.data.processing,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="废物产生工艺" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="危险代码">
                      {getFieldDecorator('dangerCode', {
                          initialValue: this.state.data.dangerCode,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="危险代码" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="危险废物产生环节">
                      {getFieldDecorator('generatingLinks', {
                          initialValue: this.state.data.generatingLinks,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="危险废物产生环节" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="危险废物年产生量">
                      {getFieldDecorator('annualProduction', {
                          initialValue: this.state.data.annualProduction?this.state.data.annualProduction+'':'',
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="危险废物年产生量" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="贮存场所位置">
                      {getFieldDecorator('storagePlaceAddress', {
                          initialValue: this.state.data.storagePlaceAddress,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="贮存场所位置" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="贮存场所照片">
                      {getFieldDecorator('storagePlaceImageURL', {
                          initialValue: this.state.data.storagePlaceImageURL,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="贮存场所照片" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="台账记录">
                      {getFieldDecorator('standingBookURL', {
                          initialValue: this.state.data.standingBookURL,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="台账记录" />
                          )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="处置单位名称">
                      {getFieldDecorator('disposeUnitName', {
                          initialValue: this.state.data.disposeUnitName,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="处置单位名称" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="备案信息">
                      {getFieldDecorator('filingInfoURL', {
                          initialValue: this.state.data.filingInfoURL,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="备案信息" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="转移联单">
                      {getFieldDecorator('transferManifestURL', {
                          initialValue: this.state.data.transferManifestURL,
                          rules: [{ required: true },
                          {/* { pattern: /^[0-9]*$/ } */ }
                          ],
                      })(
                          <Input placeholder="转移联单" />
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