import avatar from './../../images/profile_bg.jpg'


const ProfilePosts = () => {
    return (
        <div className='profile-posts'>
            <div className="profile-posts__title">My posts</div>
            <form className="profile-posts__form">
                <input placeholder='Your news...' className="profile-posts__input"/>
                <button className="profile-posts__btn">Post</button>
            </form>
            <div className="profile-posts__wrapper">
                <div className="profile-post">
                    <div className="profile-post__img">
                        <img src={avatar} alt=""/>
                    </div>
                    <div className="profile-post__content">Why nobody love we? yet...</div>
                </div>

                <div className="profile-post">
                    <div className="profile-post__img">
                        <img src={avatar} alt=""/>
                    </div>
                    <div className="profile-post__content">Why nobody love we? yet...</div>
                </div><div className="profile-post">
                    <div className="profile-post__img">
                        <img src={avatar} alt=""/>
                    </div>
                    <div className="profile-post__content">Why nobody love we? yet...</div>
                </div><div className="profile-post">
                    <div className="profile-post__img">
                        <img src={avatar} alt=""/>
                    </div>
                    <div className="profile-post__content">Why nobody love we? yet...</div>
                </div>
                <div className="profile-post">
                    <div className="profile-post__img">
                        <img src={avatar} alt=""/>
                    </div>
                    <div className="profile-post__content">Why nobody love we? yet...</div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePosts;