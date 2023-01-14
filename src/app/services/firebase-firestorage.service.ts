import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Avatar } from '../models/avatar.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestorageService {
  private filesCollection!: AngularFirestoreCollection<Avatar>;
  private files!: Observable<Avatar[]>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.filesCollection = this.getCollection('contactsCollection');
    this.files = this.filesCollection.valueChanges();
  }

  getCollection(collectionId: string): AngularFirestoreCollection<Avatar> {
    return this.afs.collection(collectionId);
  }
}
