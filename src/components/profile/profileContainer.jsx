import React, {useEffect} from "react";

import ProfleInfo from "./profleInfo";
import ProfilePosts from "./profilePosts";

import './profileContainer.scss'

import profileBg from '../../images/profile_bg.jpg'
import {compose} from "redux";
import withToAuthRedirect from "../../hoc/withToAuthRedirect";
import {connect} from "react-redux";
import Spinner from "../spinner/spinner";
import {getProfileThunk} from "../../redux/reducers/profileReducer";
import {withRouter} from "react-router-dom";

const ProfileContainer = ({loading, aboutMe, contacts,
                              fullName, lookingForAJob, lookingForAJobDescription, photos,
                              match, id, getProfileThunk}) => {

    const refreshProfile = () => {
        let userId = match.params.userId;
        if (!userId) userId = id;
        getProfileThunk(userId);
    }

    useEffect(() => {
        refreshProfile()
        debugger
    }, [match.params.userId])


    if (loading) return <Spinner/>

    return (
        <div className='profile'>
            <div className='profile__bg-img'>
                <img src={profileBg} alt="profileBg"/>
            </div>
            <ProfleInfo aboutMe={aboutMe}
                        contacts={contacts}
                        fullName={fullName}
                        lookingForAJob={lookingForAJob}
                        lookingForAJobDescription={lookingForAJobDescription}
                        photos={photos}
            />
            <ProfilePosts/>
        </div>
    )
}


const mapStateToProps = (
    {
        profileReducer: {loading, aboutMe, contacts, fullName, lookingForAJob, lookingForAJobDescription, photos},
        authReducer: {id}
    }
        ) => ({
    aboutMe,
    contacts,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    photos,
    loading,
    id
})



export default compose(
    withToAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getProfileThunk})
)(ProfileContainer);