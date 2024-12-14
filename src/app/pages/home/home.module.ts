import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavModule } from '../components/nav/nav.module';
import { ProfileModule } from '../components/profile/profile.module';
import { EditUserModule } from '../components/edit-user/edit-user.module';
import { CreatePostModule } from '../components/create-post/create-post.module';
import { PostModule } from '../components/post/post.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavModule,
    ProfileModule,
    EditUserModule,
    CreatePostModule,
    PostModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
