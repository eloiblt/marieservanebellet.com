import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicturesComponent } from './pictures/pictures.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    PicturesComponent,
    HomeComponent
  ],
  exports: [
    PicturesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
