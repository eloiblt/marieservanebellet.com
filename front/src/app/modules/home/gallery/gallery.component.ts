import { Component, OnInit } from '@angular/core';
import { CategoryPicture } from 'src/app/model/model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public selectedCategory: CategoryPicture;

  constructor() { }

  ngOnInit(): void {
  }

  setCategory(c: CategoryPicture) {
    this.selectedCategory = c;
  }

  clearCategory() {
    this.selectedCategory = null;
  }

}
