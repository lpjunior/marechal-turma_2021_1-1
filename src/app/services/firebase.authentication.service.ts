import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from '@angular/fire/auth';
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

  async signIn(credential:CredentialModel): Promise<UserCredential | null> {
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password)
    .then((user:UserCredential) => user)
    .catch(error => {
      console.error(error);
      return null;
    });
  }

  async updateProfile(displayName:string): Promise<void> {
    return updateProfile(this.auth.currentUser!, { displayName: displayName });
  }

  async signOut(): Promise<void> {
    return signOut(this.auth);
  }

  //async recovery(); // recupera senha
}
