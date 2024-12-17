import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn : 'root'})

export class searchService{
    private apiUrl = 'http://localhost:3000/api/search'; // URL del Client Gateway

  constructor(private http: HttpClient) {}

  searchPostAndUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}`);
  }
}