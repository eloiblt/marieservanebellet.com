import { Component, OnInit } from '@angular/core';
import { CategoryPicture, Picture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public selectedCategory: CategoryPicture;
  public ambiancePicture: Picture;
  public loading = true;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
    this.pictureApiService.getBySpec('Ambiance').subscribe(res => {
      this.ambiancePicture = res[0];
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.src = this.ambiancePicture.url;
    }, err => {
      console.log(err);
    });
  }

  setCategory(c: CategoryPicture) {
    this.selectedCategory = c;
  }

  clearCategory() {
    this.selectedCategory = null;
  }

}
