import {connect} from "react-redux";
import React from "react";
import {Redirect} from "react-router-dom";

const mapStateToProps = ({authReducer: {isAuth}}) => ({isAuth})


const withToAuthRedirect = (Wrapped) => {
    const RedirectToAuth = (props) => {
        if (!props.isAuth) return <Redirect to='/login'/>

        return (
            <Wrapped {...props}/>
        )
    }

    return connect(mapStateToProps)(RedirectToAuth);
}

export default withToAuthRedirect;