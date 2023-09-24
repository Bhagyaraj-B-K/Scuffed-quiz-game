const express = require('express')
const auth = require('../middleware/auth')
const db = require('../db/dbase')
const router = new express.Router()
const constants = require('../global/constants')
const generateAuth = require('../helper/generateAuth')
const { getRows } = require('../helper/db')

const res = require('express/lib/response')

router.get('/quiz', auth, (req, res) => {
    //Setting Question difficulty as per Player level
    let diff = 'where level='+constants.EASY_LEVEL_QUESTION
    if(parseInt(req.payLoad.user.level) > 10)
        diff = 'where level='+constants.MEDIUM_LEVEL_QUESTION
    else if(parseInt(req.payLoad.user.level) > 15)
        diff = 'where level='+constants.HARD_LEVEL_QUESTION
    const sql = 'select * from questions ' + diff + ' order by rand() limit 10'

    console.log(sql)

    db.query(sql, (err, result) => {
        // router.answers = []
        var answers_id = []
        for(let i=0 ; i<result.length; i++)
            answers_id.push(result[i].question_id)

        res.render('quiz', {
            show_rows: result,
            answers_id
        })
    })
})


router.post('/quiz/result', auth, async(req, res) => {
    
    let score = 0;
    var answers_id = req.body.answers_id.split(',').map(Number);
    const answer = req.body
    var answers = []
    req.body.a0 !== undefined ? answers.push(req.body.a0) : answers.push('x')
    req.body.a1 !== undefined ? answers.push(req.body.a1) : answers.push('x')
    req.body.a2 !== undefined ? answers.push(req.body.a2) : answers.push('x')
    req.body.a3 !== undefined ? answers.push(req.body.a3) : answers.push('x')
    req.body.a4 !== undefined ? answers.push(req.body.a4) : answers.push('x')
    req.body.a5 !== undefined ? answers.push(req.body.a5) : answers.push('x')
    req.body.a6 !== undefined ? answers.push(req.body.a6) : answers.push('x')
    req.body.a7 !== undefined ? answers.push(req.body.a7) : answers.push('x')
    req.body.a8 !== undefined ? answers.push(req.body.a8) : answers.push('x')
    req.body.a9 !== undefined ? answers.push(req.body.a9) : answers.push('x')
    console.log(answers) 
    console.log(answers_id)



    for (var i=0; i<10; i++){
        let result =await getRows('select answer from questions where question_id='+answers_id[i])
        if( answers[i] === result[0].answer ) score+=constants.POSITIVE_POINTS
        else score-=constants.NEGATIVE_POINTS
        console.log(result)
    }
    
    
    if(score >= constants.REQ_SCORE){
        let xp = score / 10;
        const sql = 'select xp, level from users where user_id=?'
        const sqlTwo = 'update users set xp=?, level=? where user_id=?'
        let totalxp = xp
        var newLvl = 1  

        db.query(sql, [ req.payLoad.user.user_id ], (err, result) => {
            if(err) return res.json(err)
            totalxp += result[0].xp;
            newLvl = parseInt(totalxp / 100);

            db.query(sqlTwo, [ totalxp, newLvl, req.payLoad.user.user_id ])

            return res.render('score', {
                score: score * req.payLoad.user.level,
                total: answers.length * req.payLoad.user.level * 100,
                msg: 'You Gained XP of '+ xp +'   Your current xp: '+totalxp+'   Your current level: '+newLvl
            })
        })
    }else{
        if(score < 0) score=0
        return res.render('score', {
            score: score * parseInt(req.payLoad.user.level),
            total: answers.length * parseInt(req.payLoad.user.level) * 100,
            msg: 'You gain no XP'+'\n   Your current xp: '+req.payLoad.user.xp+'\n   Your current level: '+req.payLoad.user.level
        })
    }
})

module.exports = router