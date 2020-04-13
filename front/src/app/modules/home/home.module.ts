import { NgModule } from '@angular/core';
import { PicturesComponent } from './pictures/pictures.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PicturesComponent,
    HomeComponent,
    MenuComponent
  ],
  exports: [
    PicturesComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
