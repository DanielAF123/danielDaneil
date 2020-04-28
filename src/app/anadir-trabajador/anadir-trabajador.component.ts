import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../trabajador';
import { ApiService } from '../api.service';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { identifierModuleUrl } from '@angular/compiler';
import { Global } from '../global/global'

@Component({
  selector: 'app-anadir-trabajador',
  templateUrl: './anadir-trabajador.component.html',
  styleUrls: ['./anadir-trabajador.component.css']
})
export class AnadirTrabajadorComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private global: Global,private apiService: ApiService,private formBuilder: FormBuilder,private router:Router) {
    if(sessionStorage.getItem('usuario')==null){
      this.router.navigate(['']);
    }else{
    let pagina = document.getElementById("texto");
    pagina.textContent = "Añadir Trabajador";
  }
}
  
  ngOnInit(): void {
  }
  formGroup1 = new FormGroup({
    Nombre: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
    Apellidos: new FormControl('',[Validators.required]),
    FechaNac: new FormControl(null,Validators.required),
    Ocupacion: new FormControl('',[Validators.required]),
    Sueldo: new FormControl(null,[Validators.required,Validators.min(0)])
  })

  anadirTrabajador(dataD,formulario){
    //[id,Nombre,Apellidos,FechaNac,Ocupacion,Sueldo]
    let valor;
    let id =  Date.now()
    var arrayFecha = (dataD[2].value).split("-");
    var Trabajador1 = new Trabajador(id,dataD[0].value,dataD[1].value,new Date(parseInt(arrayFecha[0]),parseInt(arrayFecha[1])-1,parseInt(arrayFecha[2])+1),dataD[3].value,dataD[4].value);
    this.apiService.anadirTrabajador(Trabajador1).subscribe(data =>{
      valor=data;
      if(valor.res==false){
        sweetAlert({
          title: "No se ha podido añadir el trabajador",
          icon: "error",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        })
      }else{
        sweetAlert({
          title: "Trabajador añadido",
          text: "¿Añadir otro usuario?",
          icon: "success",
          buttons: {cancelar:{text:"Si",value:false},aceptar:{text:"No",value:true}},
          dangerMode: true,
        }).then((resultado) =>{
          console.log(resultado)
          if(resultado==true){
            this.router.navigate(['/visualizarTrabajador']);
          }else{
            formulario.reset();
          }
        })
      }
    });
  }

  rVisualizar(){
    this.router.navigate(['/visualizarTrabajador']);
  }

}
