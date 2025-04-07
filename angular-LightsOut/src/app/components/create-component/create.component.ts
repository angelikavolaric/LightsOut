import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Problem } from '../../problem';
import { CommonModule } from '@angular/common';
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

  problem: Problem = { id: "0", sequence:[0, 0, 0, 0]} //first problem - empty size two
  sizeNewRiddle: number = 2
  sizeOfProblem: boolean[] = [] //iterable size of problem
  problemSequence: boolean[] = [] 
  savedProblem: boolean = false //if problem is saved

   constructor(
    private problemService: ProblemService,
   ) {}

   ngOnInit() {
    this.sizeOfProblem = new Array(Math.sqrt(this.problem.sequence.length)).fill(null);
    this.problemSequence = new Array(this.problem.sequence.length).fill(0)
   }

   update(newSize: number) { //create riddle different size
      this.sizeOfProblem = new Array(newSize).fill(null);
      this.problemSequence = new Array(Math.pow(newSize, 2)).fill(0)
   }

   getIndex(x: number, y: number): number { //get button index
    let size = Math.sqrt(this.problem.sequence.length)
    return y + (x * size);
   }

   revertValue(value: number): number { //reverting buttons
    if(value == 0){
      return 1;
    }
    return 0;
  }

  changeButtonClick(buttonIndex: number): void { //button change
    let seq = this.problem.sequence
    seq[buttonIndex] = this.revertValue(seq[buttonIndex])
    this.problem.sequence = seq
  }

  resetButtonClick(): void { //reset all to 0
    this.problem.sequence.fill(0)
    this.savedProblem = false;
   }

   saveProblem(): void {
    //this.problemService.postProblem(this.problem)
    this.savedProblem = true;
    console.log("Cannot check if the riddle is solvable - won't save");
    
   }

}




