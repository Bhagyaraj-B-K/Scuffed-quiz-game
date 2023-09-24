const validator = require('validator')

const validation =(email = null, password = null, phone = null, res) => {
    if (email !== null && !validator.isEmail(email)) {
        return res.json('Email is invalid')
    }

    if (password !== null && password.toLowerCase().includes('password')) {
        return res.json('password cannot contain the string password!')
    }

    if (password !== null && !validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        return res.json('password not strong enough!')
    }

    if (phone !== null && !validator.isMobilePhone(phone)) {
        return res.json('Phone is invalid')
    }
}

module.exports = validation