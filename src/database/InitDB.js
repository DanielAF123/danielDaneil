var mongoose = require('mongoose');
var db = mongoose.connect('mongodb+srv://admindb:paso@cluster0-myi09.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conexion realizada");
});

