const express = require('express');
const path = require('path');
const app = express();
//Opciones
app.listen('/*', process.env.PORT || 8080);
//Archivos estaticos
app.use(express.static(__dirname + '/dist'));
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});
console.log("texto inicio")