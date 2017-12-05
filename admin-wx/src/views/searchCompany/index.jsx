import React from 'react';
import ReactDOM from 'react-dom';
import { Page, MobileSearch, ListView, PullToRefresh, Toast } from 'eui-mobile';

import './index.less';
import companyIcon from '../../assets/company-icon.png';

import {
    tuCustomerList,
} from '../../common/api/api.allList';

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

class SearchCompany extends React.Component {
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
                <div key={rowID} className="company-item clear">
                    <div className="company-icon">
                        <img src={companyIcon} />
                    </div>
                    <div className="company-intro">
                        <div className="company-header">
                            {obj.customerName}
                        </div>
                        <div className="company-body clear">
                            <div className="contacts item">
                                <label htmlFor="">联系人</label>
                                <p className="pItem">{obj.contactPerson}</p>
                            </div>
                            <div className="link-phone item">
                                <label htmlFor="">联系人电话</label>
                                <p className="pItem">{obj.phoneNumber}</p>
                            </div>
                            <div className="company-code item">
                                <label htmlFor="">统一社会信用代码</label>
                                <p className="pItem">{obj.uniformSocialCreditCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <Page>
                <MobileSearch
                    showCancelButton={true}
                    historyKey="company-history"
                    historyClick={this.historyClick.bind(this)}
                    onSubmit={this.searchSubmit.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    onClear={this.onClear.bind(this)}
                    placeholder='搜索公司名称、统一社会信用代码'
                />
                <div className="result-list">
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (
                            <div style={{ padding: 20, textAlign: 'center' }}>
                                {this.state.hasMore ? '加载中...' : '加载完成'}
                            </div>
                        )}
                        renderRow={row}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        pageSize={4}
                        onScroll={() => { console.log('scroll'); }}
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
        tuCustomerList(params).then(res => {
            Toast.hide();
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '没有查询到该企业信息');
                return;
            }
            var data = res.data.customerList;
            var length = res.data.customerList.length;
            NUM_SECTIONS = length < 20 ? length : 20;
            if (length == 0) {
                Toast.info('没有查询到该企业信息', 1);
                this.setState({
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
        }).catch(err => Toast.info('没有查询到该企业信息'));
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
}

ReactDOM.render(
    <SearchCompany></SearchCompany>,
    document.getElementById('root')
);