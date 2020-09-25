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
    let queryDate = this.userRepository
      .createQueryBuilder('user')
      .select('date_birthday')
      .where('DAYOFYEAR(`date_birthday`) >= DAYOFYEAR(NOW())')
      .orderBy('DAYOFYEAR(`date_birthday`)', 'ASC')
      .limit(1)
      .getSql();
    let clients = await this.userRepository
      .createQueryBuilder('user')
      .where('`date_birthday` = (' + queryDate + ')')
      .getMany();
    if (clients.length === 0) {
      queryDate = this.userRepository
        .createQueryBuilder('user')
        .select('date_birthday')
        .orderBy('DAYOFYEAR(`date_birthday`)', 'ASC')
        .limit(1)
        .getSql();
      clients = await this.userRepository
        .createQueryBuilder('user')
        .where('`date_birthday` = (' + queryDate + ')')
        .getMany();
    }
    if (clients.length > 0) {
      res.status(200).json({ items: clients });
    } else {
      res.status(400).json({ message: 'Users not created yet' });
    }
  }
}
