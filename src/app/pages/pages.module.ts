import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NavModule } from "./components/nav/nav.module";
import { ProfileModule } from "./components/profile/profile.module";


@NgModule({
  declarations: [
  
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NavModule,
    ProfileModule
]
})
export class PagesModule { }
