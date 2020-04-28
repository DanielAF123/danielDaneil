import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Global } from './global/global'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AplicicacionFinal';
  constructor(private global: Global,private apiService: ApiService,private route: Router){
    window.addEventListener('load',this.cambiarCss,false);
  }
  cambiarCss(){
    let aside = document.getElementById("aside");
    aside.style.height = (window.screen.availHeight-48)+"px";
  }
  paginaActual(texto){
    let pagina = document.getElementById("texto");
    pagina.textContent = texto;
  }
}

