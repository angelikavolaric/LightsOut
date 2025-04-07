import { Injectable } from '@angular/core';
import { InMemoryDbService, ParsedRequestUrl, RequestInfo, RequestInfoUtilities, ResponseOptions } from 'angular-in-memory-web-api';
import { Problem } from '../problem'
import { Solution } from '../solution';
import { SolutionStep } from '../solutionStep';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

  const problems = [
    { id: "44", sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]},
    { id: "1", sequence: [1, 1, 0, 0, 0, 1, 1, 0, 1] },
    { id: "2", sequence: [1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0] },
    {id: "3", sequence: [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0] },
    { id: "4", sequence: [1, 0, 1, 1, 0, 1,1, 1, 0, 0,0,0,1,1, 0, 0,1,1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0] },
    { id: "5", sequence: [1, 0, 1, 0, 1, 0, 1, 1, 0] },
    { id: "7", sequence: [1, 1, 0, 0, 1, 1, 1, 0, 1] },
  ];

  const solutions = [
    { id: "0", fkProblem: "44"},
    { id: "3", fkProblem: "1"},
    { id: "4", fkProblem: "2"},
    { id: "5", fkProblem: "3"},
    { id: "2", fkProblem: "4"},
    { id: "7", fkProblem: "5"},
    { id: "1", fkProblem: "7"},
  ];

  const solutionSteps = [
    { id: "0", action: 0, actionSeq: 1, fkSolution: "0"},
    { id: "1", action: 1, actionSeq: 2, fkSolution: "0"},
    { id: "2", action: 2, actionSeq: 3, fkSolution: "0"},
    { id: "3", action: 7, actionSeq: 4, fkSolution: "0"},

    { id: "4", action: 0, actionSeq: 1, fkSolution: "3"},
    { id: "5", action: 6, actionSeq: 2, fkSolution: "3"},
    { id: "6", action: 8, actionSeq: 3, fkSolution: "3"},

    { id: "7", action: 1, actionSeq: 1, fkSolution: "7"},
    { id: "8", action: 2, actionSeq: 2, fkSolution: "7"},
    { id: "9", action: 5, actionSeq: 3, fkSolution: "7"},
    { id: "18", action: 7, actionSeq: 4, fkSolution: "7"},

    { id: "10", action: 0, actionSeq: 1, fkSolution: "1"},
    { id: "11", action: 1, actionSeq: 2, fkSolution: "1"},
    { id: "12", action: 3, actionSeq: 3, fkSolution: "1"},
    { id: "13", action: 4, actionSeq: 4, fkSolution: "1"},
    { id: "19", action: 5, actionSeq: 5, fkSolution: "1"},
    { id: "20", action: 6, actionSeq: 6, fkSolution: "1"},
    { id: "21", action: 7, actionSeq: 7, fkSolution: "1"},
    { id: "22", action: 8, actionSeq: 8, fkSolution: "1"},

    { id: "14", action: 0, actionSeq: 1, fkSolution: "4"},
    { id: "15", action: 2, actionSeq: 2, fkSolution: "4"},
    { id: "16", action: 5, actionSeq: 3, fkSolution: "4"},
    { id: "17", action: 6, actionSeq: 4, fkSolution: "4"},
    { id: "23", action: 10, actionSeq: 5, fkSolution: "4"},
    { id: "24", action: 11, actionSeq: 6, fkSolution: "4"},
    { id: "25", action: 12, actionSeq: 7, fkSolution: "4"},

    { id: "36", action: 0, actionSeq: 1, fkSolution: "5"},
    { id: "35", action: 1, actionSeq: 2, fkSolution: "5"},
    { id: "34", action: 2, actionSeq: 3, fkSolution: "5"},
    { id: "33", action: 3, actionSeq: 4, fkSolution: "5"},
    { id: "32", action: 4, actionSeq: 5, fkSolution: "5"},
    { id: "31", action: 6, actionSeq: 6, fkSolution: "5"},
    { id: "30", action: 9, actionSeq: 7, fkSolution: "5"},
    { id: "29", action: 10, actionSeq: 8, fkSolution: "5"},
    { id: "28", action: 12, actionSeq: 9, fkSolution: "5"},
    { id: "27", action: 13, actionSeq: 10, fkSolution: "5"},
    { id: "26", action: 15, actionSeq: 11, fkSolution: "5"},

    { id: "37", action: 0, actionSeq: 1, fkSolution: "2"},
    { id: "38", action: 2, actionSeq: 2, fkSolution: "2"},
    { id: "39", action: 3, actionSeq: 3, fkSolution: "2"},
    { id: "40", action: 5, actionSeq: 4, fkSolution: "2"},
    { id: "41", action: 8, actionSeq: 5, fkSolution: "2"},
    { id: "42", action: 9, actionSeq: 6, fkSolution: "2"},
    { id: "43", action: 14, actionSeq: 7, fkSolution: "2"},
    { id: "45", action: 15, actionSeq: 8, fkSolution: "2"},
    { id: "44", action: 16, actionSeq: 9, fkSolution: "2"},
    { id: "46", action: 17, actionSeq: 10, fkSolution: "2"},
    { id: "47", action: 18, actionSeq: 11, fkSolution: "2"},
    { id: "48", action: 20, actionSeq: 12, fkSolution: "2"},
    { id: "49", action: 23, actionSeq: 13, fkSolution: "2"},
    { id: "50", action: 27, actionSeq: 14, fkSolution: "2"},
    { id: "51", action: 28, actionSeq: 15, fkSolution: "2"},
    { id: "52", action: 30, actionSeq: 16, fkSolution: "2"},
    { id: "53", action: 31, actionSeq: 16, fkSolution: "2"},
    { id: "54", action: 33, actionSeq: 17, fkSolution: "2"},
    { id: "55", action: 34, actionSeq: 18, fkSolution: "2"},
    { id: "56", action: 35, actionSeq: 19, fkSolution: "2"},
   

  ];
  


  return { problems, solutions, solutionSteps };
  }

  
/*  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'problems') {
      const id = reqInfo.id;
      if (id) {
        return this.getProblemById(reqInfo, id);
      } else {
        return this.getAllProblems(reqInfo);
      }
    }

    if (collectionName === 'solutions') {
      //const problemId = this.extractProblemIdFromUrl(url);
      const problemId = reqInfo.id;
      if (problemId) {
        return this.getSolutionByProblemId(reqInfo, problemId);
      } else {
        return this.getAllSolutions(reqInfo);
      }
    }

    if (collectionName === 'solutionSteps') {
      const solutionId =  reqInfo.id;
      if (solutionId) {
        return this.getSolutionStepsBySolutionId(reqInfo, solutionId);
      } else {
        return this.getAllSolutionSteps(reqInfo);
      }
    }

    return undefined; // Let the default GET handler process other requests
  }

    private extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/problems\/(\d+)/);  // Extract id from URL
    return match ? match[1] : null;
  }

  private extractProblemIdFromUrl(url: string): string | null {
    const match = url.match(/\/solutions\/problem\/(\d+)/);  // Extract problemId from URL
    return match ? match[1] : null;
  }

  private getProblemById(reqInfo: RequestInfo, id: string) {
    const problem = reqInfo.collection.find((p: Problem) => p.id === id);
    if (problem) {
      return reqInfo.utils.createResponse$(() => ({
        body: problem,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Problem not found' },
        status: 404,
      }));
    }
  }

  private getAllProblems(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => ({
      body: reqInfo.collection,
      status: 200,
    }));
  }

  private getSolutionByProblemId(reqInfo: RequestInfo, problemId: string) {
    const solution = reqInfo.collection.find((s: Solution) => s.fkProblem === problemId);
    if (solution) {
      return reqInfo.utils.createResponse$(() => ({
        body: solution,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Solution not found' },
        status: 404,
      }));
    }
  }

  private getAllSolutions(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => ({
      body: reqInfo.collection,
      status: 200,
    }));
  }

  private getSolutionStepsBySolutionId(reqInfo: RequestInfo, solutionId: string) {
    const solutionSteps = reqInfo.collection.filter((ss: SolutionStep) => ss.fkSolution === solutionId);
    if (solutionSteps.length > 0) {
      return reqInfo.utils.createResponse$(() => ({
        body: solutionSteps,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Solution steps not found' },
        status: 404,
      }));
    }
  }

  private getAllSolutionSteps(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => ({
      body: reqInfo.collection,
      status: 200,
    }));
  }
}*/

/*

  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'problems') {
      const id = reqInfo.id;
      if (id) {
        return this.getProblemById(reqInfo, id);
      } else {
        return this.getAllProblems(reqInfo);
      }
    }

    if (collectionName === 'solutions') {
      const id = reqInfo.id;
      if (id) {
        return this.getSolutionById(reqInfo, id);
      }
    }

    if (collectionName === 'solutionSteps') {
      const id = reqInfo.id;
      if (id) {
        return this.getSolutionStepsBySolutionId(reqInfo, id);
      } 
    }
    return undefined; // Let the default GET handler process other requests
  }
  getSolutionById(reqInfo: RequestInfo, id: string) {
    const solution = reqInfo.collection.find((s: Solution) => s.id === id);
    if (solution) {
      return reqInfo.utils.createResponse$(() => ({
        body: solution,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Solution not found' },
        status: 404,
      }));
    }
  }
  private getSolutionStepsBySolutionId(reqInfo: RequestInfo, solutionId: string) {
    const solutionSteps = reqInfo.collection.filter((ss: SolutionStep) => ss.fkSolution === solutionId);
    if (solutionSteps.length > 0) {
      return reqInfo.utils.createResponse$(() => ({
        body: solutionSteps,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Solution steps not found' },
        status: 404,
      }));
    }
  }

  private getProblemById(reqInfo: RequestInfo, id: string) {
    const problem = reqInfo.collection.find((p: Problem) => p.id === id);
    if (problem) {
      return reqInfo.utils.createResponse$(() => ({
        body: problem,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Problem not found' },
        status: 404,
      }));
    }
  }

  private getAllProblems(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => ({
      body: reqInfo.collection,
      status: 200,
    }));
  }
  */


}
  
