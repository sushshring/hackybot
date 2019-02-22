import { User } from './user';

export interface ICommandResponse {
  responseUrl?: string;
  text: string;
  attachments?: any[];
  users?: User | User[],
  channel?: string
}
