import * as express from 'express';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class BirthdayController {
  public path = '/getProximaFecha';
  public router: express.Router = express.Router();
  //   private getConnection = getConnection;
  private userRepository = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.get(this.path, this.getNextBirthday);
  }
  public validateInput(req: Request, res: Response, next: NextFunction) {
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
  public async getNextBirthday(req: express.Request, res: express.Response) {
    let clients = await this.userRepository
      .createQueryBuilder('user')
      .where('DAYOFYEAR(`date_birthday`) > DAYOFYEAR(NOW())')
      .orderBy('DAYOFYEAR(`date_birthday`)', 'ASC')
      .getOne();
    if (clients == undefined) {
      clients = await this.userRepository
        .createQueryBuilder('user')
        .orderBy('DAYOFYEAR(`date_birthday`)', 'ASC')
        .getOne();
    }

    if (clients != undefined) {
      res.status(200).json({ items: clients });
    } else {
      res.status(400).json({ message: 'Users not created yet' });
    }
  }
}
