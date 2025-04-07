import { Injectable } from '@angular/core';
import { Solution } from '../solution';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, switchMap, throwError } from 'rxjs';
import { SolutionStep } from '../solutionStep';


@Injectable({
  providedIn: 'root'
})

export class SolutionService {
  private readonly apiUrl = 'api';
  constructor(private http: HttpClient, ) {  }

  getSolutions(): Observable<Solution[]> { //getAllSolutions
    return this.http.get<Solution[]>(`${this.apiUrl}/solutions`).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getSolutionStepsForId(problemId: string): Observable<SolutionStep[]> { //return solutionSteps for cetain problem
    let sr: any;
    return this.getSolutions().pipe(
      switchMap((sol: any[]) =>
      { 
       
        for(let i = 0; i < sol.length; i++ ){
          console.log("ho",sol[i].id, problemId)
          if(sol[i].fkProblem == problemId){
            sr = sol[i]
            console.log(sr, sol[i])
            return this.http.get<SolutionStep[]>(`${this.apiUrl}/solutionSteps/?fkSolution=${sol[i].id}`).pipe(
              retry(1),
              catchError(this.handleError),

            );
          }
        }
        return this.http.get<SolutionStep[]>(`${this.apiUrl}/solutionSteps/}`).pipe( //return all solutionSteps
          retry(1),
          catchError(this.handleError),
        )

      }))
   }

  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error.error);
      return throwError(()=> new Error('Something bad happened'))
  }
}
