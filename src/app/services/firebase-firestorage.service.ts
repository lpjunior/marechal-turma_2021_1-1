import { Injectable } from '@angular/core';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestorageService {

  constructor(private firestore: Firestore, private storage: Storage) {}

  getContactProfile(uuid: string) : Observable<DocumentData> {
    const contactDocRef = doc(this.firestore, `contacts/${uuid}`);
    return docData(contactDocRef);
  }

  async uploadPeril(photo:Photo, collection:string, uuid:string): Promise<boolean> {
    const path = `uploads/${collection}/${uuid}/${new Date().getTime()}.png`;

    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, photo.base64String!, 'base64');
      const photoURL = await getDownloadURL(storageRef);

      const auth = getAuth();
      updateProfile(auth.currentUser!, { photoURL });

      return true;
    } catch (error) {
      return false;
    }
  }

  async upload(photo:Photo, collection:string, uuid:string): Promise<boolean> {
    const path = `uploads/${collection}/${uuid}/${new Date().getTime()}.png`;

    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, photo.base64String!, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const docRef = doc(this.firestore, collection, uuid);

      await updateDoc(docRef, { imageUrl });

      return true;
    } catch (error) {
      return false;
    }
  }
}
