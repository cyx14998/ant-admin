import React from 'react';
import ReactDOM from 'react-dom';
import store from '../../models/home';
import { List } from 'antd-mobile';
import $db from '../../common/dal.js';
import './search.less';
const Item = List.Item;
import fruit from '../../assets/product.png';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    clearSearchHistory(){
        localStorage.clear('searchHistory');
        store.dispatch({
            'type': 'CLEARHISTORY'
        })
    }
    historyClick(value){
        var keyword = value || store.getState().keyWords;
        if(keyword && keyword.trim()){
            var nowKey = keyword.trim();
            $db.PostProductQuery({"keyword": nowKey}, function (data) {
                if (data && data.code != -100) {
                    var searchArr = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
                    var searchObj = {};
                    searchObj.title = nowKey;
                    if(searchArr.length){
                        var flag = 0;
                        searchArr.map(function(item, index){
                            if(item.title == nowKey){
                                flag = 1;
                            }
                        })
                        if(flag == 0){
                            searchArr.push(searchObj);
                        }
                    }else{
                        searchArr.push(searchObj);
                    }
                    localStorage.setItem('searchHistory',JSON.stringify(searchArr));
                    if(data && data.result) {
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
        }else{
            store.dispatch({
                keyWords: keyword,
                searchPro: [],
                type: 'SEARCHINPUT'
            });
        }
    }
    render() {
        return (
            <div className="search-content">
                <div className="search-history">
                    <div className= {store.getState().history && store.getState().history.length ? "top": "none"}>
                        <div className="label">历史搜索</div>
                        <p className="clear-history" onClick= {this.clearSearchHistory.bind(this)}>清除</p>
                    </div>
                    <div className="history-list clear">
                         {
                            store.getState().history.map((item,index)=>{
                                if(index < 10){
                                    return <div className="history-item" key={index} onClick={this.historyClick.bind(this, item.title)}>
                                            {item.title}
                                        </div>
                                }
                            })
                        }  
                    </div>
                </div>
                <div className="search-result">
                    <div className={store.getState().searchPro && store.getState().searchPro.length ? "search-list clear" : 'none'}>
                        {
                            store.getState().searchPro.map((item , index)=>{
                                return  <div className="search-item" key={index} onClick={()=> window.location.href='detail?id='+item.InnerID}>
                                            <div className="imgBox">
                                                <img src={$db.imgUrl + item.ProPic} alt=""/>
                                            </div>
                                            <div className="pro-payInfo">
                                                <p className="pro-money">￥{item.Price}</p>
                                                <p className="pro-sendInfo">{item.Remark}</p>
                                            </div>
                                            <p className="pro-des">{item.Introduction}</p>
                                        </div>
                            })
                        }
                    </div>
                    <div className={ (!store.getState().searchPro || !store.getState().searchPro.length) ? 'noSearch-result' : 'none'}>
                        暂无结果
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Search;
