import React from 'react';
import logo from '../../images/logo.png';
import logoDescr from '../../images/logo-descr.svg';
import './header.scss'
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {logoutMeThunk} from "../../redux/reducers/authReducer";

const Header = ({login, isAuth, id, logoutMeThunk}) => {
    return (
        <header className="header">
            <Link to='/' className="header__logo">
                <img src={logo} alt=""/>
            </Link>
            <img className="header__descr" src={logoDescr} alt=""/>
            <div className="header__auth">
                {isAuth ?
                    (
                        <div className='header__logged'>
                            <NavLink to={`/profile/${id}`}>{login}</NavLink>
                            <button onClick={logoutMeThunk}>Log out</button>
                        </div>
                    )
                    :
                    <NavLink to='/login' className="header__unlogged">Please login</NavLink>}
            </div>
        </header>
    )
}

const mapStateToProps = ({authReducer: {login, isAuth, id}}) => ({
    login,
    id,
    isAuth
})

export default connect(mapStateToProps, {logoutMeThunk})(Header);