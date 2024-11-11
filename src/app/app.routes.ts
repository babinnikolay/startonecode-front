import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'lessons', pathMatch: 'full'},
  {
    path: 'lessons', loadChildren: () =>
      import('./lesson/lesson.routes').then(c => c.LESSONS_ROUTES)
  },
  {
    path: 'login', loadChildren: () =>
      import('./login/login.routes').then(c => c.LOGIN_ROUTES)
  },
];
