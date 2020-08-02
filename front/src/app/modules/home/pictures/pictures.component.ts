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
  public picturesPath = 'https://marieservanebellet.com:5001/';
  public show = [];
  public showModal = false;
  public cptLoaded = 0;

  constructor(
    private route: ActivatedRoute,
    private pictureApiService: PicturesApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.show = [];
    this.route.params.subscribe(params => {
      this.pictureApiService.getByCategory(Number(params['id'])).subscribe(res => {
        this.pictures = res;
        this.loading = false;
      }, err => {
        console.log(err);
      });
    });
  }

  showImage(p: Picture) {
    this.clickedPicture = p;
  }

  isRectangleOrVertical(grid: string) {
    return grid.includes('/');
  }

  loaded(id: number) {
    this.show = [...this.show, id];
  }

  isLoaded(id: number) {
    return this.show.includes(id);
  }

  closeModal() {
    this.showModal = false;
    this.clickedPicture = null;
  }

}
