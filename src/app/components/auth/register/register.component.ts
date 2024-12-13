import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { RegexConstants } from 'src/app/constants/regex.constants';
import { ImageConstants } from 'src/app/constants/images.constants';
import { RoutesConstants } from 'src/app/constants/routes.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { DataTransferServiceService } from 'src/app/pages/services/data-transfer-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidationConstants } from 'src/app/constants/validation.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private readonly dataTransferService: DataTransferServiceService = inject(
    DataTransferServiceService
  );
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public form: FormGroup;
  public showAlert: boolean = false;
  public kitchenImage: String;
  public kitchenImageTwo: String;
  urls = UrlsConstants;
  public showPassword: boolean = false;
  public showAlertForm: boolean = false;

  constructor(private translate: TranslateService) {
    this.form = this.buildForm();
    this.getLocalStorageData();
    this.kitchenImage = ImageConstants.kitchen;
    this.kitchenImageTwo = ImageConstants.kitchenTwo;
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.NAME_MAX_LENGTH),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.NAME_MAX_LENGTH),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(RegexConstants.email)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(RegexConstants.password)],
      ]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field) ?? {
      invalid: false,
      dirty: false,
      touched: false,
    };
    return control.invalid && (control.dirty || control.touched);
  }

  getLocalStorageData(): void {
    const formData = this.dataTransferService.getData();
    if (formData) {
      this.form.patchValue(formData);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.showAlertForm = true;
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }
    this.authService.register(this.form.value).subscribe(
      (response: User) => {
        this.showAlert = true;
      },
      (error) => {
        alert('Register failed');
      }
    );
  }

  goToLogin(): void {
    this.router.navigate([RoutesConstants.login]);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onAlertClosed(): void {
    this.showAlertForm = false;
  }
}
