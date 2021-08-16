import React from "react";
import {Field, reduxForm} from "redux-form";
import './login.scss'
import {loginMeThunk} from "../../redux/reducers/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Login = ({loginMeThunk, captchaUrl, isAuth}) => {
    const onSubmitLogin = (formData) => {
        loginMeThunk(formData)
    }

    if (isAuth) return <Redirect to='/profile'/>

    return (
        <div className='login'>
            <div className="login__title">Login Page</div>
            <LoginReduxForm onSubmit={onSubmitLogin} captchaUrl={captchaUrl}/>
        </div>
    )
}

const LoginForm = ({handleSubmit, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit} className="login__form">
            <div className="login__input">
                <Field
                    name='email'
                    component='input'
                    type='text'
                    placeholder='Your email...'
                />
            </div>
            <div className="login__input">
                <Field
                    name='password'
                    component='input'
                    type='text'
                    placeholder='Your password...'
                />
            </div>
            <label className="login__checkbox">
                <Field
                    name='rememberMe'
                    component='input'
                    type='checkbox'
                    placeholder='Your email...'
                />
                <span>Remember me</span>
            </label>
            {captchaUrl && <div>
                <img src={captchaUrl} alt=""/>
                <div className="login__input">
                    <Field
                        name='captcha'
                        component='input'
                        type='text'
                        placeholder='Write captcha here...'
                    />
                </div>
            </div>}
            <div className="login__btn">
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = ({authReducer: {captchaUrl, isAuth}}) => ({captchaUrl, isAuth})

export default connect(mapStateToProps, {loginMeThunk})(Login)