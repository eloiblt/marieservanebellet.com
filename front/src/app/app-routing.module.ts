import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ManagementComponent } from './modules/admin/management/management.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { AuthGuardService } from './services/authGuard.service';
import { PicturesComponent } from './modules/home/pictures/pictures.component';
import { MenuComponent } from './modules/home/menu/menu.component';
import { ContactComponent } from './modules/home/contact/contact.component';
import { AboutComponent } from './modules/home/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      },
      {
        path: 'peintures/:id',
        component: PicturesComponent
      }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'adminLogin',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'adminManagement',
    component: ManagementComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
