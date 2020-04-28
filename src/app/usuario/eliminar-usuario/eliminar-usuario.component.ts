import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { Usuario } from '../../usuario';
import { ApiUsuarioService } from '../../api-usuario.service'
import { ContrasenaC } from '../../contrasena'


@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  constructor(private ApiUsuarioService: ApiUsuarioService,private formBuilder: FormBuilder,private router:Router) { 
    if(sessionStorage.getItem('usuario')==null){
      this.router.navigate(['']);
    }
    let pagina = document.getElementById("texto");
      pagina.textContent = "Eliminar Usuario";
  }

  ngOnInit(): void {
  }
  formGroup1 = new FormGroup({
    Contrasena: new FormControl('',[Validators.required]),
  })

  eliminarUsuario(Contrasena){
    let id = JSON.parse(sessionStorage.getItem("usuario"))._id
    this.ApiUsuarioService.buscarUsuarioId(id).subscribe(async data =>{
      if(await ContrasenaC.compararContrasenas(Contrasena.value,data[0].Contrasena)){
        sweetAlert({
          title: "Contraseña correcta",
          text: "¿Estas seguro de eliminar tu usuario?",
          icon: "success",
          buttons: {cancelar:{text:"No eliminar",value:false},aceptar:{text:"Eliminar usuario",value:true}},
          dangerMode: true,
        }).then((resultado) =>{
          console.log(resultado)
          if(resultado==true){
            this.ApiUsuarioService.eliminarUsuario(data[0]._id).subscribe(data =>{
              if(data[""]==false){
                sweetAlert({
                  title: "Error al eliminar el usuario",
                  icon: "error",
                  buttons: {aceptar:{text:"Aceptar",value:true}},
                  dangerMode: true,
                })        
              }else{
                this.router.navigate(['/cerrarSesion']);
              }
            })
          }else{

          }
        })
      }else{
        sweetAlert({
          title: "Contraseña erronea",
          icon: "error",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        }) 
      }
    })
  }

}
