import React from 'react';
import ReactDOM from 'react-dom';
import store from '../../models/home';
import $db from '../../common/dal.js';
import './index.less';
import { Tabs, SearchBar, Toast, NavBar, Carousel } from 'antd-mobile';
import Search from './search.jsx';
const TabPane = Tabs.TabPane;
import fruit from '../../assets/product.png';
import userImg from '../../assets/back2.png';

class IndexSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    focus(e) {
        store.dispatch({ type: 'SEARCHFOCUS' });
    }
    onSubmit(value) {
        var keyword = value;
        if (keyword && keyword.trim()) {
            var nowKey = keyword.trim();
            $db.PostProductQuery({ "keyword": nowKey }, function (data) {
                if (data && data.code != -100) {
                    var searchArr = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
                    var searchObj = {};
                    searchObj.title = nowKey;
                    if (searchArr.length) {
                        var flag = 0;
                        searchArr.map(function (item, index) {
                            if (item.title == nowKey) {
                                flag = 1;
                            }
                        })
                        if (flag == 0) {
                            searchArr.push(searchObj);
                        }
                    } else {
                        searchArr.push(searchObj);
                    }
                    localStorage.setItem('searchHistory', JSON.stringify(searchArr));
                    if (data && data.result) {
                        store.dispatch({
                            keyWords: nowKey,
                            searchPro: data.result,
                            type: 'SEARCHINPUT'
                        });
                    }
                } else {
                    Toast.info('获取产品信息失败,请稍后再试', 0, null, true);
                }
            });
        } else {
            store.dispatch({
                keyWords: keyword,
                searchPro: [],
                type: 'SEARCHINPUT'
            });
        }
    }
    searchCancel() {
        store.dispatch({ type: 'SEARCHCANCEL' });
    }
    clear(){
        store.dispatch({
            keyWords: '',
            searchPro: [],
            type: 'SEARCHINPUT'
        });
    }
    onChange(value){
        store.dispatch({
            keyWords: value,
            searchPro: [],
            type: 'SEARCHINPUT'
        });
    }
    render() {
        return (
            <div className="home-topSearch">
                <div className={store.getState().searchPage ? 'none' : 'top-pos'}>
                    <p className="pos">苏州市</p>
                    <i></i>
                </div>
                <div className={!store.getState().searchPage ? 'none' : 'top-back'}>
                    <NavBar
                        mode="normal" leftContent={<img src={userImg} width="40px" height="40px" alt="123" />} iconName={false}
                        onLeftClick={this.searchCancel.bind(this)}
                    ></NavBar>
                </div>
                <div className="top-search">
                    <SearchBar
                        placeholder="搜索"
                        value={store.getState().keyWords ? store.getState().keyWords : ''}
                        onChange={this.onChange}
                        onFocus={this.focus.bind(this)}
                        onClear={this.clear.bind(this)}
                        onCancel={this.searchCancel.bind(this)}
                        onSubmit={this.onSubmit.bind(this)}
                    />
                    {/* <input type="text" value={store.getState().keyWords} className={!store.getState().searchPage ? '' : 'active'} onFocus={this.focus.bind(this)} onInput={this.input.bind(this)} /> */}
                    {/* <i className={store.getState().keyWords ? '' : store.getState().focus}></i> */}
                </div>
                {/* <div className={!store.getState().searchPage ? 'cancle none' : 'cancle'} onClick={this.searchCancel.bind(this)}>取消</div> */}
            </div>
        )
    }
}
class Sliders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            data: ['', '', ''],
            initialHeight: 200,
        };
    }
    componentDidMount() {
        // simulate img loading
        var self = this;
        setTimeout(() => {
            self.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        return (
            <Carousel className="my-carousel"
                autoplay={true}
                infinite
                selectedIndex={0}
                swipeSpeed={35}
                dotStyle={{ 'background': '#fff' }}
                dotActiveStyle={{ 'background': '#75DFB1' }}
            /*{ beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)} }*/
            >
                {this.state.data.map(ii => (
                    <a href="http://www.baidu.com" key={ii}>
                        <img
                            src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}
                            alt="icon"
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    initialHeight: null,
                                });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }
}
class HomeProducts extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='homeList'>
                <div className="pro pro-goods">
                    <div className='pro-title'>
                        <p className='pro-maintitle'>实惠好货</p>
                        <p className='pro-subtitle'>巨划算，巨实惠</p>
                    </div>
                    <ul className="pro-list">
                        {
                            store.getState().newproduct.map((item, index) => {
                                if (index < 3) {
                                    return <li className="block" key={index} onClick={() => { window.location.href = '/user/mall/detail?id=' + item.InnerID }}>
                                        <div className="imgBox">
                                            <img src={item.ProPic} alt="" />
                                        </div>
                                        <p className="pro-des">{item.Introduction}</p>
                                        <div className="pro-payInfo">
                                            <p className="pro-money">￥{item.Price}</p>
                                            <p className="pro-discount">{item.Remark}</p>
                                        </div>
                                    </li>
                                }
                            })
                        }
                    </ul>
                </div>
                <div className="pro pro-new">
                    <div className='pro-title'>
                        <p className='pro-maintitle'>新品上架</p>
                        <p className='pro-subtitle'>你要的，在这里</p>
                    </div>
                    <ul className="pro-list">
                        {
                            store.getState().choice.map((item, index) => {
                                if (index < 3) {
                                    return <li className="block" key={index} onClick={() => { window.location.href = '/user/mall/detail?id=' + item.InnerID }}>
                                        <div className="imgBox">
                                            <img src={item.ProPic} alt="" />
                                        </div>
                                        <p className="pro-des">{item.Introduction}</p>
                                        <div className="pro-payInfo">
                                            <p className="pro-money">￥{item.Price}</p>
                                            <p className="pro-sendInfo">{item.Remark}</p>
                                        </div>
                                    </li>
                                }
                            })
                        }
                    </ul>
                </div>
                <div className="pro pro-recommend">
                    <div className='pro-title'>
                        <p className='pro-maintitle'>精品推荐</p>
                        <p className='pro-subtitle'>逸生活，逸优食</p>
                    </div>
                    <div className="pro-list clear">
                        {
                            store.getState().pricerite.map((item, index) => {
                                return <div className="pro-item" key={index} onClick={() => { window.location.href = '/user/mall/detail?id=' + item.InnerID }}>
                                    <div className="block">
                                        <div className="imgBox">
                                            <img src={item.ProPic} alt="" />
                                        </div>
                                        <div className="pro-payInfo">
                                            <p className="pro-money">￥{item.Price}</p>
                                            <p className="pro-sendInfo">{item.Remark}</p>
                                        </div>
                                        <p className="pro-des">{item.Introduction}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
class OtherProducts extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='otherList'>
                <div className="other-pic">
                    <img src={$db.imgUrl + store.getState().otherPros.img} alt="" />
                </div>
                <div className="pro pro-recommend">
                    <div className="pro-list clear">
                        {
                            store.getState().otherPros.product.map((item, index) => {
                                return <div className="pro-item" key={index} onClick={() => { window.location.href = '/user/mall/detail?id=' + item.InnerID }}>
                                    <div className="block">
                                        <div className="imgBox">
                                            <img src={item.ProPic} alt="" />
                                        </div>
                                        <div className="pro-payInfo">
                                            <p className="pro-money">￥{item.Price}</p>
                                            <p className="pro-sendInfo">{item.Remark}</p>
                                        </div>
                                        <p className="pro-des">{item.Introduction}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var self = this;
        var code = this.getQuery('code');
        var param = {};
        if (code) {
            param.code = code;
        }
        $db.getLoginUserInfo(param, function (data) {
            // alert(JSON.stringify(data.UserID));
            if (data && data.UserID) {
                localStorage.setItem('WXopenId', data.UserID);
            }
        }.bind(this))
        $db.getHomePage(null, function (data) {
            if (data && data.code && data.code != -100) {
                var nowData = data;
                if (nowData && nowData.result) {
                    if (nowData.result.choice && nowData.result.choice.length) {
                        nowData.result.choice.map(function (item, index) {
                            item.ProPic = $db.imgUrl + item.ProPic;
                        })
                    }
                    if (nowData.result.newproduct && nowData.result.newproduct.length) {
                        nowData.result.newproduct.map(function (item, index) {
                            item.ProPic = $db.imgUrl + item.ProPic;
                        })
                    }
                    if (nowData.result.pricerite && nowData.result.pricerite.length) {
                        nowData.result.pricerite.map(function (item, index) {
                            item.ProPic = $db.imgUrl + item.ProPic;
                        })
                    }
                    store.dispatch({
                        dataReady: true,
                        choice: nowData.result.choice,
                        newproduct: nowData.result.newproduct,
                        pricerite: nowData.result.pricerite,
                        type: 'ADD_DATA'
                    });
                    var tabTop = document.getElementsByClassName('am-tabs-bar')[0].offsetTop;
                    store.dispatch({
                        tabTop: tabTop,
                        type: 'TABTOP'
                    });
                    window.addEventListener('scroll', self.homeScroll.bind(this));
                }
            } else {
                Toast.info('获取产品信息失败,请稍后再试', 0, null, false);
            }
        })
        this.wxShare();
    }
    wxShare() {
        $db.getWeChatShareSDK(encodeURIComponent(window.location.href), function(data){
            if(data && data.code && data.code == 1 && data.result){
                wx.config({
                    debug: false,
                    appId: data.result.appid,
                    timestamp: data.result.timestamp,
                    nonceStr: data.result.nonceStr,
                    signature: data.result.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
            }
        })
        wx.ready(function(){
            //隐藏按钮
            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:favorite", //收藏
                    "menuItem:share:facebook",
                    "menuItem:share:QZone",
                    "menuItem:copyUrl",
                    "menuItem:openWithQQBrowser",
                    "menuItem:openWithSafari"
                ]
            });
            wx.onMenuShareAppMessage({
                title: '逸享优食',
                desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                link: window.location.href,
                imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    // alert('用户点击发送给朋友');
                },
                success: function (res) {
                    // alert('已分享');
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            // wx.error(function (res) {
            //     alert('wx.error: '+JSON.stringify(res));
            // });
        })
    }
    getQuery(key) {
        var url = window.location.href;
        var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
    homeScroll() {
        var tabTop = store.getState().tabTop;
        var winTop = window.pageYOffset;
        if (winTop >= tabTop) {
            document.getElementsByClassName('am-tabs-bar')[0].className = 'am-tabs-bar fixed';
        } else {
            document.getElementsByClassName('am-tabs-bar')[0].className = 'am-tabs-bar';
        }
    }
    callback(key) {
        console.log('onChange', key);
    }
    handleTabClick(key) {
        console.log('onTabClick', key);
        //切换到首页不需要调接口
        if (key != '首页') {
            $db.PostProductClass({ "ProType": key }, function (data) {
                if (data && data.code != -100) {
                    console.log(data.result);
                    if (data.result.product && data.result.product.length) {
                        data.result.product.map(function (item, index) {
                            item.ProPic = $db.imgUrl + item.ProPic;
                        })
                    }
                    store.dispatch({
                        products: data.result,
                        type: 'GETOTHERPRO'
                    });
                } else {
                    Toast.info('获取产品信息失败,请稍后再试', 0, null, true);
                }
            });
        }
    }
    render() {
        return (
            <div className={store.getState().dataReady ? '' : 'none'}>
                <div className={!store.getState().searchPage ? 'container' : 'container search-container'}>
                    <IndexSearch></IndexSearch>
                    <div className="top"></div>
                    <div className={store.getState().searchPage ? 'content none' : 'content'} id="homePage">
                        {/* <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick}> */}
                        <Tabs pageSize={5} swipeable={false} onTabClick={this.handleTabClick}>
                            <TabPane className="tab" tab="首页" key="首页">
                                <Sliders sliders={this.state}></Sliders>
                                <HomeProducts></HomeProducts>
                                {/* {this.renderContent()} */}
                            </TabPane>
                            <TabPane className="tab tab2" tab="优质水果" key="优质水果">
                                <OtherProducts></OtherProducts>
                                {/* {this.renderContent()} */}
                            </TabPane>
                            <TabPane className=" tab tab3" tab="新鲜蔬菜" key="新鲜蔬菜">
                                <OtherProducts></OtherProducts>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className={!store.getState().searchPage ? 'search none' : 'search'} id="searchPage">
                        <Search></Search>
                    </div>
                </div>
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(
        <Index></Index>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);

