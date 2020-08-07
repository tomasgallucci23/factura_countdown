import * as express from 'express';
import { getRepository, getConnection } from 'typeorm';
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
    // this.router.get(this.path, this.getAllUsers);
    // this.router.post(this.path + '/create', this.createUser);
    // this.router.get(this.path + '/:id', this.getUser);

    // this.router.put(this.path + '/:id', this.updateUser);

    // this.router.delete(this.path + '/:id', this.deleteUser);
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
  public async getNextBirthday(req: express.Request, res: express.Response) {
    let clients = await this.userRepository
      .createQueryBuilder('user')
      .where(
        `DATE_ADD(date_birthday, 
        INTERVAL YEAR(CURDATE())-YEAR(date_birthday)
                 + IF(DAYOFYEAR(CURDATE()) > DAYOFYEAR(date_birthday),1,0)
        YEAR)  
    BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 90 DAY)`
      )
      .orderBy('date_birthday', 'ASC')
      .getOne();
    res.status(200).json({ items: clients });
  }
}
