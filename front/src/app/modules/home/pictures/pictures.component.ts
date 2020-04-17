import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Picture } from 'src/app/model/model';
import { ActivatedRoute } from '@angular/router';

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

  public picturesPath = '../../../../assets/pictures/';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
  }

  showImage(p: Picture) {
    this.clickedPicture = p;
  }

  backMenu() {
    this.clearCategory.emit();
  }

}
