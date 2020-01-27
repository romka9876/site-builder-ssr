import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { WrapperComponent } from '@shared/layouts/wrapper/wrapper.component';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '',
    component: WrapperComponent,
    canLoad: [UnAuthGuard],
    children: [{ path: 'auth', loadChildren: './auth/auth.module#AuthModule' }]
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'home', loadChildren: './home/home.module#HomeModule' }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: '**', loadChildren: './not-found/not-found.module#NotFoundModule' }],
  },
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
