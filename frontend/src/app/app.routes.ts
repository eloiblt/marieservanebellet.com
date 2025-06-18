import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { AuthGuard } from './services/authGuard.service';
import { PicturesComponent } from './components/pictures/pictures.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MenuComponent,
      },
      {
        path: 'peintures/:id',
        component: PicturesComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full',
  },
  {
    path: 'adminLogin',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin-management',
    component: ManagementComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
