import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Problem } from '../../../problem';
import { Solution } from '../../../solution';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionStep } from '../../../solutionStep';

@Component({
  selector: 'create-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  title = 'LightsOut';

  
 // problem = Problem; //specific problem
  /*problem: Problem = { _id: "0", size: 3, sequence: "010101111"};
  problems: Problem[] = [
    { _id: "44", size: 3, sequence: "010101111"},
    { _id: "7", size: 5, sequence: "0101011101000001001000111"},
    { _id: "1", size: 3, sequence: "111101111"},
    { _id: "10", size: 7, sequence: "0111000000001111110111110000000111010110000010000"},
    { _id: "11", size: 6, sequence: "0010101111111101011111111111111111111"},
    { _id: "12", size: 6, sequence: "0101010101111100000000000101010111111"},
    { _id: "2", size: 4, sequence: "0100000101111111"},
    { _id: "3", size: 4, sequence: "0101011111111111"},
    { _id: "4", size: 5, sequence: "0101011111000010101110111"},
    { _id: "5", size: 5, sequence: "0000010000000000000000001"},
    { _id: "6", size: 5, sequence: "0101011111111111001111111"},
    { _id: "8", size: 5, sequence: "0000001000001000111000111"},
    { _id: "9", size: 5, sequence: "0101011110111110000000001"},]  //list of all problems
  problemSequence: string[][] = [];
  arrayProblem: string[] = [];
  sizeOfProblem: boolean[][] = [];
  chosenRiddle: number = 0; //0 no riddle is chosen
  solution: Solution[] = [
    { _id: "0", fkProblem: "44"}
  ];

  solutionStep: SolutionStep[] = [
    { _id: "0", actions: [3, 6, 10, 13, 15], actionSeq: [1, 2, 3, 4, 5] , fkSolution: "0"}
  ];

  ngOnInit(): void {
    for(let pr in this.problems) {
      this.sortBySize();
      this.arrayProblem = this.problems[pr].sequence.split('');
      this.problemSequence.push(this.arrayProblem)
      this.sizeOfProblem[Number(pr)] = new Array(this.problems[pr].size).fill(null);
      //console.log(this.problems[pr]._id, this.problems[pr].size)
      //console.log(this.sizeOfProblem)
    }
    
  }

  problemButtonClick(): void {

  }

  /*we fill array with solution - only one for now!!!!!!!!!!!!!!!!!*
  showSolution(problemId: Number): void {
    /*solutionStep = getSolution(problemId); /
    

    
  }

  sortBySize(): void { //sorting on front -- switch bysortingon server?
    this.problems.sort((a, b) => {
         return a.size - b.size;

    });
  }
*/

}
