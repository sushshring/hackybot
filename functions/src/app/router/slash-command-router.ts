import { NextFunction, Request, Response } from 'express';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { ICommandHandler } from '../cmd/command-handler';
import { RespondQueryCommandHandler } from '../cmd/command-handler/respond-query';
import { ISlackCommandHandler } from '../cmd/slack-command';
import { HackyCommandHandler } from '../cmd/slack-command/hacky/hacky-command-handler';
import { ICommand } from '../model/command';
import { ParentRouter } from './parent-router';

export class SlashCommandRouter extends ParentRouter {
  protected routes(): void {
    this.router.get('*', (req, res) => {
      res.status(200).send('Got GET');
    });
    this.router.post('*', (req, res, next) => this.handleSlashRoute(req, res, next));
  }

  private commandHandler: ISlackCommandHandler;
  private respondQueryHandler: ICommandHandler;

  constructor() {
    super();
    this.commandHandler = new HackyCommandHandler();
    this.respondQueryHandler = new RespondQueryCommandHandler();
    this.routes();
  }

  private async handleSlashRoute(req: Request, res: Response, next: NextFunction) {
    console.log('Handling hacky route');
    if (req.body.payload) {
      const requestArgs = this.parseCommand(req.body.payload);
      try {
        res.status(200).send({ text: 'Handling...', response_type: 'ephemeral' });
        return this.respondQueryHandler.handle(RespondQueryCommandHandler.parseSubCommand(
          requestArgs));
      } catch (error) {
        return next(error);
      }
    } else {
      const requestArgs = this.parseCommand(req.body);
      try {
        res.status(200).send({ text: 'Handling...', response_type: 'ephemeral' });
        return this.handleCommand(requestArgs);
      } catch (error) {
        return next(error);
      }
    }
  }

  private parseCommand(body: any): ICommand {
    return body;
  }

  private handleCommand(requestArgs: ICommand) {
    switch (requestArgs.command) {
      case '/hacky':
        return this.commandHandler.handle(requestArgs);
      default:
        throw new HttpsError('invalid-argument', 'Unsupported command');
    }
  }
}
