import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TodoStatusLabel } from '../enums/status.enum';
import { TodoModel } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos!:TodoModel[];
  displayedColumns: string[] = ['todo', 'status', 'dataCriacao', 'dataFinalizacao'];
  dataSource!:MatTableDataSource<TodoModel>;
  clickedRow!:TodoModel;

  constructor(
    private todoService: TodoService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.todos = this.todoService.listar();
    this.dataSource = new MatTableDataSource(this.todos);
  }

  listar(): TodoModel[] {
    return this.todos;
  }

  remover(id:string): void {
    this.todoService.remover(id);
  }

  todoStatusLabel(status:number):string {
    return TodoStatusLabel.get(status)!;
  }

  alterarStatus(id:string): void {}
  editar(id:string): void {
    this.router.navigate(["/todo/edit", id]);
  }
}
