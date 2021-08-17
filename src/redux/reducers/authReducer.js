import {AuthAPI, SecurityAPI} from "../../services/serverAPI";
import {stopSubmit} from "redux-form";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PUT_USER_DATA":
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case "DELETE_USER_DATA":
            return {
                ...state,
                id: null,
                email: null,
                login: null,
                isAuth: false
            }
        case "PUT_CAPTCHA_URL":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

const putUserData = (payload) => ({type: "PUT_USER_DATA", payload})
const putCaptchaUrl = (payload) => ({type: "PUT_CAPTCHA_URL", payload})
const deleteUserData = () => ({type: "DELETE_USER_DATA"});

const authMeThunk = () => async (dispatch) => {
    const res = await AuthAPI.authMe();
    if (res.data.resultCode === 0) {
        const result = {...res.data.data}
        dispatch(putUserData(result))
    } else {
        dispatch(deleteUserData());
    }
}

const loginMeThunk = (data) => async (dispatch) => {
    const res = await AuthAPI.loginMe(data);
    if (res.data.resultCode === 0) {
        dispatch(authMeThunk())
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaThunk());
        }
        dispatch(stopSubmit('login', {_error: res.data.messages[0]}))
    }
}

const getCaptchaThunk = () => async (dispatch) => {
    const res = await SecurityAPI.getCaptchaUrl();
    dispatch(putCaptchaUrl({captchaUrl: res.data.url}))
}

const logoutMeThunk = () => async (dispatch) => {
    const res = await AuthAPI.logoutMe();
    if (res.data.resultCode === 0) {
        dispatch(authMeThunk())
    }
}

export default authReducer;

export {
    authMeThunk,
    loginMeThunk,
    logoutMeThunk,
}