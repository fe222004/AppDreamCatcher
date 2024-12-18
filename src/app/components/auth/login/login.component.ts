import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DataTransferServiceService } from 'src/app/pages/services/data-transfer-service.service';
import { RoutesConstants } from 'src/app/constants/routes.constants';
import { RegexConstants } from 'src/app/constants/regex.constants';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from 'src/app/pages/services/translation.service';
import { LanguageConstants } from 'src/app/constants/language-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly dataTransferService: DataTransferServiceService = inject(
    DataTransferServiceService
  );
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private translationService: TranslationService = inject(TranslationService)

  loginForm: FormGroup;
  public kitchenImage: String;
  public kitchenImageTwo: String;
  urls = UrlsConstants;
  public showPassword: boolean = false;
  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;

  constructor() {
    this.loginForm = this.buildForm();
    this.getLocalStorageData();
    this.kitchenImage = ImageConstants.kitchen;
    this.kitchenImageTwo = ImageConstants.kitchenTwo;
  }

  buildForm(): FormGroup {
    return (this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(RegexConstants.email)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(RegexConstants.password)],
      ],
    }));
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
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('userId', response.user.id.toString());
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.goToHome();
        },
        (error) => {
          alert('Login failed');
        }
      );
    } else {
      alert('Login failed');
    }
  }

  getLocalStorageData(): void {
    const formData = this.dataTransferService.getData();
    if (formData) {
      this.loginForm.patchValue(formData);
    }
  }

  navigate(): void {
    this.router.navigate([RoutesConstants.register]);
  }

  gotoIndex(): void {
    this.router.navigate([RoutesConstants.home]);
  }

  goToHome(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Navegar a la ruta que incluye el userId
      this.router.navigate(['home']);    } else {
      // Si no hay userId, navegar a la página principal por defecto
      this.router.navigate([RoutesConstants.home]);
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field) ?? {
      invalid: false,
      dirty: false,
      touched: false,
    };
    return control.invalid && (control.dirty || control.touched);
  }
}
