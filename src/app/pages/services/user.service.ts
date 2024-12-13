import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl: string = 'http://localhost:3009/users/create'; // Cambiar URL si es necesario para historias



  constructor() { }

  createUser(formData : FormData): Observable<UserModel>{
    console.log('servicio : ' , formData)
    return this.http.post<UserModel>(this.apiUrl,formData);
  }
}
