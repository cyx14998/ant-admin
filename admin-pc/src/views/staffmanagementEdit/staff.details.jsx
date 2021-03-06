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
  DatePicker
} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

import md5 from 'crypto-js/md5';

import QiniuUpload from '../../components/upload';

import {
  getDepartmentListForSelect
} from '../../common/api/api.department';

import {
  getStaffDetails
} from '../../common/api/api.staffmanagement';

import {
  uRoleList
} from '../../common/api/api.role';


import {
  MyToast,
  getLocQueryByLabel
} from '../../common/utils';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const downloadUrl = BaseConfig.qiniuPath;
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

      departmentList: [],
      roleList: [],
    }

    this._getStaffDetails = this._getStaffDetails.bind(this);
    this._getDepartmentListForSelect = this._getDepartmentListForSelect.bind(this);
    this._getRoleListForSelect = this._getRoleListForSelect.bind(this);
  }

  componentDidMount() {
    // 获取部门列表
    this._getDepartmentListForSelect();
    // 获取角色列表
    this._getRoleListForSelect();

    var staffId = this.props.staffId;

    if (staffId !== '') {
      this._getStaffDetails(staffId);
    }
  }

  _getDepartmentListForSelect() {
    getDepartmentListForSelect({}).then(res => {
      console.log('getDepartmentListForSelect res', res)

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

  _getRoleListForSelect() {
    uRoleList({}).then(res => {
      console.log('uRoleList res', res)

      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取角色列表失败');
        return;
      }

      var roleList = res.data.roleList.map(item => {
        let role = {
          value: item.tableId,
          label: item.theName
        };

        return role;
      });

      this.setState({
        roleList
      });
    }).catch(err => {
      MyToast('获取角色列表失败')
    });
  }

  _getStaffDetails(staffId) {
    getStaffDetails({ staffId }).then(res => {
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
        uploadedFileList: memberDetail.headImagePath ? [{
          uid: -1,
          status: 'done',
          url: memberDetail.headImagePath
        }] : []
      }));
    }).catch(err => {
      MyToast('获取员工详情失败')
    })
  }

  handleUploadedFileList({ fileList }) {
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
      if (!fileOne) return MyToast('请上传头像');

      // 默认
      var uploadedFilePath = fileOne.url;
      // 上传
      if (!uploadedFilePath) {
        uploadedFilePath = fileOne.response.filePath;
      }

      if (!uploadedFilePath) return MyToast('请上传头像');

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
          password: md5(password).toString().toUpperCase(),
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
        <Form onSubmit={this.saveDetail.bind(this)} autoComplete="off">
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
                <FormItem {...formItemLayout} label="出生年月日">
                  {getFieldDecorator('dateOfBirth', {
                    initialValue: this.state.data.dateOfBirth ? moment(this.state.data.dateOfBirth, dateFormat) : moment(new Date(), dateFormat),
                    rules: [
                      {
                        type: 'object',
                        required: true
                      },
                    ],
                  })(
                    <DatePicker placeholder="出生年月日" style={{ 'width': '100%' }} />
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
                    <Input placeholder="邮箱" autoComplete="off" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="部门">
                  {getFieldDecorator('departmentId', {
                    initialValue: this.state.data.departmentId + '',
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Select placeholder="部门">
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
                    <Input
                      type="password"
                      placeholder="密码"
                      autoComplete="new-password" />
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
                <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="住址">
                  {getFieldDecorator('address', {
                    initialValue: this.state.data.address,
                    rules: [{ required: true },
                    ],
                  })(
                    <Input placeholder="住址" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="角色">
                  {getFieldDecorator('roleId', {
                    initialValue: this.state.data.roleId ? this.state.data.roleId + '' : '',
                    rules: [{ required: true },
                    ],
                  })(
                    <Select placeholder="角色">
                      {
                        this.state.roleList.map((item, index) => {
                          return <Option key={index} value={item.value.toString()}>{item.label}</Option>
                        })
                      }
                    </Select>
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
