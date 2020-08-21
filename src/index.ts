import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Routes } from './routes';
const cors = require('cors');
const path = require('path');

require('dotenv').config();
createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: 'http://facturas.movizen.ga',
      })
    );
    app.get('/', function (req: Request, res: Response) {
      res.sendFile(path.join(__dirname, '/public/index.html'));
    });
    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result
            .then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
            .catch((error) => console.error(error));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(app.get('port'), () => {
      console.log('[Server]: online on port', app.get('port'));
    });
    console.log(process.env.PORT);
  })
  .catch((error) => console.log(error));
