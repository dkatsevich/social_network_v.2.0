import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from "./reducers/authReducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./reducers/appReducer";
import {reducer as formReducer} from "redux-form";


const reducers = combineReducers({
    authReducer,
    appReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;