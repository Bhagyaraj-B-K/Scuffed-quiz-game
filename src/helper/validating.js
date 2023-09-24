const validator = require('validator')

const validateEmail = (email) => {
    if (email !== null && !validator.isEmail(email)) {
        return 'Email is invalid'
    }
}

const validatePassword = (password) => {
    if (password !== null && password.toLowerCase().includes('password')) {
        return 'password cannot contain the string password!'
    }

    if (password !== null && !validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        return 'password not strong enough!'
    }
}

const validatePhone = (phone) => {
    if (phone !== null && !validator.isMobilePhone(phone)) {
        return 'Phone is invalid'
    }
}

module.exports = {
    validateEmail,
    validatePassword,
    validatePhone
}