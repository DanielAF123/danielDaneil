import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { Global } from '../global/global';


@Component({
  selector: 'app-visualizar-trabajadores',
  templateUrl: './visualizar-trabajadores.component.html',
  styleUrls: ['./visualizar-trabajadores.component.css']
})
export class VisualizarTrabajadoresComponent implements OnInit {
  trabajadores=[];
  id=null;
  tr=null;
  tbody=null;
  datos={Nombre:'',Apellidos:'',Ocupacion:'',Sueldo:'',FNI:'',FNF:''};
  pagina=0;
  paginasTotales;
  totalDeTrabajadores;

  constructor(private global: Global,private apiService: ApiService,private formBuilder: FormBuilder,private router:Router) {
    if(sessionStorage.getItem('usuario')==null){
      this.router.navigate(['']);
      console.log("Usuario No registrado")
    }else{
      this.perfil();
    this.apiService.buscarTrabajadorNombre("","","","",null,null,0).subscribe(data =>{this.trabajadores = data,console.log(this.trabajadores)});
    this.apiService.numeroDeTrabajadores("","","","",null,null).subscribe(data =>{this.totalDeTrabajadores=data["res"]
    this.numeroTotalPag()
    this.comprobarBotones()
  });
    let pagina = document.getElementById("texto");
    pagina.textContent = "Visualizar Trabajadores";
    window.addEventListener('load',function(){
      let anterior = document.getElementById('anterior');
      let siguiente = document.getElementById('siguiente');

      anterior.dataset.pag="-5";
      anterior.style.display="none";
      siguiente.dataset.pag="5";
      /*
        Revisar filtros
        Paginacion cuando hay solo 5 registros no puedas darle a siguiente
      */ 
    },false);
  }
  }

  ngOnInit(): void {
  }

  formBusqueda = new FormGroup({
    campoBusquedaNombre: new FormControl('',),
    campoBusquedaSueldo: new FormControl('',Validators.min(0)),
  })

  buscarTrabajadorNombre(Nombre,Apellidos,Ocupacion,Sueldo,FNI,FNF){
    this.datos.Nombre=Nombre;
    this.datos.Apellidos=Apellidos;
    this.datos.Ocupacion=Ocupacion;
    this.datos.Sueldo=Sueldo;
    this.datos.FNI=FNI;
    this.datos.FNF=FNF;
    var arrayFechaI = (FNI).split("-");
    var arrayFechaF = (FNF).split("-");
    this.apiService.numeroDeTrabajadores(Nombre,Apellidos,Ocupacion,Sueldo,new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1)).subscribe(data =>{this.totalDeTrabajadores=data["res"]
    this.numeroTotalPag()
    this.numeroTotalPag()
    this.comprobarBotones();
  });
    this.apiService.buscarTrabajadorNombre(Nombre,Apellidos,Ocupacion,Sueldo,new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1),0).subscribe(data =>{
      this.trabajadores = data,console.log(this.trabajadores)
    }) 
    this.pagina=0;
  }

  async seleccionarId(tr){
    let id = tr.children[0].textContent;
      this.id=id;
      this.actualizar();
  }

  actualizar(){
    /*sweetAlert({
      title: "Actualizar este usuario"+this.id,
      text: "Se perdera la busqueda realizada",
      icon: "warning",
      buttons: {cancelar:{text:"Cancelar",value:false},aceptar:{text:"Aceptar",value:true}},
      dangerMode: true,
    }).then((resultado) =>{
      console.log(resultado)
      if(resultado==true){
        this.router.navigate(['/actualizarTrabajador'],{queryParams: {id: this.id}});
      }
    })*/
    Swal.fire({
      title: "Actualizar este usuario"+this.id,
      text: "Se perdera la busqueda realizada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
    }).then((resultado) =>{
      console.log(resultado)
      if(resultado.value==true){
        this.router.navigate(['/actualizarTrabajador'],{queryParams: {id: this.id}});
      }
    })
      
  }

  anadirTrabajador(){
    /*sweetAlert({
      title: "¿Salir de esta pagina?",
      text: "Se perdera la busqueda realizada",
      icon: "warning",
      buttons: {cancelar:{text:"Cancelar",value:false},aceptar:{text:"Aceptar",value:true}},
      dangerMode: true,
    }).then((resultado) =>{
      console.log(resultado)
      if(resultado==true){
        this.router.navigate(['/anadirTrabajador']);
      }
    })*/
    Swal.fire({
      title: "¿Salir de esta pagina?",
      text: "Se perdera la busqueda realizada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) =>{
      console.log(resultado)
      if(resultado.value==true){
        this.router.navigate(['/anadirTrabajador']);
      }
    })
  }

  paginacion(anterior,siguiente,accion,numeroPag){
    console.log(this.pagina)
    if(accion=="siguiente"){
      numeroPag.textContent=parseInt(numeroPag.textContent)+1;
      this.pagina=this.pagina+1;
      var arrayFechaI = (this.datos["FNI"]).split("-");
    var arrayFechaF = (this.datos["FNF"]).split("-");
    this.apiService.buscarTrabajadorNombre(this.datos["Nombre"],this.datos["Apellidos"],this.datos["Ocupacion"],this.datos["Sueldo"],new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1),this.pagina*5).subscribe(data =>{
      this.trabajadores = data,console.log(this.trabajadores)
    }) 
    }else{
      numeroPag.textContent=parseInt(numeroPag.textContent)-1;
      this.pagina=this.pagina-1;
      var arrayFechaI = (this.datos["FNI"]).split("-");
      var arrayFechaF = (this.datos["FNF"]).split("-");
      this.apiService.buscarTrabajadorNombre(this.datos["Nombre"],this.datos["Apellidos"],this.datos["Ocupacion"],this.datos["Sueldo"],new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1),this.pagina*5).subscribe(data =>{
        this.trabajadores = data,console.log(this.trabajadores)
      })  
    }
    this.comprobarBotones();
    //CUANDO REALIZO UNA BUSQUEDA FALLIDA Y BUSCO ALGO QUE SI EXISTE NO REALIZA BIEN LA PAGINACION
    /*if(this.pagina==0){
      anterior.style.display="none"
    }else{
      anterior.style.display="inline-block"
    }
    if(this.pagina+5>=this.totalDeTrabajadores){
      siguiente.style.display="none"
    }else{
      siguiente.style.display="inline-block"
    }*/
  }

    comprobarBotones(){
      let anterior = document.getElementById('anterior');
      let siguiente = document.getElementById('siguiente');
      if(this.pagina==0){
        anterior.style.display="none"
      }else{
        anterior.style.display="inline-block"
      }
      if(this.pagina==this.paginasTotales-1){
        siguiente.style.display="none"
      }else{
        siguiente.style.display="inline-block" 
      }
    }

    numeroTotalPag(){
      let numero = this.totalDeTrabajadores/5
      let entero = Math.trunc(numero)
      let decimal = numero-entero;
      console.log(decimal)
      if(decimal==0){
        if(entero==0){
          this.paginasTotales=1
        }else{
        this.paginasTotales=entero;
      }
        console.log(this.paginasTotales)
      }else{
        this.paginasTotales=entero+1;
        console.log(this.paginasTotales)
      }
    }
  
    reiniciarNumeroPag(){
      let pag = document.getElementById('numeroPag');
      console.log(pag)
      pag.textContent="1";
    }
    perfil(){
      let div = document.getElementById("usuario")

      div.style.display=""
      let div2 = document.getElementById("usuarioExiste")
      
      div2.style.display=""
    }
}
