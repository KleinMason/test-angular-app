import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routes').then((r) => r.LOGIN_ROUTES),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.routes').then((r) => r.SIGNUP_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (r) => r.DASHBOARD_ROUTES,
      ),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blog/blog.routes').then((r) => r.BLOG_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
