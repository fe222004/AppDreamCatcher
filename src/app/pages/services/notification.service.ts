import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notification';

  constructor(private http: HttpClient) {}

  // Enviar nueva notificación
  createNotification(notification: any): Observable<any> {
    console.log(
      'Datos que se enviarán al servidor de notificaciones:',
      notification
    );

    // Agregar una validación adicional
    if (
      !notification.description ||
      !notification.username ||
      !notification.tag ||
      typeof notification.status === 'undefined'
    ) {
      console.error('Faltan datos en la notificación:', notification);
      return new Observable((observer) => {
        observer.error('Datos incompletos al intentar crear la notificación.');
        observer.complete();
      });
    }

    // Enviar al servidor
    return this.http.post(`${this.apiUrl}`, notification).pipe(
      tap((response) => console.log('Respuesta del servidor:', response)),
      catchError((error) => {
        console.error('Error al enviar notificación:', error);
        return throwError(error);
      })
    );
  }

  // Actualizar el estado de la notificación (Por ejemplo, ponerla como "vista" o "leída")
  updateNotificationStatus(notificationId: string): Observable<any> {
    const body = { status: true }; // Cambiar a 'read' o según tus necesidades
    return this.http.put(`${this.apiUrl}/${notificationId}`, body);
  }

  // Obtener notificaciones del usuario
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Cambiar el estado de la notificación a "leído"
  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${notificationId}/read`, {});
  }
}
