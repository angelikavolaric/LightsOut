import { Injectable } from '@angular/core';
import { Solution } from '../solution';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Problem } from '../problem';

@Injectable({
  providedIn: 'root'
})

export class SolutionService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,) {  }

  getSolution(problem: Problem ): Observable<Solution> {
   // /solutions/problem/{id}
    return this.http.get<Solution>(`${this.apiUrl}/solutions/problem/${problem._id}`).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error.error);
      return throwError(()=> new Error('Something bad happened'))
  }
}
