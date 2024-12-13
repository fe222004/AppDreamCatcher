import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,
     TranslateModule,
       ReactiveFormsModule,
  ],
  exports:[EditUserComponent]
})
export class EditUserModule { }
