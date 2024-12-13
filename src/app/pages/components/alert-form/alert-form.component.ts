import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent {
  @Output() alertClosed = new EventEmitter<void>();
  isOpen = true; 

  closeAlert(): void {
    this.alertClosed.emit();
  }

}
