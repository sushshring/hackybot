import { FirestoreObject } from './firestore-object';

export class User extends FirestoreObject {
  public name: string;
  public id: string;

  constructor(name: string, id: string) {
    super();
    this.name = name;
    this.id = id;
  }
}
