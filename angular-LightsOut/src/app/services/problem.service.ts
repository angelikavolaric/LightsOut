import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Problem } from '../problem';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  
  private readonly apiUrl = 'api/problems';
  constructor(private readonly http: HttpClient,) {}


  getProblem(problemId: string): Observable<Problem> { //get problem with id
     return this.http.get<Problem>(`${this.apiUrl}/${problemId}`).pipe(
          retry(1),
          catchError(this.handleError)
        )
  }

  postProblem(problem: Problem): Observable<any> { //post problem
    return this.http.post<Problem>(this.apiUrl, problem).pipe(
         retry(1),
         catchError(this.handleError)
       )
  }

  getProblems(): Observable<any[]> { //get all problems
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
