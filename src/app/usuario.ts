export class Usuario {
    _id: Number
    NombreUsuario: String
    Contrasena: String
    Email: String
    constructor(_id,NombreUsuario,Contrasena,Email){
        this._id=_id;
        this.NombreUsuario=NombreUsuario;
        this.Contrasena=Contrasena;
        this.Email=Email;
    }
}
