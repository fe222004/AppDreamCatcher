import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { PostI } from "src/app/models/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://localhost:3009/posts'; // Cambiar URL si es necesario para historias
  private readonly apiImg: string = 'http://localhost:3009'; 
  constructor() {}

  // Obtener todas las historias
  
 
  findPosts(): Observable<PostI[]> {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      map(posts => {
        return posts.map(post => ({
          id: post.id || undefined,
          text: post.text || undefined,
          tag: post.tag || undefined,
          userId: post.userId || undefined,
          image: post.media ? `${this.apiImg}/uploads/posts/${post.media}` : undefined,  // Cambio aquí a 'media'
        }));
      })
    );
  }
  
  createPost(formData: FormData): Observable<PostI> {
    return this.httpClient.post<PostI>(this.apiUrl, formData).pipe(
      map((post: PostI) => ({
        ...post,
      })),
   
    );
  }

  // Actualizar una historia existente por ID
  updatePost(id: string, payload: FormData): Observable<PostI> {
    console.log('Enviando solicitud para actualizar post con ID:', id, 'y payload:', payload);
    return this.httpClient.put<PostI>(`${this.apiUrl}${id}`, payload);
  }

  // Eliminar una historia por ID
  deletePost(id: string): Observable<any> {
    console.log('Enviando solicitud para eliminar post con ID:', id);
    return this.httpClient.delete(`${this.apiUrl}${id}`);
  }
}
