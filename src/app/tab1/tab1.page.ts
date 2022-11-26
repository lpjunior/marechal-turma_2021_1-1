import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../model/cliente.model';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  clienteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
      this.clienteForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15)]],
        logradouro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        numero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern(/^[0-9]+$/)]],
        bairro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        cidade: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      });
  }

  addCliente() {
    const newCliente = this.clienteForm.getRawValue() as Cliente;


    this.clienteService.insertCliente(newCliente)
    .subscribe({
      next: (result:any) => {
        this.clienteForm.reset();
        this.router.navigateByUrl('/tabs/tab2');
      },
      error: (error:any) => { console.log(error) }
    });
  }
}
