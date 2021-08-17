import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {postPhotoThunk} from "../../redux/reducers/profileReducer";

const ProfleInfo = ({aboutMe, contacts, fullName,
                        lookingForAJob, lookingForAJobDescription, photos,
                        status, postStatusThunk, isOwner}) => {
    return (
        <div className='profile-info'>
            <ProvileAvatarContainer photos={photos}/>
            <div className="profile-info__content">
                <div className="profile-info__name">{fullName}</div>
                <div className="profile-info__aboutme">{aboutMe}</div>
                <ul className="profile-info__contacts">
                    {Object.keys(contacts).map(item => {
                        if (contacts[item]) {
                            return <li key={item} className="profile-info__contact">{item}: {contacts[item]}</li>
                        }
                    })}
                </ul>
            </div>
            <ProfileStatus status={status} postStatusThunk={postStatusThunk} isOwner={isOwner}/>
        </div>
    )
}


const ProfileAvatar = ({photos, postPhotoThunk}) => {
    const onSendPhoto = (e) => {
        postPhotoThunk(e.target.files[0]);
        e.target.value = '';
    }

    return (
        <div className="profile-info__avatar">
            <img src={photos.large} alt=""/>
            <label>
                Change photo
                <input onChange={onSendPhoto} type="file"/>
            </label>
        </div>
    )
}

const ProvileAvatarContainer = connect(null, {postPhotoThunk})(ProfileAvatar)


const ProfileStatus = ({status, postStatusThunk, isOwner}) => {
    const [editMode, setEditMode] = useState(false);
    const [localStatus, setLocalStatus] = useState(status)

    const setStatus = () => {
        postStatusThunk(localStatus);
        setEditMode(false);
    }

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    return (
        <div className="profile-info__status">
            <div>Status:</div>
            {!editMode &&
                <>
                    <span>{status}</span>
                    {isOwner && <button onClick={() => setEditMode(true)}>Edit</button>}
                </>
            }
            {editMode &&
                <>
                    <input type="text" value={localStatus} onChange={(e) => setLocalStatus(e.target.value)}/>
                    <button onClick={setStatus}>Save</button>
                </>
            }

        </div>
    )
}

export default ProfleInfo