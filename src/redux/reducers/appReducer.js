import {authMeThunk} from "./authReducer";

const initialState = {
    initialized: false
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const initializedSuccess = () => ({type: "INITIALIZED_SUCCESS"})

const initializeApp = () => async (dispatch) => {
    const promise = dispatch(authMeThunk());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer;

export {
    initializeApp,
}