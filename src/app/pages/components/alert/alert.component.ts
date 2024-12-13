import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  private readonly router = inject(Router);

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
