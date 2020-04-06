import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  public url: string;

  constructor() { }

  ngOnInit(): void {
  }

  showImage(url: string) {
    this.url = url;
    console.log(url);
  }
}
