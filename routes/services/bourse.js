'use strict'

const router = require('express').Router();
const mysql = require('mysql');
const env = require('../../env.json');
const con = mysql.createConnection(env.mysql);


router.get('/trader/find/all', (req, res) => {
    con.query('SELECT * FROM bddbourse.trader', (err, result, fields) => {
        if (err) res.send({error: err});
        res.send(result);
    });
});

router.get('/action/find', (req, res) => {
    con.query(
        `SELECT t1.nomAction, t2.montantAchat, t2.quantite ` + 
        `FROM bddbourse.action AS t1 ` +
            `INNER JOIN bddbourse.acheter AS t2 ` +
            `ON t1.idAction = t2.numAction ` +
        `WHERE t2.numTrader = ${req.query.idTrader}`,
    (err, result, fields) => {
        if (err) res.send({error: err});
        res.send(result);
    });
});

module.exports = router;