import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Problem } from '../problem';
import { SolutionStep } from '../solutionStep';
import { catchError, flatMap, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  
  private readonly apiUrl = 'api/problems';
  constructor(private readonly http: HttpClient,) {}


  getProblem(problemId: string): Observable<Problem> {
     return this.http.get<Problem>(`${this.apiUrl}/${problemId}`).pipe(
          retry(1),
          catchError(this.handleError)
        )
  }

  postProblem(problem: Problem): Observable<any> {
    return this.http.post<Problem>(this.apiUrl, Problem).pipe(
         //retry(1),
         catchError(this.handleError)
       )
  }

  getProblems(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
      


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(()=> new Error('Something bad happened'))
}
}
