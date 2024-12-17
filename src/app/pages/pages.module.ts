import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
