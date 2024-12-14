import { Component } from '@angular/core';
import { PostI } from 'src/app/models/post.interface';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  posts: PostI[] = [];

  constructor(
    private postService: PostService, private router: Router) {
      this.fetchPosts();
    }

    fetchPosts(): void {
      this.postService.findPosts().subscribe(
        (posts: PostI[]) => {
          this.posts = posts;
          console.log(posts);
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
    }  

}
