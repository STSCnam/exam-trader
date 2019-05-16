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

    // res.send([
    //     {idTrader: 1, nomTrader: 'Milo'},
    //     {idTrader: 2, nomTrader: 'Clara'},
    //     {idTrader: 3, nomTrader: 'Enzo'},
    //     {idTrader: 4, nomTrader: 'Noa'},
    //     {idTrader: 5, nomTrader: 'Lilou'}
    // ]);
});

router.get('/action/find', (req, res) => {
    con.query(
        `SELECT t1.nomAction, t2.montantAchat, t2.quantite ` + 
        `FROM bddbourse.action AS t1 ` +
            `INNER JOIN bddbourse.acheter AS t2 ` +
            `ON t1.idAction = t2.numAction` +
        `WHERE t2.numTrader = ${req.query.idTrader}`,
    (err, result, fields) => {
        if (err) res.send({error: err});

        res.send(result);
    });

    // res.send([
    //     {nomAction: 'AAPL', montantAchat: 170.45, quantite: 415},
    //     {nomAction: 'IBM', montantAchat: 130.9, quantite: 445},
    //     {nomAction: 'FB', montantAchat: 157.32, quantite: 894},
    //     {nomAction: 'SAP', montantAchat: 100.77, quantite: 372},
    //     {nomAction: 'INTC', montantAchat: 50.51, quantite: 865},
    //     {nomAction: 'SNE', montantAchat: 45.84, quantite: 179},
    //     {nomAction: 'VMW', montantAchat: 164.27, quantite: 569},
    //     {nomAction: 'TXN', montantAchat: 100.56, quantite: 106}
    // ]);
});

module.exports = router;