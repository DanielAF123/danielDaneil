import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminartrabajadorComponent } from './eliminartrabajador.component';

describe('EliminartrabajadorComponent', () => {
  let component: EliminartrabajadorComponent;
  let fixture: ComponentFixture<EliminartrabajadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminartrabajadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminartrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
