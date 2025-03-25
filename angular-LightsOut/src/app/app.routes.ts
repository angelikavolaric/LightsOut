import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './services/components/app.component';
import { SolveComponent } from './services/components/solve-component/solve.component';
import { CreateComponent } from './services/components/create-component/create.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'solve', component: SolveComponent },
    { path: 'create', component: CreateComponent },
    { path: '**', component: SolveComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }