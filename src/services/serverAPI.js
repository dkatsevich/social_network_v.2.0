import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '8e2051ba-3198-4ba7-b7f9-6c6ee8e02777'
    }
});

const ProfileAPI = {
    getProfile(id) {
        return instance.get(`/profile/${id}`);
    },
    putProfile(data) {
        return instance.put(`/profile`, data);
    },
    getStatus(id) {
        return instance.get(`/profile/status/${id}`);
    },
    putStatus(status) {
        return instance.put(`/profile/status`, status);
    },
    putPhoto(img) {
        const formData = new FormData();
        formData.append('image', img);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

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

const UsersAPI = {
    getUsers(page, pageSize) {
        return instance.get(`/users?page=${page}&count=${pageSize}`);
    },
    followUser(id) {
        return instance.post(`/follow/${id}`);
    },
    unFollowUser(id) {
        return instance.delete(`/follow/${id}`);
    },
}

export {
    ProfileAPI,
    AuthAPI,
    SecurityAPI,
    UsersAPI,
}