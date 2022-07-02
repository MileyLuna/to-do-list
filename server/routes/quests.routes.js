const {query} = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


//GET router 
router.get('/', (req, res)=> {
    let queryText = 'SELECT * FROM "quests";';
    pool.query(queryText).then(result => {
        //send client inputs to database
        res.send(result.rows);
        //set net to catch error and send error status
    }).catch(error => {
        console.log('error in router/get:', error);
        res.sendStatus(500);
    })
})

//POST router : send collectQuest to database
router.post('/', (req, res) => {
    const collectQuest = req.body;
    const queryText = ` INSERT INTO "quests" ("list") VALUES ($1);
    `;
    pool.query(queryText [collectQuest.list])
        .then((result)=>{
            res.sendStatus(201);
        }).catch ((error) =>{
            console.log('error in router/post:', error);
            res.sendStatus(500);
        });
});



module.exports = router;
