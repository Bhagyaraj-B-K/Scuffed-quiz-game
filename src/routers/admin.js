const express = require('express')
const auth = require('../middleware/auth')
const db = require('../db/dbase')
const router = new express.Router()



//Admin Home page
router.get('/admin/home', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})

    res.render('adminMainPage')
})

router.get('/admin/add-question', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})

    res.render('adminAddQuestions')
})

router.get('/admin/get-user', auth, async(req, res) => {
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})

    res.render('adminGetUser')
})



//Add Questions
router.post('/admin/add-question', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})

    const sql = 'INSERT INTO `questions`( question, option1, option2, option3, option4, answer, level) VALUES (?,?,?,?,?,?,?)'

    db.query(sql, [ req.body.question, req.body.optiona, req.body.optionb, req.body.optionc, req.body.optiond, req.body.answer, req.body.level ], (err, result) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return res.json( { 'message' : 'Question already present!' } )
            }
            throw err;
        };
    })
    res.render('adminAddQuestions', {
        msg : 'Question Uploaded Successfully'
    })
})


//Get Users
router.get('/admin/get-users', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})

    const sql = 'select * from users'
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('adminGetUsers', {
            users: result
        })
    })
})


//Get users by username
router.post('/admin/get-user', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})

    const sql = 'select * from users where name like "%'+ req.body.username +'%"'
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('adminGetUsers', {
            users: result
        })
    })
})

router.post('/admin/update-user', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})
    
    let userObject={}

    if(req.body.name !== '' && req.body.name !== undefined) userObject.name=req.body.name

    if(req.body.age !== '' && req.body.age !== undefined) userObject.age=req.body.age

    if(req.body.phone !== '' && req.body.phone !== undefined) userObject.phone=req.body.phone

    if(req.body.gender !== '' && req.body.gender !== undefined) userObject.gender=req.body.gender

    if(req.body.xp !== '' && req.body.xp !== undefined) userObject.xp = req.body.xp;

    if(req.body.level !== '' && req.body.level !== undefined) userObject.level = req.body.level;

    if(req.body.is_blocked !== '' && req.body.is_blocked !== undefined) userObject.is_blocked = req.body.is_blocked;

    let sql=`update users set ${db.escape(userObject)} where user_id=${db.escape(req.body.user_id)}`

    db.query(sql,(err,result)=>{
        if(err) return res.send(err)
        res.redirect('/admin/get-users')
    })
})

router.post('/admin/update-user-profile', auth, async(req, res) => {
    //Checking Admin Authorities
    if (req.payLoad.user.is_admin === '0') return res.json({'error' : 'Unauthorized Admin'})
    
    const sql = 'select * from users where user_id=?'

    db.query(sql, [ req.body.user_id ], (err, result) => {
        res.render('editUserDetails', {
            user: result[0]
        })
    })
})

module.exports = router