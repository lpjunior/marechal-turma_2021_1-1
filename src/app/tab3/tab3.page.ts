import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ContactModel } from '../models/contact.model';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  contactList!: ContactModel[];

  searchFG!: FormGroup;
  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(private toastController: ToastController, private firebaseService: FirebaseFirestoreService, private router: Router) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  search(contact:any) {
    this.firebaseService.findByName(contact.name)
      .subscribe({
        next: (result) => {

          if(!result) {
            this.presentToast(`Contact not found: ${contact.name}`);
          }

          this.contactList = result as ContactModel[];
        },
        error: (err) => {
          console.log(err);
          this.presentToast(`Service unavailable`);
        }
      });

    this.searchFG.reset();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle'
    });

    await toast.present();
  }

  editContact(id:string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
