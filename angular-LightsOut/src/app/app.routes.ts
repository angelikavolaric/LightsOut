import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { SolveComponent } from './components/solve-component/solve.component';
import { CreateComponent } from './components/create-component/create.component';
import { RiddleComponent } from './components/riddle-component/riddle.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'solve', component: SolveComponent },
    { path: 'create', component: CreateComponent },
    { path: 'riddle/:id', component: RiddleComponent },
    //{ path: '**', component: CreateComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), 
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService), 
        HttpClientModule,
        BrowserModule
        ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  