import { NgModule } from '@angular/core';
import { PicturesComponent } from './pictures/pictures.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    PicturesComponent,
    HomeComponent,
    MenuComponent,
    GalleryComponent
  ],
  exports: [
    PicturesComponent,
    HomeComponent,
    MenuComponent,
    GalleryComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
