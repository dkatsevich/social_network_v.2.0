import avatar from './../../images/profile_bg.jpg'

const ProfleInfo = ({aboutMe, contacts, fullName, lookingForAJob, lookingForAJobDescription, photos}) => {
    return (
        <div className='profile-info'>
            <div className="profile-info__avatar">
                <img src={photos.large} alt=""/>
            </div>
            <div className="profile-info__content">
                <div className="profile-info__name">{fullName}</div>
                <div className="profile-info__aboutme">{aboutMe}</div>
                <ul className="profile-info__contacts">
                    {Object.keys(contacts).map(item => {
                        return <li className="profile-info__contact">{item}: {contacts[item]}</li>
                    })}
                </ul>
            </div>
            <div className="profile-info__status">
                <div>Status: </div>
                <span>I am cool status</span>
            </div>
        </div>
    )
}

export default ProfleInfo