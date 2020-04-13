import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ambiancePicture: Picture;
  public dataReceived = false;
  public imagesLoaded = false;

  get loading() {
    return !(this.dataReceived && this.imagesLoaded);
  }

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
    this.pictureApiService.getBySpec('Ambiance').subscribe(res => {
      this.ambiancePicture = res[0];
      this.dataReceived = true;
    }, err => {
      console.log(err);
    });
  }

  imageLoaded() {
    this.imagesLoaded = true;
  }

}
