import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { MetaGuard } from '@ngx-meta/core';
import { CanAuthenticationGuard } from '@shared/guards/can-auth.guard';

const authRoutes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent, // Wrapper
    canActivateChild: [
      MetaGuard
    ],
    children: [
      {
        path: 'login',
        canActivate: [CanAuthenticationGuard],
        loadChildren: './components/login/login.module#LoginModule'
      },
      {
        path: 'registration',
        canActivate: [CanAuthenticationGuard],
        loadChildren: './components/registration/registration.module#RegistrationModule',
      },
    ],
  },
];

export const AuthRoutes = RouterModule.forChild(authRoutes);
