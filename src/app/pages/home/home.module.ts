import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavModule } from 'src/app/components/nav/nav.module';
import { HomeComponent } from './home.component';
import { ProfileModule } from 'src/app/components/profile/profile.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavModule,
    ProfileModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
