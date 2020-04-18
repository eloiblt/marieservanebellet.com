import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logoPath = '../../../../assets/pictures/logo.jpg';
  public showMenu = false;
  public show = false;

  constructor(
    private pictureApiService: PicturesApiService
  ) { }

  ngOnInit(): void {
  }

}
