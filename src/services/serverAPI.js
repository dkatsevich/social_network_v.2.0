import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '8e2051ba-3198-4ba7-b7f9-6c6ee8e02777'
    }
});


const AuthAPI = {
    authMe() {
        return instance.get('/auth/me');
    },
    loginMe(data) {
        return instance.post('/auth/login', data);
    },
    logoutMe() {
        return instance.delete('/auth/login');
    }
}

const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url');
    }
}

export {
    AuthAPI,
    SecurityAPI,
}