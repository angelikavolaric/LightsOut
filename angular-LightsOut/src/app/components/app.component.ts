import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Problem } from '../problem';
import { Solution } from '../solution';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionStep } from '../solutionStep';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LightsOut';

  

}
