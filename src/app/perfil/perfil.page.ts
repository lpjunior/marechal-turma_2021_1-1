import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirebaseFirestorageService } from '../services/firebase-firestorage.service';
import { FirebaseAuthenticationService } from '../services/firebase.authentication.service';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  imageUrl!:string;
  displayName!:string;

  perfilFormGroup!: FormGroup;
  @ViewChild('perfilFormGroupDirective')
  perfilFormGroupDirective!: FormGroupDirective;

  constructor(private firebaseFirestoreService: FirebaseFirestoreService,
    private firebaseFirestorageService: FirebaseFirestorageService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private auth: Auth,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController) {}

  ngOnInit() {
    this.imageUrl = this.auth.currentUser!.photoURL!;
    this.displayName = this.auth.currentUser!.displayName!;

    this.perfilFormGroup = new FormGroup({
      name: new FormControl(this.auth.currentUser!.displayName, Validators.required),
      email: new FormControl(this.auth.currentUser!.email, Validators.required)
    });
  }

async update(): Promise<void> {
  const name:string = this.perfilFormGroup.get('name')?.value;
  this.firebaseAuthenticationService.updateProfile(name);
}

async changeImage(): Promise<void> {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: CameraSource.Photos
  });


  if(image) {
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.firebaseFirestorageService.uploadPeril(image, 'perfils', this.auth.currentUser!.uid);

    loading.dismiss();

    if(result) {
      this.message('Success', 'Success on save image');
    } else {
      this.message('Fail', 'Ops! There was a problem');
    }
  }
}

  async signOut(): Promise<void> {
    await this.firebaseAuthenticationService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async message(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async perfil() {
    this.router.navigateByUrl('/tabs/register', { replaceUrl: true });
  }
}
