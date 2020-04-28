import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import sweetAlert from 'sweetalert'
import { Global } from '../global/global'
import { Router } from '@angular/router'

@Component({
  selector: 'app-eliminartrabajador',
  templateUrl: './eliminartrabajador.component.html',
  styleUrls: ['./eliminartrabajador.component.css']
})
export class EliminartrabajadorComponent implements OnInit {

  trabajadores=[];
  respuesta;
  ids=[];
  busqueda="";
  datos={Nombre:'',Apellidos:'',Ocupacion:'',Sueldo:'',FNI:'',FNF:''};
  pagina=0;
  totalDeTrabajadores=0;
  paginasTotales;

  constructor(private global: Global,private router: Router,private apiService: ApiService,private formBuilder: FormBuilder) {
    if(sessionStorage.getItem('usuario')==null){
      this.router.navigate(['']);
    }else{
      let pagina = document.getElementById("texto");
      pagina.textContent = "Eliminar Trabajadores";
    this.apiService.buscarTrabajadorNombre('','','','',null,null,0).subscribe(data =>{this.trabajadores = data,console.log(this.trabajadores)});
    this.apiService.numeroDeTrabajadores('','','','',null,null).subscribe(data =>{this.totalDeTrabajadores = data['res']
    this.numeroTotalPag()
    this.comprobarBotones()
  });
    window.addEventListener('load',function(){
      let anterior = document.getElementById('anterior');
      let siguiente = document.getElementById('siguiente');

      anterior.dataset.pag="-5";
      anterior.style.display="none";
      siguiente.dataset.pag="5";
      let pagina = document.getElementById("texto");
      pagina.textContent = "Eliminar Trabajadores";
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
    this.apiService.numeroDeTrabajadores(Nombre,Apellidos,Ocupacion,Sueldo,new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1)).subscribe(data =>{this.totalDeTrabajadores = data['res']
    this.numeroTotalPag();
    this.reiniciarNumeroPag();
    this.comprobarBotones();
  });
    this.apiService.buscarTrabajadorNombre(Nombre,Apellidos,Ocupacion,Sueldo,new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1),0).subscribe(data =>{
      this.trabajadores = data,console.log(this.trabajadores)
    }) 
    this.pagina=0;
  }

  eliminarTrabajador(){
  sweetAlert({
    title: "¿Eliminar Trabajadores?",
    text: "Se eliminaran completamente de la aplicación",
    icon: "warning",
    buttons: {cancelar:{text:"Cancelar",value:false},aceptar:{text:"Aceptar",value:true}},
    dangerMode: true,
  }).then((resultado) =>{
    console.log(resultado)
    if(resultado==true){
      let valor;
    console.log(this.ids.length)
    if(this.ids.length>0){
    for(var i=0;i<this.ids.length;i++){
    this.apiService.eliminarTrabajador(this.ids[i]).subscribe(data =>{
      valor=data;
      if(valor.res==false){
        console.log("No se ha podido eliminar el trabajador");  
      }else{
        console.log("Trabajador eliminado");  
        if(i==this.ids.length){
    var arrayFechaI = (this.datos.FNI).split("-");
    var arrayFechaF = (this.datos.FNF).split("-");
          this.apiService.buscarTrabajadorNombre(this.datos.Nombre,this.datos.Apellidos,this.datos.Ocupacion,this.datos.Sueldo,new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1),0).subscribe(data =>{this.trabajadores = data,console.log(this.trabajadores)});
          this.apiService.numeroDeTrabajadores(this.datos.Nombre,this.datos.Apellidos,this.datos.Ocupacion,this.datos.Sueldo,new Date(parseInt(arrayFechaI[0]),parseInt(arrayFechaI[1])-1,parseInt(arrayFechaI[2])+1),new Date(parseInt(arrayFechaF[0]),parseInt(arrayFechaF[1])-1,parseInt(arrayFechaF[2])+1)).subscribe(data =>{this.totalDeTrabajadores = data['res']
          this.numeroTotalPag()
            this.reiniciarNumeroPag()
            this.comprobarBotones()
  });
  
          this.ids=[];
          //AL ELMINIAR NO ACTUALIZA BIEN LA PAGINACION
        }
      }
    });
  }
  }
    }
  });
  }

  mostrarDato(tr){
    let id = tr.children[0].textContent;
    if(this.ids.indexOf(id)==-1){
    this.ids.push(id);
    }else{
      this.ids.splice(this.ids.indexOf(id),1);
    }
  }

  paginacion(anterior,siguiente,accion,numeroPag){
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
    //Ocultar boton cuando no se pueda seguir
    this.comprobarBotones();
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

}
