import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Student } from './student';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/students';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(apiUrl)
      .pipe(
        tap(students => console.log('fetched students')),
        catchError(this.handleError('getStudents', []))
      );
  }

  getStudent(id: string): Observable<Student> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => console.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  addStudent(student): Observable<Student> {
    return this.http.post<Student>(apiUrl, student, httpOptions).pipe(
      tap((student: Student) => console.log(`added student w/ id=${student._id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  updateStudent(id, student): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, student, httpOptions).pipe(
      tap(_ => console.log(`updated student id=${id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  deleteStudent(id): Observable<Student> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
