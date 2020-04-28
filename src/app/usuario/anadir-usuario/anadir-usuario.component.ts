import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { Usuario } from '../../usuario';
import { ApiUsuarioService } from '../../api-usuario.service'
import * as bcrypt from 'bcryptjs';
import { ContrasenaC } from '../../contrasena'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-anadir-usuario',
  templateUrl: './anadir-usuario.component.html',
  styleUrls: ['./anadir-usuario.component.css']
})
export class AnadirUsuarioComponent implements OnInit {

  constructor(private ApiUsuarioService: ApiUsuarioService,private formBuilder: FormBuilder,private router:Router) { 
    if(sessionStorage.getItem('usuario')==null){
      let pagina = document.getElementById("texto");
      pagina.textContent = "Registrarse";
      this.ocultarPerfil();
    }else{
  this.router.navigate(['/visualizarTrabajador']);
    }

  }

  ngOnInit(): void {
  }

  formGroup1 = new FormGroup({
    Nombre: new FormControl('',[Validators.required]),
    Email: new FormControl('',[Validators.required]),
    Contrasena: new FormControl('',[Validators.required]),
  })

  anadirUsuario(Nombre,Email,Contrasena){
    let res=[];
    this.ApiUsuarioService.buscarUsuarioNombre(Nombre.value).subscribe(data =>{
      res=data;
      if(res.length==0){
        this.ApiUsuarioService.buscarUsuarioEmail(Email.value).subscribe(async data =>{
          res=data;
      if(res.length==0){
          let ContrasenaH = await ContrasenaC.encriptarContrasena(Contrasena.value)
          console.log(ContrasenaH)
        let usuario= new Usuario(null,Nombre.value,ContrasenaH,Email.value);
        this.ApiUsuarioService.anadirUsuario(usuario).subscribe(data =>{
          console.log(data["res"])
          if(data["res"]==false){
            /*sweetAlert({
              title: "Error al registrarse",
              icon: "error",
              buttons: {aceptar:{text:"Aceptar",value:true}},
              dangerMode: true,
            }) */
            Swal.fire({
              title: "Error al registrarse",
              icon: "error",
              confirmButtonText: 'Aceptar',
            })
          }else{
            this.ApiUsuarioService.buscarUsuarioNombre(Nombre.value).subscribe(data =>{
              res=data;
              usuario = new Usuario(res[0]._id,res[0].NombreUsuario,res[0].Contrasena,res[0].Email);
              sessionStorage.setItem('usuario', JSON.stringify({_id: usuario._id,NombreUsuario: usuario.NombreUsuario,Contrasena: usuario.Contrasena,Email: usuario.Email}));
            this.router.navigate(['/visualizarTrabajador']);
            })
          }
        })
      }else{
        /*sweetAlert({
          title: "Error al registrarse",
          text: "Direccion de correo ya en uso",
          icon: "error",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        })*/
        Swal.fire({
          title: "Error al registrarse",
          text: "Direccion de correo ya en uso",
          icon: "error",
          confirmButtonText: 'Aceptar',
        })
      }
        })
      }else{
        /*sweetAlert({
          title: "Error al registrarse",
          text: "Nombre de usuario ya en uso",
          icon: "error",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        }) */
        Swal.fire({
          title: "Error al registrarse",
          text: "Nombre de usuario ya en uso",
          icon: "error",
          confirmButtonText: 'Aceptar',
        })
      }
    })
  }
  
  login(){
    this.router.navigate(['/'])
  }
  ocultarPerfil(){
    let div = document.getElementById("usuario");
    let div2 = document.getElementById("usuarioExiste")
    if(div){
      div.style.display="none"
      div2.style.display="none"
    }
  }
}
