import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatosCategoriaComponent } from './platos-categoria.component';

describe('PlatosCategoriaComponent', () => {
  let component: PlatosCategoriaComponent;
  let fixture: ComponentFixture<PlatosCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatosCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatosCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
