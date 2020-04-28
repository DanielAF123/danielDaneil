const express = require('express');

//Inicialización
require('./config/config')
require('./database/InitDB');
const app = express();
//Schemas
const Trabajadores = require('./schemas/trabajadores');
//Opciones
app.set('port', process.env.PORT || 3000);
    //Permite conexion desde otros servidores
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
    //Permite reconocer las peticiones post y utilizarlas
app.use(express.json());
app.use(express.urlencoded({
    strict: true,
    extended: true,
    reviver: true
}));
//Variables globales

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/Usuario'));
//Archivos estaticos
app.use('/', express.static(__dirname + '/public'));
//Inico servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port '+ app.get('port'))
});