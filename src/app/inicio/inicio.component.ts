import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { Usuario } from '../usuario';
import { ApiUsuarioService } from '../api-usuario.service'
import { Global } from '../global/global'
import { ContrasenaC } from '../contrasena'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private ApiUsuarioService: ApiUsuarioService,private formBuilder: FormBuilder,private router:Router,private global: Global) {
    if(sessionStorage.getItem('usuario')==null){
      let pagina = document.getElementById("texto");
      pagina.textContent = "Login";
      this.ocultarPerfil();
    }else{
  this.router.navigate(['/visualizarTrabajador']);
    }
    
  }
  
  ngOnInit(): void {
  }
  formGroup1 = new FormGroup({
    Nombre: new FormControl('',[Validators.required]),
    Contrasena: new FormControl('',[Validators.required]),
  })

  inicioDeSesion(NombreEmail,Contrasena){
    let res,usuario;
    this.ApiUsuarioService.buscarUsuarioNombre(NombreEmail.value).subscribe(async data =>{
      res=data;
      if(res.length==0){
        this.ApiUsuarioService.buscarUsuarioEmail(NombreEmail.value).subscribe(async data =>{
          res=data;
          if(res.length==0){
            sweetAlert({
              title: "No se ha podido iniciar sesion",
              text: "Usuario inexistente",
              icon: "error",
              buttons: {aceptar:{text:"Aceptar",value:true}},
              dangerMode: true,
            }) 
          }else{
            if(await ContrasenaC.compararContrasenas(Contrasena.value,res[0].Contrasena)){
              usuario = new Usuario(res[0]._id,res[0].NombreUsuario,res[0].Contrasena,res[0].Email);
              this.global.usuario=usuario;
              sessionStorage.setItem('usuario', JSON.stringify({_id: usuario._id,NombreUsuario: usuario.NombreUsuario,Contrasena: usuario.Contrasena,Email: usuario.Email}));
              this.router.navigate(['/visualizarTrabajador']);
            }else{
              sweetAlert({
                title: "No se ha podido iniciar sesion",
                text: "Contraseña incorrecta",
                icon: "error",
                buttons: {aceptar:{text:"Aceptar",value:true}},
                dangerMode: true,
              })
            }
          }
        })
      }else{
        console.log(res[0].Contrasena)
            console.log(Contrasena.value)
        if(await ContrasenaC.compararContrasenas(Contrasena.value,res[0].Contrasena)){
          usuario = new Usuario(res[0]._id,res[0].NombreUsuario,res[0].Contrasena,res[0].Email);
          sessionStorage.setItem('usuario', JSON.stringify({_id: usuario._id,NombreUsuario: usuario.NombreUsuario,Contrasena: usuario.Contrasena,Email: usuario.Email}));
          this.global.usuario=usuario;
          this.router.navigate(['/visualizarTrabajador']);
        }else{
          sweetAlert({
            title: "No se ha podido iniciar sesion",
            text: "Contraseña incorrecta",
            icon: "error",
            buttons: {aceptar:{text:"Aceptar",value:true}},
            dangerMode: true,
          })
        }
        
      }
    })
    
  }

  anadirUsuario(){
    this.router.navigate(['/anadirUsuario']);
  }
  recordarUsuario(){
    this.router.navigate(['/recuperarContrasena']);
  }

  ocultarPerfil(){
    let div = document.getElementById("usuario");
    let div2 = document.getElementById("usuarioExiste");
    if(div){
      div.style.display="none"
      div2.style.display="none"
    }
  }

}