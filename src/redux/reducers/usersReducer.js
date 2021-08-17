import {UsersAPI} from "../../services/serverAPI";

const initialState = {
    users: [],
    pageSize: 5,
    pageNumber: 1,
    totalUserCount: null,
    loading: false,
    disableUsers: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERS_LOADING":
            return {
                ...state,
                loading: action.loading
            }
        case "PUT_USERS":
            return {
                ...state,
                users: action.users
            }
        case "PUT_TOTAL_COUNT":
            return {
                ...state,
                totalUserCount: action.count
            }
        case "TOGGLE_FOLLOW":
            return {
                ...state,
                users: [
                    ...state.users.map(user => {
                        if (user.id === action.id) {
                            return {...user, followed: !user.followed}
                        }
                        return user;
                    })
                ]
            }
        case "TOGGLE_DISABLE":
            if (action.value) {
                return {
                    ...state,
                    disableUsers: state.users.filter(item => item.id === action.id)
                }
            } else {
                return {
                    ...state,
                    disableUsers: state.disableUsers.filter(item => item.id !== action.id)
                }
            }
        default:
            return state
    }
}

const changeLoadingUsers = (loading) => ({type: "USERS_LOADING", loading})
const putUsers = (users) => ({type: "PUT_USERS", users});
const putTotalCount = (count) => ({type: "PUT_TOTAL_COUNT", count});
const toggleFollow = (id) => ({type: "TOGGLE_FOLLOW", id});
const toggleDisable = (id, value) => ({type: "TOGGLE_DISABLE", id, value});


const getUsersThunk = (page, pageSize) => async (dispatch) => {
    dispatch(changeLoadingUsers(true))
    const res = await UsersAPI.getUsers(page, pageSize);
    if (res.data.error === null) {
        dispatch(putUsers(res.data.items))
        dispatch(putTotalCount(res.data.totalCount))
    }
    dispatch(changeLoadingUsers(false))
}

const followUser = (id) => async (dispatch) => {
    dispatch(toggleDisable(id, true))
    const res = await UsersAPI.followUser(id);
    if (res.data.resultCode === 0) {
        dispatch(toggleFollow(id));
    }
    dispatch(toggleDisable(id, false))
}

const unFollowUser = (id) => async (dispatch) => {
    dispatch(toggleDisable(id, true))
    const res = await UsersAPI.unFollowUser(id);
    if (res.data.resultCode === 0) {
        dispatch(toggleFollow(id));
    }
    dispatch(toggleDisable(id, false))
}


export default usersReducer;

export {
    followUser,
    unFollowUser,
    getUsersThunk
}