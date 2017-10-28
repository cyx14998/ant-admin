/**
 * 员工详情（新增及编辑）
 */
import React from 'react';

import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Icon,
  Button,
  Upload,
  Modal,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import md5 from 'crypto-js/md5';

import {
  getDepartmentList
} from '../../common/api/api.department';

import {
  getStaffDetails
} from '../../common/api/api.staffmanagement';

import {
  getQiNiuToken
} from '../../common/api/api.customer';

import {
  MyToast,
  getLocQueryByLabel
} from '../../common/utils';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

/**
 * @props staffId  
 * @props onSave
 */
class StaffDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uptoken: '',
      uploadedFileList: [{
        uid: -1,
        status: 'done',
        url: 'http://oyc0y0ksm.bkt.clouddn.com/1509173501415'
      }],
      previewImage: 'http://oyc0y0ksm.bkt.clouddn.com/1509173501415',
      previewVisible: false,
      // 员工主信息
      data: {},
      departmentList: []
    }

    this._getStaffDetails = this._getStaffDetails.bind(this);
    this._getDepartmentList = this._getDepartmentList.bind(this);
  }

  componentDidMount() {
    // prepare for upload image
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

    // 获取部门列表
    this._getDepartmentList();

    var staffId = this.props.staffId;

    if (staffId !== '') {
      this._getStaffDetails(staffId);
    }
  }

  _getDepartmentList() {
    getDepartmentList({}).then(res => {
      console.log('getDepartmentList res', res)

      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取部门列表失败');
        return;
      }

      this.setState({
        departmentList: res.data.departmentList
      });
    }).catch(err => {
      MyToast('获取部门列表失败')
    });
  }

  _getStaffDetails(staffId) {
    getStaffDetails({staffId}).then(res => {
      console.log('getStaffDetails res', res)

      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取员工详情失败');
        return;
      }

      this.setState({
        data: res.data.member
      });
    }).catch(err => {
      MyToast('获取员工详情失败')
    })
  }

  beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      MyToast('请选择图片小于2MB!');
    }

    return isLt2M;
  }

  handleUploadChange({file, fileList}) {
    console.log('handleUploadChange file--------------', file)

    /**
     * 上传成功 or 删除成功
     */
    if (file.status === 'done' || file.status === 'removed') {
      this.setState({
        uploadedFileList: fileList
      });
    }
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
      onSave
    } = this.props;

    form.validateFields((err, values) => {
      if (err) return;

      var fileOne = this.state.uploadedFileList[0];
      if (!fileOne) return MyToast('请上传证件图片');

      // 默认
      var uploadedFilePath = fileOne.url;
      // 上传
      if (!uploadedFilePath) {
        uploadedFilePath = fileOne.response.filePath;
      }

      if (!uploadedFilePath) return MyToast('请上传证件图片');

      if (uploadedFilePath.indexOf(downloadUrl) === -1) {
        uploadedFilePath = downloadUrl + uploadedFilePath;
      }


      onSave({
        ...values,
        password: md5(password),
        headImagePath: uploadedFilePath
      });
    });
  }

  render() {
    let { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.saveDetail.bind(this)}>
          <div className="baseinfo-section">
            <h2 className="yzy-list-content-title">员工基本信息</h2>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="姓名">
                  {getFieldDecorator('realName', {
                    initialValue: this.state.data.realName,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="姓名" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="性别">
                  {getFieldDecorator('sex', {
                    initialValue: this.state.data.sex + '',
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Select placeholder="性别">
                      <Option key="1" value="1">男</Option>
                      <Option key="2" value="2">女</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="年龄">
                  {getFieldDecorator('age', {
                    initialValue: this.state.data.age,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="年龄" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="身份证号码">
                  {getFieldDecorator('idCard', {
                    initialValue: this.state.data.idCard,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="身份证号码" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="手机号码">
                  {getFieldDecorator('phoneNumber', {
                    initialValue: this.state.data.phoneNumber,
                    rules: [{ required: true }],
                  })(
                    <Input maxLength="11" placeholder="手机号码" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="邮箱">
                  {getFieldDecorator('email', {
                    initialValue: this.state.data.email,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="邮箱" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="部门ID">
                  {getFieldDecorator('departmentId', {
                    initialValue: this.state.data.departmentId || '1',
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Select placeholder="部门ID">
                      <Option key="1" value="1">财务部</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="密码">
                  {getFieldDecorator('password', {
                    initialValue: this.state.data.password,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="密码" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="账号是否激活">
                  {getFieldDecorator('isActivationLogin', {
                    initialValue: this.state.data.isActivationLogin,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Select placeholder="账号是否激活">
                      <Option key="1" value="1">是</Option>
                      <Option key="0" value="0">否</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem labelCol={{span: 4}} wrapperCol={{span: 20}} label="住址">
                  {getFieldDecorator('address', {
                    initialValue: this.state.data.address,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="住址" />
                    )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Row>
                  <Col style={{fontSize: '12px', color: '#000', textAlign: 'right'}} span={6}>头像上传：</Col>
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
                          key: Date.now() + ''
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

export default Form.create()(StaffDetails);
