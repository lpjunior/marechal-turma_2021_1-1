import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Contact } from '../models/contact.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  contactList!: Contact[];

  searchFG!: FormGroup;
  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(private toastController: ToastController, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  search(contact:any) {
    this.firebaseService.findByName(contact.name)
      .subscribe({
        next: (result) => {

          if(result.length == 0) {
            this.presentToast(`Contact not found: ${contact.name}`);
          }

          this.contactList = result as Contact[];
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
}
