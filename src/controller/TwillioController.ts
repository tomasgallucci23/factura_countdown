import * as express from 'express';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import * as twilio from 'twilio';

export class TwillioController {
  public path = '/twilio';
  accountSid = process.env.ACCOUNTSID;
  authToken = process.env.AUTHTOKEN;
  client = twilio(this.accountSid, this.authToken);
  public router: express.Router = express.Router();
  private userRepository = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);
  }
  public validateInput(req: express.Request, res: express.Response, next: express.NextFunction) {
    const params = { id: req.url.split('/')[2] };
    switch (req.method) {
      case 'GET':
        break;
      case 'DELETE':
        if (!params.id) {
          return res.status(400).send({ message: 'Id is required' });
        }
        break;
      case 'POST':
        if (Object.keys(req.body).length === 0) {
          return res.status(400).send({ message: "Request body can't be empty" });
        }
        break;
      case 'PUT':
        if (!params.id) {
          return res.status(400).send({ message: 'Id is required' });
        }
        if (Object.keys(req.body).length === 0) {
          return res.status(400).send({ message: "Request body can't be empty" });
        }
        break;
    }
    next();
  }
  public async sendMessage(req: express.Request, res: express.Response) {
    let userID = req.params.id;
    let user = this.userRepository.findOne(userID);
    this.client.messages
      .create({
        body: `El día siguiente es el cumpleanios ${(await user).name} ${
          (await user).lastname
        }. Recordar que tiene que pagar las facturas.`,
        from: '+13236414565',
        to: '+5493412769210',
      })
      .then((message: any) => {
        console.log(message);
        res.status(200).json({ message: 'Sms sended', id: message.sid });
      })
      .catch((error) => {
        console.error(error);
        res.status(300).json({ error: true, message: 'Error to send sms.' });
      });
  }
}
