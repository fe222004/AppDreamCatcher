import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertFormRoutingModule } from './alert-form-routing.module';
import { AlertFormComponent } from './alert-form.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AlertFormComponent],
  imports: [
    CommonModule,
    AlertFormRoutingModule,
    TranslateModule
  ],
  exports: [AlertFormComponent] 
})
export class AlertFormModule { }
