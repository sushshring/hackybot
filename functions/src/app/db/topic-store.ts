import { Topic } from '../model/topic';
import { User } from '../model/user';
import { Firestore } from './firestore';

export class TopicStore {
  private firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  public async getUsersByTopic(topic: string) {
    const docs: User[] = [];
    const docRef = await this.firestore.getDocumentReference('topic', topic);
    const collections = await docRef.getCollections();
    const result = await Promise.all(collections.map((collection) => collection.get()));
    result.forEach((collectionDocs) => collectionDocs.forEach(
      doc => docs.push(doc.data() as User)));
    return docs;
  }

  public addTopics(topics: Topic[], user: User) {
    return Promise.all(
      topics.map((topic) => {
        this.firestore.addDocument(`topics-list`, topic);
        return this.firestore.addDocument(`topic/${topic.topic}/${user.id}`, user);
      }),
    );
  }

  public async getAllTopics() {
    const topics: string[] = [];
    const topicQs = await this.firestore.getAllDocuments('topics-list');
    topicQs.forEach((topicQ) => {
      topics.push(topicQ.id);
    });
    return topics;
  }
}
