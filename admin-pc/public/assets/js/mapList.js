webpackJsonp([42],{23:function(e,t,a){"use strict";a(13),a(288)},264:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(9),o=n(r),u=a(0),i=n(u),s=a(8),l=n(s),d=function(e){var t,a=e.prefixCls,n=void 0===a?"ant-input-group":a,r=e.className,u=void 0===r?"":r,s=(0,l.default)(n,(t={},(0,o.default)(t,n+"-lg","large"===e.size),(0,o.default)(t,n+"-sm","small"===e.size),(0,o.default)(t,n+"-compact",e.compact),t),u);return i.default.createElement("span",{className:s,style:e.style},e.children)};t.default=d,e.exports=t.default},265:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),o=n(r),u=a(4),i=n(u),s=a(7),l=n(s),d=a(6),f=n(d),c=a(5),p=n(c),m=a(0),g=n(m),h=a(8),v=n(h),y=a(74),b=n(y),I=a(15),k=n(I),C=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols)for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&(a[n[r]]=e[n[r]]);return a},N=function(e){function t(){(0,i.default)(this,t);var e=(0,f.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onSearch=function(){var t=e.props.onSearch;t&&t(e.input.refs.input.value),e.input.focus()},e}return(0,p.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.className,n=t.inputPrefixCls,r=t.prefixCls,u=t.suffix,i=C(t,["className","inputPrefixCls","prefixCls","suffix"]);delete i.onSearch;var s=g.default.createElement(k.default,{className:r+"-icon",onClick:this.onSearch,type:"search",key:"searchIcon"}),l=u?[u,s]:s;return g.default.createElement(b.default,(0,o.default)({onPressEnter:this.onSearch},i,{className:(0,v.default)(r,a),prefixCls:n,suffix:l,ref:function(t){return e.input=t}}))}}]),t}(g.default.Component);t.default=N,N.defaultProps={inputPrefixCls:"ant-input",prefixCls:"ant-input-search"},e.exports=t.default},266:function(e,t,a){"use strict";function n(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=e.getAttribute("id")||e.getAttribute("data-reactid")||e.getAttribute("name");if(t&&i[a])return i[a];var n=window.getComputedStyle(e),r=n.getPropertyValue("box-sizing")||n.getPropertyValue("-moz-box-sizing")||n.getPropertyValue("-webkit-box-sizing"),o=parseFloat(n.getPropertyValue("padding-bottom"))+parseFloat(n.getPropertyValue("padding-top")),s=parseFloat(n.getPropertyValue("border-bottom-width"))+parseFloat(n.getPropertyValue("border-top-width")),l=u.map(function(e){return e+":"+n.getPropertyValue(e)}).join(";"),d={sizingStyle:l,paddingSize:o,borderSize:s,boxSizing:r};return t&&a&&(i[a]=d),d}function r(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;s||(s=document.createElement("textarea"),document.body.appendChild(s)),e.getAttribute("wrap")?s.setAttribute("wrap",e.getAttribute("wrap")):s.removeAttribute("wrap");var u=n(e,t),i=u.paddingSize,l=u.borderSize,d=u.boxSizing,f=u.sizingStyle;s.setAttribute("style",f+";"+o),s.value=e.value||e.placeholder||"";var c=-1/0,p=1/0,m=s.scrollHeight,g=void 0;if("border-box"===d?m+=l:"content-box"===d&&(m-=i),null!==a||null!==r){s.value="";var h=s.scrollHeight-i;null!==a&&(c=h*a,"border-box"===d&&(c=c+i+l),m=Math.max(c,m)),null!==r&&(p=h*r,"border-box"===d&&(p=p+i+l),g=m>p?"":"hidden",m=Math.min(p,m))}return r||(g="hidden"),{height:m,minHeight:c,maxHeight:p,overflowY:g}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o="\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n",u=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"],i={},s=void 0;e.exports=t.default},288:function(e,t){},518:function(e,t,a){"use strict";function n(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function r(){return S.default.post("http://ythb.zhiqifu.com/MemberLogin.htm",{phoneNumber:"13800000000",password:"E10ADC3949BA59ABBE56E057F20F883E",InterfaceVersion:"20171016"})}function o(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.customerName,u=void 0===o?"":o,i=e.uniformSocialCreditCode,s=void 0===i?"":i,l=e.gridNumber,d=void 0===l?"":l;return S.default.get("/uCustomerList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),pageNumber:a,countPerPage:r,customerName:u,uniformSocialCreditCode:s,gridNumber:d}})}function u(e){return n(e),S.default.get("/uQiNiuTokenGet.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)()}})}function i(e){return n(e),S.default.get("/uProvinceList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)()}})}function s(e){var t=e.id;return S.default.get("/uCityList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),provinceId:t}})}function l(e){var t=e.id;return S.default.get("/uAreaList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),cityId:t}})}function d(e){var t=e.id;return S.default.get("/uTownList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),areaId:t}})}function f(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.keyword,u=void 0===o?"":o;return S.default.get("/uJurisdictionAscriptionList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),pageNumber:a,countPerPage:r,keyword:u}})}function c(){return S.default.get("/uCustomerDetail.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),tableId:(0,D.getCustomerId)()}})}function p(e){return S.default.get("/uCustomerAdd.uhtm?InterfaceVersion="+D.apiVer,{params:B({token:(0,D.getToken)()},e)})}function m(e){return S.default.get("/uCustomerUpdate.uhtm?InterfaceVersion="+D.apiVer,{params:B({token:(0,D.getToken)(),tableId:(0,D.getCustomerId)()},e)})}function g(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.keyword,u=void 0===o?"":o;return S.default.get("/uMainProductBaseInfoList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),pageNumber:a,countPerPage:r,keyword:u}})}function h(e){var t=e.theName,a=e.unitOfMeasurement,n=e.designAnnualOutput,r=e.realAnnualOutput;return S.default.get("/uMainProductBaseInfoAdd.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),theName:t,unitOfMeasurement:a,designAnnualOutput:n,realAnnualOutput:r}})}function v(e){var t=e.tableId,a=e.theName,n=e.unitOfMeasurement,r=e.designAnnualOutput,o=e.realAnnualOutput;return S.default.get("/uMainProductBaseInfoUpdate.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),tableId:t,theName:a,unitOfMeasurement:n,designAnnualOutput:r,realAnnualOutput:o}})}function y(e){return S.default.get("/uMainProductBaseInfoDelete.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),tableId:e}})}function b(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.keyword,u=void 0===o?"":o;return S.default.get("/uAuxiliaryMaterialsBaseInfoList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),pageNumber:a,countPerPage:r,keyword:u}})}function I(e){var t=e.theName,a=e.unitOfMeasurement,n=e.designConsumption;return S.default.get("/uAuxiliaryMaterialsBaseInfoAdd.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),theName:t,unitOfMeasurement:a,designConsumption:n}})}function k(e){var t=e.tableId,a=e.theName,n=e.unitOfMeasurement,r=e.designConsumption;return S.default.get("/uAuxiliaryMaterialsBaseInfoUpdate.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),tableId:t,theName:a,unitOfMeasurement:n,designConsumption:r}})}function C(e){return S.default.get("/uAuxiliaryMaterialsBaseInfoDelete.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),tableId:e}})}function N(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.keyword,u=void 0===o?"":o;return S.default.get("/uUseInfoEnergyList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),pageNumber:a,countPerPage:r,keyword:u}})}function x(e){var t=e.theContent,a=e.theType,n=e.annualConsumption;return S.default.get("/uUseInfoEnergyAdd.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),theContent:t,theType:a,annualConsumption:n}})}function P(e){var t=e.tableId,a=e.theContent,n=e.theType,r=e.annualConsumption;return S.default.get("/uUseInfoEnergyUpdate.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),tableId:t,theContent:a,theType:n,annualConsumption:r}})}function w(e){return S.default.get("/uUseInfoEnergyDelete.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),tableId:e}})}function V(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.keyword,u=void 0===o?"":o;return S.default.get("/uUseInfoWaterList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),pageNumber:a,countPerPage:r,keyword:u}})}function E(e){var t=e.consumption,a=(e.theType,e.annualConsumption);return S.default.get("/uUseInfoWaterAdd.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),consumption:t,annualConsumption:a}})}function A(e){var t=e.tableId,a=e.consumption,n=(e.theType,e.annualConsumption);return S.default.get("/uUseInfoWaterUpdate.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),tableId:t,consumption:a,annualConsumption:n}})}function M(e){return S.default.get("/uUseInfoWaterDelete.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),tableId:e}})}function T(e){var t=e.pageNumber,a=void 0===t?1:t,n=e.countPerPage,r=void 0===n?1e3:n,o=e.keyword,u=void 0===o?"":o;return S.default.get("/uMainProductionDeviceList.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),pageNumber:a,countPerPage:r,keyword:u}})}function O(e){var t=e.serialNumber,a=e.theName,n=e.theModel,r=e.theQuantity,o=e.processing,u=e.useEnergy,i=e.pollutantName,s=e.facilitiesName;return S.default.get("/uMainProductionDeviceAdd.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),serialNumber:t,theName:a,theModel:n,theQuantity:r,processing:o,useEnergy:u,pollutantName:i,facilitiesName:s}})}function _(e){var t=e.tableId,a=e.theName,n=e.serialNumber,r=e.theModel,o=e.theQuantity,u=e.processing,i=e.useEnergy,s=e.pollutantName,l=e.facilitiesName;return S.default.get("/uMainProductionDeviceUpdate.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),customerId:(0,D.getCustomerId)(),tableId:t,theName:a,serialNumber:n,theModel:r,theQuantity:o,processing:u,useEnergy:i,pollutantName:s,facilitiesName:l}})}function L(e){return S.default.get("/uMainProductionDeviceDelete.uhtm?InterfaceVersion="+D.apiVer,{params:{token:(0,D.getToken)(),tableId:e}})}Object.defineProperty(t,"__esModule",{value:!0});var B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.postTest=r,t.getCustomerList=o,t.getQiNiuToken=u,t.getProvinceList=i,t.getCityList=s,t.getAreaList=l,t.getTownList=d,t.getJurisdictionList=f,t.getCustomerInfoById=c,t.saveAddCustomerInfoById=p,t.saveEditCustomerInfoById=m,t.getProductBaseInfoList=g,t.getProductBaseInfoAdd=h,t.getProductBaseInfoEdit=v,t.getProductBaseInfoDelete=y,t.getMaterialBaseInfoList=b,t.getMaterialBaseInfoAdd=I,t.getMaterialBaseInfoEdit=k,t.getMaterialBaseInfoDelete=C,t.getEnergyBaseInfoList=N,t.getEnergyBaseInfoAdd=x,t.getEnergyBaseInfoEdit=P,t.getEnergyBaseInfoDelete=w,t.getWaterBaseInfoList=V,t.getWaterBaseInfoAdd=E,t.getWaterBaseInfoEdit=A,t.getWaterBaseInfoDelete=M,t.getDeviceBaseInfoList=T,t.getDeviceBaseInfoAdd=O,t.getDeviceBaseInfoEdit=_,t.getDeviceBaseInfoDelete=L;var D=a(252),S=function(e){return e&&e.__esModule?e:{default:e}}(D)},74:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return"undefined"===typeof e||null===e?"":e}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o),i=a(9),s=n(i),l=a(4),d=n(l),f=a(7),c=n(f),p=a(6),m=n(p),g=a(5),h=n(g),v=a(0),y=n(v),b=a(2),I=n(b),k=a(8),C=n(k),N=a(27),x=n(N),P=a(75),w=n(P),V=function(e){function t(){(0,d.default)(this,t);var e=(0,m.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.handleKeyDown=function(t){var a=e.props,n=a.onPressEnter,r=a.onKeyDown;13===t.keyCode&&n&&n(t),r&&r(t)},e}return(0,h.default)(t,e),(0,c.default)(t,[{key:"focus",value:function(){this.refs.input.focus()}},{key:"blur",value:function(){this.refs.input.blur()}},{key:"getInputClassName",value:function(){var e,t=this.props,a=t.prefixCls,n=t.size,r=t.disabled;return(0,C.default)(a,(e={},(0,s.default)(e,a+"-sm","small"===n),(0,s.default)(e,a+"-lg","large"===n),(0,s.default)(e,a+"-disabled",r),e))}},{key:"renderLabeledInput",value:function(e){var t,a=this.props;if(!a.addonBefore&&!a.addonAfter)return e;var n=a.prefixCls+"-group",r=n+"-addon",o=a.addonBefore?y.default.createElement("span",{className:r},a.addonBefore):null,u=a.addonAfter?y.default.createElement("span",{className:r},a.addonAfter):null,i=(0,C.default)(a.prefixCls+"-wrapper",(0,s.default)({},n,o||u)),l=(0,C.default)(a.prefixCls+"-group-wrapper",(t={},(0,s.default)(t,a.prefixCls+"-group-wrapper-sm","small"===a.size),(0,s.default)(t,a.prefixCls+"-group-wrapper-lg","large"===a.size),t));return o||u?y.default.createElement("span",{className:l,style:a.style},y.default.createElement("span",{className:i},o,(0,v.cloneElement)(e,{style:null}),u)):y.default.createElement("span",{className:i},o,e,u)}},{key:"renderLabeledIcon",value:function(e){var t=this.props;if(!("prefix"in t||"suffix"in t))return e;var a=t.prefix?y.default.createElement("span",{className:t.prefixCls+"-prefix"},t.prefix):null,n=t.suffix?y.default.createElement("span",{className:t.prefixCls+"-suffix"},t.suffix):null;return y.default.createElement("span",{className:(0,C.default)(t.className,t.prefixCls+"-affix-wrapper"),style:t.style},a,(0,v.cloneElement)(e,{style:null,className:this.getInputClassName()}),n)}},{key:"renderInput",value:function(){var e=this.props,t=e.value,a=e.className,n=(0,x.default)(this.props,["prefixCls","onPressEnter","addonBefore","addonAfter","prefix","suffix"]);return"value"in this.props&&(n.value=r(t),delete n.defaultValue),this.renderLabeledIcon(y.default.createElement("input",(0,u.default)({},n,{className:(0,C.default)(this.getInputClassName(),a),onKeyDown:this.handleKeyDown,ref:"input"})))}},{key:"render",value:function(){return"textarea"===this.props.type?y.default.createElement(w.default,(0,u.default)({},this.props,{ref:"input"})):this.renderLabeledInput(this.renderInput())}}]),t}(v.Component);t.default=V,V.defaultProps={prefixCls:"ant-input",type:"text",disabled:!1},V.propTypes={type:I.default.string,id:I.default.oneOfType([I.default.string,I.default.number]),size:I.default.oneOf(["small","default","large"]),maxLength:I.default.string,disabled:I.default.bool,value:I.default.any,defaultValue:I.default.any,className:I.default.string,addonBefore:I.default.node,addonAfter:I.default.node,prefixCls:I.default.string,autosize:I.default.oneOfType([I.default.bool,I.default.object]),onPressEnter:I.default.func,onKeyDown:I.default.func,onFocus:I.default.func,onBlur:I.default.func,prefix:I.default.node,suffix:I.default.node},e.exports=t.default},75:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return window.requestAnimationFrame?window.requestAnimationFrame(e):window.setTimeout(e,1)}function o(e){window.cancelAnimationFrame?window.cancelAnimationFrame(e):window.clearTimeout(e)}Object.defineProperty(t,"__esModule",{value:!0});var u=a(3),i=n(u),s=a(9),l=n(s),d=a(4),f=n(d),c=a(7),p=n(c),m=a(6),g=n(m),h=a(5),v=n(h),y=a(0),b=n(y),I=a(27),k=n(I),C=a(8),N=n(C),x=a(266),P=n(x),w=function(e){function t(){(0,f.default)(this,t);var e=(0,g.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={textareaStyles:null},e.resizeTextarea=function(){var t=e.props.autosize;if(t&&e.textAreaRef){var a=t?t.minRows:null,n=t?t.maxRows:null,r=(0,P.default)(e.textAreaRef,!1,a,n);e.setState({textareaStyles:r})}},e.handleTextareaChange=function(t){"value"in e.props||e.resizeTextarea();var a=e.props.onChange;a&&a(t)},e.handleKeyDown=function(t){var a=e.props,n=a.onPressEnter,r=a.onKeyDown;13===t.keyCode&&n&&n(t),r&&r(t)},e.saveTextAreaRef=function(t){e.textAreaRef=t},e}return(0,v.default)(t,e),(0,p.default)(t,[{key:"componentDidMount",value:function(){this.resizeTextarea()}},{key:"componentWillReceiveProps",value:function(e){this.props.value!==e.value&&(this.nextFrameActionId&&o(this.nextFrameActionId),this.nextFrameActionId=r(this.resizeTextarea))}},{key:"focus",value:function(){this.textAreaRef.focus()}},{key:"blur",value:function(){this.textAreaRef.blur()}},{key:"getTextAreaClassName",value:function(){var e=this.props,t=e.prefixCls,a=e.className,n=e.disabled;return(0,N.default)(t,a,(0,l.default)({},t+"-disabled",n))}},{key:"render",value:function(){var e=this.props,t=(0,k.default)(e,["prefixCls","onPressEnter","autosize"]),a=(0,i.default)({},e.style,this.state.textareaStyles);return"value"in t&&(t.value=t.value||""),b.default.createElement("textarea",(0,i.default)({},t,{className:this.getTextAreaClassName(),style:a,onKeyDown:this.handleKeyDown,onChange:this.handleTextareaChange,ref:this.saveTextAreaRef}))}}]),t}(b.default.Component);t.default=w,w.defaultProps={prefixCls:"ant-input"},e.exports=t.default},847:function(e,t,a){"use strict";function n(e){var t=e.keyword,a=void 0===t?"":t;return o.default.get("/uCustomerListForMap.uhtm?InterfaceVersion="+r.apiVer,{params:{token:(0,r.getToken)(),keyword:a}})}Object.defineProperty(t,"__esModule",{value:!0}),t.uCustomerListForMap=n;var r=a(252),o=function(e){return e&&e.__esModule?e:{default:e}}(r)},899:function(e,t){},96:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(74),o=n(r),u=a(264),i=n(u),s=a(265),l=n(s),d=a(75),f=n(d);o.default.Group=i.default,o.default.Search=l.default,o.default.TextArea=f.default,t.default=o.default,e.exports=t.default},977:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function u(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(96),s=n(i),l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a(23);var d=a(0),f=n(d),c=a(11),p=n(c);a(899);var m=(a(518),a(847)),g=a(34),h=s.default.Search,v=function(e){function t(e){r(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={loading:!0,customerList:[],keyword:""},a.getData=a.getData.bind(a),a}return u(t,e),l(t,[{key:"componentDidMount",value:function(){document.getElementById("mapList").style.height=window.innerHeight-100+"px",this.getData(),this.initMap()}},{key:"getData",value:function(e){var t=this;this.setState({loading:!0});var a=void 0!=e?e:this.state.keyword,n={keyword:a},r=this;(0,m.uCustomerListForMap)(n).then(function(e){if("success"!==e.data.result)return void(0,g.MyToast)(e.data.info||"接口失败");var a=[],n=e.data.customerList;n&&n.length?n.map(function(e){void 0!=e.longitude&&void 0!=e.latitude&&a.push({tableId:e.tableId,lat:e.latitude,lng:e.longitude,unitAddress:e.unitAddress,customerName:e.customerName,legalPersonPhone:e.legalPersonPhone,legalPersonName:e.legalPersonName,gridNumber:e.gridNumber,superviseLevel:e.superviseLevel})}):t.map.clearOverlays(),r.setState({loading:!1,customerList:n}),a.length&&r.addMarkers(a)}).catch(function(e){(0,g.MyToast)("接口失败"),t.setState({loading:!1})})}},{key:"initMap",value:function(){var e=this,t=new BMap.Map("mapList");e.map=t;var a=e.state.customer&&e.state.customer.lng?e.state.customer.lng:121.47,n=e.state.customer&&e.state.customer.lat?e.state.customer.lat:31.23;t.centerAndZoom(new BMap.Point(a,n),13),t.setCurrentCity("上海"),t.enableScrollWheelZoom(!0)}},{key:"addMarkers",value:function(e){var t=this;this.map.clearOverlays();for(var a=new Array,n=0;n<e.length;n++){var r,o,u,i,s,l,d;!function(n){r=e[n],o={position:new BMap.Point(r.lng,r.lat),offset:new BMap.Size(0,0)},u="",i=e[n].superviseLevel,u=0==i?"rgba(255, 165, 0, 0.9)":1==i?"rgba(255, 255, 0, 0.9)":2==i?"rgba(62, 196, 236, 0.9)":3==i?"rgba(158, 235, 106, 0.9)":"rgba(255, 165, 0, 0.9)",s='<div class="customerName-label '+u+'" title="点击查看企业详情">'+e[n].gridNumber+"--"+e[n].customerName+"</div>",l=new BMap.Label(s,o),l.setStyle({color:"#333",backgroundColor:u,borderRadius:"3px",padding:"5px 10px",border:"none",cursor:"pointer"}),t.map.addOverlay(l),d=t,a[n]=new BMap.Point(r.lng,r.lat),l.addEventListener("click",function(){d.goCustomerDetail(e[n])})}(n)}this.map.setViewport(a)}},{key:"searchCustomer",value:function(e){this.getData(e),this.setState({keyword:e})}},{key:"goCustomerDetail",value:function(e){parent.window.iframeHook.changePage({url:"customerEdit.html?id="+e.tableId,breadIncrement:"客户信息详情"})}},{key:"render",value:function(){var e=this;return f.default.createElement("div",{className:"yzy-page"},f.default.createElement("div",{className:"yzy-list-wrap"},f.default.createElement("div",{className:"mapList"},f.default.createElement("div",{className:"map",id:"mapList"}),f.default.createElement("div",{className:"customerList"},f.default.createElement("div",{className:"search"},f.default.createElement(h,{className:"search-input",placeholder:"请输入关键词",onSearch:this.searchCustomer.bind(this)})),f.default.createElement("div",{className:"list"},this.state.customerList&&this.state.customerList.length>0&&this.state.customerList.map(function(t,a){var n="",r=t.superviseLevel;return n=0==r?"orange":1==r?"yellow":2==r?"blue":3==r?"green":"orange",f.default.createElement("div",{className:"item",key:a,title:"点击查看企业详情",onClick:e.goCustomerDetail.bind(e,t)},f.default.createElement("div",{className:"superviseLevel "},"监管等级： ",f.default.createElement("span",{className:n})),f.default.createElement("div",{className:"top clear"},f.default.createElement("div",{className:"gridNum"},"网格号：",t.gridNumber),f.default.createElement("div",{className:"name"},"企业名称：",t.customerName)),f.default.createElement("div",{className:"mid"},"企业地址： ",t.unitAddress),f.default.createElement("div",{className:"bot clear"},f.default.createElement("div",{className:"contack"},"联系人：",t.legalPersonName),f.default.createElement("div",{className:"phone"},"联系电话：",t.legalPersonPhone)))}))))))}}]),t}(f.default.Component);p.default.render(f.default.createElement(v,null),document.getElementById("root"))}},[977]);