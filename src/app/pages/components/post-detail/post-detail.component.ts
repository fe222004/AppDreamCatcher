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
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      console.log('Post id', postId);
      if (postId) {
        this.searchService.getPostById(postId).subscribe({
          next: (data) => {
            this.results = data;
            console.log('Detalles del post:', this.results); 
          },
          error: (err) => console.error('Error al obtener el post:', err),
        });
      }
    });
  }
}
