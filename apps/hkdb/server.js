/* eslint-disable no-undef */
import { createRequestHandler } from '@remix-run/express';
import express from 'express';

// notice that the result of `remix vite:build` is "just a module"
import * as build from './build/server/index.js';

const app = express();
app.use(express.static('build/client'));

// and your app is "just a request handler"
app.all('*', createRequestHandler({ build }));

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
