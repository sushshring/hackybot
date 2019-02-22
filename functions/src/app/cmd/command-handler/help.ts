import * as _ from 'lodash';
import { TopicStore } from '../../db/topic-store';
import { ICommandResponse } from '../../model/command-response';
import { ICommandResponder } from '../command-responder';
import { SlackDmCommandResponder } from '../command-responder/slack-dm-command-responder';
import { ISubCommand } from '../slack-command/hacky/hacky-command-handler';
import { ICommandHandler } from './index';

export class HelpCommand implements ICommandHandler {
  private topicStore: TopicStore;
  private slackDmResponder: ICommandResponder;

  constructor() {
    this.topicStore = new TopicStore();
    this.slackDmResponder = new SlackDmCommandResponder();
  }

  public async handle(command: ISubCommand): Promise<ICommandResponse> {
    console.log(command);
    // Get the topic for help
    const topic = _.first(command.subtext!.split(' ')) as string;
    const users = await this.topicStore.getUsersByTopic(topic);
    // Send topic request to mentors
    await Promise.all(users.map(user => {
      const dmResponse: ICommandResponse = {
        text: `You have a new help request for topic: ${topic}.`,
        users: [user],
        attachments: [
          {
            text: _.tail(command.subtext!.split(' ')).join(' '),
            callback_id: command.user_id,
            attachment_type: 'default',
            color: '#3AA3E3',
            'actions': [
              {
                'name': 'help',
                'text': 'Let\'s help!',
                'type': 'button',
                'value': 'help',
              },
              {
                'name': 'help',
                'text': 'I can\'t :(',
                'type': 'button',
                'value': 'nah',
              },
            ],
          },
        ],
      };
      return this.slackDmResponder.sendResponse(dmResponse);
    }));
    return {
      text: 'We\'ve sent your request to mentors. They will DM you if they can help!',
      responseUrl: command.response_url,
    };
  }
}
