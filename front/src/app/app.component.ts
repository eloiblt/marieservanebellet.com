import { Component } from '@angular/core';
import { PaintingApiService } from './services/api/painting-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'front';

  constructor(private paintingService: PaintingApiService, private router: Router) {
    this.paintingService.getAllPaintings().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
