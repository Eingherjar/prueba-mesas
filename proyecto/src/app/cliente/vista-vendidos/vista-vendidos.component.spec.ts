import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVendidosComponent } from './vista-vendidos.component';

describe('VistaVendidosComponent', () => {
  let component: VistaVendidosComponent;
  let fixture: ComponentFixture<VistaVendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaVendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
