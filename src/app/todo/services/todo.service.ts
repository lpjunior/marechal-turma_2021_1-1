import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import * as uuid from 'uuid';
import { TodoStatus } from '../enums/status.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  // JSON.stringify -> converte o objeto em JSON
  // JSON.parse -> converte o JSON em objeto
  cadastrar(todo: TodoModel): void {
    let todos:TodoModel[] = this.listar();
    todo.id = uuid.v4();
    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  atualizar(todo: TodoModel): void {
    let todos:TodoModel[] = this.listar();

    // normal
    for(let i = 0; i < todos.length; i++) {
      if(todo.id === todos[i].id) {
        todos[i] = todo;
      }
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  localizarPorId(id:string): TodoModel {
    const todos:TodoModel[] = this.listar();
    let todo!:TodoModel;
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id === id) {
        todo = todos[i];
        break;
      }
    }
    return todo;
  }

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  listar(): TodoModel[] {
    return JSON.parse(localStorage.getItem('todos') || '{}') ?? [];
  }

  remover(id:string): void {
    let todos:TodoModel[] = this.listar();

    let novoTodos:TodoModel[] = [];
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id !== id) {
        novoTodos.push(todos[i]);
      }
    }

    todos = novoTodos;

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  alteraStatus(id:string, status:TodoStatus) {
    const todos:TodoModel[] = this.listar();

    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id === id) {
        todos[i].status = status;
        if(status === TodoStatus.CONCLUIDO) {
          todos[i].dataFinalizacao = new Date();
        }
        break;
      }
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
