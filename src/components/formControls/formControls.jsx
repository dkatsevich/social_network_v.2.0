import React from "react";

const withErrorMessage = (Wrapped) => (props) => {
    const {input, meta: {touched, error}, ...nextProps} = props
    const errorHappened = error && touched;
    return (
        <div className={errorHappened ? '_validate_error' : ''}>
            <Wrapped {...input} {...nextProps}/>
            {errorHappened && <span className='_error'>{error}</span>}
        </div>
    )
}

const Input = withErrorMessage('input');
const Textarea = withErrorMessage('textarea');


export {
    Input,
    Textarea,
}