const mysql = require('../db/dbase')

async function getRows(query) {
    return new Promise ((resolve, reject) => {
        mysql.query(query, (err, rows) => {
            if(err) {
                return reject(err)
            }
            resolve(rows)
        })
    })
}

module.exports = {
    getRows
}