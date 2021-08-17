import {ProfileAPI} from "../../services/serverAPI";
import {stopSubmit} from "redux-form";

const initialState = {
    loading: true,
    profile: {},
    status: null
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
                profile: {...action.payload},
            }
        case "PUT_STATUS":
            return {
                ...state,
                status: action.status,
            }
        case "PUT_PHOTO_URL":
            return {
                ...state,
                profile: {...state.profile, photos: {...action.payload}}
            }
        default:
            return state
    }
}

const putProfileData = (payload) => ({type: "PUT_PROFILE_DATA", payload})
const changeLoadingStatus = (loading) => ({type: "CHANGE_LOADING_STATUS", loading})
const putStatus = (status) => ({type: "PUT_STATUS", status});
const putPhotoUrl = (payload) => ({type: "PUT_PHOTO_URL", payload});


const getProfileThunk = (id) => async (dispatch) => {
    dispatch(changeLoadingStatus(true))
    const res = await ProfileAPI.getProfile(id);
    if (res.status === 200) {
        dispatch(putProfileData(res.data))
    }
    dispatch(changeLoadingStatus(false))
}

const postProfileInfo = (data) => async (dispatch, getState) => {
    try {
        const myId = getState().authReducer.id;
        const res = await ProfileAPI.putProfile(data);
        if (res.data.resultCode === 0) {
            dispatch(getProfileThunk(myId))
        } else {
            dispatch(stopSubmit('profile-info', {_error: res.data.messages[0]}))
        }
    } catch (e) {
        dispatch(stopSubmit('profile-info', {_error: 'Something goes wrong, please refresh page)'}))
        return Promise.reject(e)
    }
}


const getStatusThunk = (id) => async (dispatch) => {
    const res = await ProfileAPI.getStatus(id);
    if (res.status === 200) {
        dispatch(putStatus(res.data))
    }
}

const postStatusThunk = (status) => async (dispatch) => {
    const res = await ProfileAPI.putStatus(status);
    if (res.status === 200) {
        dispatch(putStatus(res.data))
    }
}

const postPhotoThunk = (photo) => async (dispatch) => {
    const res = await ProfileAPI.putPhoto(photo);
    if (res.data.resultCode === 0) {
        dispatch(putPhotoUrl(res.data.data.photos))
    }
}


export default profileReducer;

export {
    getStatusThunk,
    getProfileThunk,
    postStatusThunk,
    postPhotoThunk,
    postProfileInfo,
}