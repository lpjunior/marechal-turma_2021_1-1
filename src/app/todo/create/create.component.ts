import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/todo/services/todo.service';
import { TodoStatus } from '../enums/status.enum';
import { TodoModel } from '../models/todo.model';

@Component({
  selector: 'todo-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  todoForm!: FormGroup;
  msg!:string;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      nome: [
        '', // valor inicial do input(elemento)
        [ // validações
          Validators.required, // campo requirido
          Validators.pattern(/^[A-zÀ-ú0-9 ]+$/), // somente letras a-Z e números de 0-9
          Validators.minLength(4), // minimo de caracteres
          Validators.maxLength(150) // maximo de caracteres
        ]
      ], // formControl
    });
  } // services/todo

  cadastrar() {
    const todo = this.todoForm.getRawValue() as TodoModel;
    todo.nome = this.todoForm.get('nome')!.value;
    todo.status = TodoStatus.PENDENTE;
    this.todoService.cadastrar(todo).subscribe({
      next: () => {
        this.todoForm.reset();
        this.msg = "Cadastrado com sucesso.";
      },
      error: (err) => {
        console.error(err);
        this.todoForm.reset();
        this.msg = "Falha ao cadastrar.";
      }
   });
  }

  get getNome() { return this.todoForm.get('nome')!; }
}
