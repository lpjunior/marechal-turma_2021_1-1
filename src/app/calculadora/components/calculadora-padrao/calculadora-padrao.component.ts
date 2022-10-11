import { Component, OnInit } from '@angular/core';
import {CalculadoraModel} from "../../model/calculadora.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculadora-padrao',
  templateUrl: './calculadora-padrao.component.html',
  styleUrls: ['./calculadora-padrao.component.css']
})
export class CalculadoraPadraoComponent implements OnInit {

  resultado!: number | string;
  calculadoraForm!: FormGroup;

  // KeyValuePair
  operadoresView: { [key: string] : string } = {
    '+': 'Soma',
    '-': 'Subtração',
    '*': 'Multiplicação',
    '/': 'Divisão',
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.calculadoraForm = this.formBuilder.group({
      primeiroNumero: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      segundoNumero: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      operador: ['', [Validators.required, Validators.pattern(/^[\+|\-|\*|\/]$/)]],
    });
  }

  processaCalculo() {
    const calc = this.calculadoraForm.getRawValue() as CalculadoraModel;

    // literal object - Objeto literal
    const calculos = {
      "+": (num1:number, num2:number) => num1 + num2,
      "-": (num1:number, num2:number) => num1 - num2,
      "*": (num1:number, num2:number) => num1 * num2,
      "/": (num1:number, num2:number) => {
        if(num2 == 0)
          return 'Operação invalida';
        return num1 / num2;
      },
    }

    this.resultado = calculos[calc.operador as keyof typeof calculos](calc.primeiroNumero, calc.segundoNumero);
  }

  get primeiroNumero() { return this.calculadoraForm.get('primeiroNumero')!; }
  get segundoNumero() { return this.calculadoraForm.get('segundoNumero')!; }
  get operador() { return this.calculadoraForm.get('operador')!; }
}
