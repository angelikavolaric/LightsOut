import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Problem } from '../../../problem';
import { Solution } from '../../../solution';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionStep } from '../../../solutionStep';
import { SolutionService } from '../../solution.service';
import { ProblemService } from '../../problem.service';
import { error } from 'node:console';

@Component({
  selector: 'solve-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './solve.component.html',
  styleUrl: './solve.component.css, ../../../../'
})
export class SolveComponent {
  title = 'LightsOut';

  
 // problem = Problem; //specific problem
  problem: Problem = { _id: "33", size: 4, sequence: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]};
  problems: Problem[] = [
    { _id: "44", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]},
    { _id: "7", size: 5, sequence: [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1 ]},
    { _id: "33", size: 4, sequence: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]}]
  /*  { _id: "4", size: 5, sequence: "0101011111000010101110111"},
    { _id: "5", size: 5, sequence: "0000010000000000000000001"},
    { _id: "6", size: 5, sequence: "0101011111111111001111111"},
    { _id: "8", size: 5, sequence: "0000001000001000111000111"},
    { _id: "9", size: 5, sequence: "0101011110111110000000001"},    { _id: "1", size: 3, sequence: "111101111"},
    { _id: "10", size: 7, sequence: "0111000000001111110111110000000111010110000010000"},
    { _id: "11", size: 6, sequence: "0010101111111101011111111111111111111"},
    { _id: "12", size: 6, sequence: "0101010101111100000000000101010111111"},
    { _id: "2", size: 4, sequence: "0100000101111111"},
    { _id: "3", size: 4, sequence: "0101011111111111"},*/  //list of all problems
  problemSequence: number[][] = [];
  arrayProblem: number[] = [];
  sizeOfProblem: boolean[][] = [];
  chosenRiddle: string = "0"; //0 no riddle is chosen
  solution: Solution[] = [
    { _id: "0", fkProblem: "33"}
  ];

  solutionPoints: number[] = [] //for each wanted solution the bord fills with points needed to be pressed (and number of times)

 solutionStep: SolutionStep = 
    { _id: "0", actions: [3, 6, 10, 13, 15], actionSeq: [1, 2, 3, 4, 5], fkSolution: "0"};

    // solutionStep[]->mult.

  constructor(private problemService: ProblemService, private solutionService: SolutionService) { }

  ngOnInit(): void {
    for(let pr in this.problems) {
      this.sortBySize();
      this.arrayProblem = this.problems[pr].sequence;
      this.problemSequence.push(this.arrayProblem)
      this.sizeOfProblem[Number(pr)] = new Array(this.problems[pr].size).fill(null);
      //TODO: add filling this.problems from DB
      //console.log(this.problems[pr]._id, this.problems[pr].size)
      //console.log(this.sizeOfProblem)
    }
    
  }

  getIndex(x: number, y: number, i: number): number {
   // console.log("indey"+ ( y + (x * this.problems[i].size)))
   //console.log(this.chosenRiddle== y + (x * this.problems[i].size) && this.solutionPoints[  y + (x * this.problems[i].size)]!=0)
    return y + (x * this.problems[i].size); // Ensure index is a number
  }

  
  problemButtonClick(problemId: string): void {
    this.showSolution(problemId)
    this.chosenRiddle = problemId;
    console.log(this.chosenRiddle)
  }

  /*we fill array with solution - only one for now!!!!!!!!!!!!!!!!!*/
  showSolution(problemId: string): void {
    /*getSolution(problemId); */
    /*get problem problems(id) */
    
    let newSol = new Array(Math.pow(this.problem.size, 2)).fill(0);
    /*this.solutionStep.forEach((ac: SolutionStep) => {
      ac.actions.forEach((element: number) => {
        newSol[element] += 1
      })
      console.log(newSol)
    }); {
      console.log("Problem with showing solution, try later!")
    }*/

      this.solutionStep.actions.forEach((element: number) => {
          newSol[element] += 1

          console.log(element)
      }); {
        console.log("Problem with showing solution, try later!")
      }
      this.solutionPoints=newSol
    
  }

  sortBySize(): void { //sorting on front -- switch bysortingon server?
    this.problems.sort((a, b) => {
         return a.size - b.size;

    });
  }



  /* Solve Buttons */

  revertValue(value: number): number {
    if(value == 0){
      return 1;
    }

    return 0;

  }

 

  solveButtonClick(problemIndex: number, buttonId: number): void {
  //TODO: curr for chosen problem
  let seq = this.problems[problemIndex].sequence
  let size = this.problems[problemIndex].size
  

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
  this.problems[problemIndex].sequence = seq

    return 
  }

  resetButtonClick(problemId: string, problemIndex: number): void {
   // let resProblem: Problem = this.problemService.getProblem(problemId);
    this.problemService.getProblem(problemId).subscribe((problem: Problem) => {
      this.problem = problem
    })
    this.problems[problemIndex] = this.problem
  }

}
