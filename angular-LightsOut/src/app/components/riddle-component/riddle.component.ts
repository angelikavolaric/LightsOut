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

  
  problem: Problem = {id: "0", sequence: []}; //chosen problem
  id: string = "0" //first id
  problemSequence: number[] = []; //sequece of light / dark

  sizeOfProblem: boolean[] = []; //size of problem for iteration
  isSholutionOn: boolean = false; //If we show solution
  isEnd: boolean = false; //have we succesfully finished riddle - displays congrats
  solutionPoints: number[] = [] //solution dotson riddle

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

  showSolution(): void { //getting solution for ptoblem
    this.getProblem( )
    let newSol = new Array(this.problem.sequence.length).fill(0);
    this.solutionService.getSolutionStepsForId(this.id).subscribe((ss: any) => {
      ss.forEach(((solStep: SolutionStep) => {
        newSol[solStep.action] += 1 //each solution point added based on buttonIndex
    }))},
    (error) => {
      console.error('Error fetching problems:', error);
    });
      this.solutionPoints=newSol //update - create solution
      this.isSholutionOn = true
  }


  /* Solve Buttons */

  revertValue(value: number): number {  //revert button value (light/dark)
    if(value == 0){
      return 1;
    }
    return 0;
  }


  solveButtonClick(buttonId: number): void { //changing of buttons
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
  }
}
