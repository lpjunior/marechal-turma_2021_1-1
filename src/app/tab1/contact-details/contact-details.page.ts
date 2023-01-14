import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { FirebaseFirestoreService } from 'src/app/services/firebase.firestore.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  private contact!: Contact;
  contactFormGroup!: FormGroup;
  @ViewChild('contactFormGroupDirective')
  formGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseFirestoreService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');

    this.firebaseService.find(id!).subscribe({
      next: (data: Contact) => {
        if (!data) {
          this.router.navigateByUrl('/tabs/list');
        } else {
          this.contact = data;

          this.contactFormGroup = new FormGroup({
            name: new FormControl(this.contact.name!, Validators.required),
            lastName: new FormControl(
              this.contact.lastName!,
              Validators.required
            ),
            phone: new FormControl(this.contact.phone!, Validators.required),
            email: new FormControl(this.contact.email!, Validators.required),
            category: new FormControl(
              this.contact.category!,
              Validators.required
            ),
          });
        }
      },
      error: (err) =>
        console.error(`Error on get contact data. Error: ${err}`),
    });
  }

  editContact(values: any) {
    // pegar todos os dados do formulário e transformar em um novo contato
    let updateContact: Contact = { id: this.contact.id, ...values };
    this.firebaseService
      .update(updateContact)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.formGroupDirective.reset();
  }

  deleteContact() {
    this.firebaseService
      .delete(this.contact.id)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));
  }
}
