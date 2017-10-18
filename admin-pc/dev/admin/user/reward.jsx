import React, { component } from 'react';
import ReactDOM from 'react-dom';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal } from 'antd';
import $db from './../../common/dal.js';
// var $db = require("../../common/dal.js");
const FormItem = Form.Item;
import './reward.less';

// var $db = require("../../common/dal.js");

class Modals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [],
        }
    }
    componentWillMount() {
        let i = this.props.text.key - 1;
        const result = this.props.data[i];
        const data = [({
            key: i + 1,
            InnerID: result.InnerID,
            UserID: result.UserID,
            NickName: result.NickName,
            Email: result.Email,
            CardID: result.CardID,
            Phone: result.Phone,
        })];
        this.setState({
            data: data,
        })
    }
    showModal() {
        this.setState({
            visible: true,
        })
    }
    handleOk() {
        this.setState({
            visible: false,
        });
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    render() {
        const columns = [{
            title: '编号',
            dataIndex: 'InnerID',
            key: 'InnerID',
        }, {
            title: '用户名',
            dataIndex: 'UserID',
            key: 'UserID',
        }, {
            title: '昵称',
            dataIndex: 'NickName',
            key: 'NickName',
        }, {
            title: '邮箱',
            dataIndex: 'Email',
            key: 'Email',
        }, {
            title: '身份证号',
            dataIndex: 'CardID',
            key: 'CardID',
        }, {
            title: '手机号',
            dataIndex: 'Phone',
            key: 'Phone',
        },];
        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>查看</Button>
                <Modal className="modal"
                    title={this.props.text.UserName}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width='70%'
                >
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={false}
                    ></Table>
                </Modal>
            </div>
        );
    }
}
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
            values.Sex = values.Sex == "男" ? 1 : values.Sex == "女" ? 2 : "";
            values['pageNumber'] = 1;
            this.props.handleSearch(1, values);
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
            title: "用户名",
            eng: "UserName"
        }, {
            title: "性别",
            eng: "Sex"
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
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            count: 0,
            result: [],
            values: {
                Sex: "",
                UserName: "",
            },
            current: 1,
        }
    }

    componentWillMount() {
        this.handleSearch(1, this.state.values);
    }

    handleSearch(pageNumber, values) {
        if (values.pageNumber == 1) {
            this.setState({ current: 1 });
        }
        this.setState({ loading: true, values: values });
        var data = {
            pageIndex: pageNumber,
            Sex: values.Sex,
            UserName: values.UserName==undefined?"":values.UserName,
        }
        $db.GetMemberView(data, function (results) {
            var result = results.result;
            const data = [];
            for (let i = 0; i < result.length; i++) {
                data.push({
                    key: i + 1,
                    UserName: result[i].UserName,
                    sex: result[i].Sex == 1 ? "男" : "女",
                    CreatedTime: result[i].CreatedTime.split("T").join(" "),
                })
            };
            this.setState({ loading: false, data: data, count: results.count, result: result });
        }.bind(this));
    }
    onChange(pageNumber) {
        this.handleSearch(pageNumber, this.state.values);
        this.setState({ current: pageNumber });
    }
    render() {
        const columns = [{
            title: '用户名',
            dataIndex: 'UserName',
            key: 'UserName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: '创建时间',
            dataIndex: 'CreatedTime',
            key: 'CreatedTime',
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Modals data={this.state.result} text={text}></Modals>
                </span>
            ),
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return (
            <div className="divBorder">
                <Searchs handleSearch={this.handleSearch.bind(this)}></Searchs>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    loading={this.state.loading}
                />
                <Pagination showQuickJumper defaultCurrent={1} current={this.state.current} total={this.state.count} onChange={this.onChange.bind(this)} />
                <div style={{height:'100px',}}></div>
            </div >
        )
    }
}
ReactDOM.render(<App></App>, document.getElementById('rewardwrapper'))