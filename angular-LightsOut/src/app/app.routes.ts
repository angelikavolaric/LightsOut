import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { SolveComponent } from './components/solve-component/solve.component';
import { CreateComponent } from './components/create-component/create.component';
import { RiddleComponent } from './components/riddle-component/riddle.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'solve', component: SolveComponent },
    { path: 'create', component: CreateComponent },
    { path: 'riddle/:_id', component: RiddleComponent },
    { path: '**', component: CreateComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }