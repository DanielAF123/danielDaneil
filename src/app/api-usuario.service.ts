import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuarioService {
  private urlApi='https://apiback123.herokuapp.com';

  private headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient){
      console.log("Conexion realizada");
  }
  buscarUsuarioNombre(NombreUsuario){
      const url = `${this.urlApi}/buscarUsuarioNombre/`
      return this.httpClient.post<[Usuario]>(url,{NombreUsuario: NombreUsuario},{headers: this.headers});
  }

  buscarUsuarioId(id){
    const url = `${this.urlApi}/buscarUsuarioId/`
    return this.httpClient.post<[Usuario]>(url,{Id: id},{headers: this.headers});
}
  buscarUsuarioEmail(Email){
  const url = `${this.urlApi}/buscarUsuarioEmail/`
  return this.httpClient.post<[Usuario]>(url,{Email: Email},{headers: this.headers});
}

  anadirUsuario(usuario){
    const url = `${this.urlApi}/anadirUsuario/`;
    return this.httpClient.post<JSON>(url,usuario,{headers: this.headers});
  }

  actualizarUsuario(usuario){
    const url = `${this.urlApi}/actualizarUsuario/`;
    return this.httpClient.post<JSON>(url,usuario,{headers: this.headers});
  }

  recuperarContrasena(Contrasena,Email){
    const url = `${this.urlApi}/emailUsuario/`;
    return this.httpClient.post<boolean>(url,{Contrasena: Contrasena, Email: Email},{headers: this.headers});
  }

  eliminarUsuario(id){
    const url = `${this.urlApi}/eliminarUsuario/`+id
    return this.httpClient.get<JSON>(url);
}

}
