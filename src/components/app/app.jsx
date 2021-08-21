import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './app.scss'

import NavBar from "../navbar/navbar";
import Header from "../header/header";
import ProfileContainer from "../profile/profileContainer";
import Login from "../login/login";
import {connect, Provider} from "react-redux";
import store from "../../redux/store";
import {compose} from "redux";
import {initializeApp} from "../../redux/reducers/appReducer";
import Spinner from "../spinner/spinner";
import Users from "../users/users";
import Dialogs from "../dialogs/dialogs";



class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        const {initialized} = this.props;

        if (!initialized) return <Spinner/>

        return (
            <div className='wrapper'>
                <Header/>
                <NavBar/>
                <div className='content'>
                    <Route exact path='/' render={() => <div className='main'>Welcome to My Social Network <span>Soon this page will be developed)</span></div>}/>
                    <Route path='/profile/:userId?' component={ProfileContainer}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/dialogs' component={Dialogs}/>
                    <Route path='/users' component={Users}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({appReducer: {initialized}}) => ({initialized})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp})
)(App)


const SocialNetworkApp = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppContainer/>
            </Router>
        </Provider>
    )
}

export default SocialNetworkApp;