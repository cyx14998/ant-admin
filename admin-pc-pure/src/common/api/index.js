/************************
 * 接口
 ************************/
import axios from 'axios';

axios.defaults.baseURL = 'http://ythb.zhiqifu.com';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



export default axios;










