import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Picture, CategoryPicture } from 'src/app/model/model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output()
  selectedCategory: EventEmitter<any> = new EventEmitter();
  @Input()
  categoryPictures: CategoryPicture[];
  @Input()
  picturesMenu: Picture[];

  public picturesPath = '../../../../assets/pictures/';

  constructor() { }

  ngOnInit(): void {
  }

  getMenuName(categoryid: number) {
    return this.categoryPictures.find(c => c.id === categoryid).name;
  }

  select(categoryid: number) {
    this.selectedCategory.emit(this.categoryPictures.find(c => c.id === categoryid));
  }

}
