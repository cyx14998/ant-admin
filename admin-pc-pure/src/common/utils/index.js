/**
 * utils for app
 */


const uiWidthPx = 750;
const width = window.innerWidth;

// UI缩放比例
export function scale(uiElementPx) {
  return (uiElementPx * width / uiWidthPx) + 'px';
}