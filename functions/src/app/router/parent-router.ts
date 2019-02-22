import * as express from 'express';

export abstract class ParentRouter {
    public readonly router: express.Router;
    protected abstract routes(): void;

    protected constructor() {
        this.router = express.Router();
    }
}
