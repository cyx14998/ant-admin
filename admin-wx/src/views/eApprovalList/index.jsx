import React from 'react';
import ReactDOM from 'react-dom';
import { Page, NavBar, Icon, Menu, ListView, PullToRefresh, Toast } from 'eui-mobile';

import {
    tuMemberWaitTodoList,
    tuFlowMstList,
    tuMemberOrderFlowHistoryList
} from '../../common/api/api.allList';
import './index.less';

var NUM_SECTIONS = 20;

const dataBlobs = {};
let sectionIDs = [];
let pageNumber = 1;

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

class EApprovalList extends React.Component {
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

            isBegin: 0,    // 审核类型  0 待审批  1 已参与审批

            menuData: '',  // 菜单数据  请假单/ 采购单/ ...
            show: false,   // 菜单是否显示
            choseMenuId: '', // 选中的菜单Id
            choseMenuTheName: '', // 选中的菜单名称
        };
    }

    componentWillUnmount() {
        this.statusClear({
            dataSource: this.state.dataSource.cloneWithRows({}, []),
            isLoading: false,
            refreshing: true,
            hasMore: true,
        });
    }

    render() {

        let index = 0;
        const row = (rowData, sectionID, rowID) => {
            const obj = this.state.data[index++];
            if (index > this.state.data.length - 1) {
                index = 0;
            }
            var status = '';
            if (this.state.isBegin == 0) {
                status = <div className='eApproval-status'>待审批</div>;
            } else {
                if (obj.theOrderState == 1) {
                    status = <div className='eApproval-status cancel'>已作废</div>;
                } else {
                    status = <div className='eApproval-status'>已审批</div>;
                }
            }
            return (
                <div key={rowID} className="eApproval-item clear" onClick={this.goDetails.bind(this, obj)}>
                    <div className="eApproval-intro">
                        <div className="eApproval-header clear">
                            {obj.realName ? obj.realName : ''}
                        </div>
                        <div className="eApproval-body clear">
                            <div className="eApproval-name item">
                                <p className="pItem pIime">{obj.createDatetime ? dateFormat(obj.createDatetime) : ''}</p>
                                <p className="pItem">{obj.theName ? obj.theName : ''}</p>
                            </div>
                        </div>
                    </div>
                    {status}
                </div>
            );
        };

        const { menuData, show, choseMenuTheName, choseMenuId } = this.state;
        const menuEl = (
            <Menu
                className="single-foo-menu"
                data={menuData}
                value={choseMenuId ? [choseMenuId] : []}
                level={1}
                onChange={this.onMenuTypeChange.bind(this)}
                height='auto'
            />
        );
        const loadingEl = (
            <div className="loadingMenuEl">
            </div>
        );

        return (
            <Page>
                <NavBar
                    mode="light"
                    icon={false}
                >电子审批</NavBar>
                <div className="eApproval-section clear">
                    <div className={this.state.isBegin == 0 ? "eApproval-type eApproval-todo active" : "eApproval-type eApproval-todo"} onClick={this.isBegin.bind(this, 0)}>
                        <div className="eApproval-title">待审批</div>
                    </div>
                    <div className={this.state.isBegin == 0 ? "eApproval-type eApproval-done" : "eApproval-type eApproval-done active"} onClick={this.isBegin.bind(this, 1)}>
                        <div className="eApproval-title">已参与审批</div>
                    </div>
                </div>
                <div className="eApproval-menu">
                    <div className='eApproval-title' onClick={this.handleClick.bind(this)}>
                        {choseMenuTheName ? choseMenuTheName : '全部'}
                        <span className="e-icon"></span>
                    </div>
                </div>
                {show ? menuData ? menuEl : loadingEl : null}
                {show ? <div className="menu-mask" onClick={this.onMaskClick.bind(this)} /> : null}
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
            </Page >
        );
    }

    componentDidMount() {
        this.getData();
        this.getMenuData();
    }

    // 获取菜单类型数据
    getMenuData() {
        tuFlowMstList().then(res => {
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '获取任务类型列表失败', 1);
                return;
            }
            var data = res.data.flowMstList;

            if (data.length) {
                data.map(item => {
                    item.label = item.theName;
                    item.value = item.tableId;
                })
            }
            this.setState({
                menuData: data
            });
        }).catch(err => Toast.info('获取任务类型列表失败', 1));
    }

    // 获取数据
    getData(status, flowMstId) {

        Toast.loading('loading...', 0);
        var isBegin = status != undefined ? status : this.state.isBegin;
        var params = {
            flowMstId: flowMstId ? flowMstId : this.state.flowMstId,
        }

        if (isBegin == 0) {
            tuMemberWaitTodoList(params).then(res => {
                Toast.hide();
                if (res.data.result !== 'success') {
                    Toast.info(res.data.info || '获取审批列表失败', 1);
                    return;
                }
                var data = res.data.waitTodoList;
                var length = res.data.waitTodoList.length;
                NUM_SECTIONS = length < 200 ? length : 200;

                // 没有数据直接return
                if (length == 0) {
                    this.setState({
                        isLoading: false,
                        refreshing: false,
                        hasMore: false,
                    });
                    return;
                }
                const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop - 50;
                genData();

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataBlobs, sectionIDs),
                    data,
                    isLoading: false,
                    refreshing: false,
                    hasMore: false,
                    height: hei,
                });
            }).catch(err => Toast.info('获取审批列表失败', 1));
        } else {
            params.pageNumber = pageNumber;
            tuMemberOrderFlowHistoryList(params).then(res => {
                Toast.hide();
                if (res.data.result !== 'success') {
                    Toast.info(res.data.info || '获取审批列表失败', 1);
                    return;
                }
                var data = res.data.memberOrderFlowHistoryList;
                var length = res.data.memberOrderFlowHistoryList.length;
                NUM_SECTIONS = length < 200 ? length : 200;

                // 没有数据直接return
                if (length == 0) {
                    this.setState({
                        data: [],
                        isLoading: false,
                        refreshing: false,
                        hasMore: false,
                    });
                    return;
                }
                const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop - 50;
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
                    hasMore: false,
                    height: hei,
                });
            }).catch(err => Toast.info('获取审批列表失败', 1));
        }

    }

    // 切换菜单选择 电子审批类型切换
    onMenuTypeChange(value) {
        this.onMaskClick();
        let label = '';
        this.state.menuData.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
            }
        });
        this.setState({
            choseMenuId: value[0],
            choseMenuTheName: label
        });

        this.statusClear({
            dataSource: this.state.dataSource.cloneWithRows({}, []),
            isLoading: false,
            refreshing: true,
            hasMore: true,
        });
        this.getData(this.state.isBegin, value[0]);
    }

    // 点击菜单目录
    handleClick(e) {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.menuData) {
            this.setState({
                menuData: data,
            });
        }
    }

    // 菜单mask关闭
    onMaskClick() {
        this.setState({
            show: false,
        });
    }

    // 切换电子审批状态
    isBegin(isBegin) {
        this.setState({
            isBegin
        });

        this.statusClear({
            dataSource: this.state.dataSource.cloneWithRows({}, []),
            isLoading: false,
            refreshing: true,
            hasMore: true,
        });
        this.getData(isBegin, this.state.choseMenuId);
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
        this.getData(this.state.isBegin, this.state.choseMenuId);
    }

    onRefresh() {
        this.statusClear({
            dataSource: this.state.dataSource.cloneWithRows({}, []),
            isLoading: false,
            refreshing: true,
            hasMore: true,
        });
        this.getData(this.state.isBegin, this.state.choseMenuId);
    };

    // 状态清除
    statusClear(params) {
        this.setState(params);
        sectionIDs = [];
        pageNumber = 1;
    }

    // 去各个详情页
    goDetails(obj) {
        window.location.href = obj.theLink + '?tableId=' + obj.sourceId;
    }
}

export default EApprovalList