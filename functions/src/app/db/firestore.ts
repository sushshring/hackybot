import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { FirestoreObject } from '../model/firestore-object';

admin.initializeApp(functions.config().firebase);

export class Firestore {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  public addDocument(ref: string, doc: FirestoreObject) {
    return this.db.collection(ref).doc(doc.id).set(Object.assign({}, doc));
  }

  public getDocument(ref: string, id: string) {
    return this.getDocumentReference(ref, id).get()
  }

  public getDocumentReference(ref: string, id: string) {
    return this.db.collection(ref).doc(id)
  }

  public getAllDocuments(ref: string) {
    return this.db.collection(ref).get();
  }
}
