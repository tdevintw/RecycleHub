import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate : [AuthGuard] },
  { path: 'signup', component: SignupComponent },
//   { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
