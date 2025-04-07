import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Problem } from '../../problem';
import { Solution } from '../../solution';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionStep } from '../../solutionStep';
import { SolutionService } from '../../services/solution.service';
import { ProblemService } from '../../services/problem.service';
import { error } from 'node:console';

@Component({
  selector: 'solve-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './solve.component.html',
  styleUrl: './solve.component.css',
  providers: [ ProblemService ]
})
export class SolveComponent {
  title = 'solve LightsOut';

  problems: Problem[] = []
  problemSequence: number[][] = [];
  arrayProblem: number[] = [];
  sizeOfProblem: boolean[][] = [];
  ngZone: any;



  constructor(
    private problemService: ProblemService,
    private router: Router,
  ) {}




  ngOnInit(): void {
    this.getData() //fetching data

  }

  reloadPage() { //force reload page
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }

  getData() {  // fetching data from DB
    this.problemService.getProblems().subscribe(
      (data: Problem[]) => {

        this.problems = data;

        this.sortBySize();  //sorting data - smallest first
        this.processProblems() //asigning
      },
      (error) => {
        console.error('Error fetching problems:', error);
      });
  }

  processProblems(): void {  //saving
    for (let pr in this.problems) {
      this.problemSequence.push(this.problems[pr].sequence); //fill sequence array
      this.sizeOfProblem[Number(pr)] = new Array(Math.sqrt(this.problems[pr].sequence.length)).fill(null);  //length for each riddle size
    }
  }
  
  getIndex(x: number, y: number, i: number): number { //index of button
   let size = Math.sqrt(this.problems[i].sequence.length)
   return y + (x * size); 
  }

  sortBySize(): void { //sorting on front
    this.problems.sort((a, b) => {
        const sizeA = a.sequence.length
        const sizeB = b.sequence.length
        return sizeA - sizeB;
    });
  }


}
