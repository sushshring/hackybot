import axios from 'axios';
import { ICommandResponse } from '../../model/command-response';
import { ICommandResponder } from './index';

/**
 * Responds to the command sender in a DM
 */
export class HackyCommandResponder implements ICommandResponder {
  public async sendResponse(response: ICommandResponse): Promise<void> {
    const result = await axios.post(response.responseUrl!, response);
    console.log(result.data);
    return undefined;
  }
}
