import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Trabajador } from './trabajador';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi='http://192.168.1.132:3000';

  private headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient){
      console.log("Conexion realizada");
  }
  buscarTrabajadorNombre(Nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF,skip){
      const url = `${this.urlApi}/buscarTrabajadoresNombre/`
      return this.httpClient.post<[Trabajador]>(url,{Nombre: Nombre, Apellidos: Apellidos, Ocupacion: Ocupacion,Sueldo: Sueldo, FNI: FNI, FNF: FNF,skip: skip});
  }

  buscarTrabajadorId(id){
    const url = `${this.urlApi}/buscarTrabajadoresId/`
    return this.httpClient.post<[Trabajador]>(url,{Id: id});
}

  anadirTrabajador(trabajador){
    const url = `${this.urlApi}/anadirTrabajador/`;
    return this.httpClient.post<JSON>(url,trabajador,{headers: this.headers});
  }

  actualizarTrabajador(trabajador){
    const url = `${this.urlApi}/actualizarTrabajador/`;
    return this.httpClient.post<JSON>(url,trabajador,{headers: this.headers});
  }

  eliminarTrabajador(id){
    const url = `${this.urlApi}/eliminarTrabajador/`+id
    return this.httpClient.get<JSON>(url);
}
  numeroDeTrabajadores(Nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF){
  const url = `${this.urlApi}/numeroDeTrabajadores/`
  return this.httpClient.post<JSON>(url,{Nombre: Nombre, Apellidos: Apellidos, Ocupacion: Ocupacion,Sueldo: Sueldo, FNI: FNI, FNF: FNF});
}
}
