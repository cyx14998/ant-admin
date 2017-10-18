import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './activitylist.less';
import $db from '../../common/dal.js';
import store from '../../models/activitylist';

import { Form, Input, Row, Col, Table, Button, Popconfirm, Upload, Icon, Select, message, Modal, DatePicker, TimePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
// 游戏添加与编辑弹窗页面ActivityForm
class Activity extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { visible, onCancel, onCreate, handleSubmit, form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //编辑页面表格
        const columns = [
            {
                title: '代码',
                dataIndex: 'ReturnCode',
                width: '8%',
                render: (text, index) => <Input value={index.ReturnCode} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'RETURNCODE' })} />
            }, {
                title: '解释',
                dataIndex: 'MessageName',
                render: (text, index) => <Input value={index.MessageName} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'MESSAGENAME' })} />
            }, {
                title: '规则代码',
                dataIndex: 'RuleCode',
                render: (text, index) => <Input value={index.RuleCode} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'RULECODE' })} />
            }, {
                title: '奖品代码',
                dataIndex: 'AwardID',
                render: (text, index) => <Input value={index.AwardID} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'AWARDID' })} />
            }, {
                title: '中奖消息',
                dataIndex: 'SendMsg',
                render: (text, index) => <Input value={index.SendMsg} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'SENDMSG' })} />
            }, {
                title: '发奖数量',
                dataIndex: 'MaxCount',
                render: (text, index) => <Input value={index.MaxCount} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'MAXCOUNT' })} />
            }, {
                title: '每次发奖数量',
                dataIndex: 'EvTimeMaxCount',
                render: (text, index) => <Input value={index.EvTimeMaxCount} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'EVTIMEMAXCOUNT' })} />
            }, {
                title: '难度系数',
                dataIndex: 'DiffCoeff',
                render: (text, index) => <Input value={index.DiffCoeff} onChange={e => store.dispatch({ value: e.target.value, index: index, type: 'DIFFCOEFF' })} />
            }, {
                title: '删除',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        store.getState().Data.AwardList.length > 1 ?
                            (
                                <Popconfirm title="Sure to delete?" onConfirm={() => props.onEditDelete(index)}>
                                    <a className="delete" href="#">Delete</a>
                                </Popconfirm>
                            ) : null
                    );
                },
            }
        ];
        return (
            //弹窗内容
            <Modal
                title="游戏配置"
                width='70%'
                visible={visible}
                onCancel={onCancel}
                onOk={onCreate}
                className='modal'
            >
                <div className="content">
                    <Form onSubmit={handleSubmit}>
                        <div className="top">
                            <div className="topLeft">
                                <Row className="picRow">
                                    <Col span={24} >
                                        <FormItem {...formItemLayout} label="活动图片">
                                            {getFieldDecorator('pic')(<div>
                                                <Upload
                                                    action={$db.uploadImg}
                                                    listType="picture-card"
                                                    fileList={store.getState().fileList}
                                                    onPreview={this.props.handlePicPreview}
                                                    onChange={this.props.handlePicChange}
                                                >
                                                    {store.getState().fileList.length >= 1 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={store.getState().previewVisible} footer={null} onCancel={this.props.picModalCancel}>
                                                    <img alt="example" style={{ width: '100%' }} src={store.getState().previewImage} />
                                                </Modal>
                                            </div>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <div className="infoTitle"><i></i>基本信息</div>
                                <Row className="clearfix">
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="游戏ID">
                                            {getFieldDecorator('GameID', {
                                                initialValue: store.getState().Data.GameID,
                                                rules: [{ required: true, message: 'Please input your GameID!' },
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="活动方式">
                                            {getFieldDecorator('OpeningMode', {
                                                initialValue: store.getState().Data.OpeningMode ? JSON.stringify(store.getState().Data.OpeningMode) : '0',
                                                rules: [{ required: true, message: 'Please input your OpeningMode!' }],
                                            })(
                                                <Select>
                                                    <Select.Option value="0">团队</Select.Option>
                                                    <Select.Option value="1">个人</Select.Option>
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="活动主题">
                                            {getFieldDecorator('Title', {
                                                initialValue: store.getState().Data.Title,
                                                rules: [{ required: true, message: 'Please input your Title!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="关键字">
                                            {getFieldDecorator('KeyWord', {
                                                initialValue: store.getState().Data.KeyWord,
                                                rules: [{ required: true, message: 'Please input your KeyWord!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        {/* 
                                            defaultValue = {moment(new Date(), 'YYYY-MM-DD')}  defaultValue={moment('00:00:00', 'HH:mm:ss')}                                              
                                            {getFieldDecorator('EndTime', {
                                            initialValue: initialValue: moment(store.getState().Data.StartTime.slice(0, 10), 'YYYY-MM-DD'),                                          
                                            rules: [{ required: true, message: 'Please input your EndTime!' }],
                                        })( */}
                                        <FormItem {...formItemLayout} label="开始时间">
                                            {getFieldDecorator('StartTime',
                                                {/* {
                                                    rules: [{ required: true, message: 'Please input your StartTime!' }],
                                                } */}
                                            )(
                                                <div><DatePicker value={store.getState().Data.StartDate ? moment(store.getState().Data.StartDate, 'YYYY/MM/DD') : moment(new Date(), 'YYYY/MM/DD')} onChange={this.props.startDate} />
                                                    <TimePicker value={store.getState().Data.StartT ? moment(store.getState().Data.StartT, 'HH:mm:ss') : moment(new Date(), 'HH:mm:ss')} onChange={this.props.startTime} /></div>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="结束时间">
                                            {getFieldDecorator('EndTime',
                                                {/* {
                                                rules: [{ required: true, message: 'Please input your EndTime!' }],
                                            } */}
                                            )(
                                                <div><DatePicker value={store.getState().Data.EndDate ? moment(store.getState().Data.EndDate, 'YYYY/MM/DD') : moment(new Date(), 'YYYY/MM/DD')} onChange={this.props.endDate} />
                                                    <TimePicker value={store.getState().Data.EndT ? moment(store.getState().Data.EndT, 'HH:mm:ss') : moment(new Date(), 'HH:mm:ss')} onChange={this.props.endTime} /></div>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="游戏频率">
                                            {getFieldDecorator('GameFrequency', {
                                                initialValue: store.getState().Data.GameFrequency,
                                                rules: [{ required: true, message: 'Please input your GameFrequency!' },
                                                { pattern: /^([1-9]|[1-5][0-9]|60)$/, message: '频率应为0~60间数字!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="活动时长">
                                            {getFieldDecorator('Duration', {
                                                initialValue: store.getState().Data.Duration,
                                                rules: [{ required: true, message: 'Please input your Duration!' },
                                                { pattern: /^([1-9]|[1-5][0-9]|60)$/, message: '时长应为0~60间数字,且小于频率!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="活动码">
                                            {getFieldDecorator('FlagCode', {
                                                initialValue: store.getState().Data.FlagCode,
                                                rules: [{ required: true, message: 'Please input your FlagCode!' },
                                                { pattern: /^[0-9]*$/, message: '活动码为纯数字!' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem {...formItemLayout} label="备注">
                                            {getFieldDecorator('Remark', {
                                                initialValue: store.getState().Data.Remark,
                                                rules: [{ required: true, message: 'Please input your Remark!' }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    {/* <Col span={10}>
                                    <FormItem {...formItemLayout} label="路径">
                                        {getFieldDecorator('GameUrl', {
                                            initialValue: store.getState().Data.GameUrl,
                                            rules: [{ required: true, message: 'Please input your GameUrl!' }],
                                        })(
                                            <Input  />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem {...formItemLayout} label="接口">
                                        {getFieldDecorator('ApiUrl', {
                                            initialValue: store.getState().Data.ApiUrl,
                                            rules: [{ required: true, message: 'Please input your ApiUrl!' }],
                                        })(
                                            <Input  />
                                            )}
                                    </FormItem>
                                </Col> */}
                                </Row>
                            </div>
                        </div>
                        <div className="bottom clearfix">
                            <div className="table">
                                <Table className="clearfix" rowKey="InnerID" pagination={false} dataSource={store.getState().Data.AwardList} columns={columns} />
                                <Button className="editable-add-btn f_right" onClick={this.props.handleAdd}>Add</Button>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </Form >
                </div >
            </Modal>
        )
    }
};
const ActivityForm = Form.create()(Activity);

// 活动列表页面
class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        //列表页面表格头部
        this.columns = [
            {
                title: '活动主题',
                dataIndex: 'Title',
            }, {
                title: '游戏ID',
                dataIndex: 'GameID',
            }, {
                title: '开始时间',
                dataIndex: 'StartTime',
            }, {
                title: '结束时间',
                dataIndex: 'EndTime',
            }, {
                title: '图片',
                dataIndex: 'ImagesID',
                render: (text, index) => <img className="img" src={text} alt="pic" />
            }, {
                title: '编辑',
                dataIndex: 'Check',
                render: (text, index) => <div>
                    <Button type="primary" onClick={this.editModal.bind(this, index)}>编辑</Button>
                </div>
            }, {
                title: '删除',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        store.getState().DataAll.length >= 1 ?
                            (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDeleteList(index)}>
                                    <a className="delete" href="#">Delete</a>
                                </Popconfirm>
                            ) : null
                    );
                },
            }];

    }
    componentDidMount() {
        $db.getActivityList(" ", function (result) {
            console.log(result);
            var result = result.ResultValue;
            result.map((item, index) => {
                item.ImagesID = $db.imgUrl + item.ImagesID;
                item.StartTime = JSON.parse(JSON.stringify(item.StartTime).replace(/T/, ' '));
                item.EndTime = JSON.parse(JSON.stringify(item.EndTime).replace(/T/, ' '));
            })
            store.dispatch({ value: result, type: 'DATAALL' });
        });
    }
    // 弹窗编辑
    editModal = (index) => {
        var self = this;
        var data1 = index.InnerID
        // console.log(data1)
        store.dispatch({ value: data1, type: 'INNERID' });
        $db.getActivityEdit(data1, function (result) {
            // console.log(result)
            // result.result.firstTime = result.result.StartTime.slice(0, 10);
            if (result.code == 1) {
                store.dispatch({ value: true, type: 'VISIBLE' });
                var tmplId = result.result.ImagesID;
                result.result.ImagesID = $db.imgUrl + tmplId;
                store.dispatch({
                    tmplId: tmplId,
                    imgUrl: result.result.ImagesID,
                    value: result.result,
                    type: 'EDIT_DATA'
                });
                store.dispatch({ value: result.result.StartTime ? result.result.StartTime.slice(0, 10) : new Date(), type: 'STARTDATE' });
                store.dispatch({ value: result.result.StartTime ? result.result.StartTime.slice(11, 19) : new Date(), type: 'STARTT' });
                store.dispatch({ value: result.result.EndTime ? result.result.EndTime.slice(0, 10) : new Date(), type: 'ENDDATE' });
                store.dispatch({ value: result.result.EndTime ? result.result.EndTime.slice(11, 19) : new Date(), type: 'ENDT' });
            }
            // console.log(new Date(result.result.firstTime));
            // console.log(result.result.EndTime.slice(0, 10))
            // console.log(result.result.EndTime.slice(11, 19))
        });
    }
    // 弹窗添加活动
    showModal = () => {
        store.dispatch({ value: true, type: 'VISIBLE' });
    }
    //列表数据删除
    onDeleteList = (index) => {
        console.log(index);
        // console.log(store.getState().DataAll[index].InnerID)
        var data1 = {
            InnerID: store.getState().DataAll[index].InnerID
        };
        console.log(data1)
        $db.deleteActivity(data1, function (result) {
            // console.log(result)
            if (result == 1 || result == '1') {
                message.info("删除成功");
                store.dispatch({ index: index, type: 'DELETE' });
            } else {
                message.info("删除失败")
            }
        });
    }
    //关闭modal，清空数据
    handleCancel = () => {
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

        var Data = store.getState().Data;
        var start = Data.StartDate + ' ' + Data.StartT;
        var end = Data.EndDate + ' ' + Data.EndT;
        store.dispatch({ value: start, type: 'STARTTIME' })
        store.dispatch({ value: end, type: 'ENDTIME' })

        var reg = /^\s*|\s*$/g;
        var t1 = start.replace(reg, "");
        var t2 = end.replace(reg, "");
        reg = /^(\d+)\-(\d+)\-(\d+)\s+(\d+)\:(\d+)\:(\d*)$/;
        // if (!reg.test(t1) || !reg.test(t2)) {
        //     throw new Error("Data Format is Error !");
        //     return;
        // }
        var d1 = new Date(t1.replace(reg, "$1"), parseInt(t1.replace(reg, "$2")) - 1, t1.replace(reg, "$3"));
        d1.setHours(t1.replace(reg, "$4"), t1.replace(reg, "$5"), t1.replace(reg, "$6"));
        var d2 = new Date(t2.replace(reg, "$1"), parseInt(t2.replace(reg, "$2")) - 1, t2.replace(reg, "$3"));
        d2.setHours(t2.replace(reg, "$4"), t2.replace(reg, "$5"), t2.replace(reg, "$6"));
        if (d1 >= d2) {
            message.info("活动起止日期设置错误")
        } else {
            form.validateFields((err, values) => {
                if (!err) {
                    const formData = form.getFieldsValue();
                    formData.InnerID = store.getState().InnerID;
                    formData.ImagesID = store.getState().Data.tmplId;
                    formData.AwardList = store.getState().Data.AwardList;
                    formData.StartTime = store.getState().Data.StartTime;
                    formData.EndTime = store.getState().Data.EndTime;

                    // data1.AwardList =JSON.stringify(data1.AwardList);
                    console.log(formData)
                    if (formData.InnerID == '') {
                        $db.submitActivity(formData, function (result) {
                            console.log(result);
                            if (result == 1) {
                                message.info('提交成功');
                                store.dispatch({ value: false, type: 'VISIBLE' });
                                //确定时清空数据
                                form.resetFields();
                                store.dispatch({ type: 'EMPTYDATA' });
                                window.location.href = "/admin/activitylist";
                            } else {
                                message.info('提交失败');
                            }
                        });
                    } else {
                        $db.editActivity(formData, function (result) {
                            console.log(result);
                            if (result == 1) {
                                message.info('提交成功');
                                store.dispatch({ value: false, type: 'VISIBLE' });
                                //确定时清空数据
                                form.resetFields();
                                store.dispatch({ type: 'EMPTYDATA' });
                                window.location.href = "/admin/activitylist";
                            } else {
                                message.info('提交失败');
                            }
                        });
                    }
                } else {
                    console.log('Received values of form: ', values);
                    return false;
                }
            });
        }
    }
    saveFormRef = (form) => {
        this.form = form.props.form;
    }
    //编辑页面底部增加  
    handleAdd = () => {
        var AwardList = store.getState().Data.AwardList;
        // console.log(store.getState())
        const newData = {
            InnerID: Math.random(0, 1),
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
        store.dispatch({ AwardList: newData, type: 'ADD_DATA' });
    }
    //编辑页面底部删除
    onEditDelete = (index) => {
        // console.log(index);
        store.dispatch({ index: index, type: 'DATASOURSE' });
    }
    //时间选择
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
        // console.log( timeString);
        store.dispatch({ value: timeString, type: 'ENDT' })
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
        console.log(fileList)
        store.dispatch({
            value: fileList,
            type: 'FILELIST'
        })
        var index = fileList.length;
        if (index > 0) {
            if (fileList[index - 1].status === 'done') {
                console.log(fileList[index - 1].response.result)
                store.dispatch({ value: fileList[index - 1].response.result, type: 'IMAGESID' })
            }
        }
    }
    render() {
        const columns = this.columns;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        return (
            <div className="content">
                <ActivityForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={store.getState().Visible}
                    startTime={this.startTime}
                    endTime={this.endTime}
                    startDate={this.startDate}
                    endDate={this.endDate}
                    showModal={this.showModal}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    handleAdd={this.handleAdd}
                    handlePicPreview={this.handlePicPreview}
                    handlePicChange={this.handlePicChange}
                    picModalCancel={this.picModalCancel}
                    onEditDelete={this.onEditDelete}
                />
                <Button className="editable-add-btn f_right" onClick={this.showModal}>Add</Button>
                <Table className="clearfix" rowSelection={rowSelection} rowKey={record => record.InnerID} pagination={false} dataSource={store.getState().DataAll} columns={columns} />
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(<ActivityList></ActivityList>, document.getElementById('reactwrapper'));
}
render();
store.subscribe(render);