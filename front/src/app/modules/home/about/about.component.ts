import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  public photoPath: string;
  public show = false;

  ngAfterViewInit() {
    document.getElementById("about").scrollIntoView();
  }
}
