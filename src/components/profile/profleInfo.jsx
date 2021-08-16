import avatar from './../../images/profile_bg.jpg'

const ProfleInfo = () => {
    return (
        <div className='profile-info'>
            <div className="profile-info__avatar">
                <img src={avatar} alt=""/>
            </div>
            <div className="profile-info__content">
                <div className="profile-info__name">Samurai Dimych</div>
                <div className="profile-info__aboutme">I am cool man</div>
                <ul className="profile-info__contacts">
                    <li className="profile-info__contact">facebook: facebook.com</li>
                    <li className="profile-info__contact">facebook: facebook.com</li>
                    <li className="profile-info__contact">facebook: facebook.com</li>
                    <li className="profile-info__contact">facebook: facebook.com</li>
                    <li className="profile-info__contact">facebook: facebook.com</li>
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