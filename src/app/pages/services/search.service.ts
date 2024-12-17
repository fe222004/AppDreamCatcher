import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({providedIn : 'root'})

export class searchService{
    private apiUrl = 'http://localhost:3000/api/search'; // URL del Client Gateway

  constructor(private http: HttpClient) {}

  searchPostAndUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}`);
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${postId}`).pipe(
      tap(response => console.log('Respuesta de la API:', response)),
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }
}