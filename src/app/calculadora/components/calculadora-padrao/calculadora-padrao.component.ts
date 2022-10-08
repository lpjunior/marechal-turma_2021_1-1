import { Component, OnInit } from '@angular/core';
import {CalculadoraModel} from "../../model/calculadora.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculadora-padrao',
  templateUrl: './calculadora-padrao.component.html',
  styleUrls: ['./calculadora-padrao.component.css']
})
export class CalculadoraPadraoComponent implements OnInit {

  resultado: number | undefined;
  calculadoraForm!: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.calculadoraForm = this.formBuilder.group({
      primeiroNumero: ['', [Validators.required/*, Validators.pattern(/^[0-9]/)*/]],
      segundoNumero: ['', [Validators.required/*, Validators.pattern(/^[0-9]/)*/]],
      operador: ['', [Validators.required]],
    });
  }

  processaCalculo() {
    const calc = this.calculadoraForm.getRawValue() as CalculadoraModel;

    if(calc.operador === '+') {
      this.soma(calc.primeiroNumero, calc.segundoNumero);
    }
  }

  soma(primeiro:number, segundo:number): void {
    this.resultado = primeiro + segundo;
  }

  get primeiroNumero() { return this.calculadoraForm.get('primeiroNumero')!; }
  get segundoNumero() { return this.calculadoraForm.get('segundoNumero')!; }
  get operador() { return this.calculadoraForm.get('operador')!; }

}
