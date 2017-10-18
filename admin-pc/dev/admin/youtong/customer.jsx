import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './customer.less';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//添加与编辑页面Modal

const dataSource = [{
  key: '1',
  NickName: '胡彦斌',
  WechatID: 32,
  Favicon: '西湖区湖底公园1号'
}, {
  key: '2',
  NickName: '胡彦斌',
  WechatID: 32,
  Favicon: '西湖区湖底公园1号'
}];


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    }
  }
  // handleSearch(e) {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     store.dispatch({
  //       NickName: values.NickName,
  //       StatusCode: values.StatusCode,
  //       UnitID: values.UnitID,
  //       WechatID: values.WechatID,
  //       type: "SEARCH"
  //     });
  //     this.props.handleSearch(1);
  //   });
  // }
  // handleReset() {
  //   this.props.form.resetFields();
  // }
  // toggle() {
  //   const { expand } = this.state;
  //   this.setState({ expand: !expand });
  // }
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
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }}>
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

  // componentWillMount() {
  //   this.handleSearch(1);
  // }
  // //页面初始化页码搜索
  // handleSearch(pageNumber) {
  //   if (pageNumber == 1) {
  //     store.dispatch({ value: 1, type: 'PAGENUMBER' })
  //   }
  //   this.setState({ loading: true});
  //   var data = {
  //     NickName: store.getState().NickName,
  //     WechatID: store.getState().WechatID,
  //     UnitID: store.getState().UnitID,
  //     StatusCode: store.getState().StatusCode,
  //     pageIndex: pageNumber,
  //   }
  //   $db.GetAllWeChatAccount(data, function (results) {
  //     var result = results.result;
  //     result.map((item, index) => {
  //       item.Favicon = $db.imgUrl + item.Favicon;
  //     })
  //     store.dispatch({
  //       count: results.count,
  //       value: result,
  //       type: 'DATAALL'
  //     });
  //     // store.dispatch({value: results.count, type: 'COUNT' });
  //     this.setState({ loading: false, });
  //   }.bind(this));
  // }
  // // 弹窗增加
  // showModal = () => {
  //   store.dispatch({ value: true, type: 'VISIBLE' });
  // }
  // //改变页码
  // onChangeNum(pageNumber) {
  //   // console.log(pageNumber)
  //   store.dispatch({ value: pageNumber, type: 'PAGENUMBER' })
  //   this.handleSearch(pageNumber);
  // }
  // //编辑弹出Modal
  // editModal = (index) => {
  //   var self = this;
  //   var data = index.InnerID;
  //   store.dispatch({ value: data, type: 'INNERID' });
  //   $db.GetWeChatAccount(data, function (result) {
  //     console.log(result);
  //     if (result.code == 1) {
  //       store.dispatch({ value: true, type: 'VISIBLE' });
  //       var tmplId = result.result.Favicon;
  //       console.log(tmplId);
  //       result.result.Favicon = $db.imgUrl + tmplId;
  //       store.dispatch({
  //         tmplId: tmplId,
  //         imgUrl: result.result.Favicon,
  //         value: result.result,
  //         type: 'EDIT_DATA'
  //       });
  //     } else {
  //       message.info("详情页数据错误")
  //     }
  //   });
  // }
  // //Modal取消
  // handleCancel = (e) => {
  //   // console.log(e);
  //   const form = this.form;
  //   form.resetFields();
  //   store.dispatch({ value: '', type: 'INNERID' });
  //   store.dispatch({ type: 'EDIT_DATA' });
  //   store.dispatch({ value: false, type: 'VISIBLE' });
  //   store.dispatch({ type: 'EMPTYDATA' });
  // }
  // //modal确定
  // handleCreate = (e) => {
  //   const form = this.form;
  //   e.preventDefault();
  //   form.validateFields((err, values) => {
  //     if (!err) {
  //       const formData = form.getFieldsValue();
  //       formData.Favicon = store.getState().Data.tmplId;
  //       formData.InnerID = store.getState().InnerID;
  //       console.log("sss", formData)
  //       $db.SetWeChatAccount(formData, function (result) {
  //         console.log(result);
  //         if (result.code == 1) {
  //           message.info('提交成功');
  //           store.dispatch({ value: true, type: 'VISIBLE' });
  //           //确定时清空数据
  //           form.resetFields();
  //           store.dispatch({ type: 'EMPTYDATA' });
  //         } else {
  //           message.info(result.result);
  //         }
  //       });
  //     } else {
  //       console.log('Received values of form: ', values);
  //       return false;
  //     }
  //   });
  // }
  // saveFormRef = (form) => {
  //   this.form = form;
  // }
  // //图片取消预览
  // picModalCancel = () => {
  //   store.dispatch({
  //     previewImage: [],
  //     previewVisible: false,
  //     type: 'PICPREVIEW'
  //   })
  // }
  // //图片预览
  // handlePicPreview = (file) => {
  //   store.dispatch({
  //     previewImage: file.url || file.thumbUrl,
  //     previewVisible: true,
  //     type: 'PICPREVIEW'
  //   })
  // }
  // //图片上传更改
  // handlePicChange = ({ fileList }) => {
  //   store.dispatch({
  //     value: fileList,
  //     type: 'FILELIST'
  //   })
  //   var index = fileList.length;
  //   if (index > 0) {
  //     if (fileList[index - 1].status === 'done') {
  //       store.dispatch({ value: fileList[index - 1].response.result, type: 'PROPIC' })
  //     }
  //   }
  // }
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
      title: '地址',
      dataIndex: 'Favicon',
      key: 'Favicon',
    }, {
      title: '编辑',
      key: 'action',
      render: (text, index) => <div key={index}>
        <Button type="primary" onClick={() => this.setState({url:"/admin/customeredit"})}>编辑</Button>
      </div>
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
        <div className="divHeader">
          <Searchs></Searchs>
          {/* <Button className="editable-add-btn f_right" onClick={this.showModal}>Add</Button> */}
        </div>
        <Table
          rowKey='InnerID'
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          pagination={false}
          loading={this.state.loading}
        />
        <Pagination showQuickJumper defaultCurrent={1} current={1} total={11} />
      </div>
    )
  }
}

ReactDOM.render(<GoodsList/>, document.getElementById('customerreactwrapper'));