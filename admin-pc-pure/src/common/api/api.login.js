import axios, { apiVer } from './index';


export function login({phoneNumber,password}) {
    return axios.get('/MemberLogin.htm?InterfaceVersion='+ apiVer, {
        params: {
            phoneNumber,
            password
        }
    });
}