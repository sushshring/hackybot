import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { SlashCommandRouter } from './router/slash-command-router';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(cors({ origin: true }));
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

    // Routes
    this.app.get('/', (req, res) => {
      res.status(200).send('Welcome to hackybot!');
    });
    this.app.use('/', new SlashCommandRouter().router);
  }
}
