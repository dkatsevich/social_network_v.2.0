import {connect} from "react-redux";
import {postPhotoThunk} from "../../redux/reducers/profileReducer";

const ProfileAvatar = ({photos, postPhotoThunk, isOwner}) => {
    const onSendPhoto = (e) => {
        postPhotoThunk(e.target.files[0]);
        e.target.value = '';
    }

    return (
        <div className="profile-info__avatar">
            <img src={photos.large} alt=""/>
            {isOwner && <label>
                Change photo
                <input onChange={onSendPhoto} type="file"/>
            </label>}
        </div>
    )
}

export default connect(null, {postPhotoThunk})(ProfileAvatar)