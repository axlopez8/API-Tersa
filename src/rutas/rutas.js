const express = require('express');
const router = express.Router();

const mysqlConnection = require('../basedatos');

router.get('/clientes', (req,res) =>{
    mysqlConnection.query('SELECT * FROM clientes', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});

module.exports = router;