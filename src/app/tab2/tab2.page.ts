import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  contacts!: Observable<Contact[]>;

  constructor(private firebaseService: FirebaseService, private router: Router) {
    this.contacts = this.firebaseService.list();
  }

  newContact() {
    this.router.navigateByUrl('/tabs/register');
  }

  editContact(id:string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
