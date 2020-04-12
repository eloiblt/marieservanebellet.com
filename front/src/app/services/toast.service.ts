import { Injectable, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private options = {
  };

  constructor(public toastr: ToastrService) { }

  success(txt: string, title?: string) {
    this.toastr.success(txt, title, this.options);
  }

  error(txt: string, title?: string) {
    this.toastr.error(txt, title, this.options);
  }

  warning(txt: string, title?: string) {
    this.toastr.warning(txt, title, this.options);
  }

  info(txt: string, title?: string) {
    this.toastr.info(txt, title, this.options);
  }
}
