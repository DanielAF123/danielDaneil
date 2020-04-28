const express=require('express');
const router = express.Router();
const Trabajadores = require('../schemas/trabajadores');
const {anadirTrabajador,eliminarTrabajador,actualizarTrabajador,buscarTrabajadoresNombre,buscarTrabajadoresId,numeroDeTrabajadores} = require('../database/DBTrabajador');


router.post('/buscarTrabajadoresNombre/', async (req, res) => {
await buscarTrabajadoresNombre(req.body.Nombre,req.body.Apellidos,req.body.Ocupacion,req.body.Sueldo,req.body.FNI,req.body.FNF,req.body.skip)
    
    .then(function(Busqueda){console.log(Busqueda); return Busqueda})

    .then(function(Busqueda){res.send(Busqueda)})
    
    .catch(function(err){
        console.log(err);
        res.send({res: false});
    })
});

router.post('/buscarTrabajadoresId/', async (req, res) => {
    console.log(req.body.Id)
    await buscarTrabajadoresId(req.body.Id)
        
        .then(function(Busqueda){console.log(Busqueda); return Busqueda})
    
        .then(function(Busqueda){res.send(Busqueda)})
        
        .catch(function(err){
            console.log(err);
            res.send({res: false});
        })
    });

router.get('/about', (req, res) =>{
    res.send('About');
    });
router.post('/anadirTrabajador', async (req, res) =>{
    let Trabajador = new Trabajadores()
    Trabajador._id = req.body._id
    Trabajador.Nombre = req.body.Nombre
    Trabajador.Apellidos = req.body.Apellidos
    Trabajador.FechaNac = req.body.FechaNac
    Trabajador.Ocupacion = req.body.Ocupacion
    Trabajador.Sueldo = req.body.Sueldo
    anadirTrabajador(Trabajador)

    .then(function(){
        res.send({res: "Trabajador añadido"});
    })

    .catch(function(err){
        console.log(err);
        res.send({res: false});
    })
    });
router.get('/eliminarTrabajador/:_id', (req, res) =>{
    let id = req.params._id
    eliminarTrabajador(id)

    .then(function(){
        console.log("Trabajador eliminado");
        res.send({res: id+" Trabajador eliminado"});
    })

    .catch(function(err){
        console.log(err);
        res.send({res: false});})
    });
router.post('/actualizarTrabajador', (req, res) =>{
    var Trabajador = new Trabajadores()
        Trabajador._id = req.body._id
        Trabajador.Nombre = req.body.Nombre
        Trabajador.Apellidos = req.body.Apellidos
        Trabajador.FechaNac = req.body.FechaNac
        Trabajador.Ocupacion = req.body.Ocupacion
        Trabajador.Sueldo = req.body.Sueldo
    actualizarTrabajador(Trabajador)

    .then(function(){
        res.send({res: "Trabajador actualizado"});    
        console.log("Trabajador actualizado");
    })

    .catch(function(err){
        console.log(err);
        res.send({res: false});
    })
    });
    router.post('/numeroDeTrabajadores/', (req, res) =>{
        numeroDeTrabajadores(req.body.Nombre,req.body.Apellidos,req.body.Ocupacion,req.body.Sueldo,req.body.FNI,req.body.FNF)
    
        .then(function(numero){
            console.log("numero de trabajadores "+numero);
            res.send({res: numero});
        })
    
        .catch(function(err){
            console.log(err);
            res.send({res: false});})
        });
module.exports = router;