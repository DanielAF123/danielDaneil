const express=require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Usuario = require('../schemas/usuario');
const {anadirUsuario,eliminarUsuario,actualizarUsuario,buscarUsuarioNombre,buscarUsuarioEmail,buscarUsuarioId} = require('../database/DBUsuarios');


router.post('/buscarUsuarioNombre/', async (req, res) => {
await buscarUsuarioNombre(req.body.NombreUsuario)
    
    .then(function(Busqueda){console.log(Busqueda); return Busqueda})

    .then(function(Busqueda){res.send(Busqueda)})
    
    .catch(function(err){
        console.log(err);
        res.send({res: false});
    })
});
router.post('/buscarUsuarioEmail/', async (req, res) => {
    await buscarUsuarioEmail(req.body.Email)
        
        .then(function(Busqueda){console.log(Busqueda); return Busqueda})
    
        .then(function(Busqueda){res.send(Busqueda)})
        
        .catch(function(err){
            console.log(err);
            res.send({res: false});
        })
    });
router.post('/buscarUsuarioId/', async (req, res) => {
    console.log(req.body.Id)
    await buscarUsuarioId(req.body.Id)
        
        .then(function(Busqueda){console.log(Busqueda); return Busqueda})
    
        .then(function(Busqueda){res.send(Busqueda)})
        
        .catch(function(err){
            console.log(err);
            res.send({res: false});
        })
    });
router.post('/anadirUsuario', async (req, res) =>{
    let UsuarioA = new Usuario()
    UsuarioA.NombreUsuario = req.body.NombreUsuario
    UsuarioA.Contrasena = req.body.Contrasena
    UsuarioA.Email = req.body.Email
    anadirUsuario(UsuarioA)

    .then(function(){
        res.send({res: "Usuario añadido"});
    })

    .catch(function(err){
        console.log(err);
        res.send({res: false});
    })
    });
router.get('/eliminarUsuario/:_id', (req, res) =>{
    let id = req.params._id
    eliminarUsuario(id)

    .then(function(){
        console.log("Usuario eliminado");
        res.send({res: id+" Usuario eliminado"});
    })

    .catch(function(err){
        console.log(err);
        res.send({res: false});})
    });
router.post('/actualizarUsuario', (req, res) =>{
    let UsuarioA = new Usuario()
    UsuarioA.Id = req.body._id
    UsuarioA.NombreUsuario = req.body.NombreUsuario
    UsuarioA.Contrasena = req.body.Contrasena
    UsuarioA.Email = req.body.Email
    actualizarUsuario(UsuarioA)

    .then(function(){
        res.send({res: "Usuario actualizado"});    
        console.log("Usuario actualizado");
    })

    .catch(function(err){
        console.log(err);
        res.send({res: false});
    })
    });
    router.post('/emailUsuario', async (req, res) =>{
        let Contrasena = req.body.Contrasena
        let Email = req.body.Email
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: 'aplicaciontrabajadores@gmail.com', // Cambialo por tu email
            pass: '123456789QAZwsx@' // Cambialo por tu password
            }
            });
            const mailOptions = {
              from: "aplicaciontrabajadores@gmail.com",
              to: Email, // Cambia esta parte por el destinatario
              subject: "Recuperar Contraseña",
              html: "Contraseña nueva "+Contrasena
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err){
                res.send({res: false})
            }else{
                res.send({res: true})
            }
                
                });
      
        });
module.exports = router;