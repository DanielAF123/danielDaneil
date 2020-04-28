'use strict'

const mongoose = require('mongoose')

var Schema = mongoose.Schema

var TrabajadoresSchema = new Schema({
    _id: Number,
    Nombre: String,
    Apellidos: String,
    FechaNac: Date,
    Ocupacion: String,
    Sueldo: Number,
    FechaDeInicio: { type: Date, default: Date.now()}
})
TrabajadoresSchema.path('_id')
module.exports = mongoose.model('Trabajadores', TrabajadoresSchema)