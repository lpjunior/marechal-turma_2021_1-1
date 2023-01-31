import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, deleteDoc, doc, docData, docSnapshots, DocumentData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService {

  constructor(private firestore: Firestore, private auth: Auth) {}

  saveContact(contact: ContactModel): Promise<void> {
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contact);
  }

  list(): Observable<ContactModel[]> {
    const contactsCollection = collection(this.firestore, 'contacts');
    return collectionData(contactsCollection, {idField: 'id'})
      .pipe(
        map(result => result as ContactModel[])
      );
  }

  findPerfil(): Observable<DocumentData> {
    const userId = this.auth.currentUser!.uid;
    const document = doc(this.firestore, `perfils/${userId}`);
    return docData(document);
  }

  findContact(id: string): Observable<ContactModel> {
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document)
      .pipe(
        map(doc => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as ContactModel;
        })
      );
  }

  findByName(name: string): Observable<ContactModel[]> {
      const contactList = this.list();
        return contactList.pipe(
          map(contacts => contacts.filter(contact => {
            const fullName = contact.name.concat(" ", contact.lastName);
            return fullName.toLowerCase().match(name.toLowerCase());
          }))
          )
    }

  updatePerfil(name: string): Promise<void> {
    const userId = this.auth.currentUser!.uid;
    const document = doc(this.firestore, 'perfils', userId);
    return setDoc(document, { name });
  }

  updateContact(contact: ContactModel): Promise<void> {
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data } = contact;
    return updateDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
