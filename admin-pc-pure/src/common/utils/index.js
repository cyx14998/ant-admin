/**
 * utils for app
 */


const uiWidthPx = 750;
const width = window.innerWidth;

// UI缩放比例
export function scale(uiElementPx) {
  return (uiElementPx * width / uiWidthPx) + 'px';
}

export function setCookie(name,value) { 
    var Days = 7; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ value + ";expires=" + exp.toGMTString(); 
} 