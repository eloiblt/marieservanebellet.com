import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Picture } from 'src/app/model/model';
import { ActivatedRoute } from '@angular/router';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
})
export class PicturesComponent implements OnInit {
  public pictures: Picture[] = [];
  public clickedPicture: Picture;
  public loadedImagesIds = [];
  public showModal = false;
  public environment = environment;

  @ViewChild('goBack') goBack: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private pictureApiService: PicturesApiService
  ) {}

  ngOnInit(): void {
    this.pictures = [].constructor(9);

    this.loadedImagesIds = [];
    this.route.params.subscribe((params) => {
      this.pictureApiService.getByCategory(Number(params['id'])).subscribe(
        (res) => {
          this.pictures = res;
        },
        (err) => {}
      );
    });

    setTimeout(
      () =>
        this.goBack.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
      200
    );
  }

  isRectangleOrVertical(grid: string) {
    return grid?.includes('/');
  }

  loaded(id: number) {
    this.loadedImagesIds = [...this.loadedImagesIds, id];
  }

  isLoaded(id: number) {
    return this.loadedImagesIds.includes(id);
  }

  closeModal() {
    this.showModal = false;
    this.clickedPicture = null;
  }
}
