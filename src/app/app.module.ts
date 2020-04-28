import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Route} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AnadirTrabajadorComponent } from './anadir-trabajador/anadir-trabajador.component';
import { EliminartrabajadorComponent } from './eliminartrabajador/eliminartrabajador.component';
import { VisualizarTrabajadoresComponent } from './visualizar-trabajadores/visualizar-trabajadores.component';
import { ActualizarTrabajadorComponent } from './actualizar-trabajador/actualizar-trabajador.component';
import { InicioComponent } from './inicio/inicio.component'
import { ActualizarUsuarioComponent } from './usuario/actualizar-usuario/actualizar-usuario.component';
import { AnadirUsuarioComponent } from './usuario/anadir-usuario/anadir-usuario.component'

import { ApiService } from './api.service';
import { ApiUsuarioService } from './api-usuario.service'
import { Global } from './global/global';
import { CerrarsesionComponent } from './usuario/cerrarsesion/cerrarsesion.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { RecuperarContrasenaComponent } from './usuario/recuperar-contrasena/recuperar-contrasena.component';



const routes: Route[] = [
  {path: '', component: InicioComponent},
  {path: 'about', component: AboutComponent},
  {path: 'anadirTrabajador', component: AnadirTrabajadorComponent},
  {path: 'eliminarTrabajador', component: EliminartrabajadorComponent},
  {path: 'visualizarTrabajador', component: VisualizarTrabajadoresComponent},
  {path: 'actualizarTrabajador', component: ActualizarTrabajadorComponent},
  {path: 'actualizarUsuario', component: ActualizarUsuarioComponent},
  {path: 'anadirUsuario', component: AnadirUsuarioComponent},
  {path: 'cerrarSesion', component: CerrarsesionComponent},
  {path: 'eliminarUsuario', component: EliminarUsuarioComponent},
  {path: 'recuperarContrasena', component: RecuperarContrasenaComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    AnadirTrabajadorComponent,
    EliminartrabajadorComponent,
    VisualizarTrabajadoresComponent,
    ActualizarTrabajadorComponent,
    InicioComponent,
    ActualizarUsuarioComponent,
    AnadirUsuarioComponent,
    CerrarsesionComponent,
    EliminarUsuarioComponent,
    RecuperarContrasenaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ApiService,ApiUsuarioService,Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
