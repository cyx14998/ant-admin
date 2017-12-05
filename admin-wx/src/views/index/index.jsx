import React from 'react';
import ReactDOM from 'react-dom';

import { TabBar } from 'eui-mobile';
import IndexTabBar1 from '../home/index';
import MyInfoTabBar3 from '../myInfo/index';

//图片
import indexImg from '../../assets/index_index.png';
import indexImgActive from '../../assets/index_index_active.png';
import checkImg from '../../assets/index_check.png';
import checkImgActive from '../../assets/index_check_active.png';
import myInfo from '../../assets/index_myInfo.png';
import myInfoActive from '../../assets/index_myInfo_active.png';

class TabBarExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'homeTab',
        };
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#619a2c"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首页"
                        key="inex"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(' + indexImg + ') center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(' + indexImgActive + ') center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'homeTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'homeTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        {
                            this.state.selectedTab == 'homeTab' && <IndexTabBar1 />
                        }
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + checkImg + ') center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + checkImgActive + ') center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="电子审批"
                        key="check"
                        selected={this.state.selectedTab === 'eApprovalTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'eApprovalTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {
                            this.state.selectedTab == 'eApprovalTab' && <div>电子审批</div>
                        }
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + myInfo + ') center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + myInfoActive + ') center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="我的信息"
                        key="myInfo"
                        selected={this.state.selectedTab === 'myInfoTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'myInfoTab',
                            });
                        }}
                    >
                        {
                            this.state.selectedTab == 'myInfoTab' && <MyInfoTabBar3 />
                        }
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

ReactDOM.render(<TabBarExample />,
    document.getElementById('root')
)