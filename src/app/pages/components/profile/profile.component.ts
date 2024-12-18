import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile', // Asegúrate de que el selector sea correcto
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  fullName: string = 'Usuario desconocido';
  userId: string | null = null;
  userdescription: string | null = null;
  user: any = {};
  profileImage: string =
    'https://i.pinimg.com/736x/2d/3b/31/2d3b314e4b70997dbcf9d096c27c9159.jpg'; // Imagen por defecto
  maritalStatus: any;
  livingIn: any;
  workingAt: any;

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fullName =
      user.firstname && user.lastname
        ? `${user.firstname} ${user.lastname}`
        : 'Usuario desconocido';
    this.userId = user.id || null;

    this.userdescription = this.userdescription || null;
    if (this.userId) {
      this.fetchUserData();
    } else {
      this.loadDefaultData();
    }
  }

  loadDefaultData() {
    this.profileImage =
      'https://i.pinimg.com/736x/2d/3b/31/2d3b314e4b70997dbcf9d096c27c9159.jpg';
  }

  fetchUserData() {
    if (this.userId) {
      console.log('Buscando usuario con ID:', this.userId); // Aquí puedes ver si el ID está bien
      // Verificamos que userId no sea null
      this.userService.getUserById(this.userId).subscribe(
        (response: any) => {
          console.log(response);
          this.user = response;
          this.fullName = `${response.firstname || 'Usuario desconocido'} ${response.lastname || ''}`;
          this.profileImage = response.avatar || 'https://i.pinimg.com/736x/2d/3b/31/2d3b314e4b70997dbcf9d096c27c9159.jpg'; // Si no tiene avatar usa una imagen por defecto
          this.userdescription = response.description || 'Descripción no disponible';
          this.livingIn = response.livingIn || 'No especificado';
          this.maritalStatus = response.maritalStatus || 'No especificado';
          this.workingAt = response.workingAt || 'No especificado';
        },
        (error) => {
          console.error('Error fetching user data', error);
          this.loadDefaultData();
        }
      );
    } else {
      console.warn('No userId found; loading default data.');
      this.loadDefaultData();
    }
  }

  openModal() {
    this.modalService.showModal();
  }
}
