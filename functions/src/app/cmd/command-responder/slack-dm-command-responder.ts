import { ICommandResponse } from '../../model/command-response';
import { User } from '../../model/user';
import { SlackClient } from '../../slack/slack-client';
import { ICommandResponder } from './index';

/**
 * Creates a new Slack DM based on the provided users array
 */
export class SlackDmCommandResponder implements ICommandResponder {
  private slackClient: SlackClient;

  constructor() {
    this.slackClient = new SlackClient();
  }

  public async sendResponse(response: ICommandResponse): Promise<any[]> {
    return Promise.all((response.users as User[])
      .map(async (user) => {
        return this.slackClient.slack.chat.postMessage({
          channel: user.id,
          text: response.text,
          attachments: response.attachments,
          as_user: true,
        });
      }));
  }
}
