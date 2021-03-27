const express = require('express');
const router = express.Router();

const mysqlConnection = require('../basedatos');

router.get('/personas', (req,res) =>{
    mysqlConnection.query('SELECT * FROM personas', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/personas/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM personas WHERE idPersona = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/personas', async (req, res) => {
    const { Nombres, Apellidos, DPI, NIT, Telefono, Email} = req.body;
    const SetenciaSQL = 'INSERT INTO personas (idPersona, Nombres, Apellidos, DPI, NIT, Telefono, Email) VALUES (NULL, ?, ?, ?,?, ?, ?)';
    mysqlConnection.query(SetenciaSQL,[Nombres, Apellidos, DPI, NIT, Telefono, Email], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Persona Registrada'});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/personas/:id', async (req, res) =>{
    const {  Nombres, Apellidos, DPI, NIT, Telefono, Email} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE personas SET Nombres = ?, Apellidos = ?, DPI = ?, NIT = ?, Telefono = ?,  Email = ? WHERE idPersona = ?';
    mysqlConnection.query(SetenciaSQL, [Nombres, Apellidos, DPI, NIT, Telefono, Email, id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Persona Acutalizada"});
        }else{
            console.log(err)
        }
    });
});

//Ruta de Borrado de Pedidos
router.delete('/personas/:id', async (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM personas WHERE idPersona = ? ', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Persona borrada"});
        }else{
            console.log(err)
        }
    });
});
module.exports = router;