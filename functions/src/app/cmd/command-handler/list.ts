import { TopicStore } from '../../db/topic-store';
import { ICommandResponse } from '../../model/command-response';
import { ISubCommand } from '../slack-command/hacky/hacky-command-handler';
import { ICommandHandler } from './index';

export class ListCommandHandler implements ICommandHandler {
  private topicStore: TopicStore;

  constructor() {
    this.topicStore = new TopicStore();
  }

  public async handle(command: ISubCommand): Promise<ICommandResponse> {
    console.log(command);
    const topics = await this.topicStore.getAllTopics();
    console.log(topics);
    return {
      responseUrl: command.response_url,
      text: 'The following topics are currently available. Check back in a bit for more!',
      attachments: [{
        text: topics.join('\n'),
      }],
    };
  }
}
