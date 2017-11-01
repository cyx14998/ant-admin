
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
  getSiteInspectionDetail,
  getSiteInspectionUpdate,
  getSiteInspectionAdd,
} from '../../common/api/api.customer.plus.js';

import QiniuUpload from '../../components/upload';


const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';

/**
 * @params editId
 * @params showItemVisible
 */
class WasteWaterDischargeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theType: '',  // 文件类型
      uploadedFileList: [{
        uid: -1,
        url: ''
      }],
    }
  }

  componentDidMount() {
    var tableId = this.props.editId;
    
    if (tableId === '') return;

    getSiteInspectionDetail({ tableId: tableId }).then(res => {
      console.log('getSiteInspectionDetail res ---', res);
      if (res.data.result !== 'success') {
        MyToast(res.data.info)
        return;
      }
      this.setState({ 
        data: res.data.attachmentDynamicDetail, 
        tableId: res.data.attachmentDynamicDetail.tableId,
        theType: res.data.customerSupervise.theType
      })
    }).catch(err => {
      MyToast('接口调用失败')
    })
  }

  handleUploadedFileList({fileList}) {
    this.setState({
        uploadedFileList: fileList,
    });
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
      
      if (tableId) {
        getSiteInspectionUpdate({
          tableId: tableId,
          theType: values.theType,
          filePath: uploadedFilePath
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
        getSiteInspectionAdd({
          theType: values.theType,
          filePath: uploadedFilePath
        }).then(res => {
          if (res.data.result !== 'success') {
            MyToast(res.data.info)
            return;
          }
          
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
            <h2 className="yzy-tab-content-title">企业附件基本信息</h2>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="文件类型">
                  {getFieldDecorator('theType', {
                      initialValue: this.state.theType,
                      rules: [{ required: true },
                      {/* { pattern: /^[0-9]*$/ } */ }
                      ],
                  })(
                    <Select>
                      <Option value="1">园区约谈情况</Option>
                      <Option value="2">监察支队处理情况</Option>
                      <Option value="3">行政处罚情况</Option>
                      <Option value="4">信访记录</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div className="baseinfo-section">
                  <h2 className="yzy-tab-content-title">企业附件信息</h2>
                  <QiniuUpload
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