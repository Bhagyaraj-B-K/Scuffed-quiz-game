const express = require('express')
const auth = require('../middleware/auth')
const db = require('../db/dbase')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const generateAuth = require('../helper/generateAuth')   
const validation = require('../helper/validation')
const path = require('path')
const { getRows } = require('../helper/db')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/forgot-password', (req, res) => {
    res.render('forgotPassword')
})

router.get('/user/search-player', (req, res) => {
    res.render('searchPlayer')
})


router.get('/user/home', auth, (req, res) => {

    db.query('select * from users where user_id=?', [ req.payLoad.user.user_id ], (err, result) => {
        res.cookie('auth_token', generateAuth(result[0]))

        if(result[0].is_blocked === '1') return res.json('Account Blocked')      //Blocked User or Not

        res.render('mainPage', {
            username: result[0].name,
            level: result[0].level,
            xp: result[0].xp,
            admin: result[0].is_admin
        })
    })

})


//Registeration Route
router.post('/user/register', async(req, res) => {
    let sql = 'INSERT INTO users(name, age, email_id, password, phone, gender) VALUES(?,?,?,?,?,?)'
    
    const password = req.body.password

    if(validation(req.body.email, password, req.body.pno, res)) return

    const hashPass = await bcrypt.hash(password, 8)

    db.query(sql, [ req.body.name, req.body.age, req.body.email, hashPass, req.body.pno, req.body.gender ], (err, result, fields) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return res.json('Email already taken')
            }
            throw err;
        };
        console.log(result)
        res.json('Registeration Complete')
    })
})


//Login Route
router.post('/user/login', async(req, res) => {
    let sql = 'select * from users where email_id=?'


    if(validation(req.body.email, null , null , res)) return

    db.query(sql, [ req.body.email ],async (err, result, fields) => {
        if(err) throw err;

        if(result.length === 0) return res.json('Invalid Credentials') 

        const isMatch = await bcrypt.compare(req.body.password, result[0].password)
        if (!isMatch) {
            return res.json('Unable to Login')
        }

        
        if(result[0].is_blocked === '1') return res.json('Account Blocked')      //Blocked User or Not
        
            //Correct Credentials and Access to data provided
        const token = generateAuth(result[0])
        res.cookie('auth_token', token)
        
        
        res.redirect('/user/home')
    })
})


//Profile Route
router.get('/user/profile', auth, async (req, res) => {
    if(req.payLoad.user.is_blocked === '1') return res.json('Account Blocked')      //Blocked User or Not
    console.log(req.payLoad)
    // res.send(req.body.user)
    res.render('profile', {
        username: req.payLoad.user.name,
        age: req.payLoad.user.age,
        email: req.payLoad.user.email_id,
        gender: req.payLoad.user.gender,
        pno: req.payLoad.user.phone,
        level: req.payLoad.user.level,
        xp: req.payLoad.user.xp
    })
})


//Update Profile Route
router.post('/user/update-profile', auth, async (req, res) => {
    if ( !await bcrypt.compare(req.body.curpass, req.payLoad.user.password) ) {
        return res.json({'error':'Invalid Credentials'})
    }

    const password = req.body.password
    const hashPass = await bcrypt.hash(password, 8)

    //Storing only input values to variables, else older values
    const updateName = req.body.name === '' ? req.payLoad.user.name : req.body.name
    const updateAge = req.body.age === '' ? req.payLoad.user.age : req.body.age
    // const updateEmail = req.body.email === '' ? req.payLoad.user.email : req.body.email
    const updatePassword = req.body.password === '' ? req.payLoad.user.password : hashPass
    const updateGender = req.body.gender === '' ? req.payLoad.user.gender : req.body.gender
    const updatePhone = req.body.pno === '' ? req.payLoad.user.phone : req.body.pno
    
    if(validation(null, password === ''? null : password, updatePhone, res)) return

    let sql = 'update users set name=?, age=?, password=?, gender=?, phone=? where user_id=?'
    let sqlTwo = 'select * from users where user_id=?'

    //Updating the User data
    db.query(sql, [ updateName, updateAge, updatePassword, updateGender, updatePhone ,req.payLoad.user.user_id ], (err, result, fields) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return res.send('Email already taken')
            }
            throw err;
        }
        //Updating Token Value
        db.query(sqlTwo, [ req.payLoad.user.user_id ], (err, result, fields) => {
            console.log('Error here')
            console.log(result[0])
            if(err) throw err;          //No error
            token = generateAuth(result[0])
            res.cookie('auth_token', token)         //Error here Cannot set headers after they are sent to the client
            console.log(token)
            console.log(result)
            res.redirect('/user/home')
        })
         
    })

})


//Logout route
router.get('/user/logout', auth, async (req, res) => {
    res.clearCookie('auth_token')
    res.redirect('/')
})


//Leader Board
router.get('/leaderboard', auth, async(req, res) => {
    const sql = 'select name, xp, level, email_id from users u where u.is_blocked = "0" order by xp desc limit 10'
    db.query(sql, (err, result) => {
        res.render('leaderboard', {
            users: result
        })
    })
})

router.get('/chat', auth, (req, res) => {
    router.username_var = req.payLoad.user.name
    res.sendFile(path.join(__dirname+'../../../public/chat.html'));
    // res.render('chat')
})

router.post('/forgot-password', (req, res) => {
    const sql = 'select * from users where email_id=?'
    const sqlTwo = 'update users set otp=? where email_id=?'
    
    db.query(sql, [ req.body.email_id ], (err, result) => {
        if(result.length === 0) return res.json({'err' : 'Email has not been Registered yet'})

        var otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        db.query(sqlTwo, [ otp, req.body.email_id ])

    })
})

router.post('/check-otp', (req, res) => {
    const sql = 'select * from users where email_id=?'
    db.query(sql, [ req.body.email ], (err, result) => {
        console.log(result[0].otp, req.body.otp)
        if(result[0].otp === parseInt(req.body.otp)) {
            res.cookie('auth_token', generateAuth(result[0]))    
            return res.render('changePassword') 
        }
        else return res.json('OTP mismatch')
    })
})

router.post('/change-password', auth, async(req, res) => {
    const password = req.body.password
    const hashPass = await bcrypt.hash(password, 8)

    const updatePassword = req.body.password === '' ? req.payLoad.user.password : hashPass

    if(validation(null, password === ''? null : password, null, res)) return

    let sql = 'update users set password=? where user_id=?'

    //Changing User password
    db.query(sql, [ updatePassword, req.payLoad.user.user_id ], (err, result, fields) => {
        if(err) return res.json(err)
        res.redirect('/')
    })
})

router.post('/user/get-user', auth, async(req, res) => {

    const sql = 'select * from users where email_id=?'
    
    db.query(sql, [ req.body.email_id ], (err, result) => {
        if(err) throw err;
        res.render('getUserDetails', {
            users: result
        })
    })
})


router.get('/user/search-player-detail', auth, async(req, res) => {

    const sql = 'select * from users where name like "%'+ req.query.username +'%" and user_id!='+req.payLoad.user.user_id
    const acceptedFriends = await getRows('select * from friends where requestor_id='+req.payLoad.user.user_id)
    const requestedFriends = await getRows('select * from friends where acceptor_id='+req.payLoad.user.user_id)
    const sentRequests = await getRows('select * from pending where requestor_id='+req.payLoad.user.user_id)
    const receivedRequests = await getRows('select * from pending where acceptor_id='+req.payLoad.user.user_id)
    var reqArray = []
    var reqId = []
    var accArray = []
    var accId = []
    var alreadyFriends = []
    for(var i=0; i<acceptedFriends.length; i++)
        alreadyFriends.push(acceptedFriends[i].acceptor_id)
    for(var i=0; i<requestedFriends.length; i++)
        alreadyFriends.push(requestedFriends[i].requestor_id)

    for(var i=0; i<sentRequests.length; i++){
        reqArray.push(sentRequests[i].acceptor_id)
        reqId.push(sentRequests[i].pending_id)
    }
    console.log(reqArray, reqId);

    for(var i=0; i<receivedRequests.length; i++){
        accArray.push(receivedRequests[i].requestor_id)
        accId.push(receivedRequests[i].pending_id)
    }

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('getUserDetails', {
            users: result,
            username: req.query.username,
            reqArray,
            reqId,
            accArray,
            accId,
            alreadyFriends
        })
    })
})

router.post('/user/add-friend', auth, async(req, res) => {
    const sql = 'insert into pending( requestor_id, acceptor_id ) values( ?, ? )'
    db.query(sql, [ req.payLoad.user.user_id, req.body.user_id ], (err, result) => {
        return res.redirect('/user/search-player-detail?username='+req.body.username)
    })
})

router.post('/user/cancel-request', auth, async(req, res) => {
    const sql = 'delete from pending where requestor_id=? and acceptor_id=?'
    db.query(sql, [ req.payLoad.user.user_id, req.body.user_id ], (err, result) => {
        return res.redirect('/user/search-player-detail?username='+req.body.username)
    })
})

router.get('/user/friend-requests', auth, async(req, res) => {
    const sql = 'select * from users u, pending p where u.user_id=p.requestor_id and p.acceptor_id=?'
    db.query(sql,[ req.payLoad.user.user_id ], (err, result) => {
        if(err) throw err;
        res.render('friendRequestPage', {
            users: result,
            username: req.query.username,
        })
    })
})

router.post('/user/confirm-friend', auth, async(req, res) => {
    const sql = 'insert into friends ( requestor_id, acceptor_id ) values ( ?, ? )'
    const sqlTwo = 'delete from pending where requestor_id=? and acceptor_id=?'

    db.query(sql, [ req.body.user_id, req.payLoad.user.user_id ], (err, result) => {
        db.query(sqlTwo, [ req.body.user_id, req.payLoad.user.user_id ], (err, result) => {
            return res.redirect(req.body.url)
        })
    })
})

router.post('/user/reject-request', auth, async(req, res) => {
    const sql  = 'delete from pending where requestor_id=? and acceptor_id=?'
    db.query(sql, [ req.body.user_id, req.payLoad.user.user_id ], (err, result) => {
        return res.redirect(req.body.url)
    })
})

router.post('/user/remove-friend', auth, async(req, res) => {
    const sql  = 'delete from friends where requestor_id=? and acceptor_id=?'
    const sqlTwo  = 'delete from friends where requestor_id=? and acceptor_id=?'
    db.query(sql, [ req.body.user_id, req.payLoad.user.user_id ], (err, result) => {
        db.query(sqlTwo, [ req.payLoad.user.user_id, req.body.user_id ], (err, result) => {
            return res.redirect(req.body.url)
        })
    })
})

router.get('/user/friends', auth, async(req, res) => {
    const sqlTwo = 'select * from users u INNER JOIN friends f where u.user_id = f.requestor_id and f.acceptor_id = ?'
    const sql = 'select * from users u INNER JOIN friends f where u.user_id = f.acceptor_id and f.requestor_id = ?'
    db.query(sql, [ req.payLoad.user.user_id ], (err, result) => {
        result!=undefined ? finalResult=result : finalResult=[]
        console.log(result)
        db.query(sqlTwo, [ req.payLoad.user.user_id ], (err, result) => {
            result!=undefined ? finalResult = [...finalResult, ...result] : finalResult
            console.log(result)
            //console.log(finalResult)
            return res.render('getFriends', {
                users: finalResult
            })
        })
    })
})

module.exports = router