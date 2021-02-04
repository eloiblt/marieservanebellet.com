import { Component, OnInit } from '@angular/core';
import { basePicturePath } from '../../../helpers/constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public photoPath: string;
  public show = false;

  constructor() { }

  ngOnInit(): void {
    document.getElementById('top').scrollTo(0, 0);
    this.photoPath = basePicturePath + 'photo.jpg'
  }

}
