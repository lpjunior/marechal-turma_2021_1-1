import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateComponent } from './create/create.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[CreateComponent],
  providers: [TodoService]
})
export class TodoModule { }
