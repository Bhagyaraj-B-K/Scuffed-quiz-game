const mysql = require('mysql')
const config = require('../../config/config.json')

const db = mysql.createConnection({
    host : config.HOST,
    user : config.USER,
    password : config.PASSWORD,
    database : config.DATABASE,
    port : config.DBPORT
})

db.connect((err) => {
    if(err) { 
        throw err
    }
    console.log('MySql Connected...')
})

module.exports = db