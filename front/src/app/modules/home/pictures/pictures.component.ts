import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  public pictures: Picture[] = [];
  public clickedPicture: Picture;
  public loading = true;
  public picturesPath = '../../../../assets/pictures/';
  public show = false;
  public cptLoaded = 0;

  constructor(
    private route: ActivatedRoute,
    private pictureApiService: PicturesApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pictureApiService.getByCategory(this.route.snapshot.data.categoryId).subscribe(res => {
      this.pictures = res;
      this.loading = false;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  showImage(p: Picture) {
    this.clickedPicture = p;
  }

  backMenu() {
    this.router.navigate(['/gallery']);
  }

  isRectangleOrVertical(grid: string) {
    return grid.includes('/');
  }

  loaded() {
    this.cptLoaded++;
    if (this.cptLoaded === this.pictures.length) {
      this.show = true;
    }
  }

}
