import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirTrabajadorComponent } from './anadir-trabajador.component';

describe('AnadirTrabajadorComponent', () => {
  let component: AnadirTrabajadorComponent;
  let fixture: ComponentFixture<AnadirTrabajadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirTrabajadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
