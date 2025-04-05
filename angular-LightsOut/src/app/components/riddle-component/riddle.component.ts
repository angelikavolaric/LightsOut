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
  title = 'LightsOut';

  
 // problem = Problem; //specific problem
  problem: Problem = { _id: "33", size: 4, sequence: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]};

  problemSequence: number[] = [];
  arrayProblem: number[] = [];
  sizeOfProblem: boolean[][] = [];
  isSholutionOn: boolean = false; //If we show solution
  solution: Solution[] = [
    { _id: "0", fkProblem: "33"}
  ];

  solutionPoints: number[] = [] //for each wanted solution the bord fills with points needed to be pressed (and number of times)

 /*solutionStep: SolutionStep = 
    { _id: "0", actions: [3, 6, 10, 13, 15], actionSeq: [1, 2, 3, 4, 5], fkSolution: "0"};*/

    solutionSteps: SolutionStep[] = [
    { _id: "0", action: 0, actionSeq: 1, fkSolution: "0"},
    { _id: "1", action: 1, actionSeq: 2, fkSolution: "0"},
    { _id: "2", action: 2, actionSeq: 3, fkSolution: "0"},
    { _id: "3", action: 7, actionSeq: 4, fkSolution: "0"} //reši 1
    ]
    // solutionStep[]->mult.

    constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id = params['id'];  // 'id' is the parameter name in the URL
    });

    //this.problem = getProblem(id);

      this.arrayProblem = this.problem.sequence;
      this.problemSequence = this.problem.sequence
      this.sizeOfProblem = new Array(this.problem.size).fill(null);
      //TODO: add filling this.problems from DB
      //console.log(this.problems[pr]._id, this.problems[pr].size)
      //console.log(this.sizeOfProblem)
  
    
  }

  getIndex(x: number, y: number): number {
   // console.log("indey"+ ( y + (x * this.problems[i].size)))
   //console.log(this.chosenRiddle== y + (x * this.problems[i].size) && this.solutionPoints[  y + (x * this.problems[i].size)]!=0)
    return y + (x * this.problem.size); // Ensure index is a number
  }

  
  problemButtonClick(): void {
    this.showSolution()
  }

  /*we fill array with solution - only one for now!!!!!!!!!!!!!!!!!*/
  showSolution(): void {
    /*getSolution(problemId); */
    /*get problem problems(id) */

    let newSol = new Array(Math.pow(this.problem.size, 2)).fill(0);
      this.solutionSteps.forEach((solStep: SolutionStep) => {
          newSol[solStep.action] += 1

      }); 
       // console.log("Problem with showing solution, try later!")
      
      this.solutionPoints=newSol
      this.isSholutionOn = true
      this.resetButtonClick( )
    
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
  let size = this.problem.size
  

  if(buttonId % size == 0) { //left corner 
    seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  } else if((buttonId + 1) % size == 0){  //right corner
    seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
  } else if(buttonId / size== 1) { //top
    seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  } else if(buttonId / size == size) { //bottom
    seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  } else {
    seq[buttonId + size] = this.revertValue(seq[buttonId + size]) //down
    seq[buttonId - size] = this.revertValue(seq[buttonId - size]) //up
    seq[buttonId - 1] = this.revertValue(seq[buttonId - 1]) //left
    seq[buttonId + 1] = this.revertValue(seq[buttonId + 1]) //right
  }
  seq[buttonId] = this.revertValue(seq[buttonId]) 
  //TODO: check if actualy works-> bleed from others (should work - first looks right, left)
  this.problem.sequence = seq

    return 
  }

  resetButtonClick(): void {
   // let resProblem: Problem = this.problemService.getProblem(problemId);
   /* this.problemService.getProblem(problemId).subscribe((problem: Problem) => {
      this.problem = problem
    })
    this.problems[problemIndex] = this.problem*/
  }

}
