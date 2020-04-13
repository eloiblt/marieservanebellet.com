import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Picture } from 'src/app/model/model';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  @Input()
  paintings: Picture[];
  @Output()
  clearCategory: EventEmitter<any> = new EventEmitter();

  public pictures: Picture[] = [];
  public clickedPicture: Picture;

  public imagesLoaded = false;
  public cptImagesLoaded = 0;

  constructor() { }

  ngOnInit(): void {
  }

  showImage(p: Picture) {
    this.clickedPicture = p;
  }

  backMenu() {
    this.clearCategory.emit();
  }

  imageLoaded() {
    this.cptImagesLoaded++;
    if (this.cptImagesLoaded === this.paintings.length) {
      this.imagesLoaded = true;
    }
  }

}
