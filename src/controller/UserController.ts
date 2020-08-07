import * as express from 'express';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
  public path = '/usuarios';
  public router: express.Router = express.Router();
  private userRepository = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.get(this.path, this.getAllUsers);
    this.router.post(this.path + '/create', this.createUser);
    this.router.get(this.path + '/:id', this.getUser);

    this.router.put(this.path + '/:id', this.updateUser);

    this.router.delete(this.path + '/:id', this.deleteUser);
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
  public async createUser(req: express.Request, res: express.Response) {
    const userData = req.body;
    const user = new User();
    user.name = userData.name;
    user.lastname = userData.lastname;
    user.email = userData.email;
    user.date_birthday = userData.date_birthday;
    user.description = userData.description;
    user.phone = userData.phone;
    this.userRepository.save(user);

    return res.status(201).send({ message: 'User created', user });
  }

  public async getAllUsers(req: express.Request, res: express.Response) {
    const clients = await this.userRepository.find();
    return res.status(200).send(clients);
  }

  public async getUser(req: express.Request, res: express.Response) {
    const client = await this.userRepository.findOne(req.params.id);
    return res.status(200).send(client);
  }

  public async updateUser(req: express.Request, res: express.Response) {
    const user = await this.userRepository.findOne(req.params.id);
    if (user !== undefined) {
      await this.userRepository.update(req.params.id, req.body);
      return res.status(200).send({ message: 'User updated correctly' });
    }

    return res.status(404).send({ message: 'User not found' });
  }

  public async deleteUser(req: express.Request, res: express.Response) {
    const user = await this.userRepository.findOne(req.params.id);
    if (user !== undefined) {
      this.userRepository.delete(req.params.id);
      return res.status(200).send({ message: 'User deleted successfully' });
    }
    return res.status(404).send({ message: 'User not found' });
  }
}
