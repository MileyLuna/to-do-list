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
    pool.query(queryText, [collectQuest.list])
        .then((result)=>{
            res.sendStatus(201);
        }).catch ((error) =>{
            console.log('error in router/post:', error);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) =>{
    let questId = req.params.id;
    let complete = req.body.status;
    console.log('put request:', complete);
    let queryText;
    if (complete !== true){
        queryText = 'UPDATE "quests" SET "complete" = true WHERE id = $1;';
    } else {(res.sendStatus(500));
    }
    pool.query(queryText, [questId])
    .then((dbResponse)=>{
        res.send(dbResponse.rows);
    }).catch.log(`error in router updating /put ${queryText} ${error}`)
    res.sendStatus(500);
})

router.delete('/:id', (req, res)=>{
    let reqId = req.params.id;
    console.log('In req.params.id /delete:', req.params.id);

    let queryText = 'DELETE FROM "quests" WHERE id = $1;';
    pool.query(queryText, [reqId])
    .then(()=> {
        console.log('list deleted:', reqId);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error in router delete:', error);
        res.sendStatus(500);
    })
})



module.exports = router;
