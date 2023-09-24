const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')

const generateAuth = (user) => {
    const token = jwt.sign( { user } , config.SECRET_KEY)
    //res.cookie('auth_token', token)
    return token
}

module.exports = generateAuth;