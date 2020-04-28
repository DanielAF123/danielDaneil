import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cerrarsesion',
  templateUrl: './cerrarsesion.component.html',
  styleUrls: ['./cerrarsesion.component.css']
})
export class CerrarsesionComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/'])
  }

}
