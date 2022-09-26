import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public photoPath: string;
  public show = false;

  ngOnInit(): void {
    this.photoPath = environment.picturesUrl + 'photo.jpg'
  }

  ngAfterViewInit() {
    document.getElementById("about").scrollIntoView();
  }

}
