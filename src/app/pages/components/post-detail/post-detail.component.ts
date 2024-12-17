import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { searchService } from '../../services/search.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  results: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: searchService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      console.log('Post id', postId);  // Obtiene el ID de la URL
      if (postId) {
        this.searchService.getPostById(postId).subscribe({
          next: (data) => {
            this.results = data;
            console.log('Detalles del post:', this.results); // Muestra los datos obtenidos
          },
          error: (err) => console.error('Error al obtener el post:', err),
        });
      }
    });
  }
}
