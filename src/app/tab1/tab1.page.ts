import { Component, ViewChild, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ContactModel } from '../models/contact.model';
import { FirebaseAuthenticationService } from '../services/firebase.authentication.service';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  avatar:string = "../../assets/avatar.png";
  displayName:string;

  contactFormGroup!: FormGroup;
  @ViewChild('contactFormGroupDirective')
  contactFormGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseFirestoreService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private router: Router,
    private auth:Auth) {
      this.displayName = this.auth.currentUser!.displayName!;
    }

    ngOnInit(): void {
    this.contactFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });

    this.contactFormGroup.valueChanges.subscribe(() => this.defineAvatar());
  }

  createContact(values: any) {
    let newContact: ContactModel = { ...values };
    newContact.imageUrl = this.avatar;

    this.firebaseService.saveContact(newContact);
    this.contactFormGroupDirective.reset();
  }

  defineAvatar() {
    const email = this.contactFormGroup.get('email');
    if(email?.valid) {
      this.avatar = `https://robohash.org/${email.value}?set=set3&gravatar=yes`;
    }
  }

  async signOut() {
    await this.firebaseAuthenticationService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async perfil() {
    this.router.navigateByUrl('/perfil', { replaceUrl: true });
  }
}
