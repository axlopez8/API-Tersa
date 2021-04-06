const express = require('express');
const cors=require('cors');
const app = express();


//Configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares (funciones)
app.use(express.json());
app.use(cors());
//Rutas (URL)
app.use(require('./rutas/rutas'));
//Empezando el servidor

app.listen(3000, () => {
    console.log('Servidor en puerto', app.get('port'));
});
