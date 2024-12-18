import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserI } from 'src/app/models/post.interface';
import { UserModel } from 'src/app/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl: string = 'http://localhost:3000/api/users/create'; // Cambiar URL si es necesario para historias
  private readonly api: string = 'http://localhost:3000/api/users'; // Cambiar URL si es necesario para historias
  private readonly apiImg: string = 'http://localhost:3000'; 


  constructor() { }

  createUser(formData : FormData): Observable<UserModel>{
    console.log('servicio : ' , formData)
    return this.http.post<UserModel>(this.apiUrl,formData);
  }

  getUserById(userId: string): Observable<UserI> {
    return this.http.get<UserI>(`${this.api}/${userId}`).pipe(
      map((user : any) => {
        return {
          id: user.id || undefined,
          firstname: user.firstname || 'Usuario desconocido',
          lastname: user.lastname || 'Sin apellido',
          fullName: `${user.firstname || 'Usuario desconocido'} ${user.lastname || 'Sin apellido'}`,
          avatar: user.avatar ? `${this.apiImg}/uploads/avatar/${user.avatar}` : 'https://i.pinimg.com/736x/2d/3b/31/2d3b314e4b70997dbcf9d096c27c9159.jpg', // Avatar con fallback
          description: user.description || 'No disponible',
          livingIn: user.livingIn || 'No especificado',
          maritalStatus: user.maritalStatus || 'No especificado',
          workingAt: user.workingAt || 'No especificado',
          userId: user.userId || 'ID no disponible',
        };
      })
    );;
  }
}
