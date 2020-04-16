import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ManagementComponent } from './modules/admin/management/management.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { AuthGuardService } from './services/authGuard.service';
import { NotfoundComponent } from './modules/navigation/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
