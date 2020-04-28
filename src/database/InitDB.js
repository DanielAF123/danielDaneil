var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/AplicacionFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conexion realizada");
});

