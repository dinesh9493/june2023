import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInOrUpRoutingModule } from './sign-in-or-up-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    LoginContainerComponent,
  ],
  imports: [CommonModule, SignInOrUpRoutingModule],
})
export class SignInOrUpModule {}