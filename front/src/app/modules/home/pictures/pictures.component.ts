import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Picture } from 'src/app/model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { basePicturePath } from '../../../helpers/constants';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  public pictures: Picture[] = [];
  public clickedPicture: Picture;
  public loading = true;
  public basePicturePath = basePicturePath;
  public show = [];
  public showModal = false;
  public cptLoaded = 0;

  @ViewChild("myElem") MyProp: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private pictureApiService: PicturesApiService,
    private router: Router,
    private viewPortScroller: ViewportScroller
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
