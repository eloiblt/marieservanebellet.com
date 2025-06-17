import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Picture } from '../../model/model';
import { PictureComponent } from '../picture/picture.component';
import { isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { PicturesApiService } from '../../services/api/pictures.api-service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  imports: [
    PictureComponent,
    NgClass,
    NgStyle,
    FaIconComponent,
    RouterLink,
    FontAwesomeModule,
  ],
})
export class PicturesComponent implements OnInit, AfterViewInit {
  public pictures: (Picture | null)[] = [];
  public clickedPicture: Picture | null = null;
  public loadedImagesIds: number[] = [];
  public showModal = false;
  public environment = environment;
  faArrowLeft = faArrowLeft;

  @ViewChild('goBack') goBack: ElementRef<HTMLElement> =
    {} as ElementRef<HTMLElement>;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly pictureApiService: PicturesApiService =
    inject(PicturesApiService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.pictures = Array(9).fill(null);

    this.loadedImagesIds = [];
    this.route.params.subscribe((params) => {
      this.pictureApiService
        .getByCategory(Number(params['id']))
        .subscribe((res: Picture[]) => {
          this.pictures = res;
        });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.goBack.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100); // Optional delay, can be removed
  }

  isRectangleOrVertical(grid: string | undefined) {
    if (!grid) return false;
    return grid?.includes('/');
  }

  loaded(id: number | undefined) {
    if (!id) return;
    this.loadedImagesIds = [...this.loadedImagesIds, id];
  }

  isLoaded(id: number | undefined) {
    if (!id) return;
    return this.loadedImagesIds.includes(id);
  }

  closeModal() {
    this.showModal = false;
    this.clickedPicture = null;
  }
}
