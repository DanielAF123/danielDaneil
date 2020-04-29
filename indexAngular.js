const express = require('express');
const path = require('path');
const app = express();
//Archivos estaticos
app.use(express.static(__dirname + '/dist/AplcicacionFinal/'));

app.listen(process.env.PORT || 8080);

app.get('/[`\.]+$',function(req,res){
    res.set('Content-Type', 'text/html')
    .sendFile(path.join(__dirname+'/dist/AplcicacionFinal/index.html'));
});
console.log("Console listening")