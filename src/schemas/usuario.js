'use strict'

const mongoose = require('mongoose')

var Schema = mongoose.Schema

var UsuarioSchema = new Schema({
    NombreUsuario: String,
    Contrasena: String,
    Email: String
})
module.exports = mongoose.model('Usuarios', UsuarioSchema)