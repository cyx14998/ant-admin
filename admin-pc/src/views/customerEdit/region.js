/**
 * 区域联动选择
 */

const province = {
  '001': "beijing",
  '002': 'Jiangsu'
}

const city = {
  '002': {
    '002-002': 'Suzhou'
  }
}

//省
const provinceData = ['Zhejiang', 'Jiangsu'];
// 市
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo'],
    Jiangsu: ['Nanjing', 'Suzhou'],
};
// 区
const countyData = {
    Zhejiang: {
      Hangzhou: ['xihu', 'xixi']
    },
    Jiangsu: {
      Suzhou: ['gusu']
    }
}
// 镇
const townData = {
    Zhejiang: {
      Hangzhou: {
        xihu: ['chengguanzhen']
      }
    },
    Jiangsu: {
      Suzhou: {
        gusu: ['guanqian']
      }
    }
}

