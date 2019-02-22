import * as _ from 'lodash';
import { ISlackCommandHandler } from '..';
import { ICommand } from '../../../model/command';
import { ICommandResponse } from '../../../model/command-response';
import { User } from '../../../model/user';
import { ICommandHandler } from '../../command-handler';
import { AddSkillCommand } from '../../command-handler/add-skill';
// import { ErrorCommand } from '../../command-handler/error';
import { HelpCommand } from '../../command-handler/help';
import { ListCommandHandler } from '../../command-handler/list';
// import { RegisterCommandHandler } from '../../command-handler/register';
// import { RespondQueryCommandHandler } from '../../command-handler/respond-query';
import { ICommandResponder } from '../../command-responder';
import { HackyCommandResponder } from '../../command-responder/hacky-command-responder';

export interface ISubCommand extends ICommand {
  subcommand?: string;
  subtext?: string;
}

export interface IRespondCommand {
  callback_id: string;
  original_message: {
    text: string;
    user: string,
  }
  actions: { name: string, value: string }[]
  user: User;
}

export class HackyCommandHandler implements ISlackCommandHandler {
  private helpCommandHandler: ICommandHandler;
  // private errorCommandHandler: ICommandHandler;
  private addSkillCommandHandler: ICommandHandler;
  private listCommandHandler: ICommandHandler;
  private commandResponder: ICommandResponder;

  // private respondQueryCommandHandler: ICommandHandler;

  constructor() {
    this.helpCommandHandler = new HelpCommand();
    // this.errorCommandHandler = new ErrorCommand();
    this.addSkillCommandHandler = new AddSkillCommand();
    this.listCommandHandler = new ListCommandHandler();
    // this.respondQueryCommandHandler = new RespondQueryCommandHandler();
    this.commandResponder = new HackyCommandResponder();
  }

  public async handle(requestArgs: ICommand): Promise<void> {
    const subCommand = HackyCommandHandler.parseSubcommand(requestArgs);
    return this.commandResponder.sendResponse(await this.handleSubCommand(subCommand));
  }

  private static parseSubcommand(requestArgs: ICommand): ISubCommand {
    return {
      ...requestArgs,
      subcommand: _.first(requestArgs.text.split(' ')) as string,
      subtext: _.tail(requestArgs.text.split(' ')).join(' '),
    };
  }

  private async handleSubCommand(subCommand: ISubCommand): Promise<ICommandResponse> {
    switch (subCommand.subcommand) {
      case 'help':
        return this.helpCommandHandler.handle(subCommand);
      case 'list':
        return this.listCommandHandler.handle(subCommand);
      case 'add':
        return this.addSkillCommandHandler.handle(subCommand);
      // case 'respond':
      //   return this.respondQueryCommandHandler.handle(subCommand);
      // default:
      //   return this.errorCommandHandler.handle(subCommand);
    }
    throw new Error('unsupported');
  }
}
