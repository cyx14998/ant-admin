import axios, {
    apiVer,
    getToken
} from './index';

/**
 * 三百二十三．	企业地图（首页）
 */
export function uCustomerListForMap({
    keyword = '',
}) {
    return axios.get('/uCustomerListForMap.uhtm?InterfaceVersion=' + apiVer, {
        params: {
            token: getToken(),
            keyword
        }
    });
}