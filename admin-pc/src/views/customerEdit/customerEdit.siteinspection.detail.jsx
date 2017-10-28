
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

import {
  getQiNiuToken
} from '../../common/api/api.customer.js';

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
      prodPreviewImage: [], //生产工艺
      prodPreviewVisible: false,
      prodImgUrl: '',
      theSize: '',
      theName: '',
      prodFileList: [], //生产工艺流程图
      theType: '',
    }
    this.beforeUpload = this.beforeUpload.bind(this);
    this.qiniuyunData = {
      // key: Date.now(),
      // token: 'xozWSPMxkMjIVoHg2JyXq4-7-oJaEADLOKHVR0vU:1AreAaaS0j5_bjgQsHSshM0zTZI=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoianNzZGsiLCJkZWFkbGluZSI6MTUwOTAxNTA3Mn0=',
      // token: "W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:AuMz5nKqsSrEQ6Y6mb-gBpJunIQ=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDEzMTkxfQ=="
      // token:"W5Fv28XaKurdNr5zjN1fwIb_zLwWw8GwJ6Fnk23E:wxacrkBBNB8Pjby5ZJaQQd4NGLs=:eyJzYXZlS2V5IjoiJHt4OnNvdXJjZVR5cGV9LyQoeWVhcikvJChtb24pLyQoZGF5KS8ke2hvdXJ9LyR7bWlufS8ke3NlY30vJCh4OmZpbGVOYW1lKSIsInNjb3BlIjoieXRoYiIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjogJChrZXkpLCBcImhhc2hcIjogJChldGFnKSwgXCJmaWxlUGF0aFwiOiAkKGtleSksIFwiaW1hZ2VXaWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksIFwiaW1hZ2VIZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSwgXCJmc2l6ZVwiOiAkKGZzaXplKSwgXCJleHRcIjogJChleHQpfSIsImRlYWRsaW5lIjoxNTA5MDE1OTM2fQ==",
    };
  }

  componentDidMount() {
    var tableId = this.props.editId;
    this.beforeUpload();
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
      if(!(this.state.prodImgUrl&&this.state.theName&&this.state.theSize)) return;
      values.filePath = this.state.prodImgUrl;
      values.theName = this.state.theName;
      values.theSize = this.state.theSize;
      console.log(values);
      if (this.state.tableId) {
        getSiteInspectionUpdate({
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
        getSiteInspectionAdd({
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

  beforeUpload(file) {
    console.log(file)
    //获取uptoken
    // if (this.state.uptoken == '') {
    getQiNiuToken({}).then(res => {
      console.log('uptoken res------------------------', res);

      if (!res.data || !res.data.uptoken) {
        console.error('getqiniuyun uptoken error');
        return;
      }

      // this.setState({
      //     uptoken: res.data.uptoken
      // })

      this.qiniuyunData.token = res.data.uptoken;

    }).catch(err => console.log(err));
    // }
  }
  //生产图片上传
  handleProdPicChange({ fileList }) {
    console.log('handlePropicchange -----------------', fileList);
    this.setState({
      prodFileList: fileList,
    });
    var index = fileList.length;
    if (index > 0) {
      if (fileList[index - 1].status === 'done') {
        console.log(fileList[index - 1]);
        console.log(fileList[index - 1].response);
        // console.log(fileList[index - 1].response.result)
        this.setState({
          prodImgUrl: downloadUrl + fileList[index - 1].response.filePath,
          theSize: fileList[index-1].size,
          theName: fileList[index-1].name
        });
      } else {
        console.log(1)
      }
    }
    console.log(this.state.prodImgUrl);
  }
  //生产图片取消预览
  prodPicModalCancel() {
    this.setState({
      prodPreviewImage: [],
      prodPreviewVisible: false,
    })
  }
  //生产图片预览
  handleProdPicPreview(file) {
    this.setState({
      prodPreviewImage: file.url || file.thumbUrl,
      prodPreviewVisible: true,
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
                      initialValue: this.state.data.theType ? this.state.data.theType+'':'',
                      rules: [{ required: true },
                      {/* { pattern: /^[0-9]*$/ } */ }
                      ],
                  })(
                    <Select>
                      <Option value="0">整改报告</Option>
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
                  <Upload
                    action='http://up.qiniup.com'
                    container="container"
                    listType="picture-card"
                    fileList={this.state.prodFileList}
                    onPreview={this.handleProdPicPreview.bind(this)}
                    onChange={this.handleProdPicChange.bind(this)}

                    data={{
                      ...this.qiniuyunData,
                      key: Date.now()
                    }}
                  >
                    {this.state.prodFileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={this.state.prodPreviewVisible} footer={null} onCancel={this.prodPicModalCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.prodPreviewImage} />
                  </Modal>
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