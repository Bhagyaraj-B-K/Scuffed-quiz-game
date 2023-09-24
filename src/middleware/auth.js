const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')

const auth = async (req, res, next) => {
    const token = req.cookies['auth_token']

    if (token == null) {
        return res.sendStatus(401)
    }
    // console.log('In auth middleware')
    jwt.verify(token, config.SECRET_KEY , (err, user) => {
        if(err) return res.sendStatus(403)
        req.payLoad = user
        next()
    })

}

module.exports = auth