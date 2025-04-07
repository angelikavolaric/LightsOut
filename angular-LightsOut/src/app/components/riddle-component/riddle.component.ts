import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Problem } from '../../problem';
import { Solution } from '../../solution';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionStep } from '../../solutionStep';
import { SolutionService } from '../../services/solution.service';
import { ProblemService } from '../../services/problem.service';
import { error } from 'node:console';

@Component({
  selector: 'riddle-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './riddle.component.html',
  styleUrl: './riddle.component.css'
})
export class RiddleComponent {
  title = 'riddle LightsOut';

  
 // problem = Problem; //specific problem
  problem: Problem = {id: "0", sequence: []};//{ id: "33", size: 4, sequence: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]};
  id: string = "0"
  problemSequence: number[] = [];
  arrayProblem: number[] = [];
  sizeOfProblem: boolean[][] = [];
  isSholutionOn: boolean = false; //If we show solution
  solution: Solution[] = [];
  isEnd: boolean = false;
  solutionPoints: number[] = [] //for each wanted solution the bord fills with points needed to be pressed (and number of times)

    solutionSteps: SolutionStep[] = []
  routeSub: any;

    constructor(
      private route: ActivatedRoute, 
      private problemService: ProblemService,
      private solutionService: SolutionService,
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];  // Using id from url
    });

      this.getProblem()
  }


  getProblem() {
    this.problemService.getProblem(this.id).subscribe((pr: Problem) => {
      this.problem = pr
       this.processProblem()
    },
    (error) => {
      console.error('Error fetching problems:', error);
    });

  }

  processProblem() {
    this.problemSequence = this.problem.sequence
    this.sizeOfProblem = new Array(Math.sqrt(this.problem.sequence.length)).fill(null);
  }

  getIndex(x: number, y: number): number {
    let size = Math.sqrt(this.problem.sequence.length)
    return y + (x * size); // Ensure index is a number
   }

  
  problemButtonClick(): void {
    this.showSolution()
  }

  /*we fill array with solution - only one for now!!!!!!!!!!!!!!!!!*/
  showSolution(): void {
    this.getProblem( )
    let newSol = new Array(this.problem.sequence.length).fill(0);
    console.log("id", this.id)
    this.solutionService.getSolutionStepsForId(this.id).subscribe((ss: any) => {
      console.log("n", ss)
      ss.forEach(((solStep: SolutionStep) => {
        console.log("n", solStep.fkSolution)
        newSol[solStep.action] += 1

    }))
    },
    (error) => {
      console.error('Error fetching problems:', error);
    });
    console.log("newSol",newSol)

      this.solutionPoints=newSol
      this.isSholutionOn = true
      
    
  }


  /* Solve Buttons */

  revertValue(value: number): number {
    if(value == 0){
      return 1;
    }

    return 0;

  }

 

  solveButtonClick(buttonId: number): void {
  //TODO: curr for chosen problem
  let seq = this.problem.sequence
  let size = Math.sqrt(this.problem.sequence.length)
  
  if(buttonId % size == 0) { //left corner
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
    if(((buttonId - (buttonId % size)) /  size) != (size - 1)){ //if not bottom
      seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    }
    if(((buttonId - (buttonId % size)) /  size) != 0) { //if not top
      seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    }
  } else if((buttonId + 1) % size == 0){  //right corner
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    if(((buttonId - (buttonId % size)) /  size) != (size - 1)){ //if not bottom
      seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    }
    if(((buttonId - (buttonId % size)) /  size) != 0) { //if not top
      seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    }
  } else if(((buttonId - (buttonId % size)) /  size) == 0) { //top
    seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  } else if(((buttonId - (buttonId % size)) /  size) == (size - 1)) { //bottom
    seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  } else {
    seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  }
  seq[buttonId] = this.revertValue(seq[buttonId])  //revert current button

  this.problem.sequence = seq
  this.isEnd = this.problemSequence.every(element => element === 0);

    return 
  }
    
    

}
