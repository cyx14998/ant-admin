/**
 * antd + qiniu 上传组件
 * 默认一张图片
 */
import React from 'react';
import {
  Icon,
  Upload,
  Modal
} from 'antd';

import {
  getQiNiuToken
} from '../common/api/api.customer';

import {
  MyToast,
} from '../common/utils';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

/**
 * @props uploadTitle
 * @props acceptType
 * @props maxLength
 * @props uploadedFileList
 * @props handleUploadedFileList
 * @desc  把上传后的结果列表回传到父组件
 */
class QiniuUpload extends React.Component {
  constructor(props) {
    super(props);

    // [{
    //   uid: -1,
    //   status: 'done',
    //   url: 'http://oyc0y0ksm.bkt.clouddn.com/1509173501415'
    // }]

    this.state = {
      previewImage: '',
      previewVisible: false,
    }

    this.uptoken = '';
  }

  componentDidMount() {
    getQiNiuToken({}).then(res => {
        if (!res.data || !res.data.uptoken) {
            MyToast('getqiniuyun uptoken error');
            return;
        }

        this.uptoken = res.data.uptoken;
    }).catch(err => console.log(err));
  }

  beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      MyToast('请选择图片小于2MB!');
    }

    return isLt2M;
  }

  handleUploadChange({file, fileList}) {
    this.props.handleUploadedFileList({fileList})

    return;

    /**
     * 不知道原因，为什么这么写法就不能触发 done 事件
     * 上传成功 or 删除成功
     */
    // if (file.status === 'done' || file.status === 'removed') {
    //   this.setState({
    //     uploadedFileList: fileList
    //   });
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

  render() {
    let {
      uploadedFileList,
      uploadTitle='上传',
      acceptType='image/*',
      maxLength=1
    } = this.props;

    return (
      <div>
        <Upload
            action='http://up.qiniup.com'
            container="container"
            listType="picture-card"
            multiple={false}
            accept={acceptType}
            beforeUpload={this.beforeUpload.bind(this)}
            onChange={this.handleUploadChange.bind(this)}
            fileList={uploadedFileList}
            onPreview={this.handlePreview.bind(this)}
            data={{
              token: this.uptoken, 
              key: Date.now()
            }}>
            {
              uploadedFileList.length === maxLength ? null : 
              (
                <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">{uploadTitle}</div>
                </div>
              )
            }
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    )
  }
}

export default QiniuUpload;