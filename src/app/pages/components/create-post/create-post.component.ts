import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/components/service/auth.service';
import { PostService } from '../../services/post.service';
import { PostI } from 'src/app/models/post.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly postService: PostService = inject(PostService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly notificationService: NotificationService = inject(NotificationService);


  public userId: string | null = null;
  form: FormGroup;

  public media: any[] = [];
  public imageSrc: string | ArrayBuffer | null = null; 

  constructor(private sanitizer: DomSanitizer) {
    console.log('Constructor ejecutado: Inicializando componente');
    this.form = this.buildForm();
    this.getUserIdFromLocalStorage(); 
  }
  

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
  }

  getUserIdFromLocalStorage(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      console.error('El userId no está definido en localStorage.');
    }
  }

  buildForm(): FormGroup {
    console.log('Creando el formulario');
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(2)]], 
      tag: ['', Validators.required], 
      media: [null, Validators.required],
    });
  }

  getImageFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivoCapturado = input.files[0];
      console.log('Archivo capturado:', archivoCapturado); 
  
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.imageSrc = imagen.base; 
      });
  

      this.media = [];
      this.media.push(archivoCapturado); 
      console.log('Media después de agregar archivo:', this.media);

      this.form.patchValue({
        media: archivoCapturado
      });
    }
  }

  clearMedia(): void {
  this.imageSrc = null; 
  this.media = []; 
  this.form.patchValue({
    media: null
  });
  console.log('Imagen eliminada');
}

  

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } catch (e) {
        reject(e); 
      }
    });

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      console.warn('El formulario no es válido:', this.form.errors);
      return;
    }

    const formData = new FormData();

    formData.append('text', this.form.value.text);
    formData.append('tag', this.form.value.tag);

    if (this.userId) {
      formData.append('userId', this.userId); // Usar el userId desde localStorage
    } else {
      console.error('El userId es indefinido.');
      return;
    }

    console.log('datos para enviar',this.media)
    const file = this.media[0];
    
    formData.append('media', file);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.postService.createPost(formData).subscribe(
      (response: PostI) => {
        console.log('Post creado exitosamente. Respuesta del servidor:', response);
  
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const fullName = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : 'Usuario desconocido';
  
        const notification = {
          description: `Nuevo post creado: ${this.form.value.text}`,
          username: fullName,
          tag: this.form.value.tag,
          postId: response?.id || null, 
          status: false,
        };
  
        console.log('Notificación preparada para enviar:', notification);
  
        this.notificationService.createNotification(notification).subscribe(
          () => {
            console.log('Notificación enviada correctamente.');
          },
          (error) => {
            console.error('Error al enviar la notificación:', error);
          }
        );

        window.location.reload();
      },
      (error) => {
        console.error('Error al crear el post:', error);
      }
    );

}
}
