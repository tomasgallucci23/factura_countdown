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
  public async getProximoCumpleanios(req: express.Request, res: express.Response) {
    let clients = await this.userRepository
      .createQueryBuilder('user')
      .where(
        `DATE_ADD(date_birthday, 
        INTERVAL YEAR(CURDATE())-YEAR(date_birthday)
                 + IF(DAYOFYEAR(CURDATE()) > DAYOFYEAR(date_birthday),1,0)
        YEAR)  
    BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)`
      )
      .getMany();
    res.json(clients);
  }
  public async getNextBirthday(req: express.Request, res: express.Response) {
    let date = new Date();
    let dateMonthMax: number = date.getMonth() + 1;
    let dateDayhMax: number = date.getDate() + 7;
    let dateMonthMin: number = date.getMonth();
    let dateDayMin: number;
    if (date.getDate() < 7) {
      dateDayMin = 30 - 7 + date.getDate();
    } else {
      dateDayMin = date.getDate();
    }
    let clientBirthdayThisMonth = [];
    const clients = await this.userRepository
      .createQueryBuilder('user')
      //   .where('date_birthday <' + dateNow)
      .orderBy('user.date_birthday', 'DESC')
      .getMany();
    clients.forEach((e) => {
      console.log(e.date_birthday);
      let dateBirthday = new Date(e.date_birthday);
      let dateMonth: number = dateBirthday.getMonth() + 1;
      let dateDay: number = dateBirthday.getDay();
      console.log(dateMonthMin, dateMonthMax, dateDayMin, dateDayhMax, dateMonth, dateDay);
      if (dateMonth <= dateMonthMax && dateMonth >= dateMonthMin) {
        if (dateDay > dateDayMin || dateDay < dateDayhMax) {
          clientBirthdayThisMonth.push(e);
        } else {
        }
      } else {
        console.log('no 7');
      }
    });
    res.json(clientBirthdayThisMonth);
    clientBirthdayThisMonth = clientBirthdayThisMonth.sort((a: any, b: any) => {
      let day = new Date(a.date_birthday).getDate();
      let day1 = new Date(b.date_birthday).getDate();
      let dayActual = new Date().getDate();
      if (day > dayActual || day1 > dayActual) {
        return -1;
      }
      if (day1 < dayActual || day < dayActual) {
        return 1;
      }
      return 0;
    });
    if (clientBirthdayThisMonth.length === 0) {
      return res.json({ items: [], message: 'Users does not meet years' });
    } else {
      res.status(200).json({ items: clientBirthdayThisMonth });
    }
  }
}
