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

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      inputNome: [
        '', // valor inicial do input(elemento)
        [ // validações
          Validators.required, // campo requirido
          Validators.pattern(/^[a-zA-Z0-9 ]+$/), // somente letras a-Z e números de 0-9
          Validators.minLength(4), // minimo de caracteres
          Validators.maxLength(150) // maximo de caracteres
        ]
      ], // formControl
    });
  } // services/todo

  cadastrar() {
    const todo = this.todoForm.getRawValue() as TodoModel;
    todo.nome = this.todoForm.get('inputNome')!.value;
    todo.dataCriacao = new Date();
    todo.status = TodoStatus.PENDENTE;

    this.todoService.cadastrar(todo);
  }

  get getNome() { return this.todoForm.get('inputNome')!; }
}
