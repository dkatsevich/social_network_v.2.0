import {useEffect, useState} from "react";

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


export default ProfileStatus