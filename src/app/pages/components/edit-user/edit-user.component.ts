import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { DataTransferServiceService } from 'src/app/pages/services/data-transfer-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidationConstants } from 'src/app/constants/validation.constants';
import { ModalService } from '../../services/modal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
private readonly dataTransferService: DataTransferServiceService = inject(
    DataTransferServiceService
  );
  private formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  public form: FormGroup;
  public showAlert: boolean = false;
  public kitchenImage: String;
  public kitchenImageTwo: String;
  urls = UrlsConstants;
  public showPassword: boolean = false;
  public showAlertForm: boolean = false;

  public userId: string | null = null; // Cambiado para obtener el ID desde localStorage

  public avatar: any[] = [];
  public avatarSrc: string | ArrayBuffer | null | undefined = null;


  constructor(private route: ActivatedRoute,private translate: TranslateService,private modalService: ModalService,private sanitizer: DomSanitizer) {
    this.form = this.buildForm();
    this.getUserIdFromLocalStorage(); 
    this.kitchenImage = ImageConstants.kitchen;
    this.kitchenImageTwo = ImageConstants.kitchenTwo;
  }

  getUserIdFromLocalStorage(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      console.error('El userId no está definido en localStorage.');
    }
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
      description: [
        '',
        [
          Validators.required,
        ],
      ],
      livesIn: [
        '',
        [
          Validators.required,
        ],
      ],
      status: [
        '',
        [Validators.required],
      ],
      worksAt: [
        '',
        [
          Validators.required,
        ],
      ],
      avatar: [
        null,
        [Validators.required], 
      ]
    });
  }

  getFileAvatar(event: Event): void {
    console.log(event)
    // Asegurarse de que event.target no es null y es un HTMLInputElement
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const archivoCapturado = input.files[0];
  
      // Convertir a base64 para mostrar en el preview
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.avatarSrc = imagen.base; // Actualizar el preview del avatar
      });
  
      this.avatar = []; // Limpiar el arreglo de avatar para permitir solo un archivo
      this.avatar.push(archivoCapturado); // Añadir el archivo actual al arreglo de avatar
    }
  }
  
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        reject(error);  // Aquí cambiamos resolve a reject para manejar el error correctamente
      };
  
    } catch (e) {
      reject(e);  // En lugar de devolver null, rechazamos la promesa con el error
    }
  });
  

  
  onSubmit(): void {
    console.log('entrooooooo')
    if (this.form.invalid) {
      console.log(this.form.valid);  // Debería mostrar 'true' si el formulario es válido
console.log(this.form.errors); // Si hay errores, deberían mostrarse aquí

    }

    const formData = new FormData();

    formData.append('firstname', this.form.value.firstname);
    formData.append('lastname', this.form.value.lastname);
    formData.append('description', this.form.value.description);
    formData.append('livingIn', this.form.value.livesIn);
    formData.append('maritalStatus', this.form.value.status);
    formData.append('workingAt', this.form.value.worksAt);

    if (this.userId) {
      formData.append('userId', this.userId); // Usar el userId desde localStorage
    } else {
      console.error('El userId es indefinido.');
      return;
    }

    const file = this.avatar[0];
    formData.append('avatar', file);

    formData.forEach((value, key) => {
      console.log(key, value); // Verifica los datos del FormData
    });

    this.userService.createUser(formData).subscribe(
      (response: any) => {
        this.showAlert = true;
      },
      (error) => {
        alert('Register failed');
      }
    );

  }

  clearImage() {
    this.avatarSrc = null;
    this.avatar = [];
  }

  closeModal() {
    this.modalService.hideModal();
  }
}
