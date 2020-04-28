import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { Usuario } from '../../usuario';
import { ApiUsuarioService } from '../../api-usuario.service'
import { ContrasenaC } from '../../contrasena'

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  constructor(private ApiUsuarioService: ApiUsuarioService,private formBuilder: FormBuilder,private router:Router) {
    if(sessionStorage.getItem('usuario')==null){
      let pagina = document.getElementById("texto");
      pagina.textContent = "Recuperar Contraseña";
      this.ocultarPerfil();
    }else{
  this.router.navigate(['/visualizarTrabajador']);
    }
   }

  ngOnInit(): void {
  }
  formGroup1 = new FormGroup({
    Nombre: new FormControl('',[Validators.required]),
  })

  recuperarContrasena(NombreEmail){
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
            //Email correcto
            this.email(res)
          }
        })
      }else{
        //Nombre correcto
        this.email(res)
      }
    })
    
  }

  login(){
    this.router.navigate(['/'])
  }

  async email(res){
    let usuario
    let numero = Math.floor(Math.random()*(9999 - 1000))+1000;
            let contrasena = await ContrasenaC.encriptarContrasena(numero.toString());
            usuario = new Usuario(res[0]._id,res[0].NombreUsuario,contrasena,res[0].Email);
            console.log(usuario)
            this.ApiUsuarioService.actualizarUsuario(usuario).subscribe(data =>{
              console.log(data)
            })
            this.ApiUsuarioService.recuperarContrasena(numero,res[0].Email).subscribe(async data =>{
              if(data["res"]==false){
                sweetAlert({
                  title: "Error",
                  text: "error al enviar el correo",
                  icon: "error",
                  buttons: {aceptar:{text:"Aceptar",value:true}},
                  dangerMode: true,
                }) 
              }else{
                sweetAlert({
              title: "Correcto",
              text: "Contraseña actualizada",
              icon: "success",
              buttons: {aceptar:{text:"Aceptar",value:true}},
              dangerMode: true,
            })
            this.router.navigate(["/"]) 
              }
            });
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
