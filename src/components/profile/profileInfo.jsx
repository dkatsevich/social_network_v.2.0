import {connect} from "react-redux";
import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../formControls/formControls";
import {required} from "../../validation/validation";
import {postProfileInfo} from "../../redux/reducers/profileReducer";

const ProfileInfo = ({isOwner, profile, postProfileInfo}) => {
    const [editMode, setEditMode] = useState(false);

    const postInfo = (data) => {
        postProfileInfo(data).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className="profile-info__content">
            {!editMode && <ProfileInfoContent profile={profile}/>}
            {(!editMode && isOwner) && <button className='profile-info__btn' onClick={() => setEditMode(true)}>Edit</button>}
            {editMode && <ProfileInfoReduxForm initialValues={profile} onSubmit={postInfo} profile={profile}/>}
        </div>
    )
}

const ProfileInfoContent = ({profile: {fullName, aboutMe, contacts}}) => {
    return (
        <>
            <div className="profile-info__name">{fullName}</div>
            <div className="profile-info__aboutme">{aboutMe}</div>
            <ul className="profile-info__contacts">
                {Object.keys(contacts).map(item => {
                    if (contacts[item]) {
                        return <li key={item} className="profile-info__contact">{item}: {contacts[item]}</li>
                    }
                })}
            </ul>
        </>
    )
}

const ProfileInfoForm = ({profile: {contacts}, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit} className='profile-info__form'>
            <div className="profile-info__input">
                <span>Name:</span>
                <Field
                    name='fullName'
                    component={Input}
                    type='text'
                    placeholder='Full name...'
                    validate={[required]}
                />
            </div>
            <div className="profile-info__input">
                <span>About me:</span>
                <Field
                    name='aboutMe'
                    component={Input}
                    type='text'
                    placeholder='About me...'
                    validate={[required]}
                />
            </div>
            <div className="profile-info__input">
                <span>Looking for a job:</span>
                <Field
                    name='lookingForAJob'
                    component={Input}
                    type='checkbox'
                />
            </div>
            <div className="profile-info__input">
                <span>Job description:</span>
                <Field
                    name='lookingForAJobDescription'
                    component={Input}
                    type='text'
                    placeholder='Job description...'
                    validate={[required]}
                />
            </div>
            {Object.keys(contacts).map(item => {
                return (
                    <div key={item} className="profile-info__input">
                        <span>{item}:</span>
                        <Field
                            name={`contacts.${item}`}
                            component={Input}
                            type='text'
                            placeholder={`Your ${item}...`}
                        />
                    </div>
                )
            })}
            <button className='profile-info__btn'>Save</button>
            {error && <div className='profile-info__error'><span>{error}</span></div>}
        </form>
    )
}

const ProfileInfoReduxForm = reduxForm({
    form: 'profile-info'
})(ProfileInfoForm);


const mapStateToProps = ({profileReducer: {profile, profile: {fullName, aboutMe, contacts}}}) => ({
    profile,
    fullName,
    aboutMe,
    contacts,
})

export default connect(mapStateToProps, {postProfileInfo})(ProfileInfo);