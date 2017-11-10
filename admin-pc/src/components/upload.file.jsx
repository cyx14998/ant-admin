/**
 * antd + qiniu 上传组件
 * 默认一张图片
 */
import React from 'react';
import {
  Icon,
  Upload,
  Modal,
  Button
} from 'antd';

import {
  getQiNiuToken
} from '../common/api/api.customer';

import {
  MyToast,
} from '../common/utils';

const downloadUrl = 'http://oyc0y0ksm.bkt.clouddn.com/';
const uploadUrl = 'http://up.qiniu.com/';

const uploadData = {};

/**
 * @props uploadTitle
 * @props acceptType
 * @props maxLength
 * @props uploadedFileList
 * @props handleUploadedFileList
 * @desc  把上传后的结果列表回传到父组件
 */
class QiniuUploadFile extends React.Component {
  constructor(props) {
    super(props);

    // [{
    //   uid: -1,
    //   status: 'done',
    //   url: 'http://oyc0y0ksm.bkt.clouddn.com/1509173501415'
    // }]
  }

  componentDidMount() {
    getQiNiuToken({}).then(res => {
      if (!res.data || !res.data.uptoken) {
          MyToast('getqiniuyun uptoken error');
          return;
      }

      uploadData.token = res.data.uptoken;
    }).catch(err => console.log(err));
  }

  /**
   * 通过key 设置文件路径和名称
   * 路径规则：filetype/2017/11/11/timestamp.ext
   */
  getFileKey(fileType, fileName) {
    var type = fileType.split('/')[0];
    var ext = fileName.split('.')[1] || '';
    var date = new Date();
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        timestamp = date.getTime();

    m = m < 10 ? ('0' + m) : m;
    d = d < 10 ? ('0' + d) : d;

    var path = `${type}/${y}/${m}/${d}/${timestamp}.${ext}`;

    return path;
  }

  beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      MyToast('请选择图片小于2MB!');
    }

    // get file path 
    var filepath = this.getFileKey(file.type, file.name);

    uploadData.key = filepath;

    return isLt2M;
  }

  handleUploadChange({ file, fileList }) {
    this.props.handleUploadedFileList({ fileList })

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
  render() {
    let {
      uploadedFileList,
      uploadTitle = '上传',
      acceptType = '*/*',
      maxLength = 1
    } = this.props;

    return (
      <div>
        <Upload
            action='http://up.qiniup.com'
            container="container"
            multiple={false}
            accept={acceptType}
            beforeUpload={this.beforeUpload.bind(this)}
            onChange={this.handleUploadChange.bind(this)}
            fileList={uploadedFileList}
            data={uploadData}>
            {
              uploadedFileList.length === maxLength ? null : 
              (
                <Button><Icon type="upload" /> Click to Upload </Button>
              )
          }
        </Upload>
      </div>
    )
  }
}

export default QiniuUploadFile;