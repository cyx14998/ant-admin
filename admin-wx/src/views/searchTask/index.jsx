import React from 'react';
import ReactDOM from 'react-dom';
import { Page, MobileSearch, ListView, PullToRefresh, Toast } from 'eui-mobile';

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

class SearchTask extends React.Component {
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
            hasMore: true
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
                <MobileSearch
                    showCancelButton={true}
                    historyKey="task-history"
                    historyClick={this.historyClick.bind(this)}
                    onSubmit={this.searchSubmit.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    onClear={this.onClear.bind(this)}
                    placeholder='搜索任务'
                />
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
                        onEndReachedThreshold={50}
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
    }

    getData(keyword) {
        if (!this.state.hasMore && keyword == undefined) {
            return;
        }
        Toast.loading('loading...', 0);
        var params = {
            pageNumber,
            keyword: keyword ? keyword : this.state.value,
        }
        tuInspectionPlanDtlForMeList(params).then(res => {
            Toast.hide();
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '没有查询到任务信息', 1, null, false);
                return;
            }
            var data = res.data.inspectionPlanDtlList;
            var length = res.data.inspectionPlanDtlList.length;
            NUM_SECTIONS = length < 20 ? length : 20;
            if (length == 0) {
                Toast.info('没有查询到任务信息', 1);
                this.setState({
                    data: [],
                    dataSource: this.state.dataSource.cloneWithRows({}, []),
                    isLoading: false,
                    hasMore: false,
                });
                return;
            }
            const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
            if (res.data.totalPage <= pageNumber) {
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
        }).catch(err => Toast.info('没有查询到任务信息', 1, null, false));
    }

    onEndReached(event) {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (!this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('end')
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


    // input submit事件
    searchSubmit() {
        if (!this.state.value) {
            return;
        }
        this.statusClear({
            isLoading: false,
            refreshing: false,
            value: this.state.value,
            height: 0
        });
        this.getData(this.state.value);
    }


    // 历史记录点击事件
    historyClick(val) {
        this.statusClear({
            isLoading: false,
            refreshing: false,
            value: val,
            height: 0
        });
        this.getData(val);
    }

    // input onchange事件
    onChange(value) {
        console.log(value);
        this.setState({
            value,
            hasMore: true,
        })

        if (!value) {
            this.statusClear({
                height: 0
            });
        }
    }

    // 清除
    onClear() {
        this.statusClear({
            isLoading: false,
            refreshing: false,
            hasMore: true,
            height: 0
        });
    }

    // 状态清除
    statusClear(params) {
        this.setState(params);
        sectionIDs = [];
        pageNumber = 1;
    }

    //取消
    onCancel() {
        history.back();
    }

    // 去任务详情页
    goDetails(obj) {
        window.location.href = 'taskEdit.html?tableId=' + obj.tableId;
    }
}

ReactDOM.render(
    <SearchTask></SearchTask>,
    document.getElementById('root')
);