import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './publicnumber.less';
import $db from '../../common/dal.js';
import store from '../../models/publicnumber.js';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//添加与编辑页面Modal
const GoodsForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, handleSubmit, form } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Modal
        title="公众号管理"
        width='72%'
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
        className='publicnumber-modal'
      >
        <div className="content">
          <Form onSubmit={handleSubmit} >
            <div className="top">
              <div className="topLeft">
                <Row className="picRow">
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="头像">
                      {getFieldDecorator('Favicon')(
                        <div className="topRight">
                          <Upload
                            action={$db.uploadProImg}
                            listType="picture-card"
                            fileList={store.getState().fileList}
                            onPreview={props.handlePicPreview}
                            onChange={props.handlePicChange}
                          >
                            {store.getState().fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                          <Modal visible={store.getState().previewVisible} footer={null} onCancel={props.picModalCancel}>
                            <img alt="example" style={{ width: '100%' }} src={store.getState().previewImage} />
                          </Modal>
                        </div>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <div className="infoTitle"><i></i>基本信息</div>
                <Row className="clearfix">
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="公众号名称">
                      {getFieldDecorator('NickName', {
                        initialValue: store.getState().Data.NickName,
                        rules: [
                          { required: true, message: '公众号名称!' },
                        ],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="公众号原始ID">
                      {getFieldDecorator('WechatID', {
                        initialValue: store.getState().Data.WechatID,
                        rules: [
                          { required: true, message: '公众号原始ID!' },
                          {/* {
                                'transform': (val) => {
                                    let value = val;
                                    if (value.length == 1) {
                                        value = value.replace(/[^1-9]/g, '')
                                    } else {
                                        value = value.replace(/\D/g, '')
                                    }
                                    console.log(value)
                                    return value;
                                }
                            } */}
                        ],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="登录账号">
                      {getFieldDecorator('LoginName', {
                        initialValue: store.getState().Data.LoginName,
                        rules: [
                          { required: true, message: '登录账号!' },
                        ],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="密码">
                      {getFieldDecorator('LoginPwd', {
                        initialValue: store.getState().Data.LoginPwd,
                        rules: [{ required: true, message: '密码!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="Token">
                      {getFieldDecorator('Token', {
                        initialValue: store.getState().Data.Token,
                        rules: [{ required: true, message: 'Token!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="公众号邮箱">
                      {getFieldDecorator('Email', {
                        initialValue: store.getState().Data.Email,
                        rules: [{ required: true, message: 'Please input your Price!' },
                        { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '公众号邮箱!' }
                        ],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="应用id">
                      {getFieldDecorator('AppID', {
                        initialValue: store.getState().Data.AppID,
                        rules: [{ required: true, message: '应用id!' },
                        { pattern: /^[0-9]*$/, message: '请输入数字!' }
                        ],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="应用密码">
                      {getFieldDecorator('AppSecret', {
                        initialValue: store.getState().Data.AppSecret,
                        rules: [{ required: true, message: '应用密码!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="是否默认">
                      {getFieldDecorator('IsDefault', {
                        initialValue: store.getState().Data.IsDefault,
                        rules: [{ required: true, message: '是否默认!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="订阅ID">
                      {getFieldDecorator('SubScribeID', {
                        initialValue: store.getState().Data.SubScribeID,
                        rules: [{ required: true, message: '订阅ID!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="所属部门编号">
                      {getFieldDecorator('UnitID', {
                        initialValue: store.getState().Data.UnitID,
                        rules: [{ required: true, message: '所属部门编号!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="部门名称">
                      {getFieldDecorator('UnitName', {
                        initialValue: store.getState().Data.UnitName,
                        rules: [{ required: true, message: '部门名称!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator('StatusCode', {
                        initialValue: store.getState().Data.StatusCode,
                        rules: [{ required: true, message: '状态!' }],
                      })(
                        <Input />
                        )}
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    )
  }
);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    }
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      store.dispatch({
        NickName: values.NickName,
        StatusCode: values.StatusCode,
        UnitID: values.UnitID,
        WechatID: values.WechatID,
        type: "SEARCH"
      });
      this.props.handleSearch(1);
    });
  }
  handleReset() {
    this.props.form.resetFields();
  }
  toggle() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const titles = [{
      title: "公众号名称",
      eng: "NickName"
    }, {
      title: "公众号原始id",
      eng: "WechatID"
    }, {
      title: "所属单位编号",
      eng: "UnitID"
    }, {
      title: "状态",
      eng: "StatusCode"
    }]
    const children = [];
    for (let i = 0; i < titles.length; i++) {
      children.push(
        <Col span={12} key={i}>
          <FormItem {...formItemLayout} label={titles[i].title}>
            {getFieldDecorator(titles[i].eng)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch.bind(this)}
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
              清除
                            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const Searchs = Form.create()(Search);

//列表页面
class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentWillMount() {
    this.handleSearch(1);
  }
  //页面初始化页码搜索
  handleSearch(pageNumber) {
    if (pageNumber == 1) {
      store.dispatch({ value: 1, type: 'PAGENUMBER' })
    }
    this.setState({ loading: true});
    var data = {
      NickName: store.getState().NickName,
      WechatID: store.getState().WechatID,
      UnitID: store.getState().UnitID,
      StatusCode: store.getState().StatusCode,
      pageIndex: pageNumber,
    }
    $db.GetAllWeChatAccount(data, function (results) {
      if(results && results.result){
        var result = results.result;
        result.map((item, index) => {
          item.Favicon = $db.imgUrl + item.Favicon;
        })
        store.dispatch({
          count: results.count,
          value: result,
          type: 'DATAALL'
        });
        // store.dispatch({value: results.count, type: 'COUNT' });
        this.setState({ loading: false, });
      }
    }.bind(this));
  }
  // 弹窗增加
  showModal = () => {
    store.dispatch({ value: true, type: 'VISIBLE' });
  }
  //改变页码
  onChangeNum(pageNumber) {
    // console.log(pageNumber)
    store.dispatch({ value: pageNumber, type: 'PAGENUMBER' })
    this.handleSearch(pageNumber);
  }
  //编辑弹出Modal
  editModal = (index) => {
    var self = this;
    var data = index.InnerID;
    store.dispatch({ value: data, type: 'INNERID' });
    $db.GetWeChatAccount(data, function (result) {
      console.log(result);
      if (result.code == 1) {
        store.dispatch({ value: true, type: 'VISIBLE' });
        var tmplId = result.result.Favicon;
        console.log(tmplId);
        result.result.Favicon = $db.imgUrl + tmplId;
        store.dispatch({
          tmplId: tmplId,
          imgUrl: result.result.Favicon,
          value: result.result,
          type: 'EDIT_DATA'
        });
      } else {
        message.info("详情页数据错误")
      }
    });
  }
  //Modal取消
  handleCancel = (e) => {
    // console.log(e);
    const form = this.form;
    form.resetFields();
    store.dispatch({ value: '', type: 'INNERID' });
    store.dispatch({ type: 'EDIT_DATA' });
    store.dispatch({ value: false, type: 'VISIBLE' });
    store.dispatch({ type: 'EMPTYDATA' });
  }
  //modal确定
  handleCreate = (e) => {
    const form = this.form;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const formData = form.getFieldsValue();
        formData.Favicon = store.getState().Data.tmplId;
        formData.InnerID = store.getState().InnerID;
        console.log("sss", formData)
        $db.SetWeChatAccount(formData, function (result) {
          console.log(result);
          if (result.code == 1) {
            message.info('提交成功');
            store.dispatch({ value: true, type: 'VISIBLE' });
            //确定时清空数据
            form.resetFields();
            store.dispatch({ type: 'EMPTYDATA' });
          } else {
            message.info(result.result);
          }
        });
      } else {
        console.log('Received values of form: ', values);
        return false;
      }
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  //图片取消预览
  picModalCancel = () => {
    store.dispatch({
      previewImage: [],
      previewVisible: false,
      type: 'PICPREVIEW'
    })
  }
  //图片预览
  handlePicPreview = (file) => {
    store.dispatch({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      type: 'PICPREVIEW'
    })
  }
  //图片上传更改
  handlePicChange = ({ fileList }) => {
    store.dispatch({
      value: fileList,
      type: 'FILELIST'
    })
    var index = fileList.length;
    if (index > 0) {
      if (fileList[index - 1].status === 'done') {
        store.dispatch({ value: fileList[index - 1].response.result, type: 'PROPIC' })
      }
    }
  }
  render() {
    const columns = [{
      title: '公众号名称',
      dataIndex: 'NickName',
      key: 'NickName',
    }, {
      title: '公众号原始ID',
      dataIndex: 'WechatID',
      key: 'WechatID',
    }, {
      title: '头像',
      dataIndex: 'Favicon',
      key: 'Favicon',
      render: (text, index) => <img className="img" src={text} />
    }, {
      title: '所属单位编号',
      dataIndex: 'UnitID',
      key: 'UnitID',
    }, {
      title: '状态',
      dataIndex: 'StatusCode',
      key: 'StatusCode',
    }, {
      title: '创建时间',
      dataIndex: 'CreatedTime',
      key: 'CreatedTime',
    }, {
      title: '创始人',
      dataIndex: 'CreaterID',
      key: 'CreaterID',
    }, {
      title: '修改时间',
      dataIndex: 'ModifiedTime',
      key: 'ModifiedTime',
    }, {
      title: '部门名称',
      dataIndex: 'UnitName',
      key: 'UnitName',
    }, {
      title: '编辑',
      key: 'action',
      render: (text, index) => <Icon style={{'color': '#0aa485'}} type="edit" onClick={this.editModal.bind(this, index)}/>
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
      <div className="divBorder">
        <div className="divHeader panel">
          <div className="panel-body">
            <Searchs handleSearch={this.handleSearch.bind(this)}></Searchs>
            <GoodsForm
              ref={this.saveFormRef}
              wrapped={this.saveFormRef}
              visible={store.getState().Visible}
              startTime={this.startTime}
              showModal={this.showModal}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handlePicPreview={this.handlePicPreview}
              handlePicChange={this.handlePicChange}
              picModalCancel={this.picModalCancel}
            />
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <Button type="primary" className="editable-add-btn f_left" onClick={this.showModal}>新增</Button>
            <Table
              rowKey='InnerID'
              columns={columns}
              rowSelection={rowSelection}
              dataSource={store.getState().DataAll}
              pagination={false}
              loading={this.state.loading}
            />
            <Pagination showQuickJumper defaultCurrent={1} current={store.getState().pageNumber} total={store.getState().count} onChange={this.onChangeNum.bind(this)} />
          </div>
        </div>
      </div >
    )
  }
}
const render = () => {
  ReactDOM.render(
    <GoodsList></GoodsList>, document.getElementById('publicnumberreactwrapper'));
}
render();
store.subscribe(render);