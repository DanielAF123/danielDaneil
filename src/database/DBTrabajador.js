    //Schema
    const Trabajadores = require('../schemas/trabajadores');
    //Añadir trabajador
    async function anadirTrabajador(trabajador){
        console.log(trabajador)
    await trabajador.save()
        .then(function(){
           console.log("Trabajador Creado")
        })
        .catch(function(errores){
            console.error(errores.errmsg);
            throw new Error("Error al crear el usuario");
        })
    }

    //Eliminar trabajador
    async function eliminarTrabajador(id){
    await Trabajadores.findById(id)
        
        .then(async function(trabajador){
            await trabajador.remove()
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
    async function actualizarTrabajador(trabajadorVista){
        console.log(trabajadorVista);
    await Trabajadores.findById(trabajadorVista._id)
        .then(async function(trabajador){
            console.log(trabajador)
          await Trabajadores.updateOne({_id: trabajadorVista._id},{ $set: { Nombre: trabajadorVista.Nombre, Apellidos: trabajadorVista.Apellidos, FechaNac: trabajadorVista.FechaNac, Ocupacion: trabajador.Ocupacion, Sueldo: trabajadorVista.Sueldo}})
        })
        .then(function(){
            console.log("Usuario actualizado");
        })
        .catch(function(errores){
            console.error(errores.errmsg);
            throw new Error("Error al actualizar el trabajador");
        })
    }

    //Busqueda de trabajadores
    async function buscarTrabajadoresNombre(nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF,skip){
        let busqueda; 
        let json;
        json = await fecha(nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF)
        await Trabajadores.find(json,null,{skip: parseInt(skip), limit:5})

      .then(function(trabajadores){
        busqueda=trabajadores;
      })
      .catch(function(errores){
        console.error(errores);
        throw new Error("Error al buscar los trabajadores");
    })
        
        //FILTRAR POR FECHA Y PAGINACIÓN 
        
    return busqueda;
    }

    async function buscarTrabajadoresId(id){
        let busqueda;
    await Trabajadores.find({_id : id})
      .then(function(trabajadores){
        busqueda=trabajadores;
      })
      .catch(function(errores){
        console.error(errores.errmsg);
        throw new Error("Error al buscar el trabajador");
    })
    return busqueda;
    }

    async function numeroDeTrabajadores(nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF){
        let busqueda;
        let json;
        json = await fecha(nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF)
    await Trabajadores.find(json).count()
      .then(function(trabajadores){
        busqueda=trabajadores;
      })
      .catch(function(errores){
        console.error(errores.errmsg);
        throw new Error("Error al contar los trabajadores");
    })
    return busqueda;
    }
/*Ejemplo de trabajador
var Trabajador = new Trabajadores()
    Trabajador._id = 3
    Trabajador.Nombre = "Daniel"
    Trabajador.Apellidos = "Alcala Fernandez"
    Trabajador.FechaNac = new Date(2000,1,10)
    Trabajador.Ocupacion = "Sin ocupación"
    Trabajador.Sueldo = 1200*/
    module.exports.anadirTrabajador=anadirTrabajador
    module.exports.eliminarTrabajador=eliminarTrabajador
    module.exports.actualizarTrabajador=actualizarTrabajador
    module.exports.buscarTrabajadoresNombre=buscarTrabajadoresNombre
    module.exports.buscarTrabajadoresId=buscarTrabajadoresId
    module.exports.numeroDeTrabajadores=numeroDeTrabajadores

    function fecha(nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF){
        const userRegexNombre = new RegExp(nombre, 'i');
        const userRegexApellidos = new RegExp(Apellidos, 'i');
        const userRegexOcupacion = new RegExp(Ocupacion, 'i');
        var json ={
            Nombre: userRegexNombre,
            Apellidos: userRegexApellidos,
            Ocupacion: userRegexOcupacion,
        }
        if(Sueldo!==''){
            json.Sueldo=Sueldo;
        }
        if(FNI!==null){
            if(FNF!==null){
                json.FechaNac={"$gte": FNI, "$lt": FNF}
                console.log(json)
                return json
            }else{
                json.FechaNac={"$gte": FNI}
                return json
            }
        }else{
            if(FNF!==null){
                json.FechaNac={"$lt": FNF}
                return json
            }else{
                console.log(json)
                return json
            }
        }
    }