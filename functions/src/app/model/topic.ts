import { FirestoreObject } from './firestore-object';

export class Topic extends FirestoreObject {
  topic: string;

  public get id(): string {
    return this.topic;
  }

  constructor(topic: string) {
    super();
    this.topic = topic;
  }
}
