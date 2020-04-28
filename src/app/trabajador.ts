export class Trabajador {
    _id: Number
    Nombre: String
    Apellidos: String
    FechaNac: Date
    Ocupacion: String
    Sueldo: Number
    FechaDeInicio: Number
    private 
    constructor(_id,Nombre,Apellidos,FechaNac,Ocupacion,Sueldo){
        this._id=_id;
        this.Nombre=Nombre;
        this.Apellidos=Apellidos;
        this.FechaNac=FechaNac;
        this.Ocupacion=Ocupacion;
        this.Sueldo=Sueldo;
        this.FechaDeInicio=Date.now();
    }
}
