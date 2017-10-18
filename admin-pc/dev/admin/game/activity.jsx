import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './activity.less';
import $db from '../../common/dal.js';
import store from '../../models/activity';

import { Form, Input, Row, Col, Table, Button, Popconfirm, Upload, Icon, Select, DatePicker, TimePicker, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
import gameImg from './assets/1.png';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    // console.log(file);
    const isJPG = file.type === ('image/jpeg') || ('image/png') || ('image/psd');
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
}
//活动配置
class Activity extends React.Component {
    constructor(props) {
        super(props);
        //底部表格
        this.columns = [{
            title: '代码',
            dataIndex: 'ReturnCode',
            width: '12%',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'RETURNCODE' })} />
        }, {
            title: '解释',
            dataIndex: 'MessageName',
            render: (text, index) => <Input size="small" onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'MESSAGENAME' })} />
        }, {
            title: '规则代码',
            dataIndex: 'RuleCode',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'RULECODE' })} />
        }, {
            title: '奖品代码',
            dataIndex: 'AwardID',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'AWARDID' })} />
        }, {
            title: '中奖消息',
            dataIndex: 'SendMsg',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'SENDMSG' })} />
        }, {
            title: '发奖数量',
            dataIndex: 'MaxCount',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'MAXCOUNT' })} />
        }, {
            title: '每次发奖数量',
            dataIndex: 'EvTimeMaxCount',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'EVTIMEMAXCOUNT' })} />
        }, {
            title: '难度系数',
            dataIndex: 'DiffCoeff',
            render: (text, index) => <Input onChange={e => store.dispatch({ value: e.target.value, index: index.key, type: 'DIFFCOEFF' })} />
        }, {
            title: '删除',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    store.getState().AwardList.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                <a className="delete" href="#">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
        };
    }
    // 底部删除
    onDelete = (index) => {
        store.dispatch({ index: index, type: 'DELETE' });
    }
    // 底部增加    
    handleAdd = () => {
        var AwardList = store.getState().AwardList;
        var count = store.getState().count;
        const newData = {
            key: count,
            CampaignID: '',
            ReturnCode: '',
            MessageName: '',
            RuleCode: '',
            AwardID: '',
            SendMsg: '',
            MaxCount: '',
            EvTimeMaxCount: '',
            DiffCoeff: '',
        };
        store.dispatch({
            AwardList: newData,
            type: 'ADD_DATA'
        });
        // console.log(store.getState().AwardList)
        // console.log(AwardList, count)
    }
    //上传图片
    handleChange = (info) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            store.dispatch({ value: info.file.response.result, type: 'IMAGESID' })
        }
    }
    // 配置提交
    handleSubmit = (e) => {
        // console.log(e)
        e.preventDefault();
        var start = store.getState().StartDate + ' ' + store.getState().StartT;
        var end = store.getState().EndDate + ' ' + store.getState().EndT;
        store.dispatch({ value: start, type: 'STARTTIME' })
        store.dispatch({ value: end, type: 'ENDTIME' })
        if (store.getState().StartDate && store.getState().StartTime && store.getState().EndDate && store.getState().EndTime) {
            var reg = /^\s*|\s*$/g;
            var t1 = start.replace(reg, "");
            var t2 = end.replace(reg, "");
            reg = /^(\d+)\-(\d+)\-(\d+)\s+(\d+)\:(\d+)\:(\d*)$/;
            // if (!reg.test(t1) || !reg.test(t2)) {
            //     throw new Error("Date Format is Error !");
            //     return;
            // }
            var d1 = new Date(t1.replace(reg, "$1"), parseInt(t1.replace(reg, "$2")) - 1, t1.replace(reg, "$3"));
            d1.setHours(t1.replace(reg, "$4"), t1.replace(reg, "$5"), t1.replace(reg, "$6"));
            var d2 = new Date(t2.replace(reg, "$1"), parseInt(t2.replace(reg, "$2")) - 1, t2.replace(reg, "$3"));
            d2.setHours(t2.replace(reg, "$4"), t2.replace(reg, "$5"), t2.replace(reg, "$6"));

            console.log(d1 + '' + d2)
            if (d1 >= d2) {
                message.info("活动起止日期设置错误")
            } else {
                this.props.form.validateFields((err, values) => {
                    if (!err) {
                        const formData = this.props.form.getFieldsValue();
                        formData.ImagesID = store.getState().ImagesID;
                        formData.AwardList = store.getState().AwardList;
                        formData.StartTime = store.getState().StartTime;
                        formData.EndTime = store.getState().EndTime;
                        console.log(formData)

                        // data1.AwardList =JSON.stringify(data1.AwardList);
                        $db.submitActivity(formData, function (result) {
                            console.log(result);
                            if (result == 1) {
                                message.info('提交成功', 2);
                                // window.location.href = "/admin/activitylist";
                            } else {
                                message.info('提交失败', 2);
                            }
                        });
                    } else {
                        console.log('Received values of form: ', values);
                        return false;
                    }
                });
            }
        } else {
            message.info("日期未选择完整")
        }
    }
    // 选择时间
    startDate(date, dateString) {
        // console.log(date, dateString);
        store.dispatch({ value: dateString, type: 'STARTDATE' })
    }
    endDate(date, dateString) {
        // console.log(date, dateString);
        store.dispatch({ value: dateString, type: 'ENDDATE' })
    }
    startTime(time, timeString) {
        // console.log( timeString);
        store.dispatch({ value: timeString, type: 'STARTT' })
    }
    endTime(time, timeString) {
        console.log(timeString);
        store.dispatch({ value: timeString, type: 'ENDT' })
    }
    render() {
        const columns = this.columns;
        const imageUrl = this.state.imageUrl;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <div className="content">
                <Form onSubmit={this.handleSubmit}>
                    <div className="top">
                        <div className="topLeft">
                            <Row className="picRow">
                                <Col span={24} >
                                    <FormItem {...formItemLayout} label="活动图片">
                                        {getFieldDecorator('pic', {
                                            rules: [{ required: true, message: 'Please input your GameCode!' },]
                                        })(
                                            <Upload
                                                className="avatar-uploader"
                                                name="avatar"
                                                showUploadList={false}
                                                action={$db.baseUrl + "/emapi/emfiles/PostGameImg"}
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                {
                                                    imageUrl ?
                                                        <img src={imageUrl} alt="" className="avatar" /> :
                                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                                }
                                            </Upload>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className="infoTitle"><i></i>基本信息</div>
                            <Row className="clearfix">
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="游戏ID">
                                        {getFieldDecorator('GameID', {
                                            initialValue: store.getState().GameID,
                                            rules: [{ required: true, message: 'Please input your GameID!' },
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="活动方式">
                                        {getFieldDecorator('OpeningMode', {
                                            initialValue: JSON.stringify(store.getState().OpeningMode),
                                            rules: [{ required: true, message: 'Please input your OpeningMode!' }],
                                        })(
                                            <Select size="small">
                                                <Option value="0">团队类</Option>
                                                <Option value="1">个人类</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="活动主题">
                                        {getFieldDecorator('Title', {
                                            initialValue: store.getState().Title,
                                            rules: [{ required: true, message: 'Please input your Title!' }],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="关键字">
                                        {getFieldDecorator('KeyWord', {
                                            initialValue: store.getState().KeyWord,
                                            rules: [{ required: true, message: 'Please input your KeyWord!' }],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="开始时间">
                                        {/* {getFieldDecorator('StartTime', {
                                            initialValue: store.getState().StartTime,                                            
                                rules: [{ required: true, message: 'Please input your StartTime!' }],
                            })(  */}
                                        <div><DatePicker onChange={this.startDate} /><TimePicker onChange={this.startTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /></div>
                                        {/* )}  */}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="结束时间">
                                        {/* {getFieldDecorator('EndTime', {
                                            initialValue: store.getState().GameID,                                            
                                rules: [{ required: true, message: 'Please input your EndTime!' }],
                            })( */}
                                        <div><DatePicker onChange={this.endDate} /><TimePicker onChange={this.endTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /></div>
                                        {/* )} */}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="游戏频率">
                                        {getFieldDecorator('GameFrequency', {
                                            initialValue: store.getState().GameFrequency,
                                            rules: [{ required: true, message: 'Please input your GameFrequency!' },
                                            { pattern: /^([1-9]|[1-5][0-9]|60)$/, message: '频率应为0~60间数字!' }
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="活动时长">
                                        {getFieldDecorator('Duration', {
                                            initialValue: store.getState().Duration,
                                            rules: [{ required: true, message: 'Please input your Duration!' },
                                            { pattern: /^([1-9]|[1-5][0-9]|60)$/, message: '时长应为0~60间数字,且小于频率!' }
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="活动码">
                                        {getFieldDecorator('FlagCode', {
                                            initialValue: store.getState().FlagCode,
                                            rules: [{ required: true, message: 'Please input your FlagCode!' },
                                            { pattern: /^[0-9]*$/, message: '活动码为纯数字!' }
                                            ],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="备注">
                                        {getFieldDecorator('Remark', {
                                            initialValue: store.getState().Remark,
                                            rules: [{ required: true, message: 'Please input your Remark!' }],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col>
                                {/* <Col span={10}>
                                    <FormItem {...formItemLayout} label="路径">
                                        {getFieldDecorator('GameUrl', {
                                            initialValue: store.getState().GameUrl,
                                            rules: [{ required: true, message: 'Please input your GameUrl!' }],
                                        })(
                                            <Input size="small"  />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="接口">
                                        {getFieldDecorator('ApiUrl', {
                                            initialValue: store.getState().ApiUrl,
                                            rules: [{ required: true, message: 'Please input your ApiUrl!' }],
                                        })(
                                            <Input size="small" />
                                            )}
                                    </FormItem>
                                </Col> */}
                            </Row>
                        </div>
                    </div>
                    <div className="bottom clearfix">
                        <div className="table">
                            <Table pagination={false} dataSource={store.getState().AwardList} columns={columns} />
                            <Button className="editable-add-btn f_right" onClick={this.handleAdd}>Add</Button>
                        </div>
                        <div className="clearfix"></div>
                        <Button className="submit" type="primary" htmlType="submit">提交</Button>
                    </div>
                </Form >
            </div>
        );
    }
}
const ActivityForm = Form.create()(Activity);

const render = () => {
    ReactDOM.render(
        <ActivityForm></ActivityForm>, document.getElementById('reactwrapper'));
}
render();
store.subscribe(render);