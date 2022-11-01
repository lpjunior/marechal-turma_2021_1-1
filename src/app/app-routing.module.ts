import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './todo/create/create.component';
import { EditComponent } from './todo/edit/edit.component';
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
  {
    path:'todo/edit/:id',
    component: EditComponent
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
