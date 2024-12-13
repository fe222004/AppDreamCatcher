import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { AlertLoginRegisterComponent } from './components/alert-login-register/alert-login-register.component';
import { AlertFormModule } from 'src/app/pages/components/alert-form/alert-form.module';
import { AlertLoginRegisterModule } from './components/alert-login-register/alert-login-register.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    AuthRoutingModule,
    HttpClientModule,
    AlertLoginRegisterModule,
    LoginModule,
  ]
})
export class AuthModule { }
