import { Injectable } from '@angular/core';
import { Solution } from '../solution';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, switchMap, throwError } from 'rxjs';
import { Problem } from '../problem';
import { SolutionStep } from '../solutionStep';


@Injectable({
  providedIn: 'root'
})

export class SolutionService {
  private readonly apiUrl = 'api';
  constructor(private http: HttpClient, ) {  }

  getSolution(problemId: string ): Observable<Solution> {
    return this.http.get<Solution>(`${this.apiUrl}/solutions/?fkProblem=${problemId}`).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getSolutionSteps(problemId: string): Observable<SolutionStep[]> {
    return this.getSolution(problemId).pipe(
      switchMap((sol: any) =>
      { 
        let sr = sol[0].id
        console.log("sr", sr, sol[0].id)
        return this.http.get<SolutionStep[]>(`${this.apiUrl}/solutionSteps/?fkSolution=${sol[0].id}`).pipe(
          retry(1),
          catchError(this.handleError)
        )
      }))
   }


  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error.error);
      return throwError(()=> new Error('Something bad happened'))
  }
}
