import React from "react";
import {Field, reduxForm} from "redux-form";
import './login.scss'
import {loginMeThunk} from "../../redux/reducers/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {maxLengthCreator, required} from "../../validation/validation";
import {Input} from "../formControls/formControls";

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

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, captchaUrl, error}) => {
    return (
        <form onSubmit={handleSubmit} className="login__form">
            <div className="login__input">
                <Field
                    name='email'
                    component={Input}
                    type='text'
                    placeholder='Your email...'
                    validate={[required, maxLength30]}
                />
            </div>
            <div className="login__input">
                <Field
                    name='password'
                    component={Input}
                    type='text'
                    placeholder='Your password...'
                    validate={[required, maxLength30]}
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
            {error && <div className="login__error">
                <span>{error}</span>
            </div>}
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = ({authReducer: {captchaUrl, isAuth}}) => ({captchaUrl, isAuth})

export default connect(mapStateToProps, {loginMeThunk})(Login)