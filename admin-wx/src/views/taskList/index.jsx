import React from 'react';
import ReactDOM from 'react-dom';
import { Page, NavBar, Icon, SearchBar, ListView, PullToRefresh, Toast } from 'eui-mobile';

import {
    tuInspectionPlanDtlForMeList,
} from '../../common/api/api.allList';
import './index.less';
import taskIcon from '../../assets/task-icon.png';

var NUM_SECTIONS = 20;
let pageNumber = 1;

const dataBlobs = {};
let sectionIDs = [];

function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
    }
    sectionIDs = [...sectionIDs];
}

function dateFormat(date) {
    return new Date(date).format("yyyy-MM-dd");
}

class Demo extends React.Component {
    constructor(props) {
        super(props);

        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            data: [],
            isLoading: false,
            refreshing: false,
            height: 0,
            value: '',
            hasMore: true,

            taskType: 0, // 任务类型  0 未完成  1 已完成
        };
    }

    render() {

        let index = 0;
        const row = (rowData, sectionID, rowID) => {
            const obj = this.state.data[index++];
            if (index > this.state.data.length - 1) {
                index = 0;
            }
            return (
                <div key={rowID} className="task-item clear" onClick={this.goDetails.bind(this, obj)}>
                    <div className="task-icon">
                        <img src={taskIcon} />
                    </div>
                    <div className="task-intro">
                        <div className="task-header clear">
                            {obj.customer ? obj.customer.customerName : ''}
                        </div>
                        <div className="task-body clear">
                            <div className="task-name item">
                                <p className="pItem">批号: &nbsp; {obj.inspectionPlanMst ? obj.inspectionPlanMst.lotNumber : ''}</p>
                                <p className="pItem pIime">时间: &nbsp; {obj.inspectionPlanMst ? dateFormat(obj.inspectionPlanMst.planDateStart) : ''} ~ {obj.inspectionPlanMst ? dateFormat(obj.inspectionPlanMst.planDateEnd) : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className={obj.theState == 0 ? 'task-status' : 'task-status done'}></div>
                </div>
            );
        };

        return (
            <Page>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => history.back()}
                    rightContent={<Icon key="0" type="search" style={{ color: '#619a2c' }} onClick={this.goSearch.bind(this)} />}
                >任务</NavBar>
                <div className="task-section clear">
                    <div className={this.state.taskType == 0 ? "task-type task-todo active" : "task-type task-todo"} onClick={this.taskType.bind(this, 0)}>
                        <div className="task-title">未完成</div>
                    </div>
                    <div className={this.state.taskType == 0 ? "task-type task-done" : "task-type task-done active"} onClick={this.taskType.bind(this, 1)}>
                        <div className="task-title">已完成</div>
                    </div>
                </div>
                <div className="result-list">
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (
                            <div style={{ padding: 10, textAlign: 'center' }}>
                                {
                                    this.state.data.length == 0 ? '暂无数据' : this.state.hasMore ? '加载中...' : '加载完成'
                                }
                            </div>
                        )}
                        renderRow={row}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        pageSize={20}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={40}
                        pullToRefresh={
                            <PullToRefresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </div>
            </Page>
        );
    }

    componentDidMount() {
        this.getData();
    }

    getData(taskType) {
        var theState = '';
        if (taskType != undefined) {
            theState = taskType;
        } else {
            theState = this.state.taskType;
        }
        Toast.loading('loading...', 0);
        var params = {
            pageNumber,
            keyword: this.state.value,
            theState
        }
        tuInspectionPlanDtlForMeList(params).then(res => {
            Toast.hide();
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '获取任务列表失败', 1);
                return;
            }
            var data = res.data.inspectionPlanDtlList;
            var length = res.data.inspectionPlanDtlList.length;
            NUM_SECTIONS = length < 20 ? length : 20;

            if (length == 0) {
                this.setState({
                    data: [],
                    isLoading: false,
                    refreshing: false,
                    hasMore: false,
                });
                return;
            }
            const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
            if (res.data.totalPage == pageNumber) {
                this.setState({
                    hasMore: false,
                });
            } else {
                this.setState({
                    hasMore: true,
                });
            }
            genData(pageNumber++);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataBlobs, sectionIDs),
                data,
                isLoading: false,
                refreshing: false,
                height: hei,
            });
        }).catch(err => Toast.info('获取任务列表失败', 1));
    }

    taskType(taskType) {
        this.setState({
            taskType
        });

        this.statusClear({
            dataSource: this.state.dataSource.cloneWithRows({}, []),
            isLoading: false,
            refreshing: true,
            hasMore: true,
        });
        this.getData(taskType);
    }

    goSearch() {
        window.location.href = '/searchTask.html';
    }

    onEndReached(event) {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (!this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({
            isLoading: true
        })
        this.getData();
    }

    onRefresh() {
        this.statusClear({
            dataSource: this.state.dataSource.cloneWithRows({}, []),
            isLoading: false,
            refreshing: true,
            hasMore: true,
        });
        this.getData();
    };

    // 状态清除
    statusClear(params) {
        this.setState(params);
        sectionIDs = [];
        pageNumber = 1;
    }


    // 去任务详情页
    goDetails(obj) {
        window.location.href = '/taskEdit.html?tableId=' + obj.tableId;
    }
}

ReactDOM.render(
    <Demo></Demo>,
    document.getElementById('root')
);