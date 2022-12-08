import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../model/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { CorreiosService } from '../services/correios.service';
import { Endereco } from '../model/endereco.model';
import { Console } from 'console';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  clienteForm!: FormGroup;
  cliente!:Cliente;
  editable:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.clienteForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15)]],
        logradouro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        numero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern(/^[0-9]+$/)]],
        bairro: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        cidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      });

      this.route.paramMap.subscribe(params => {
        const clienteId = +params.get('id')!;

        if(clienteId) {
          this.clienteService.findCliente(clienteId).subscribe({
            next: (clienteDB: Cliente) => {
              this.cliente = clienteDB;
              this.editable = true;
              this.loadForm();
            },
            error: (err) => console.log(err)
          });
        }
      });
  }

  addCliente() {
    const newCliente = this.clienteForm.getRawValue() as Cliente;


    this.clienteService.insertCliente(newCliente)
    .subscribe({
      next: () => {
        this.clienteForm.reset();
        this.router.navigateByUrl('/tabs/tab2');
      },
      error: (error:any) => { console.log(error) }
    });
  }

  loadForm() {
    this.clienteForm.patchValue({
      nome: this.cliente.nome,
      email: this.cliente.email,
      telefone: this.cliente.telefone,
      logradouro: this.cliente.logradouro,
      numero: this.cliente.numero,
      bairro: this.cliente.bairro,
      cidade: this.cliente.cidade,
      cep: this.cliente.cep
    });
  }

  loadEndereco() {
    const cep:string = this.clienteForm.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result:Endereco) => {
        this.clienteForm.patchValue({
          logradouro: result.logradouro,
          bairro: result.bairro,
          cidade: result.localidade,
          cep: result.cep
        });
      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  editCliente() {
    const editCliente = this.clienteForm.getRawValue() as Cliente;
    editCliente.id = this.cliente.id;

    this.clienteService.updateCliente(editCliente).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab2');
        this.clienteForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.clienteForm.reset();
      }
    });
  }
}
