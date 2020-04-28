import { Component, OnInit } from '@angular/core';
import { ContrasenaC } from '../contrasena'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { 
    a();
    async function a(){
    let Contrasena = await ContrasenaC.compararContrasenas("paso","paso")
    console.log(Contrasena)
  }

  }

  ngOnInit(): void {
  }

}
