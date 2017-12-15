
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Table,
    Input,
} from 'antd';
const Search = Input.Search;
import {
    getCustomerList
} from '../../common/api/api.customer';

import {
    uCustomerListForMap
} from '../../common/api/api.mapList';
import {
    MyToast
} from '../../common/utils';

const columns = [
    {
        title: '企业名称',
        dataIndex: 'customerName',
        key: 'customerName',
    }, {
        title: '单位地址',
        dataIndex: 'unitAddress',
        key: 'unitAddress',
    }
];

//列表页面
class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            customerList: [],
            keyword: '',  // 搜索关键词
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        document.getElementById('mapList').style.height = window.innerHeight - 100 + 'px';
        this.getData();
        this.initMap();
    }

    getData(value) {
        this.setState({
            loading: true
        });
        var keyword = value != undefined ? value : this.state.keyword;
        var params = {
            keyword
        };
        var self = this;
        //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
        uCustomerListForMap(params).then(res => {
            // console.log('getCustomerList ---', res)
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var json_data = [];
            var customerList = res.data.customerList;
            if (customerList && customerList.length) {
                customerList.map(item => {
                    if (item.longitude != undefined && item.latitude != undefined) {
                        json_data.push({
                            tableId: item.tableId,
                            lat: item.latitude,
                            lng: item.longitude,
                            unitAddress: item.unitAddress,
                            customerName: item.customerName,
                            legalPersonPhone: item.legalPersonPhone,
                            legalPersonName: item.legalPersonName,
                            gridNumber: item.gridNumber,
                            superviseLevel: item.superviseLevel
                        });
                    }
                })
            } else {
                // 无结果时清楚点
                this.map.clearOverlays();
            }
            self.setState({
                loading: false,
                customerList,
            });
            if (json_data.length) {
                self.addMarkers(json_data);
            }
        }).catch(err => {
            MyToast('接口失败');
            this.setState({
                loading: false
            });
        })
    }

    initMap() {
        var self = this;
        // 百度地图API功能
        var map = new BMap.Map("mapList");    // 创建Map实例
        self.map = map;
        var lng = self.state.customer && self.state.customer.lng ? self.state.customer.lng : 121.47;
        var lat = self.state.customer && self.state.customer.lat ? self.state.customer.lat : 31.23;

        map.centerAndZoom(new BMap.Point(lng, lat), 13);  // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // function showInfo(e) {
        //     self.addMarker(e.point.lng, e.point.lat);
        // }
        // map.addEventListener("click", showInfo);
    }

    addMarkers(jsonData) {
        this.map.clearOverlays();
        var pointArray = new Array();
        for (let i = 0; i < jsonData.length; i++) {
            var item = jsonData[i];
            var opts = {
                position: new BMap.Point(item.lng, item.lat),    // 指定文本标注所在的地理位置
                offset: new BMap.Size(0, 0)    //设置文本偏移量
            }
            var bgColor = '';
            var superviseLevel = jsonData[i].superviseLevel;
            if (superviseLevel == 0) {
                bgColor = 'rgba(255, 165, 0, 0.9)';
            } else if (superviseLevel == 1) {
                bgColor = 'rgba(255, 255, 0, 0.9)';
            } else if (superviseLevel == 2) {
                bgColor = 'rgba(62, 196, 236, 0.9)';
            } else if (superviseLevel == 3) {
                bgColor = 'rgba(158, 235, 106, 0.9)';
            } else {
                bgColor = 'rgba(255, 165, 0, 0.9)';
            }
            var content = '<div class="customerName-label ' + bgColor + '" title="点击查看企业详情">' + jsonData[i].gridNumber + '--' + jsonData[i].customerName + '</div>';
            var label = new BMap.Label(content, opts); // 创建点
            label.setStyle({
                color: "#333",
                backgroundColor: bgColor,
                borderRadius: '3px',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer'
            });
            this.map.addOverlay(label);    //增加点
            var self = this;
            pointArray[i] = new BMap.Point(item.lng, item.lat);
            // var labelTxt = item.name + (item.address ? ': ' + item.address : '');
            // var label = new BMap.Label(labelTxt, { offset: new BMap.Size(20, -10) });
            // marker.setLabel(label);

            label.addEventListener("click", function () {
                self.goCustomerDetail(jsonData[i]);
                // var opts = {
                //     width: 350,     // 信息窗口宽度
                //     height: 100,     // 信息窗口高度
                //     title: '网格号： ' + jsonData[i].gridNumber + '  &nbsp;&nbsp; ' + '企业名称：' + jsonData[i].customerName, // 信息窗口标题
                // }
                // var content = '<div style="margin-top: 5px;">企业地址： ' + jsonData[i].unitAddress + '</div>'
                //     + '<div style="margin-top: 5px;">联系人：' + jsonData[i].legalPersonName + '  &nbsp;&nbsp; ' + '联系电话： ' + jsonData[i].legalPersonPhone + '</div>'
                // var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
                // this.map.openInfoWindow(infoWindow, pointArray[i]); //开启信息窗口
            });
        }
        //让所有点在视野范围内
        this.map.setViewport(pointArray);
    }

    searchCustomer(value) {
        this.getData(value);
        this.setState({
            keyword: value
        });
    }

    goCustomerDetail(record) {
        parent.window.iframeHook.changePage({
            url: 'customerEdit.html?id=' + record.tableId,
            breadIncrement: '客户信息详情'
        });
    }
    render() {

        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap">
                    {/* */}
                    <div className="mapList">
                        <div className="map" id="mapList">

                        </div>
                        <div className="customerList">
                            <div className="search">
                                <Search
                                    className="search-input"
                                    placeholder="请输入关键词"
                                    onSearch={this.searchCustomer.bind(this)}
                                />
                            </div>
                            <div className="list">
                                {
                                    this.state.customerList && this.state.customerList.length > 0 &&
                                    this.state.customerList.map((item, index) => {
                                        var bgColor = '';
                                        var superviseLevel = item.superviseLevel;
                                        if (superviseLevel == 0) {
                                            bgColor = 'orange';
                                        } else if (superviseLevel == 1) {
                                            bgColor = 'yellow';
                                        } else if (superviseLevel == 2) {
                                            bgColor = 'blue';
                                        } else if (superviseLevel == 3) {
                                            bgColor = 'green';
                                        } else {
                                            bgColor = 'orange';
                                        }
                                        return <div className="item" key={index} title="点击查看企业详情" onClick={this.goCustomerDetail.bind(this, item)}>
                                            <div className="superviseLevel ">
                                                监管等级： <span className={bgColor}></span>
                                            </div>
                                            <div className="top clear">
                                                <div className="gridNum">
                                                    网格号：{item.gridNumber}
                                                </div>
                                                <div className="name">
                                                    企业名称：{item.customerName}
                                                </div>
                                            </div>
                                            <div className="mid">
                                                企业地址： {item.unitAddress}
                                            </div>
                                            <div className="bot clear">
                                                <div className="contack">
                                                    联系人：{item.legalPersonName}
                                                </div>
                                                <div className="phone">
                                                    联系电话：{item.legalPersonPhone}
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<CustomerList />, document.getElementById('root'));
