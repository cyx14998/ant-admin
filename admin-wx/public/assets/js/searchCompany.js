webpackJsonp([8],{160:function(e,t){},279:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function c(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=0;t<y;t++){var n=e*y+t,o="Section "+n;E.push(o),b[o]=o}E=[].concat(l(E))}var h=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(0),d=o(u),f=n(9),p=o(f),g=n(19);n(160);var m=[{img:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",title:"Meet hotel",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",title:"McDonald's invites you",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",title:"Eat the week",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",title:"Meet hotel",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",title:"McDonald's invites you",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",title:"Eat the week",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",title:"Meet hotel",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",title:"McDonald's invites you",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",title:"Eat the week",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",title:"Meet hotel",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",title:"McDonald's invites you",des:"不是所有的兼职汪都需要风吹日晒"},{img:"https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",title:"Eat the week",des:"不是所有的兼职汪都需要风吹日晒"}],y=12,v=0,b={},E=[],w=function(e){function t(e){i(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),o=new g.ListView.DataSource({rowHasChanged:function(e,t){return e!==t},sectionHeaderHasChanged:function(e,t){return e!==t}});return n.state={dataSource:o,isLoading:!1,refreshing:!1,height:0,value:"",hasMore:!0},n}return r(t,e),h(t,[{key:"componentDidMount",value:function(){}},{key:"onEndReached",value:function(e){(this.state.isLoading||this.state.hasMore)&&(console.log("reach end",e),this.setState({isLoading:!0}),this.getData())}},{key:"onRefresh",value:function(){this.statusClear({isLoading:!1,refreshing:!1,hasMore:!0,value:this.state.value,height:0}),this.getData()}},{key:"getData",value:function(){var e=this;if(3==v)return void this.setState({isLoading:!1,hasMore:!1});setTimeout(function(){var t=document.documentElement.clientHeight-p.default.findDOMNode(e.lv).parentNode.offsetTop;c(v++),e.setState({dataSource:e.state.dataSource.cloneWithRows(b,E),isLoading:!1,refreshing:!1,hasMore:!0,height:t})},60)}},{key:"searchSubmit",value:function(e){this.statusClear({isLoading:!1,refreshing:!1,value:e,height:0}),this.getData()}},{key:"historyClick",value:function(e){console.log(e),this.getData()}},{key:"onChange",value:function(e){console.log(e),this.setState({value:e})}},{key:"onClear",value:function(){this.statusClear({isLoading:!1,refreshing:!1,hasMore:!0,height:0})}},{key:"statusClear",value:function(e){this.setState(e),E=[],v=0}},{key:"onCancel",value:function(){console.log("取消应返回页面")}},{key:"render",value:function(){var e=this,t=m.length-1,n=function(e,n,o){var i,s=m[t--];return t<0&&(t=m.length-1),d.default.createElement("div",{key:o,style:{padding:"0 15px"}},d.default.createElement("div",{style:(i={display:"-webkit-box"},a(i,"display","flex"),a(i,"padding","15px 0"),i)},d.default.createElement("img",{style:{height:"64px",marginRight:"15px"},src:s.img,alt:""}),d.default.createElement("div",{style:{lineHeight:1}},d.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold"}},s.des),d.default.createElement("div",null,d.default.createElement("span",{style:{fontSize:"30px",color:"#FF6E27"}},"35"),"¥ ",o))))};return d.default.createElement("div",{className:"yzy-page"},d.default.createElement(g.MobileSearch,{showCancelButton:!0,historyKey:"company-history",historyClick:this.historyClick.bind(this),onSubmit:this.searchSubmit.bind(this),onChange:this.onChange.bind(this),onCancel:this.onCancel.bind(this),onClear:this.onClear.bind(this),placeholder:"搜索公司名称、统一社会信用代码"}),d.default.createElement("div",{className:"result-list"},d.default.createElement(g.ListView,{ref:function(t){return e.lv=t},dataSource:this.state.dataSource,renderFooter:function(){return d.default.createElement("div",{style:{padding:20,textAlign:"center"}},e.state.hasMore?"加载中...":"加载完成")},renderRow:n,style:{height:this.state.height,overflow:"auto"},pageSize:4,onScroll:function(){console.log("scroll")},scrollRenderAheadDistance:500,onEndReached:this.onEndReached.bind(this),onEndReachedThreshold:10,pullToRefresh:d.default.createElement(g.PullToRefresh,{refreshing:this.state.refreshing,onRefresh:this.onRefresh.bind(this)})})))}}]),t}(d.default.Component);p.default.render(d.default.createElement(w,null),document.getElementById("root"))}},[279]);