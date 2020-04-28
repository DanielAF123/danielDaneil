import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Trabajador } from '../trabajador';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../global/global'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-actualizar-trabajador',
  templateUrl: './actualizar-trabajador.component.html',
  styleUrls: ['./actualizar-trabajador.component.css']
})
export class ActualizarTrabajadorComponent implements OnInit {

  private trabajador;
  formActualizar = new FormGroup({
    id: new FormControl(),
    //El patron del nombre permite nombres compuestos por eso requiere que almenos tenga el campo 2 letras al insertar el valor
    Nombre: new FormControl(),
    Apellidos: new FormControl(),
    FechaNac: new FormControl(),
    Ocupacion: new FormControl(),
    Sueldo: new FormControl()
  });

  constructor(private global: Global,private apiService: ApiService,private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router) { 
    if(sessionStorage.getItem('usuario')==null){
      this.router.navigate(['']);
    }else{
      let pagina = document.getElementById("texto");
      pagina.textContent = "Actualizar trabajador";
    this.route.queryParams.subscribe(params => {
      this.apiService.buscarTrabajadorId(params.id).subscribe(data => {
        this.trabajador = data;
        console.log(this.formActualizar)
        let Fecha = new Date(this.trabajador[0].FechaNac)
        let dia,mes;
        console.log(Fecha.getFullYear()+"-"+Fecha.getMonth()+"-"+Fecha.getDay())
        if(Fecha.getMonth()<10){
          mes = "0"+Fecha.getMonth();
        }else{
          mes = Fecha.getMonth();
        }
        if(Fecha.getDay()<10){
          dia = "0"+Fecha.getDay();
        }else{
          dia = Fecha.getDay();
        }
        this.formActualizar = new FormGroup({
          id: new FormControl(this.trabajador[0]._id,[Validators.required,Validators.pattern('^([0-9])*$')]),
          //El patron del nombre permite nombres compuestos por eso requiere que almenos tenga el campo 2 letras al insertar el valor
          Nombre: new FormControl(this.trabajador[0].Nombre,[Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
          Apellidos: new FormControl(this.trabajador[0].Apellidos,[Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$')]),
          FechaNac: new FormControl(Fecha.getFullYear()+"-"+mes+"-"+dia,Validators.required),
          Ocupacion: new FormControl(this.trabajador[0].Ocupacion,[Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
          Sueldo: new FormControl(this.trabajador[0].Sueldo,[Validators.required,Validators.min(0)])
        })
      });
    });
    window.addEventListener('load',function(){
      let pagina = document.getElementById("texto");
    pagina.textContent = "Actualizar Trabajador";
    },false);
  }
  }

  ngOnInit(): void {
  }

  actualizarTrabajador(id,Nombre,Apellidos,FechaNac,Ocupacion,Sueldo){
    let valor;
    var arrayFecha = (FechaNac).split("-");
    var Trabajador1 = new Trabajador(id,Nombre,Apellidos,new Date(parseInt(arrayFecha[0]),parseInt(arrayFecha[1])-1,parseInt(arrayFecha[2])+1),Ocupacion,Sueldo);
    this.apiService.actualizarTrabajador(Trabajador1).subscribe(data =>{
      valor=data;
      if(valor.res==false){
        /*sweetAlert({
          title: "No se ha podido actualizar el trabajador",
          icon: "error",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        })*/
        Swal.fire({
          title: "No se ha podido actualizar el trabajador",
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })  
      }else{
        /*sweetAlert({
          title: "Trabajador actualizado",
          text: "Se te redirigira hacia la ventada de visualizacion de Trabajadores",
          icon: "success",
          buttons: {aceptar:{text:"Aceptar",value:true}},
          dangerMode: true,
        }).then((resultado) =>{
          console.log(resultado)
          if(resultado==true){
            this.rVisualizar();
          }
        })*/
        Swal.fire({
          title: "Trabajador actualizado",
          text: "Se te redirigira hacia la ventada de visualizacion de Trabajadores",
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
        }).then((resultado) =>{
          console.log(resultado)
          if(resultado.value==true){
            this.rVisualizar();
          }
        })
      }
    });
  }

  rVisualizar(){
    this.router.navigate(['/visualizarTrabajador']);
  }

}
