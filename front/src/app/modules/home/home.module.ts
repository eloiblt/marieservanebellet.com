import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicturesComponent } from './pictures/pictures.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

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
    CommonModule
  ]
})
export class HomeModule { }
