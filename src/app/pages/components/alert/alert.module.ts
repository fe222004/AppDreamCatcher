import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    AlertRoutingModule,
    TranslateModule
  ],
  exports: [AlertComponent] 
})
export class AlertModule { }
