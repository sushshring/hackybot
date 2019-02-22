import { ICommandResponse } from '../../model/command-response';

export interface ICommandResponder {
  sendResponse(response: ICommandResponse): void;
}

