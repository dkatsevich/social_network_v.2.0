import React from "react";

import ProfleInfo from "./profleInfo";
import ProfilePosts from "./profilePosts";

import './profileContainer.scss'

import profileBg from '../../images/profile_bg.jpg'
import {compose} from "redux";
import withToAuthRedirect from "../../hoc/withToAuthRedirect";

const ProfileContainer = () => {
    return (
        <div className='profile'>
            <div className='profile__bg-img'>
                <img src={profileBg} alt="profileBg"/>
            </div>
            <ProfleInfo/>
            <ProfilePosts/>
        </div>
    )
}

export default compose(
    withToAuthRedirect
)(ProfileContainer);