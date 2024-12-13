import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertConfirmationRoutingModule } from './alert-confirmation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AlertConfirmationComponent } from './alert-confirmation.component';

@NgModule({
  declarations: [AlertConfirmationComponent],
  imports: [CommonModule, AlertConfirmationRoutingModule, TranslateModule],
  exports: [AlertConfirmationComponent],
})
export class AlertConfirmationModule {}
