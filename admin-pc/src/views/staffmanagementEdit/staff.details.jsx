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

import QiniuUpload from '../../components/upload';

import {
  getDepartmentList
} from '../../common/api/api.department';

import {
  getStaffDetails
} from '../../common/api/api.staffmanagement';


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
      // 默认图片
      uploadedFileList: [],

      // 员工主信息
      data: {
        realName: '',
        sex: '',
        age: '',
        address: '',
        idCard: '',
        phoneNumber: '',
        email: '',
        departmentId: '',
        password: '',
        isActivationLogin: false,
      },

      departmentList: []
    }

    this._getStaffDetails = this._getStaffDetails.bind(this);
    this._getDepartmentList = this._getDepartmentList.bind(this);
  }

  componentDidMount() {
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

      var departmentList = res.data.departmentList.map(item => {
        let department = {
          value: item.tableId,
          label: item.theName
        };

        return department;
      });

      this.setState({
        departmentList: departmentList
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

      var memberDetail = res.data.member;

      this.setState(prev => ({
        data: {
          ...prev.data,
          ...memberDetail
        },
        uploadedFileList: [{
          uid: -1,
          status: 'done',
          url: memberDetail.headImagePath || ''
        }]
      }));
    }).catch(err => {
      MyToast('获取员工详情失败')
    })
  }

  handleUploadedFileList({fileList}) {
    this.setState({
        uploadedFileList: fileList,
    });
  }

  saveDetail(e) {
    e.preventDefault();

    const {
      form,
      onSave
    } = this.props;

    form.validateFields((err, values) => {
      console.log('-----------', values.password)
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

      /**
       * 密码是否修改？
       */
      var password = values.password;
      delete values.password;

      // 没有修改
      if (password !== this.state.data.password) {
        onSave({
          ...values,
          password: md5(password).toString(),
          headImagePath: uploadedFilePath
        });
      } else {
        onSave({
          ...values,
          headImagePath: uploadedFilePath
        });
      }
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
                    initialValue: this.state.data.sex.toString(),
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
                    initialValue: this.state.data.age.toString(),
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
                    initialValue: this.state.data.departmentId + '',
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Select placeholder="部门ID">
                      {
                        this.state.departmentList.map(item => {
                          return <Option key={item.value} value={item.value.toString()}>{item.label}</Option>
                        })
                      }
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
                    <Input type="password" placeholder="密码" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="账号是否激活">
                  {getFieldDecorator('isActivationLogin', {
                    initialValue: this.state.data.isActivationLogin ? '1' : '0',
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
                <div className="yzy-tab-content-item-wrap">
                  <h2 className="yzy-tab-content-title">头像上传</h2>
                  <QiniuUpload
                      uploadTitle="证件上传"
                      uploadedFileList={this.state.uploadedFileList}
                      handleUploadedFileList={this.handleUploadedFileList.bind(this)}
                     />
                </div>
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
