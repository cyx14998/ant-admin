webpackJsonp([43],{24:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(263),i=r(n),o=a(262),l=r(o);i.default.Group=l.default,t.default=i.default,e.exports=t.default},26:function(e,t,a){"use strict";a(13),a(287)},262:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),i=r(n),o=a(9),l=r(o),u=a(0),f=r(u),s=a(8),d=r(s),c=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols)for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&(a[r[n]]=e[r[n]]);return a},p=function(e){var t=e.prefixCls,a=void 0===t?"ant-btn-group":t,r=e.size,n=e.className,o=c(e,["prefixCls","size","className"]),u="";switch(r){case"large":u="lg";break;case"small":u="sm"}var s=(0,d.default)(a,(0,l.default)({},a+"-"+u,u),n);return f.default.createElement("div",(0,i.default)({},o,{className:s}))};t.default=p,e.exports=t.default},263:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e){return"string"===typeof e}function i(e,t){if(null!=e){var a=t?" ":"";return"string"!==typeof e&&"number"!==typeof e&&n(e.type)&&j(e.props.children)?v.default.cloneElement(e,{},e.props.children.split("").join(a)):"string"===typeof e?(j(e)&&(e=e.split("").join(a)),v.default.createElement("span",null,e)):e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),l=r(o),u=a(9),f=r(u),s=a(4),d=r(s),c=a(7),p=r(c),m=a(6),g=r(m),h=a(5),y=r(h),b=a(0),v=r(b),k=a(2),O=r(k),I=a(8),C=r(I),P=a(27),_=r(P),N=a(15),T=r(N),w=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols)for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&(a[r[n]]=e[r[n]]);return a},x=/^[\u4e00-\u9fa5]{2}$/,j=x.test.bind(x),M=function(e){function t(e){(0,d.default)(this,t);var a=(0,g.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleClick=function(e){a.setState({clicked:!0}),clearTimeout(a.timeout),a.timeout=setTimeout(function(){return a.setState({clicked:!1})},500);var t=a.props.onClick;t&&t(e)},a.state={loading:e.loading,clicked:!1},a}return(0,y.default)(t,e),(0,p.default)(t,[{key:"componentWillReceiveProps",value:function(e){var t=this,a=this.props.loading,r=e.loading;a&&clearTimeout(this.delayTimeout),"boolean"!==typeof r&&r&&r.delay?this.delayTimeout=setTimeout(function(){return t.setState({loading:r})},r.delay):this.setState({loading:r})}},{key:"componentWillUnmount",value:function(){this.timeout&&clearTimeout(this.timeout),this.delayTimeout&&clearTimeout(this.delayTimeout)}},{key:"render",value:function(){var e,t=this.props,a=t.type,r=t.shape,n=t.size,o=t.className,u=t.htmlType,s=t.children,d=t.icon,c=t.prefixCls,p=t.ghost,m=w(t,["type","shape","size","className","htmlType","children","icon","prefixCls","ghost"]),g=this.state,h=g.loading,y=g.clicked,b="";switch(n){case"large":b="lg";break;case"small":b="sm"}var k=(0,C.default)(c,o,(e={},(0,f.default)(e,c+"-"+a,a),(0,f.default)(e,c+"-"+r,r),(0,f.default)(e,c+"-"+b,b),(0,f.default)(e,c+"-icon-only",!s&&d),(0,f.default)(e,c+"-loading",h),(0,f.default)(e,c+"-clicked",y),(0,f.default)(e,c+"-background-ghost",p),e)),O=h?"loading":d,I=O?v.default.createElement(T.default,{type:O}):null,P=1===v.default.Children.count(s)&&(!O||"loading"===O),N=v.default.Children.map(s,function(e){return i(e,P)});return v.default.createElement("button",(0,l.default)({},(0,_.default)(m,["loading"]),{type:u||"button",className:k,onClick:this.handleClick}),I,N)}}]),t}(v.default.Component);t.default=M,M.__ANT_BUTTON=!0,M.defaultProps={prefixCls:"ant-btn",loading:!1,ghost:!1},M.propTypes={type:O.default.string,shape:O.default.oneOf(["circle","circle-outline"]),size:O.default.oneOf(["large","default","small"]),htmlType:O.default.oneOf(["submit","button","reset"]),onClick:O.default.func,loading:O.default.oneOfType([O.default.bool,O.default.object]),className:O.default.string,icon:O.default.string},e.exports=t.default},287:function(e,t){},605:function(e,t,a){"use strict";function r(e){var t=e.pageNumber,a=void 0===t?1:t,r=e.countPerPage,n=void 0===r?1e3:r,i=e.keyword,o=void 0===i?"":i;return p.default.get("/uMemberList.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),pageNumber:a,countPerPage:n,keyword:o}})}function n(e){var t=e.staffId;return p.default.get("/uMemberDetail.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),tableId:t}})}function i(e){var t=e.phoneNumber,a=e.password,r=e.email,n=e.sex,i=e.dateOfBirth,o=e.realName,l=e.headImagePath,u=e.address,f=e.idCard,s=e.isActivationLogin,d=e.departmentId,m=e.roleId;return p.default.get("/uMemberAdd.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),phoneNumber:t,password:a,email:r,sex:n,dateOfBirth:i,realName:o,headImagePath:l,address:u,idCard:f,isActivationLogin:s,departmentId:d,roleId:m}})}function o(e){var t=e.staffId,a=e.phoneNumber,r=e.password,n=e.email,i=e.sex,o=e.dateOfBirth,l=e.realName,u=e.headImagePath,f=e.address,s=e.idCard,d=e.isActivationLogin,m=e.departmentId,g=e.roleId;return p.default.get("/uMemberUpdate.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),tableId:t,phoneNumber:a,password:r,email:n,sex:i,dateOfBirth:o,realName:l,headImagePath:u,address:f,idCard:s,isActivationLogin:d,departmentId:m,roleId:g}})}function l(e){var t=e.staffId,a=e.pageNumber,r=void 0===a?1:a,n=e.countPerPage,i=void 0===n?1e3:n;return p.default.get("/uMemberCertificationList.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),staffId:t,pageNumber:r,countPerPage:i}})}function u(e){var t=e.tableId;return p.default.get("/uMemberCertificationDetail.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),tableId:t}})}function f(e){var t=e.staffId,a=e.theName,r=e.filePath,n=e.expiryDatetime,i=e.certificationUnit,o=e.serialNumber,l=e.professionalCategory,u=e.repetitionCycle,f=e.theRemarks;return p.default.get("/uMemberCertificationAdd.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),staffId:t,theName:a,filePath:r,expiryDatetime:n,certificationUnit:i,serialNumber:o,professionalCategory:l,repetitionCycle:u,theRemarks:f}})}function s(e){var t=e.tableId,a=e.theName,r=e.filePath,n=e.expiryDatetime,i=e.certificationUnit,o=e.serialNumber,l=e.professionalCategory,u=e.repetitionCycle,f=e.theRemarks;return p.default.get("/uMemberCertificationUpdate.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),tableId:t,theName:a,filePath:r,expiryDatetime:n,certificationUnit:i,serialNumber:o,professionalCategory:l,repetitionCycle:u,theRemarks:f}})}function d(e){var t=e.tableId;return p.default.get("/uMemberCertificationDelete.uhtm?InterfaceVersion="+c.apiVer,{params:{token:(0,c.getToken)(),tableId:t}})}Object.defineProperty(t,"__esModule",{value:!0}),t.getStaffList=r,t.getStaffDetails=n,t.getStaffListAdd=i,t.getStaffListUpdate=o,t.getStarffCertList=l,t.getStaffCertDetails=u,t.getStarffCertListAdd=f,t.getStarffCertListUpdate=s,t.getStarffCertListDelete=d;var c=a(252),p=function(e){return e&&e.__esModule?e:{default:e}}(c)},879:function(e,t){},935:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=a(24),u=r(l),f=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}();a(26);var s=a(0),d=r(s),c=a(11),p=r(c),m=(a(605),a(34));a(879);var g=function(e){function t(e){n(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={staffId:(0,m.getLocQueryByLabel)("staffId")||""},a}return o(t,e),f(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return d.default.createElement("div",{className:"yzy-page"},d.default.createElement("div",{className:"yzy-list-wrap"},d.default.createElement("div",{className:"approval-add"},d.default.createElement(u.default,{type:"primary"},"新增"))))}}]),t}(s.Component);p.default.render(d.default.createElement(g,null),document.getElementById("root"))}},[935]);