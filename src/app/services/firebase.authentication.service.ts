import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { CredentialModel } from '../models/credential.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private auth: Auth) {}

  async register(credential:CredentialModel): Promise<UserCredential | null> {
    console.log(credential)
    return createUserWithEmailAndPassword(this.auth, credential.email, credential.password)
    .then((credential:UserCredential) => {
      // persistencia dos dados name, email
      console.log(credential)
      return credential;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
  }

  //async signin(); // login
  //async signout(); // logout
  //async recovery(); // recupera senha
}
