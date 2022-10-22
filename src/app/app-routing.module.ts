import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './todo/create/create.component';
import { ListComponent } from './todo/list/list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'todo/list',
    pathMatch: 'full'
  },
  {
    path:'todo/create',
    component: CreateComponent
  },
  {
    path:'todo/list',
    component: ListComponent
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
