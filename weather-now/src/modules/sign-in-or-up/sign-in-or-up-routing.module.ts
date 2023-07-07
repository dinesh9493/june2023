import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';

const routes: Routes = [
  {
    path: '',
    component: LoginContainerComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'forgot-passowrd',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register',
        component: SignUpComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInOrUpRoutingModule {}
