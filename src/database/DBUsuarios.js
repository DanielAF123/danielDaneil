 //Schema
 const Usuarios = require('../schemas/usuario');
 //Añadir trabajador
 async function anadirUsuario(Usuario){
     console.log(Usuario)
 await Usuario.save()
     .then(function(){
        console.log("Usuario Creado")
     })
     .catch(function(errores){
         console.error(errores.errmsg);
         throw new Error("Error al crear el usuario");
     })
 }

 //Eliminar trabajador
 async function eliminarUsuario(id){
 await  Usuarios.findById(id)
     
     .then(async function(Usuario){
         await Usuario.remove()
     })

     .then(function(){
         console.log("Usuario con el id: ",id," eliminado");
     })
     .catch(function(errores){
         console.error(errores.errmsg);
         throw new Error("Error al eliminar el trabajador");
     })
 }

 //Actualizar trabajador
 async function actualizarUsuario(usuarioVista){
     console.log(usuarioVista);
 await Usuarios.find({NombreUsuario: usuarioVista.NombreUsuario})
     .then(async function(usuario){
         console.log(usuario)
       await Usuarios.updateOne({_id: usuarioVista.Id},{ $set: {NombreUsuario: usuarioVista.NombreUsuario,Contrasena: usuarioVista.Contrasena,Email: usuarioVista.Email}})
     })
     .then(function(){
         console.log("Usuario actualizado");
     })
     .catch(function(errores){
         console.error(errores);
         throw new Error("Error al actualizar el trabajador");
     })
 }

 //Busqueda de trabajadores
 async function buscarUsuarioNombre(nombreUsuario){
     let busqueda; 
     let json={
         NombreUsuario: nombreUsuario
     };
     await Usuarios.find(json)

   .then(function(usuario){
     busqueda=usuario;
   })
   .catch(function(errores){
     console.error(errores);
     throw new Error("Error al buscar el usuario");
 })  
 return busqueda;
 }

 async function buscarUsuarioId(id){
     let busqueda;
 await Usuarios.find({_id : id})
   .then(function(usuario){
     busqueda=usuario;
   })
   .catch(function(errores){
     console.error(errores.errmsg);
     throw new Error("Error al buscar el usuario");
 })
 return busqueda;
 }

//Busqueda de usuario por Email
async function buscarUsuarioEmail(email){
    let busqueda; 
    let json={
        Email: email
    };
    await Usuarios.find(json)

  .then(function(usuario){
    busqueda=usuario;
  })
  .catch(function(errores){
    console.error(errores);
    throw new Error("Error al buscar el usuario");
})  
return busqueda;
}

 module.exports.anadirUsuario=anadirUsuario
 module.exports.eliminarUsuario=eliminarUsuario
 module.exports.actualizarUsuario=actualizarUsuario
 module.exports.buscarUsuarioNombre=buscarUsuarioNombre
 module.exports.buscarUsuarioEmail=buscarUsuarioEmail
 module.exports.buscarUsuarioId=buscarUsuarioId