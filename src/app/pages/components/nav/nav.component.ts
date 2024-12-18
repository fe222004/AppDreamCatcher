import { Component, HostListener } from '@angular/core';
import { searchService } from '../../services/search.service';
import { debounceTime, Subject } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LanguageConstants } from 'src/app/constants/language-constants';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isModalVisible: boolean = false;
  searchQuery: string = '';
  results: any[] = [];
  searchPerformed: boolean = false;
  notification: any[] = [];
  isNotificationsVisible = false;
  selectedPost: any = null;
  private searchSubject: Subject<string> = new Subject<string>();
  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;

  constructor(
    private searchService: searchService,
    private postService: PostService,
    private notificationService: NotificationService,
    private router: Router,
    private translationService: TranslationService
  ) {
    this.searchSubject
      .pipe(debounceTime(300)) // Espera 300 ms tras el último input
      .subscribe((query) => this.performSearch(query));
    this.fetchPosts();
  }

  toggleMenuI(): void {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu(): void {
    this.showMenuI = false;
  }

  changeLanguage(language: 'en' | 'es', event: Event): void {
    event.preventDefault();
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
  }

  openModal() {
    this.isModalVisible = true; // Abre el modal
  }

  closeModal() {
    this.isModalVisible = false; // Cierra el modal
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Verifica si el clic fue fuera del input o del modal
    if (!target.closest('.search-form') && !target.closest('.dropdown-modal')) {
      this.closeModal();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      // Si el campo de búsqueda está vacío, cerramos el modal y vaciamos los resultados
      this.isModalVisible = false;
      this.results = [];
      this.searchPerformed = false;
    } else {
      this.searchSubject.next(this.searchQuery); // Emite el texto ingresado
      this.openModal(); // Abre el modal si se realiza una búsqueda
    }
  }

  private performSearch(query: string): void {
    if (!query.trim()) {
      // Si no hay texto, vaciamos los resultados y no hacemos la búsqueda
      this.results = [];
      this.searchPerformed = false;
      return;
    }

    // Realiza la búsqueda con el servicio
    this.searchService.searchPostAndUsers(query).subscribe({
      next: (data) => {
        this.results = data; // Asigna los resultados obtenidos
        this.searchPerformed = true;
      },
      error: (err) => {
        console.error('Error al realizar la búsqueda:', err);
        this.results = [];
        this.searchPerformed = true;
      },
    });
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
