import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoModel } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  todoForm!: FormGroup;
  todo!:TodoModel;
  msg!:string;

  constructor(
    private service: TodoService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.todo = this.service.localizarPorId(id);

    this.todoForm = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-zÀ-ú0-9 ]+$/),
          Validators.minLength(4),
          Validators.maxLength(150)
        ]
      ],
      status: [
        '',
        [ Validators.required ]
      ],
    });

    this.loadForm(this.todo);
  }

  editar(){
    this.todo.nome = this.todoForm.get('nome')!.value;
    this.todo.status = +this.todoForm.get('status')!.value;

    this.service.atualizar(this.todo);
    this.msg = "Atualizado com sucesso."
  }

  loadForm(todo:TodoModel): void {
    this.todoForm.patchValue({
      nome: todo.nome,
      status: ''+todo.status
    });
  }

  get getNome() { return this.todoForm.get('nome')!; }
}
