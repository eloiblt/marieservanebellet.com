import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactApiService } from 'src/app/services/api/contact-api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  public error = '';

  constructor(
    private contactApiService: ContactApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      message: new FormControl('', [
        Validators.required
      ]),
    });
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

  contact() {
    this.error = '';
    this.contactApiService.contact(this.contactForm.value).subscribe(res => {
      this.toastService.success('Mail envoyé');
      this.contactForm.reset();
    }, err => {
      console.log(err);
      if (err.status === 422) {
        this.error = 'Saisies invalides';
      } else {
        this.error = 'Erreur dans l\'envoi du mail';
      }
    });
  }

  canContact() {
    return !(this.name.invalid || this.mail.invalid || this.message.invalid);
  }

}
