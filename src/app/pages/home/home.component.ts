import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { NavModule } from "../components/nav/nav.module";
import { NavComponent } from "../components/nav/nav.component";

@Component({
  selector: 'app-home',  // El selector debe ser correcto
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Lógica del componente
  modalVisible = false;

  constructor(private modalService: ModalService) {
    this.modalService.modalVisibility$.subscribe(visible => {
      this.modalVisible = visible;
    });
  }
}
