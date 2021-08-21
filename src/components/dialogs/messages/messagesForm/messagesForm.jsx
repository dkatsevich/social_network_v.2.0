import React from 'react';
import './messagesForm.scss';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../validation/validation";
import {Input} from "../../../formControls/formControls";

const maxLength150 = maxLengthCreator(150)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="message-form">
            <Field type="text"
                   component={Input}
                   name={'message'}
                   className="message-form__input"
                   placeholder='Type here...'
                   validate={[required, maxLength150]}
            />
            <button className="message-form__button">Send Message</button>
        </form>
    )
}


export default reduxForm({form: 'messageForm'})(AddMessageForm);