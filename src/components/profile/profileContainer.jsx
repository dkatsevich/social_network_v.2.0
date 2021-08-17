import React, {useEffect} from "react";

import ProfleInfo from "./profleInfo";
import ProfilePosts from "./profilePosts";

import './profileContainer.scss'

import profileBg from '../../images/profile_bg.jpg'
import {compose} from "redux";
import withToAuthRedirect from "../../hoc/withToAuthRedirect";
import {connect} from "react-redux";
import Spinner from "../spinner/spinner";
import {getProfileThunk, getStatusThunk, postStatusThunk} from "../../redux/reducers/profileReducer";
import {withRouter} from "react-router-dom";

const ProfileContainer =
    ({
         loading, aboutMe, contacts,
         fullName, lookingForAJob, lookingForAJobDescription, photos,
         match, id, getProfileThunk, getStatusThunk, postStatusThunk, status
    }) => {
        let userId = match.params.userId;

        const refreshProfile = () => {
            if (!userId) userId = id;
            getStatusThunk(userId);
            getProfileThunk(userId);
        }

        useEffect(() => {
            refreshProfile()
        }, [userId])

        if (loading) return <Spinner/>

        const isOwner = match.params.userId === undefined;

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
                            status={status}
                            postStatusThunk={postStatusThunk}
                            isOwner={isOwner}
                />
                <ProfilePosts/>
            </div>
        )
    }


const mapStateToProps = (
    {
        profileReducer: {
            loading,
            profile: {aboutMe, contacts, fullName, lookingForAJob, lookingForAJobDescription, photos},
            status
        },
        authReducer: {id}
    }
) => ({
    aboutMe,
    status,
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
    connect(mapStateToProps, {getProfileThunk, getStatusThunk, postStatusThunk})
)(ProfileContainer);