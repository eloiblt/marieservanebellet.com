import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent {
  @Input()
  src: string;

  @Input()
  title: string;

  @Output()
  onLoad = new EventEmitter();

  @Output()
  onClick = new EventEmitter();

  public loaded = false;
  public environment = environment;

  load() {
    this.loaded = true;
    this.onLoad.emit();
  }

  emitClick() {
    console.log('here')
    if (!this.loaded) return;
    console.log('emit')
    this.onClick.emit();
  }
}
