import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './todo/create/create.component';

const routes: Routes = [
  {
    path: 'todo/create',
    component: CreateComponent
  },
];

// criação(create) -> /create
// edição(edit) -> /edit
// listagem(list) -> /list
// visuação(view) -> /{id}
// compartilhamento(shared) /{id}/shared

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
