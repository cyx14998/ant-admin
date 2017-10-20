import axios from './index';


export function login({phoneNumber,password}) {
    return axios.get('/MemberLogin.htm?InterfaceVersion=20171016&', {
        params: {
            phoneNumber,
            password
        }
    });
}