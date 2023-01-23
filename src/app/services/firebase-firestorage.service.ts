import { Injectable } from '@angular/core';
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

  async upload(photo:Photo, uuid:string): Promise<boolean> {
    const path = `uploads/contacts/${uuid}/${new Date().getTime()}.png`;

    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, photo.base64String!, 'base64');
      const imageUrl = await getDownloadURL(storageRef);

      const contactDocRef = doc(this.firestore, 'contacts', uuid);

      await updateDoc(contactDocRef, { imageUrl });

      return true;
    } catch (error) {
      return false;
    }
  }
}
