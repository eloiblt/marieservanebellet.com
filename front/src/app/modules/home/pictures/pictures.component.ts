import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { CategoryPicture, Picture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit, OnChanges {

  @Input()
  selectedCategory: CategoryPicture;

  public pictures: Picture[] = [];
  public clickedPicture: Picture;
  public loading = true;

  constructor(
    private pictureApiService: PicturesApiService
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges() {
    if (this.selectedCategory) {
      this.pictureApiService.getByCategory(this.selectedCategory.id).subscribe(res => {
        this.pictures = res;
        console.log(res);
        this.loadImages();
      }, err => {
        console.log(err);
      });
    }
  }

  showImage(p: Picture) {
    this.clickedPicture = p;
  }

  loadImages() {
    let cpt = 0;

    this.pictures.map(p => p.url).forEach(url => {
      const img = new Image();

      img.onload = () => {
        cpt++;
        if (cpt === this.pictures.length) {
          this.loading = false;
        }
      };

      img.src = url;
    });
  }

}
