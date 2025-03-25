import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Problem } from '../problem';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,) {  }

  getProblem(problemId: string): Observable<Problem> {
     return this.http.get<Problem>(`${this.apiUrl}/problems/${problemId}`).pipe(
          retry(1),
          catchError(this.handleError)
        )
  }

  postProblem(problem: Problem): Observable<any> {
    return this.http.post<Problem>(`${this.apiUrl}/problems`, Problem).pipe(
         retry(1),
         catchError(this.handleError)
       )
 }

 getAllProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(`${this.apiUrl}/problems`).pipe(
      retry(1),
      catchError(this.handleError)
    )
 }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(()=> new Error('Something bad happened'))
}
}
