import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { ContactApiService } from '../../services/api/contact.api-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ReactiveFormsModule],
})
export class ContactComponent implements OnInit, AfterViewInit {
  public contactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    mail: new FormControl(''),
    message: new FormControl(''),
  });
  public error = '';

  private readonly contactApiService: ContactApiService =
    inject(ContactApiService);
  private readonly toastService: ToastrService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('contact')?.scrollIntoView();
    }
  }

  get name() {
    return this.contactForm.get('name');
  }

  get mail() {
    return this.contactForm.get('mail');
  }

  get message() {
    return this.contactForm.get('message');
  }

  async contact() {
    this.error = '';

    try {
      await firstValueFrom(
        this.contactApiService.contact(this.contactForm.value),
      );
      this.toastService.success('Mail envoyé');
      this.contactForm.reset();
    } catch (err: any) {
      if (err.status === 422) {
        this.error = 'Saisies invalides';
      } else {
        this.error = "Erreur dans l'envoi du mail";
      }
    }
  }

  canContact() {
    return !(this.name?.invalid || this.mail?.invalid || this.message?.invalid);
  }
}
