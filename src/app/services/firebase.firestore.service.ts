import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService {

  constructor(private firestore: Firestore) { }

  save(contact: Contact): Promise<void> {
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contact);
  }

  list(): Observable<Contact[]> {
    const contactsCollection = collection(this.firestore, 'contacts');
    return collectionData(contactsCollection, {idField: 'id'})
      .pipe(
        map(result => result as Contact[])
      );
  }

  find(id: string): Observable<Contact> {
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document)
      .pipe(
        map(doc => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Contact;
        })
      );
  }

  findByName(name: string): Observable<Contact[]> {
      const contactList = this.list();
        return contactList.pipe(
          map(contacts => contacts.filter(contact => {
            const fullName = contact.name.concat(" ", contact.lastName);
            return fullName.toLowerCase().match(name.toLowerCase());
          }))
          )
    }

  update(contact: Contact): Promise<void> {
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data } = contact;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
