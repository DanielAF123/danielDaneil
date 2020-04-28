import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario';
import { ApiUsuarioService } from '../../api-usuario.service'
import { Global } from '../../global/global'
import { ContrasenaC } from '../../contrasena'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {
  formGroup1;
  formGroup2;
  private usuario;

  constructor(private ApiUsuarioService: ApiUsuarioService,private router:Router,private global: Global) { 
    if(sessionStorage.getItem('usuario')==null){
      this.router.navigate(['']);
    }else{
      let pagina = document.getElementById("texto");
      pagina.textContent = "Actualizar Usuario";
      let datos = JSON.parse(sessionStorage.getItem('usuario'));
      this.usuario = new Usuario(datos._id,datos.NombreUsuario,datos.Contrasena,datos.Email);
      
      this.formGroup1 = new FormGroup({
        Nombre: new FormControl(this.usuario.NombreUsuario,[Validators.required]),
        Email: new FormControl(this.usuario.Email,[Validators.required])
      })
      this.formGroup2 = new FormGroup({
        ContrasenaUsuario: new FormControl('',[Validators.required]),
        Contrasena: new FormControl('',[Validators.required]),
        Contrasena2: new FormControl('',[Validators.required]),
      })
    }
  }

  

  ngOnInit(): void {
  }

  actualizarUsuario(NombreUsuario,Email){
    let usuario = new Usuario(this.usuario._id,NombreUsuario.value,this.usuario.Contrasena,Email.value);
    this.ApiUsuarioService.actualizarUsuario(usuario).subscribe(data =>{
      if(data["res"]!==false){
        /*sweetAlert({
          title: "Usuario actualizado",
          icon: "success",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        }).then((resultado) =>{
          if(resultado==true){
            sessionStorage.setItem('usuario', JSON.stringify({_id: usuario._id,NombreUsuario: NombreUsuario.value,Contrasena: usuario.Contrasena,Email: Email.value}));
          }
        })*/
        Swal.fire({
          title: "Usuario actualizado",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
        }).then((resultado) =>{
          if(resultado.value==true){
            sessionStorage.setItem('usuario', JSON.stringify({_id: usuario._id,NombreUsuario: NombreUsuario.value,Contrasena: usuario.Contrasena,Email: Email.value}));
          }
        })
      }else{
        /*sweetAlert({
          title: "No se ha podido actualizar el usuario",
          icon: "error",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        })*/  
        Swal.fire({
          title: "No se ha podido actualizar el usuario",
          icon: "error",
          confirmButtonText: 'Aceptar',
        })
      }
    });
  }

  actualizarContrasenaUsuario(ContrasenaUsuario,Contrasena,Contrasena2){
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    this.ApiUsuarioService.buscarUsuarioId(usuario._id).subscribe(async data =>{
        if(await ContrasenaC.compararContrasenas(ContrasenaUsuario.value,data[0].Contrasena)){
          if(Contrasena.value==Contrasena2.value){
            let ContrasenaH = await ContrasenaC.encriptarContrasena(Contrasena.value);
            let usuarioActualizar = new Usuario(usuario._id,usuario.NombreUsuario,ContrasenaH,usuario.Email)
            this.ApiUsuarioService.actualizarUsuario(usuarioActualizar).subscribe(data =>{
              if(data["res"]==false){
                /*sweetAlert({
                  title: "Error al cambiar la contraseña",
                  icon: "error",
                  buttons: {aceptar:{text:"Aceptar",value:true}},
                  dangerMode: true,
                })*/ 
                Swal.fire({
                  title: "Error al cambiar la contraseña",
                  icon: "error",
                  confirmButtonText: 'Aceptar',
                })
              }else{
                /*sweetAlert({
                  title: "Exito",
                  text: "Contraseña cambiada",
                  icon: "success",
                  buttons: {aceptar:{text:"Aceptar",value:true}},
                  dangerMode: true,
                });*/
                Swal.fire({
                  title: "Exito",
                  text: "Contraseña cambiada",
                  icon: "success",
                  confirmButtonText: 'Aceptar',
                })
              }
            })
          }else{
            /*sweetAlert({
              title: "Las contraseñas no son iguales",
              icon: "error",
              buttons: {aceptar:{text:"Aceptar",value:true}},
              dangerMode: true,
            })*/ 
            Swal.fire({
              title: "Las contraseñas no son iguales",
              icon: "error",
              confirmButtonText: 'Aceptar',
            })
          }
        }else{
          /*sweetAlert({
            title: "La contraseña actual no es correcta",
            icon: "error",
            buttons: {aceptar:{text:"Aceptar",value:true}},
            dangerMode: true,
          })
          */
         Swal.fire({
          title: "La contraseña actual no es correcta",
            icon: "error",
          confirmButtonText: 'Aceptar',
        }) 
        }
    })
  }
}
