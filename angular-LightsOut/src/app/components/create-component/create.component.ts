import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Problem } from '../../problem';
import { Solution } from '../../solution';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionStep } from '../../solutionStep';
import { FormsModule } from '@angular/forms';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'create-root',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  title = 'create LightsOut';

  problem: Problem = { id: "0", sequence:[0, 0, 0, 0]}
  sizeNewRiddle: number = 2
  sizeOfProblem: boolean[] = []
  problemSequence: boolean[] = []
   /* Solve Buttons */

   constructor() {

   }

   ngOnInit() {
    this.sizeOfProblem = new Array(Math.sqrt(this.problem.sequence.length)).fill(null);
    this.problemSequence = new Array(this.problem.sequence.length).fill(0)
   }

   update(newSize: number) {
     // this.problem.size = newSize
      this.sizeOfProblem = new Array(newSize).fill(null);
      this.problemSequence = new Array(Math.pow(newSize, 2)).fill(0)
   }

   getIndex(x: number, y: number): number {
    let size = Math.sqrt(this.problem.sequence.length)
    return y + (x * size); // Ensure index is a number
   }

   revertValue(value: number): number {
    if(value == 0){
      return 1;
    }
    return 0;
  }

  changeButtonClick(buttonIndex: number): void {
    let seq = this.problem.sequence
    seq[buttonIndex] = this.revertValue(seq[buttonIndex])
    this.problem.sequence = seq
    return 
  }

  resetButtonClick(): void { //revert to 0
    this.problem.sequence.fill(0)
   }

   saveProblem(): void {
  //postProblem(problem)
   }

}




