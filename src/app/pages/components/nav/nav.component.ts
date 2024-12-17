import { Component, HostListener } from '@angular/core';
import { searchService } from '../../services/search.service';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isModalVisible: boolean = false;
  searchQuery: string = '';
  results: any[] = [];
  searchPerformed: boolean = false;
  private searchSubject: Subject<string> = new Subject<string>();
  userId: any;

  constructor(private searchService: searchService, private router: Router){
    this.searchSubject
      .pipe(debounceTime(300)) // Espera 300 ms tras el último input
      .subscribe((query) => this.performSearch(query));
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
        console.log(this.results)
      },
      error: (err) => {
        console.error('Error al realizar la búsqueda:', err);
        this.results = [];
        this.searchPerformed = true;
      },
    });
  }

  goToPostDetail(id:string): void {
    const userId = this.userId;
    this.router.navigate([`/pages/${userId}/detail/${id}`]);
  }
}
