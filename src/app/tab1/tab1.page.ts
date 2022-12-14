import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  contactFormGroup!: FormGroup;
  @ViewChild('contactFormGroupDirective') contactFormGroupDirective!: FormGroupDirective;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.contactFormGroup = new FormGroup({
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required)
    });
  }

  createContact(values: any) {
    // pegar todos os dados do formulário e transformar em um novo contato
    let newContact:Contact = { ...values };
    this.firebaseService.save(newContact);
    this.contactFormGroupDirective.reset();
  }
}
