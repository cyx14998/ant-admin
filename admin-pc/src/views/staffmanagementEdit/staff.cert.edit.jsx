/**
 * 员工证照新增/编辑
 */
import React from 'react';

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

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

import {
  getStarffCertListAdd,
  getStarffCertListUpdate,
  getStaffCertDetails
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
        uid: -1,
        status: 'done',
        url: 'http://oyc0y0ksm.bkt.clouddn.com/1509173501415'
      }],
      previewImage: '',
      previewVisible: false,
      data: {},
    }

    this._getStaffCertDetails = this._getStaffCertDetails.bind(this);
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

    // get default details if has tableid
    let editId = this.props.editId;
    if (editId !== '') {
      this._getStaffCertDetails(editId)
    }
  }

  // 获取数据详情，注意图片处理
  _getStaffCertDetails(tableId) {
    getStaffCertDetails({
      tableId
    }).then(res => {
      console.log('getStaffCertDetails res', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取证照详情失败');
        return;
      }

      this.setState({
        data: res.data.memberCertification
      })
    }).catch(err => {
      MyToast('获取证照详情失败')
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
    // console.log('handleUploadChange fileList----------', fileList)
    // {
    //   uid: '',
    //   response: {
    //     filePath: '1509168004229'
    //   }
    // }

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
      editId,
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

      var staffId = getLocQueryByLabel('staffId');

      if (editId === '') {
        // edit
        getStarffCertListAdd({
          ...values,
          filePath: uploadedFilePath,
          staffId: staffId,
        }).then(res => {
          if (res.data.result !== 'success') {
            return MyToast(res.data.info || '新增失败')
          }

          MyToast('新增成功');

          setTimeout(() => {
            window.location.reload();
          }, 200);
        }).catch(err => MyToast('新增失败'));
      } else {
        // save 
        getStarffCertListUpdate({
          ...values,
          filePath: uploadedFilePath,
          tableId: editId
        }).then(res => {
          if (res.data.result !== 'success') {
            return MyToast(res.data.info || '更新失败')
          }

          MyToast('更新成功');

          setTimeout(() => {
            window.location.reload();
          }, 200);
        }).catch(err => MyToast('更新失败'));
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
                    initialValue: moment(this.state.data.expiryDatetime || new Date(), dateFormat),
                  })(
                    <DatePicker format={dateFormat} placeholder="截止日期" />
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