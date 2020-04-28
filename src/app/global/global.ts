import { Usuario } from '../usuario'
export class Global {
    public usuario: Usuario;
    getUsuario(){
        return this.usuario;
    }

    setUsuario(usuario){
        this.usuario=usuario;   
    }

}
