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
import * as PropTypes from "prop-types";

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        const {match, id, getProfileThunk} = this.props
        let userId = match.params.userId;
        if (!userId) userId = id;
        getProfileThunk(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        const {
            loading, aboutMe, contacts,
            fullName, lookingForAJob, lookingForAJobDescription, photos
        } = this.props;

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
}

ProfileContainer.propTypes = {
    loading: PropTypes.any,
    match: PropTypes.any,
    id: PropTypes.any,
    getProfileThunk: PropTypes.any,
    aboutMe: PropTypes.any,
    contacts: PropTypes.any,
    fullName: PropTypes.any,
    lookingForAJob: PropTypes.any,
    lookingForAJobDescription: PropTypes.any,
    photos: PropTypes.any
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