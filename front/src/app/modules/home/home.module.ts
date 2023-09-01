import { NgModule } from '@angular/core';
import { PicturesComponent } from './pictures/pictures.component';
import { HomeComponent } from './home.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    PicturesComponent,
    HomeComponent,
    MenuComponent,
    ContactComponent,
    AboutComponent
  ],
  exports: [
    PicturesComponent,
    HomeComponent,
    MenuComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    SharedModule
  ]
})
export class HomeModule { }
