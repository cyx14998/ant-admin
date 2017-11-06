
// getAttachmentRecordAdd,
// getAttachmentRecordUpdate,
/**
* 企业附件信息详情
*/
import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Icon,
  Modal,
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

//获取query
import {
  getLocQueryByLabel
} from '../../common/utils';

const dynamicId = getLocQueryByLabel('dynamicId');

import {
  getAttachmentRecordDetail,
  getAttachmentRecordUpdate,
  getAttachmentRecordAdd,
  getAttachmentTypeList
} from '../../common/api/api.customer.dynamic.plus.js';


import QiniuUploadFile from '../../components/upload.file';
const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

/**
 * @params editId
 * @params showItemVisible
 */
class WasteWaterDischargeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      tableId: '',
      uploadedFileList: [], //生产工艺流程图
      attachmentTypeId: [],//附件类型id
      attachmentTypeItem: "",
    }

  }

  componentDidMount() {
    var tableId = this.props.editId;
    //获取附件类型id
    getAttachmentTypeList({}).then(res => {
      console.log('类型getAttachmentTypeList res ---', res);
      if (res.data.result !== 'success') {
        MyToast(res.data.info)
        return;
      }
      // var data = res.data.attachmentTypeList;
      // // var attachmentTypeId = [];
      // // data.map((item, index) => {
      // //   attachmentTypeId.push(item.tableId);
      // // })
      this.setState({ attachmentTypeList: res.data.attachmentTypeList })
    }).catch(err => {
      MyToast('接口调用失败')
    });
    
    if (tableId === '') return;
    getAttachmentRecordDetail({ tableId: tableId }).then(res => {
      console.log('getAttachmentRecordDetail res ---', res);
      if (res.data.result !== 'success') {
        MyToast(res.data.info)
        return;
      }
      this.setState({
        data: res.data.attachmentDynamicDetail,
        tableId: res.data.attachmentDynamicDetail.tableId,
        attachmentTypeItem: res.data.attachmentDynamicDetail.attachmentType.tableId
      })
      //文件初始化
      if (res.data.customerSupervise.filePath) {
        self.setState({
          uploadedFileList: [{
            uid: '1',
            name: res.data.customerSupervise.theName,
            size: res.data.customerSupervise.theSize,
            url: res.data.customerSupervise.filePath,
          }],
        });
      } else {
        self.setState({
          uploadedFileList: [],
        });
      }
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
      if (!tableId) {
        tableId = this.state.tableId;
      }
      //编辑
      values.customerMonthDclarationId = dynamicId;

      var fileOne = this.state.uploadedFileList[0];
      if (!fileOne) return MyToast('请上传附件');
      // 默认
      var uploadedFilePath = fileOne.url;
      var theSize = fileOne.size;
      var theName = fileOne.name;

      // 上传
      if (!uploadedFilePath) {
        uploadedFilePath = fileOne.response.filePath;
      }

      if (!uploadedFilePath) return MyToast('请上传附件');

      if (uploadedFilePath.indexOf(downloadUrl) === -1) {
        uploadedFilePath = downloadUrl + uploadedFilePath;
        theSize = fileOne.size;
        theName = fileOne.name;
      }
      values.filePath = uploadedFilePath;
      values.theName = theName;
      values.theSize = theSize;
      console.log('附件保存', values);
      if (this.state.tableId) {
        getAttachmentRecordUpdate({
          ...values,
          tableId: tableId,
        }).then(res => {
          if (res.data.result !== 'success') {
            MyToast(res.data.info)
            return;
          }
          MyToast("保存成功")
        }).catch(err => {
          MyToast('接口调用失败')
        });
      } else {
        // 新增
        getAttachmentRecordAdd({
          ...values,
        }).then(res => {
          if (res.data.result !== 'success') {
            MyToast(res.data.info)
            return;
          }
          localStorage.setItem('wastewater-discharge-editId', res.data.tableId);
          this.setState({ tableId: res.data.tableId });
          MyToast("新增成功")
        }).catch(err => {
          MyToast('接口调用失败')
        });
      }
    })
  }

  handleUploadedFileList({ fileList }) {
    console.log(fileList)
    this.setState({
      uploadedFileList: fileList,
    });
  }
  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <div className="yzy-tab-content-item-wrap">
        <Form onSubmit={this.saveDetail.bind(this)}>
          <div className="baseinfo-section">
            <h2 className="yzy-tab-content-title">企业附件基本信息</h2>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="附件类型">
                  {getFieldDecorator('attachmentTypeId', {
                    initialValue: this.state.attachmentTypeItem + '' || this.state.attachmentTypeList ? this.state.attachmentTypeList[0].tableId + '' : '',
                    rules: [{ required: true },
                    ],
                  })(
                    <Select>
                      {
                        this.state.attachmentTypeList ? this.state.attachmentTypeList.map((item, index) => {
                          return (
                            <Option key={item.tableId}>{item.theName}</Option>
                          )
                        }) : ''
                      }
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div className="baseinfo-section">
                  <h2 className="yzy-tab-content-title">企业附件信息（文件）</h2>
                  <QiniuUploadFile
                    uploadTitle="文件上传"
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

export default Form.create()(WasteWaterDischargeDetail);