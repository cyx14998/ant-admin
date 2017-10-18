import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './customerEdit.less';
import $db from '../../common/dal.js';
import store from '../../models/customerEdit';

// import table from './assets/table.png';


import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;


import CustomerEditBaseinfo from './customerEdit.baseinfo.jsx';
const customerDefaultBaseinfo = {};

//列表页面//
class Customerinfo extends React.Component {
    constructor(props) {
        super(props);

        /**
         * redex to state
         */
        this.state = {
            customerBaseinfo: customerDefaultBaseinfo,

            otherMoudleinfo: {

            }
        }
    }

    componentDidMount() {
    }

    //总标签tab
    bigTabCallback(key) {
        console.log(key);
        store.dispatch({ value: key, type: 'TABKEY' });
    }
    
    handleBaseinfoChange(data) {
        this.setState(prev => ({
            ...prev,
            customerBaseinfo: {
                ...data
            }
        }));
    }

    // 排污单位基本情况
    handleBaseinfoSubmit(data) {
        // 调用接口保存数据
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        }
        //图片上传
        const props = {
            name: 'file',
            action: $db.uploadProImg,
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                // if (info.file.status !== 'uploading') {
                //     console.log(info.file, info.fileList);
                // }
                if (info.file.status === 'done') {
                    // console.log(info.file.response.result);
                    message.success(`${info.file.name} file uploaded successfully`);
                    const picItem = {
                        key: info.file.response.result,
                    }
                    store.dispatch({ value: picItem, type: 'PICITEM' })
                    console.log(picItem)
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div className="content">
                <Tabs defaultActiveKey="1" onChange={this.bigTabCallback.bind(this)}>

                    {/**    排污单位基本情况   **/}
                    <TabPane tab="排污单位基本情况" key="1">
                        <CustomerEditBaseinfo 
                            customerBaseinfo={this.state.customerBaseinfo}
                            handle={this.handleBaseinfoChange.bind(this)}
                            getFieldDecorator={getFieldDecorator} />
                    </TabPane>


                    {/**    废水污染物基本情况   **/}
                    <TabPane tab="废水污染物基本情况" key="2">
                    </TabPane>


                    <TabPane tab="废气污染物基本情况" key="3">
                        3
                    </TabPane>


                    <TabPane tab="固体废物基本情况" key="4">
                        4
                    </TabPane>


                    <TabPane tab="边界噪声基本情况" key="5">
                        4
                    </TabPane>


                    <TabPane tab="企业遵守法律法规情况" key="6">
                    </TabPane>


                    <TabPane tab="企业证照材料" key="7">
                        3
                    </TabPane>
                    <TabPane tab="企业内部环保管理制度" key="8">
                        4
                    </TabPane>
                    <TabPane tab="现场检查,监管信息" key="9">
                        4
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const CustomerinfoForm = Form.create()(Customerinfo);
const render = () => {
    ReactDOM.render(
        <CustomerinfoForm></CustomerinfoForm>, document.getElementById('customerinforeactwrapper'));
}
render();
store.subscribe(render);