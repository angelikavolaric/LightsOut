import { Injectable } from '@angular/core';
import { Solution } from '../solution';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, range, retry, switchMap, throwError } from 'rxjs';
import { Problem } from '../problem';
import { SolutionStep } from '../solutionStep';


@Injectable({
  providedIn: 'root'
})

export class SolutionService {
  private readonly apiUrl = 'api';
  constructor(private http: HttpClient, ) {  }

  getSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>(`${this.apiUrl}/solutions`).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getSolutionOfProblem(problemId: string ): Observable<Solution> {
   // const params = new HttpParams().set('fkProblem', problemId);
   // const url = `${this.apiUrl}/solutions/`
    return this.http.get<Solution>(`${this.apiUrl}/solutions/?fkProblem=4{1}`).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getSolutionStepsForId(problemId: string): Observable<SolutionStep[]> {
    let sr: any;
    //return this.getSolutionOfProblem(problemId).pipe(
    return this.getSolutions().pipe(
      switchMap((sol: any[]) =>
      { 
       
        for (let i = 0; i < sol.length; i++ ){
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
        return this.http.get<SolutionStep[]>(`${this.apiUrl}/solutionSteps/}`).pipe(
          retry(1),
          catchError(this.handleError),
        )
       //console.log("sol",  sol)
       //console.log(`${this.apiUrl}/solutionSteps/?fkSolution=${sol[i].id}`)
       /* return this.http.get<SolutionStep[]>(`${this.apiUrl}/solutionSteps/?fkSolution=${sol[0].fkSolution}`).pipe(
          retry(1),
          catchError(this.handleError)
        )*/
      }))
   }


  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error.error);
      return throwError(()=> new Error('Something bad happened'))
  }
}
