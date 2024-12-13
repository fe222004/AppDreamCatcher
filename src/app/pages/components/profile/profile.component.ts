import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-profile',  // Asegúrate de que el selector sea correcto
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.showModal();
  }
}
