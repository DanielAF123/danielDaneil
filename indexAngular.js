const express = require('express');
const path = require('path');
const app = express();
//Archivos estaticos
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/AplcicacionFinal/index.html'));
});
console.log("Console listening")