import { Component } from '@angular/core';
import { PictureComponent } from '../picture/picture.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [PictureComponent, RouterOutlet],
})
export class HomeComponent {}
