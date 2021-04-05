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
    mysqlConnection.query('SELECT * FROM productos WHERE idProducto = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/productos', async (req, res) => {
    const { Nombre, Cantidad, Precio_Compra, Precio_Venta, FK_Proveedor} = req.body;
    const SetenciaSQL = 'INSERT INTO productos (idProducto, Nombre, Cantidad, Precio_Compra, Precio_Venta, FK_Proveedor) VALUES (NULL, ?, ?, ?, ?,?)';
    mysqlConnection.query(SetenciaSQL,[Nombre, Cantidad, Precio_Compra, Precio_Venta,FK_Proveedor], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Producto Registrada'});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/productos/:id', async (req, res) =>{
    const {  Nombre, Cantidad, Precio_Compra, Precio_Venta, FK_Proveedor} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE productos SET Nombre = ?, Cantidad = ?, Precio_Compra = ?, Precio_Venta = ?, FK_Proveedor = ? WHERE idProducto = ?';
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
    mysqlConnection.query('DELETE FROM productos WHERE idProducto = ? ', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Producto borrada"});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Clientes
router.get('/clientes', (req,res) =>{
    mysqlConnection.query('SELECT C.idCliente, P.idPersona, P.Nombres, P.Apellidos, P.DPI, P.NIT, P.Telefono, P.Email  FROM clientes AS C INNER JOIN personas AS P ON C.FK_Persona=P.idPersona', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT C.idCliente, P.idPersona, P.Nombres, P.Apellidos, P.DPI, P.NIT, P.Telefono, P.Email  FROM clientes AS C INNER JOIN personas AS P ON C.FK_Persona=P.idPersona  WHERE idCliente = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/clientes', async (req, res) => {
    const { FK_Persona} = req.body;
    const SetenciaSQL = 'INSERT INTO clientes (idCliente, FK_Persona) VALUES (NULL, ?)';
    mysqlConnection.query(SetenciaSQL,[FK_Persona], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Cliente Registrado'});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/clientes/:id', async (req, res) =>{
    const {  FK_Persona} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE clientes SET FK_Persona = ? WHERE idCliente = ?';
    mysqlConnection.query(SetenciaSQL, [FK_Persona, id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Cliente Acutalizado"});
        }else{
            console.log(err)
        }
    });
});

//Ruta de Borrado 
router.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM clientes WHERE idCliente = ? ', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Cliente borrado"});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Proveedores
router.get('/proveedores', (req,res) =>{
    mysqlConnection.query('SELECT * FROM proveedores', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM proveedores WHERE idProveedor = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/proveedores', async (req, res) => {
    const {  Nombre_Empresa, Nit_Empresa, Telefono_Empresa, Email_Empresa, FK_Persona} = req.body;
    const SetenciaSQL = 'INSERT INTO proveedores (idProveedor, Nombre_Empresa, Nit_Empresa, Telefono_Empresa, Email_Empresa, FK_Persona) VALUES (NULL, ?, ?, ?, ?, ?)';
    mysqlConnection.query(SetenciaSQL,[ Nombre_Empresa, Nit_Empresa, Telefono_Empresa, Email_Empresa, FK_Persona], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Proveedor Registrado'});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/proveedores/:id', async (req, res) =>{
    const {  Nombre_Empresa, Nit_Empresa, Telefono_Empresa, Email_Empresa, FK_Persona} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE proveedores SET Nombre_Empresa = ?, Nit_Empresa = ?, Telefono_Empresa = ?, Email_Empresa = ?, FK_Persona = ?  WHERE idProveedor = ?';
    mysqlConnection.query(SetenciaSQL, [ Nombre_Empresa, Nit_Empresa, Telefono_Empresa, Email_Empresa, FK_Persona, id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Proveedor Acutalizado"});
        }else{
            console.log(err)
        }
    });
});

//Ruta de Borrado 
router.delete('/proveedores/:id', async (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM proveedores WHERE idProveedor = ? ', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Proveedor borrado"});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Compras
router.get('/compras', (req,res) =>{
    mysqlConnection.query('SELECT * FROM compras', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/compras/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM compras WHERE idCompra = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/compras', async (req, res) => {
    const { Total_Monto, Total_Pagado, FK_Proveedor, FK_Estado} = req.body;
    const SetenciaSQL = 'INSERT INTO compras (idCompra, Total_Monto, Total_Pagado, FK_Proveedor, FK_Estado) VALUES (NULL, ?, ?,?,?)';
    mysqlConnection.query(SetenciaSQL,[ Total_Monto, Total_Pagado, FK_Proveedor, FK_Estado], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Compra Registrada'});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Detalles de Compras
router.get('/detalles_compras/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT D.Cantidad, P.Nombre, D.sub_total, P.Precio_Compra FROM detalles_compras AS D INNER JOIN productos AS P ON D.FK_Producto = P.idProducto WHERE D.FK_Compra = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/detalles_compras', async (req, res) => {
    const {FK_Producto, Cantidad, sub_total, FK_Compra} = req.body;
    const SetenciaSQL = 'INSERT INTO detalles_compras (`idDetalle_Compra`, `FK_Producto`, `Cantidad`, `sub_total`, `FK_Compra`) VALUES (NULL, ?, ?, ?, ?)';
    mysqlConnection.query(SetenciaSQL,[ FK_Producto, Cantidad, sub_total, FK_Compra], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Detalle Registrado'});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Ventas
router.get('/ventas', (req,res) =>{
    mysqlConnection.query('SELECT * FROM ventas', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/ventas/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM ventas WHERE idVenta = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/ventas', async (req, res) => {
    const { FK_Cliente, Direccion_Venta, Total_monto, total_pagado, FK_Estado} = req.body;
    const SetenciaSQL = 'INSERT INTO ventas(idVenta, FK_Cliente, Direccion_Venta, Total_monto, total_pagado, FK_Estado) VALUES (null,?,?,?,?,?)';
    mysqlConnection.query(SetenciaSQL,[ FK_Cliente, Direccion_Venta, Total_monto, total_pagado, FK_Estado], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Venta Registrada'});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Detalles de Ventas
router.get('/detalles_ventas/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT idDetalle_Venta, P.Nombre, P.Precio_Venta, DV.Cantidad, DV.Sub_Total FROM detalles_ventas AS DV INNER JOIN productos AS P ON DV.FK_Producto=P.idProducto WHERE FK_Venta=?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/detalles_ventas', async (req, res) => {
    const {FK_Producto, Cantidad, Sub_Total, FK_Venta} = req.body;
    const SetenciaSQL = 'INSERT INTO `detalles_ventas`(`idDetalle_Venta`, `FK_Producto`, `Cantidad`, `Sub_Total`, `FK_Venta`) VALUES (null,?,?,?,?)';
    mysqlConnection.query(SetenciaSQL,[ FK_Producto, Cantidad, Sub_Total, FK_Venta], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Detalle Registrado'});
        }else{
            console.log(err)
        }
    });
});

//Modulo de Estado y Deudas
router.get('/estados_deudas', (req,res) =>{
    mysqlConnection.query('SELECT * FROM estados_deudas', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/estados_deudas/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM estados_deudas WHERE idEstado= ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});

//Modulo de Usuarios
router.get('/usuarios', (req,res) =>{
    mysqlConnection.query('SELECT C.idUsuario, C.usuario, P.idPersona, P.Nombres, P.Apellidos, P.DPI, P.NIT, P.Telefono, P.Email  FROM usuarios AS C INNER JOIN personas AS P ON C.FK_Persona=P.idPersona', (error, rows, fliends) => {
        if(!error){
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});
router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT C.idUsuario, C.usuario, P.idPersona, P.Nombres, P.Apellidos, P.DPI, P.NIT, P.Telefono, P.Email  FROM usuarios AS C INNER JOIN personas AS P ON C.FK_Persona=P.idPersona  WHERE idUsuario = ?', [id], (error, rows, fliends) =>{
        if(!error){
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});
// Ruta de Creacion
router.post('/usuarios', async (req, res) => {
    const { usuario, contraseña, FK_Persona} = req.body;
    const SetenciaSQL = 'INSERT INTO usuarios (idUsuario, usuario, contraseña, FK_Persona) VALUES (NULL, ?,MD5(?),?)';
    mysqlConnection.query(SetenciaSQL,[usuario, contraseña, FK_Persona], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Usuario Registrado'});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/usuarios/:id', async (req, res) =>{
    const { usuario, FK_Persona} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE usuarios SET usuario = ?, FK_Persona = ? WHERE idUsuario = ?';
    mysqlConnection.query(SetenciaSQL, [usuario, FK_Persona, id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Usuario Acutalizado"});
        }else{
            console.log(err)
        }
    });
});
//Ruta de actualizacion
router.put('/usuariosc/:id', async (req, res) =>{
    const { usuario, contraseña, FK_Persona} = req.body;
    const { id } = req.params;
    const SetenciaSQL = 'UPDATE usuarios SET usuario = ?, contraseña = MD5(?), FK_Persona = ? WHERE idUsuario = ?';
    mysqlConnection.query(SetenciaSQL, [usuario, contraseña, FK_Persona, id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "Usuario Acutalizado"});
        }else{
            console.log(err)
        }
    });
});
// Ruta de Login
router.get('/login', async (req, res) => {
    const { usuario, contraseña} = req.body;
    const SetenciaSQL = 'SELECT C.idUsuario, C.usuario, P.idPersona, P.Nombres, P.Apellidos, P.DPI, P.NIT, P.Telefono, P.Email  FROM usuarios AS C INNER JOIN personas AS P ON C.FK_Persona=P.idPersona WHERE C.usuario=? AND C.contraseña=MD5(?)';
    mysqlConnection.query(SetenciaSQL,[usuario, contraseña], (err, rows, fields) => {
        if(!err){
       
            if(rows.length==1){
                res.json({Status: 'Inicio Correcto'});
            } else{
                res.json({Status: 'Usuario o Contraseña incorrecta'});
            }
        }else{
            console.log(err)
        }
    });
});
module.exports = router;