import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos!:TodoModel[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.listar();
  }

  listar(): TodoModel[] {
    return this.todos;
  }

  remover(id:string): void {
    // typescript manipular o html aplicando o confirm
    this.todoService.remover(id);
  }
  alterarStatus(): void {}
  editar(): void {}
}
