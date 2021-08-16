import React from "react";
import {NavLink} from 'react-router-dom'
import './navbar.scss'

import Friend1 from '../../images/friend1.png';
import Friend2 from '../../images/friend2.png';
import Friend3 from '../../images/friend3.png';

const NavBar = () => {
    return (
        <div className="nav">
            <ul className="nav__list">
                <li className="nav__list-item">
                    <NavLink to={`/profile`} exact
                             activeClassName='nav__list-item_active'
                             className="nav__link"
                    >Profile</NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/dialogs" activeClassName='nav__list-item_active'
                             className="nav__link">Messages</NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/" className="nav__link">News</NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/" className="nav__link">Music</NavLink>
                </li>
                <li className="nav__list-item last">
                    <NavLink to="/users" className="nav__link">Find users</NavLink>
                </li>
                <li className="nav__list-item last">
                    <NavLink to="/" className="nav__link">Settings</NavLink>
                </li>
            </ul>
            <div className="nav__friends">
                <div className="nav__friends-title">Friends</div>
                <div className="nav__friends-row">
                    <div className="nav__friends-item">
                        <div className="nav__friends-icon"><img src={Friend1} alt=""/></div>
                        <div className="nav__friends-name">James</div>
                    </div>
                    <div className="nav__friends-item">
                        <div className="nav__friends-icon"><img src={Friend2} alt=""/></div>
                        <div className="nav__friends-name">Alan</div>
                    </div>
                    <div className="nav__friends-item">
                        <div className="nav__friends-icon"><img src={Friend3} alt=""/></div>
                        <div className="nav__friends-name">Marcus</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;