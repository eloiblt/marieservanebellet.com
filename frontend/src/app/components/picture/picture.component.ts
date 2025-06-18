import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-picture',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent {
  @Input()
  src = '';

  @Input()
  title = '';

  @Input()
  canZoom = true;

  @Input()
  priority = false;

  @Output()
  pictureLoad = new EventEmitter();

  @Output()
  pictureClick = new EventEmitter();

  public loaded = false;
  public environment = environment;

  load() {
    this.loaded = true;
    this.pictureLoad.emit();
  }

  emitClick() {
    if (!this.loaded) return;
    this.pictureClick.emit();
  }
}
