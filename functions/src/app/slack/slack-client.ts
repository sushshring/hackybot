import { WebClient } from '@slack/client';
import * as functions from 'firebase-functions';

export class SlackClient {
  public slack: WebClient;

  constructor() {
    this.slack = new WebClient(functions.config().slackservice.token);
  }
}
