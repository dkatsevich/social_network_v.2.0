import React from "react";
import ProfileAvatar from "./profileAvatar";
import ProfileStatus from "./profileStatus";
import ProfileInfo from "./profileInfo";

const ProfileUser = ({photos, status, postStatusThunk, isOwner}) => {
    return (
        <div className='profile-info'>
            <ProfileAvatar isOwner={isOwner} photos={photos}/>
            <ProfileInfo isOwner={isOwner}/>
            <ProfileStatus status={status} postStatusThunk={postStatusThunk} isOwner={isOwner}/>
        </div>
    )
}



export default ProfileUser