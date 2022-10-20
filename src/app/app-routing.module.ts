import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './todo/create/create.component';

const routes: Routes = [
  {
    path:'todo/create',
    component: CreateComponent
  },
];
//criacao -> /create
// edicao -> /edit
// listagem -> list
// visualizacao -> /{id}
//compartilhamento /{id}/shared

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
