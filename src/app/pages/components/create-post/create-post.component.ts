import { Component, inject } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/components/service/auth.service';
import { PostService } from '../../services/post.service';
import { PostI } from 'src/app/models/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly postService: PostService = inject(PostService);
  private readonly authService: AuthService = inject(AuthService);

  public userId: string | null = null; // Cambiado para obtener el ID desde localStorage
  form: FormGroup; // Formulario para capturar el contenido del post
  imageSrc: string | ArrayBuffer | null = null; // Vista previa de la imagen
  videoSrc: string | ArrayBuffer | null = null; // Vista previa del video
  isButtonVisible: boolean = false; // Si el botón de publicación debe estar habilitado

  constructor() {
    console.log('Constructor ejecutado: Inicializando componente');
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.form.get('text')?.valueChanges.subscribe(value => {
      this.isButtonVisible = value && value.trim().length > 0;
      console.log('Cambio en texto del formulario:', value);
    });
  }

  buildForm(): FormGroup {
    console.log('Creando el formulario');
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(2)]], // Campo de texto obligatorio
      tag: ['', Validators.required], // Campo de categoría obligatorio
      media: ['', Validators.required], // Campo de archivo obligatorio (imagen/video)
    });
  }

  chooseImage() {
    console.log('Abrir selector de imagen');
    const fileInputImage = document.getElementById('fileInputImage') as HTMLInputElement;
    fileInputImage.click();
  }

  chooseVideo() {
    console.log('Abrir selector de video');
    const fileInputVideo = document.getElementById('fileInputVideo') as HTMLInputElement;
    fileInputVideo.click();
  }

  getImageFile(event: Event) {
    console.log('Seleccionando imagen');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Archivo seleccionado (imagen):', file.name);
      const reader = new FileReader();

      if (file.type.startsWith('image/')) {
        reader.onload = (e) => {
          const result = e.target?.result;
          console.log('Vista previa de imagen generada');
          if (result) {
            this.imageSrc = result;
            this.videoSrc = null; // Limpiar video si seleccionamos imagen
            this.form.get('media')?.setValue(file);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona solo un archivo de imagen.');
      }
    }
  }

  getVideoFile(event: Event) {
    console.log('Seleccionando video');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Archivo seleccionado (video):', file.name);
      const reader = new FileReader();

      if (file.type.startsWith('video/')) {
        reader.onload = (e) => {
          const result = e.target?.result;
          console.log('Vista previa de video generada');
          if (result) {
            this.videoSrc = result;
            this.imageSrc = null; // Limpiar imagen si seleccionamos video
            this.form.get('media')?.setValue(file);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona solo un archivo de video.');
      }
    }
  }

  clearMedia() {
    console.log('Limpiando archivo seleccionado');
    this.imageSrc = null;
    this.videoSrc = null;
    this.form.get('media')?.setValue(null);
  }

  onSubmit() {
    if (this.form.invalid) {
      console.warn('El formulario no es válido:', this.form.errors);
      return;
    }

    const formData = new FormData();
    const file = this.form.get('media')?.value;
    const text = this.form.get('text')?.value;
    const tag = this.form.get('tag')?.value;
    const userId = this.authService.getUserId() || ''; // Obtener el ID del usuario logueado

    if (file) {
      formData.append('media', file);
    }
    formData.append('text', text);
    formData.append('tag', tag);

    if (this.userId) {
      formData.append('userId', this.userId); // Usar el userId desde localStorage
    } else {
      console.error('El userId es indefinido.');
      return;
    }

    console.log('Formulario enviado con:', {
      text,
      tag,
      userId,
      fileName: file ? file.name : null,
    });

    this.postService.createPost(formData).subscribe(
      (response: PostI) => {
        console.log('Post creado exitosamente:', response);
      },
      (error) => {
        console.error('Error al crear el post:', error);
      }
    );
  }
}
