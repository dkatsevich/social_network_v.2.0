import {NavLink} from "react-router-dom";
import icon from '../../images/user-icon.jpg';

const User = ({id, photos, name, status, followed, followUser, unFollowUser, disable}) => {
    return (
        <div className="user">
            <div className="user__wrapper">
                <NavLink to={`/profile/${id}`} className="user__img">
                    <img src={photos.large || icon} alt=""/>
                </NavLink>
                <div className="user__content">
                    <div className="user__name">{name}</div>
                    <div className="user__status">{status || 'Status is not defined)'}</div>
                </div>
            </div>
            {followed
                ? <button disabled={disable} onClick={() => unFollowUser(id)} className="user__btn">{disable ? 'Wait a second' : 'UnFollow'}</button>
                : <button disabled={disable} onClick={() => followUser(id)} className="user__btn">{disable ? 'Wait a second' : 'Follow'}</button>
            }
        </div>
    )
}

export default User