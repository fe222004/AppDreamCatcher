import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  notification: any[] = [];
  isNotificationsVisible = false;
  selectedPost: any = null;

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.notificationService.getNotifications().subscribe(
      (notification: any) => {
        this.notification = notification.data;
        console.log(notification);
      },
      (error) => {
        console.error('Error fetching notificacion:', error);
      }
    );
  }

  toggleNotifications() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }

  // Método para manejar el clic en la notificación
  onNotificationClick(notificationId: string, postId: string): void {
    // 1. Obtener el post basado en el ID del post
    this.postService.findPostById(postId).subscribe((post) => {
      this.selectedPost = post; // Guardar el post seleccionado
      this.toggleNotifications(); // Cerrar el dropdown de notificaciones

      // 2. Marcar la notificación como leída
      this.notificationService
        .updateNotificationStatus(notificationId)
        .subscribe(() => {
          console.log('Notificación actualizada.');
        });
    });
  }
}
