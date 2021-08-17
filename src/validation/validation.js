const required = value => (value ? undefined : `The field is required`)
const maxLengthCreator = (max) => (value) => {
    return value && value.length > max ? `Field must be ${max} characters or less` : undefined
}


export {
    required,
    maxLengthCreator
}