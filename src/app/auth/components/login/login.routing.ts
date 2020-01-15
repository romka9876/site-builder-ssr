import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      meta: {
        title: 'Login',
        description: 'auth.login.text',
        override: true,
      },
    }
  }
];

export const LoginRoutes = RouterModule.forChild(loginRoutes);

