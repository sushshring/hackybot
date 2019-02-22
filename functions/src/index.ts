import * as functions from 'firebase-functions';
import { App } from './app/app';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const app = new App().app;
export const hackyBot = functions.https.onRequest((req, resp) => {
  if (!req.path) {
    req.url = `/${req.url}` // prepend '/' to keep query params if any
  }
  return app(req, resp)
});
