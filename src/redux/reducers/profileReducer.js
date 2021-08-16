import {ProfileAPI} from "../../services/serverAPI";

const initialState = {
    loading: true
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_LOADING_STATUS":
            return {
                ...state,
                loading: action.loading
            }
        case "PUT_PROFILE_DATA":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

const putProfileData = (payload) => ({type: "PUT_PROFILE_DATA", payload})
const changeLoadingStatus = (loading) => ({type: "CHANGE_LOADING_STATUS", loading})
// const deleteUserData = () => ({type: "DELETE_USER_DATA"});


const getProfileThunk = (id) => async (dispatch) => {
    dispatch(changeLoadingStatus(true))
    const res = await ProfileAPI.getProfile(id);
    if (res.status === 200) {
        dispatch(putProfileData(res.data))
    }
    dispatch(changeLoadingStatus(false))
}

// const getCaptchaThunk = () => async (dispatch) => {
//     const res = await SecurityAPI.getCaptchaUrl();
//     dispatch(putCaptchaUrl({captchaUrl: res.data.url}))
// }
//
// const logoutMeThunk = () => async (dispatch) => {
//     const res = await AuthAPI.logoutMe();
//     if (res.data.resultCode === 0) {
//         dispatch(authMeThunk())
//     }
// }

export default profileReducer;

export {
    getProfileThunk,
}