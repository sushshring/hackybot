import { ICommand } from '../../model/command';

export interface ISlackCommandHandler {
  handle(requestArgs: ICommand): Promise<void>;
}
