import { ICommand } from '../../model/command';
import { ICommandResponse } from '../../model/command-response';
import { SlackClient } from '../../slack/slack-client';
import { IRespondCommand } from '../slack-command/hacky/hacky-command-handler';
import { ICommandHandler } from './index';

export class RespondQueryCommandHandler implements ICommandHandler {
  private slackClient: SlackClient;

  constructor() {
    this.slackClient = new SlackClient();
  }

  public async handle(command: IRespondCommand): Promise<ICommandResponse> {
    console.log(command);
    if (command.actions[0].value === 'help') {
      await this.slackClient.slack.chat.postMessage({
        channel: command.user!.id,
        text: `${command.original_message.text} from <@${
          command.callback_id
        }>. \n\nPlease DM them if possible to help with this topic!`,
        as_user: true
      });
    } else {
      await this.slackClient.slack.chat.postMessage({
        text: 'Okay. Maybe next time :hacky:',
        as_user: true,
        channel: command.user.id
      });
    }
    return {
      text: 'Opening a conversation now...'
    };
  }

  public static parseSubCommand(requestArgs: ICommand): IRespondCommand {
    return JSON.parse((requestArgs as any) as string);
  }
}
