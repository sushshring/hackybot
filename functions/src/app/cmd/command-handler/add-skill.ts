import { ICommandHandler } from '.';
import { TopicStore } from '../../db/topic-store';
import { ICommandResponse } from '../../model/command-response';
import { Topic } from '../../model/topic';
import { User } from '../../model/user';
import { ISubCommand } from '../slack-command/hacky/hacky-command-handler';

export class AddSkillCommand implements ICommandHandler {
  private topicStore: TopicStore;

  constructor() {
    this.topicStore = new TopicStore();
  }

  public async handle(command: ISubCommand): Promise<ICommandResponse> {
    const topics = command.subtext!.split(' ').map(topic => new Topic(topic));
    const user = new User(command.user_name, command.user_id);
    const result = await this.topicStore.addTopics(topics, user);
    return {
      responseUrl: command.response_url,
      text: `You are now mentoring skill${topics.length > 1 ? 's' : ''}: ${topics.length <= 1 ?
        topics[0].id :
        topics.map(topic => topic.id).join(', ')}. Thanks for your help!`,
      attachments: [result],
    };
  }
}
