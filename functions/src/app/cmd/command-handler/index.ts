import { ICommandResponse } from '../../model/command-response';
import { IRespondCommand, ISubCommand } from '../slack-command/hacky/hacky-command-handler';

export interface ICommandHandler {
  handle(command: ISubCommand | IRespondCommand): Promise<ICommandResponse>;
}
