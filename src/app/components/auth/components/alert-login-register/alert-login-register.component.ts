import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-login-register',
  templateUrl: './alert-login-register.component.html',
  styleUrls: ['./alert-login-register.component.css']
})
export class AlertLoginRegisterComponent {
  
  private readonly router: Router = inject(Router);

  navigateToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['auth/register']);
  }

}
