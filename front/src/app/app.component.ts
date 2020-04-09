import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { PaintingApiService } from './services/api/painting-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'front';

  constructor(private paintingService: PaintingApiService) {
    this.paintingService.getAllPaintings().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
