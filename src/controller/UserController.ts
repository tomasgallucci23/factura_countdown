import * as express from 'express';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { isDate, isNullOrUndefined } from 'util';
import Validator from 'validator';
import { stringify } from 'json-stringify-safe';
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
  public validateInput(req: Request, res: Response, next: NextFunction) {
    const params = { id: req.url.split('/')[2] };
    switch (req.method) {
      case 'GET':
        break;
      case 'DELETE':
        if (!params.id) {
          return res.status(400).json({ message: 'Id is required' });
        }
        break;
      case 'POST':
        if (Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Request body can't be empty" });
        }
        break;
      case 'PUT':
        if (!params.id) {
          return res.status(400).json({ message: 'Id is required' });
        }
        if (Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Request body can't be empty" });
        }
        break;
    }
    next();
  }
  public async createUser(req: Request, res: Response) {
    const userData = req.body;
    const user = new User();
    let error = {};
    let EmailError = [];

    // if (!Validator.matches(userData.name, '/^[az-AZ')) {
    //   error['name'] = {
    //     message: 'Name has to be a string.',
    //     value: userData.name,
    //   };
    // } else if (Validator.isEmpty(userData.name)) {
    //   error['name'] = {
    //     message: 'Name is required.',
    //   };
    // }

    // if (!Validator.matches(userData.lastname, '/^[az-AZ')) {
    //   error['lastname'] = {
    //     message: 'Lastname has to be a string.',
    //     value: userData.lastname,
    //   };
    // } else if (Validator.isEmpty(userData.lastname)) {
    //   error['lastname'] = {
    //     message: 'Lastname is required.',
    //   };
    // }
    // if (Validator.isEmpty(userData.email)) {
    //   error['email'] = {
    //     message: 'Email is required.',
    //   };
    // } else {
    //   if (!Validator.matches(userData.email, '/^[az-AZ')) {
    //     EmailError.push({
    //       message: 'Email has to be a string.',
    //     });
    //   } else if (!Validator.isEmail(userData.email)) {
    //     EmailError.push({
    //       message: 'Email has to be a format email.',
    //     });
    //   }
    //   let uniqueMail = await this.userRepository.findOneOrFail({ email: userData.email });
    //   if (!isNullOrUndefined(uniqueMail)) {
    //     EmailError.push({
    //       message: 'User found with this email.',
    //     });
    //   }
    //   error['email'] = {
    //     message: 'Email errors',
    //     errors: EmailError,
    //     value: userData.email,
    //   };
    // }
    // if (!isDate(userData.date_birthday)) {
    //   error['date_birthday'] = {
    //     message: 'Date birthday has to be a valid date.',
    //     value: userData.date_birthday,
    //   };
    // } else if (Validator.isEmpty(userData.date_birthday)) {
    //   error['date_birthday'] = {
    //     message: 'Date birthday is required.',
    //   };
    // }
    // if (!Validator.isNumeric(userData.phone)) {
    //   error['phone'] = {
    //     message: 'Phone has to be a numeric.',
    //   };
    // } else if (Validator.isEmpty(userData.phone)) {
    //   error['phone'] = {
    //     message: 'Phone is required.',
    //   };
    // }
    // if (Validator.isEmpty(userData.description)) {
    //   userData.description = '';
    // }

    // if (error) {
    //   return res
    //     .json({
    //       errors: error,
    //       message: 'An error occurred when validating',
    //     })
    //     .send(console.log(!Validator.isAlpha(userData.name)))
    //     .status(400);
    // } else {
    user.name = userData.name;
    user.lastname = userData.lastname;
    user.email = userData.email;
    user.date_birthday = userData.date_birthday;
    user.description = userData.description;
    user.phone = userData.phone;
    this.userRepository.save(user);

    return res.status(201).json({ message: 'User created', user });
    // }
  }

  public async getAllUsers(req: Request, res: Response) {
    const clients = await this.userRepository.find();
    console.log(clients);
    if (clients.length > 0) {
      return res.status(200).json(clients);
    } else if (clients.length === 0) {
      return res.status(400).json({ message: 'Users not found or not created' });
    }
  }

  public async getUser(req: Request, res: Response) {
    const user = await this.userRepository.findOne(req.params.id);
    if (user !== undefined) {
      return res.status(200).json(user);
    }
    return res.status(400).json({ message: 'User not found' });
  }

  public async updateUser(req: Request, res: Response) {
    const user = await this.userRepository.findOne(req.params.id);
    if (user !== undefined) {
      await this.userRepository.update(req.params.id, req.body);
      return res.status(200).json({ message: 'User updated correctly' });
    }

    return res.status(404).json({ message: 'User not found' });
  }

  public async deleteUser(req: Request, res: Response) {
    const user = await this.userRepository.findOne(req.params.id);
    if (user !== undefined) {
      this.userRepository.delete(req.params.id);
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found' });
  }
}
