import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarTrabajadoresComponent } from './visualizar-trabajadores.component';

describe('VisualizarTrabajadoresComponent', () => {
  let component: VisualizarTrabajadoresComponent;
  let fixture: ComponentFixture<VisualizarTrabajadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarTrabajadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
