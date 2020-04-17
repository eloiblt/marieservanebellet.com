import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ManagementComponent } from './modules/admin/management/management.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { AuthGuardService } from './services/authGuard.service';
import { PicturesComponent } from './modules/home/pictures/pictures.component';
import { MenuComponent } from './modules/home/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'prefix'
  },
  {
    path: 'gallery',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      },
      {
        path: 'saint-malo',
        component: PicturesComponent,
        data: { categoryId: 1 }
      },
      {
        path: 'angleterre',
        component: PicturesComponent,
        data: { categoryId: 2 }
      },
      {
        path: 'ambiances',
        component: PicturesComponent,
        data: { categoryId: 3 }
      }
    ]
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
    redirectTo: 'gallery',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
