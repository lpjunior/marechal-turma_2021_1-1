import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContactModel } from 'src/app/models/contact.model';
import { FirebaseFirestorageService } from 'src/app/services/firebase-firestorage.service';
import { FirebaseFirestoreService } from 'src/app/services/firebase.firestore.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  contact!: ContactModel;
  contactFormGroup!: FormGroup;
  @ViewChild('contactFormGroupDirective')
  formGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseFirestoreService: FirebaseFirestoreService,
    private firebaseFirestorageService: FirebaseFirestorageService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');

    this.firebaseFirestoreService.findContact(id!).subscribe({
      next: (data: ContactModel) => {
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
    let updateContact: ContactModel = { id: this.contact.id, ...values };
    this.firebaseFirestoreService
      .updateContact(updateContact)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.formGroupDirective.reset();
  }

  deleteContact() {
    this.firebaseFirestoreService
      .delete(this.contact.id)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));
  }

  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });


    if(image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.firebaseFirestorageService.upload(image, 'contacts', this.contact.id);

      loading.dismiss();

      if(result) {
        this.message('Success', 'Success on save image');
      } else {
        this.message('Fail', 'Ops! There was a problem');
      }
    }
  }

  async message(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }
}
