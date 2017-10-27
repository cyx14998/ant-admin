/**
 * 员工证照新增/编辑
 */
import React from 'react';

// 字段
// staffId,
// theName,
// filePath,
// expiryDatetime,
// certificationUnit,
// serialNumber,
// professionalCategory,
// repetitionCycle,
// theRemarks

import {
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Upload,
  Icon,
  Modal
} from 'antd';
const FormItem = Form.Item;

import {
  getStarffCertListAdd,
  getStarffCertListUpdate
} from '../../common/api/api.staffmanagement';

import {
  getQiNiuToken
} from '../../common/api/api.customer';

import {
  MyToast,
  getLocQueryByLabel,
} from '../../common/utils';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

class StaffCertEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uptoken: '',
      uploadedFileList: [{
        response: {
          filePath: '1509107788542'
        }
      }],
      previewImage: '',
      previewVisible: false,
      data: {}
    }

    this.qiniuyunData = {};
  }

  componentDidMount() {
    getQiNiuToken({}).then(res => {
        if (!res.data || !res.data.uptoken) {
            MyToast('getqiniuyun uptoken error');
            return;
        }

        // this.qiniuyunData.token = res.data.uptoken;
        this.setState({
          uptoken: res.data.uptoken
        });
    }).catch(err => console.log(err));
  }

  // 获取数据详情，注意图片处理
  getStaffCertInfo() {

  }

  beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      MyToast('Image must smaller than 2MB!');
    }

    return isLt2M;
  }

  handleUploadChange({fileList}) {
    console.log('handleUploadChange fileList----------', fileList)
    this.setState({
      uploadedFileList: fileList
    });
    // if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     // console.log('Upload done-----------', info)
    //     var filePath = info.file.response.filePath;

    //     this.setState({
    //       uploadedFile: downloadUrl + filePath,
    //     })
    // }
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  saveDetail(e) {
    e.preventDefault();
    const {
      form,
      editId,
    } = this.props;

    form.validateFields((err, values) => {
      if (err) return;

      var uploadedFilePath = this.state.uploadedFileList[0].response.filePath;
      if (!uploadedFilePath) return MyToast('请上传证件图片');

      var staffId = getLocQueryByLabel('staffId');

      if (editId === '') {
        // edit
        getStarffCertListAdd({
          ...values,
          filePath: uploadedFilePath,
          staffId: staffId,
        })
      } else {
        // save 
        getStarffCertListUpdate({
          ...values,
          filePath: uploadedFilePath,
          tableId: editId
        })
      }
    });
  }

  render() {
    let { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.saveDetail.bind(this)}>
          <div className="baseinfo-section">
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="证照名称">
                  {getFieldDecorator('theName', {
                    initialValue: this.state.data.theName,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="证照名称" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="证书编号">
                  {getFieldDecorator('serialNumber', {
                    initialValue: this.state.data.serialNumber,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="证书编号" />
                    )}
                </FormItem>
              </Col>
              
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="专业类别">
                  {getFieldDecorator('professionalCategory', {
                    initialValue: this.state.data.professionalCategory,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="专业类别" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="发证单位">
                  {getFieldDecorator('certificationUnit', {
                    initialValue: this.state.data.certificationUnit,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="发证单位" />
                    )}
                </FormItem>
              </Col>
              
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="复证周期">
                  {getFieldDecorator('repetitionCycle', {
                    initialValue: this.state.data.repetitionCycle ,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="复证周期" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="截止日期">
                  {getFieldDecorator('expiryDatetime', {
                    initialValue: this.state.data.expiryDatetime,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <DatePicker placeholder="截止日期" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Row>
                  <Col style={{fontSize: '12px', color: '#000', textAlign: 'right'}} span={6}>证件上传：</Col>
                  <Col span={18}>
                    <Upload
                        action='http://up.qiniup.com'
                        container="container"
                        listType="picture-card"
                        multiple={false}
                        accept="image/*"
                        beforeUpload={this.beforeUpload.bind(this)}
                        onChange={this.handleUploadChange.bind(this)}
                        fileList={this.state.uploadedFileList}
                        onPreview={this.handlePreview.bind(this)}
                        data={{
                          token: this.state.uptoken,                       
                          key: Date.now()
                        }}>
                        {
                          this.state.uploadedFileList.length === 1 ? null : 
                          (
                            <div>
                                <Icon type="plus" />
                                <div className="ant-upload-text">证件上传</div>
                            </div>
                          )
                        }
                    </Upload>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                      <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                  </Col>
                </Row>
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

export default Form.create()(StaffCertEdit);