import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraPadraoComponent } from './calculadora-padrao.component';

describe('CalculadoraPadraoComponent', () => {
  let component: CalculadoraPadraoComponent;
  let fixture: ComponentFixture<CalculadoraPadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculadoraPadraoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
