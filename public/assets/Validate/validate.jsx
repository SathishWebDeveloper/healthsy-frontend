export const emailValidator = email => {
    const emailValidate = /^[^\s@]+@[^\s@]+$/;
    return emailValidate.test(email)
}

// export const passwordValidator = password => {
//     const passwordValidate = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
//     return passwordValidate.test(password)
// }

export const mobileValidator = mobile => {
    const mobileValidate = /^[6,7,8,9][0-9]{0,9}/;
    return mobileValidate.test(mobile)
}