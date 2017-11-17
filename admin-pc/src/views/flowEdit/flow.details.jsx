/**
 * 审批流程详情（新增及编辑）
 */
import React from 'react';

import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Radio
} from 'antd';
const FormItem = Form.Item;
const Textarea = Input.TextArea;
const RadioGroup = Radio.Group;

import {
  uFlowDtlUpdate, // 编辑
  uFlowDtlAdd, // 新增
  uFlowDtlInsert // 插入
} from '../../common/api/api.flow';


import {
  MyToast,
  getLocQueryByLabel
} from '../../common/utils';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const formItemLayout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}


/**
 * @props   
 * @props onSave
 */
class ApprovalProcessEditDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNeedJointlySign: this.props.recordEdit ? this.props.recordEdit.isNeedJointlySign : false, // 是否需要会签,
      isNeedAllPass: this.props.recordEdit ? this.props.recordEdit.isNeedAllPass : false, // 会签时，是否需要全部通过,
      // data: {  // 从index页面传过来的数据
      //   tableId: '',
      //   flowMst: '',
      //   lastFlowDtl: {

      //   },
      //   nextFlowDtl: {

      //   },
      //   theRemark: '',
      //   theCondition: '',
      //   editor: {
      //     tableId: '',
      //     realName: '',
      //     phoneNumber: '',
      //   },
      //   editDatetime: '',
      //   createDatetime: '',

      // }
    }
  }

  componentDidMount() {
  }

  // 是否需要会签
  isNeedJointlySignOnChange() {
    this.setState({
      isNeedJointlySign: !this.state.isNeedJointlySign
    });
  }

  // 会签时，是否需要全部通过
  isNeedAllPassOnChange() {
    this.setState({
      isNeedAllPass: !this.state.isNeedAllPass
    });
  }


  saveDetail(e) {
    e.preventDefault();

    const {
      form,
      onSave,
      getData,
      recordEdit,
      TestCancel
    } = this.props;

    var self = this;

    form.validateFields((err, values) => {
      if (err) return;

      var params = {
        theName: values.theName,
        isNeedAllPass: values.isNeedAllPass,
        isNeedJointlySign: values.isNeedJointlySign,
        theRemark: values.theRemark,
        theCondition: values.theCondition
      }
      if (recordEdit.modalType == 'edit') {            // 编辑
        params.tableId = recordEdit.tableId;
        uFlowDtlUpdate(params).then(res => {
          console.log('uFlowDtlUpdate ---', res);
          if (res.data.result !== 'success') {
            MyToast(res.data.info || '接口失败')
            return;
          }
          TestCancel();
          getData({
            flowMstId: getLocQueryByLabel('flowMstId') || ''
          });
        }).catch(err => {
          MyToast(err || '接口失败')
        });
      } else if (recordEdit.modalType == 'insert') {   // 插入
        params.flowMstId = recordEdit.flowMstId;
        params.lastFlowDtlId = recordEdit.tableId;
        uFlowDtlInsert(params).then(res => {
          console.log('uFlowDtlInsert ---', res);
          if (res.data.result !== 'success') {
            MyToast(res.data.info || '接口失败')
            return;
          }
          TestCancel();
          getData({
            flowMstId: getLocQueryByLabel('flowMstId') || ''
          });
        }).catch(err => {
          MyToast(err || '接口失败')
        });
      } else {                                          // 新增
        params.flowMstId = recordEdit.flowMstId;
        uFlowDtlAdd(params).then(res => {
          console.log('uFlowDtlAdd ---', res);
          if (res.data.result !== 'success') {
            MyToast(res.data.info || '接口失败')
            return;
          }
          TestCancel();
          getData({
            flowMstId: getLocQueryByLabel('flowMstId') || ''
          });
        }).catch(err => {
          MyToast(err || '接口失败')
        });
      }
    });
  }

  render() {
    let { getFieldDecorator } = this.props.form;
    var data = this.props.recordEdit;

    return (
      <div>
        <Form onSubmit={this.saveDetail.bind(this)} autoComplete="off">
          <div className="baseinfo-section">
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="流程名称">
                  {getFieldDecorator('theName', {
                    initialValue: data.flowMst ? data.theName : '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="上一步">
                  {data.lastFlowDtl ? data.lastFlowDtl.theRemark : ''}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="下一步">
                  {data.nextFlowDtl ? data.nextFlowDtl.theRemark : ''}
                </FormItem>
              </Col>
              {/* <Col span={8}>
                <FormItem {...formItemLayout} label="状态">
                </FormItem>
              </Col> */}
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="是否需要会签">
                  {getFieldDecorator('isNeedJointlySign', {
                    initialValue: this.state.isNeedJointlySign ? 1 : 2,
                  })(
                    <RadioGroup onChange={this.isNeedJointlySignOnChange.bind(this)}>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </RadioGroup>
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                {
                  this.state.isNeedJointlySign &&
                  <FormItem {...formItemLayout} label="是否需要全部通过">
                    {getFieldDecorator('isNeedAllPass', {
                      initialValue: this.state.isNeedAllPass ? 1 : 2,
                    })(
                      <RadioGroup onChange={this.isNeedAllPassOnChange.bind(this)}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                      </RadioGroup>
                      )}
                  </FormItem>
                }
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="条件">
                  {getFieldDecorator('theCondition', {
                    initialValue: data.theCondition ? data.theCondition : '',
                  })(
                    <Textarea placeholder="请输入条件" autosize={{ minRows: 1, maxRows: 6 }}></Textarea>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="修改人">
                </FormItem>
              </Col>
              {/* <Col span={8}>
                <FormItem {...formItemLayout} label="修改时间">
                  {data.editDatetime}
                </FormItem>
              </Col> */}
              <Col span={8}>
                <FormItem {...formItemLayout} label="创建时间">
                  {data.editDatetime}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem {...formItemLayout2} label="备注">
                  {getFieldDecorator('theRemark', {
                    initialValue: data.theRemark ? data.theRemark : '',
                  })(
                    <Textarea placeholder="请输入备注" autosize={{ minRows: 1, maxRows: 6 }}></Textarea>
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

export default Form.create()(ApprovalProcessEditDetail);
