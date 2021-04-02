const express = require('express');
const router = express.Router();

const mysqlConnection = require('../basedatos');


//Modulo de Personas
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

//Ruta de Borrado 
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

//Modulo de Productos
router.get('/productos', (req,res) =>{
    mysqlConnection.query('SELECT * FROM productos', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM productos WHERE idProductos = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/productos', async (req, res) => {
    const { Nombres, Apellidos, DPI, NIT, Telefono, Email} = req.body;
    const SetenciaSQL = 'INSERT INTO productos (idProducto, Nombre, Cantidad, Precio_Compra, Precio_Venta, FK_Proveedor) VALUES (NULL, ?, ?, ?, ?, ?)';
    mysqlConnection.query(SetenciaSQL,[Nombre, Cantidad, Precio_Compra, Precio_Venta], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Producto Registrada'});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/productos/:id', async (req, res) =>{
    const {  Nombres, Apellidos, DPI, NIT, Telefono, Email} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE productos SET Nombre = ?, Cantidad = ?, Precio_Compra = ?, Precio_Venta = ?, FK_Proveedor = ? WHERE productos.idProducto = ?';
    mysqlConnection.query(SetenciaSQL, [Nombre, Cantidad, Precio_Compra, Precio_Venta, FK_Proveedor, id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Producto Acutalizada"});
        }else{
            console.log(err)
        }
    });
});

//Ruta de Borrado 
router.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM productos WHERE idProductos = ? ', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Producto borrada"});
        }else{
            console.log(err)
        }
    });
});
module.exports = router;